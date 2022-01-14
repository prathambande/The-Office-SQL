const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
    user: 'root',
    password: 'p@$$',
    host: 'localhost',
    database: 'firsttime'
});

app.post('/create', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const salary = req.body.salary;

    db.query('INSERT INTO employee (first_name, last_name,salary) VALUES (?,?,?)',
    [fname,lname,salary], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Values Successfully Inserted");
        }
    })

})

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employee", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE emp_id = ?", id, (err,result)=>{
        if(err){console.log(err);console.log("sike");}
        else{
            res.send(result);
        }
    })
})

app.put("/update", (req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const salary = req.body.salary;
    const id = req.body.id;
    db.query("UPDATE employee SET first_name = ? , last_name = ? , salary = ? WHERE emp_id = ?", [fname,lname,salary, id], 
    (err, result) => {
        if(err)console.log(err);
        else{
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("Server is Up and Running on port localhost:3001");
})
