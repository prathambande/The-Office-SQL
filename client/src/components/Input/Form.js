import axios from 'axios';
import { useState } from 'react'
import Card from '../UI/Card'
import classes from './Form.module.css'

const Form = (props) => {

    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [salary, setsalary] = useState(-1); 

    const addEmployee = (emp) => {
        axios.post("http://localhost:3001/create", {
          fname: emp.fname,
          lname: emp.lname,
          salary: emp.salary
        })
        //console.log(emp);
      }

    const add = (event) => {
        event.preventDefault();
        if(fname.trim().length === 0 || lname.trim().length === 0 || salary < 0)return;
        addEmployee({
            fname: fname,
            lname: lname,
            salary: +salary
        })
    }

    return(
        <Card>
            <form className={classes.formcontrol} onSubmit={add}>
                <div className={classes.comp}><label htmlFor='fname'>First Name</label>
                <input onChange={(event) => {setfname(event.target.value)}} type='text' id='fname' /></div>
                <div className={classes.comp}><label htmlFor='lname'>Last Name</label>
                <input onChange={(event) => {setlname(event.target.value)}} type='text' id='lname' /></div>
                <div className={classes.comp}><label htmlFor='salary'>Salary</label>
                <input onChange={(event) => {setsalary(event.target.value)}} type='number' id='salary' /></div>
                <button type="submit">Add Employee</button>
            </form>
        </Card>
    )
}

export default Form;