import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express'
import mysql from 'mysql';
import { Students } from './models/students';

const app: Application = express()

const port: number = 3001

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(express.urlencoded());


app.post('/api/add', (req: Request, res: Response) => {
    console.log(req.body)
    res.json({});
});

app.get('/api/add', (req: Request, res: Response) => {
    console.log("calling the get method, but this is not what we want.")
    res.json({});
}) 

app.get('/students', (req: Request, res: Response) => {
    /**
     * Create a connection to the mysql db server using the provided connection settings
     */
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        //password: '',
        database: 'se_students',
    });

    /**
     * Connect to the host
     */
    connection.connect();

    /**
     * Execute query
     * queried data is inside `rows`
     */
    connection.query('select * from students', (error, rows, fields) => {
        if (error) throw error;

        const students: Array<Students> = [];
        rows.forEach((student: Students) => {
            students.push(student);
        });

        res.render('pages/students', {
            students: students,
            admin: false,
        });

    })
    connection.end();

});

app.get('/teachers',  (req: Request, res: Response) => {
    console.log("calling the get method, but this is not what we want.")
    res.render('pages/teachers');
});


app.get('/api/list', (req: Request, res: Response) => {
  const data = [
    {
      firstname: "John",
      lastname: "Doe",
    },
    {
      firstname: "Mr.",
      lastname: "Doe",
    }
  ];
  res.json(data);
})



app.get('/login', (req: Request, res: Response) => {
    res.render("pages/login");
})


app.post('/login', (req: Request, res: Response) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        //password: '',
        database: 'se_students',
    });

    /**
     * Connect to the host
     */
    connection.connect();

    /**
     * Execute query
     * queried data is inside `rows`
     */
    const username = req.body.username;
    const password = req.body.password;
    /**
     * don't do this, prone to sql injection
     */
    connection.query(`select * from users where username = '${username}'`, (error, rows, fields) => {
        if (error) throw error;

        if (rows.length > 0) {
            /**
             * password should be encrypted
             */
            if (rows[0]?.password === password) {
                console.log('success!');
                res.redirect('/students');
            }
            console.log('incorrect password');

        } else {
            console.log('username not found', username);
        }

        res.render("pages/login");

    })
    connection.end();
})
  

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`)
})