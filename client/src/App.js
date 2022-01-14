import './App.css';
import Form from './components/Input/Form';
import EmployeeList from './components/Employees/EmployeesList';
import { useRef, useState } from 'react';
import EditForm from './components/Input/EditForm';
import classes from './components/Input/Form.module.css'
import Card from './components/UI/Card';
import Employee from './components/Employees/Employee';
import wut from './components/Employees/EmployeeList.module.css'
import Axios from 'axios';

function App() {

  const [showform, setshowform] = useState(false);
  const [showEdit, setshowedit] = useState(false);
  const [showDelete, setshowdelete] = useState(false);
  const [warn, setWarn] = useState(<p></p>);

  // const [box, setBox] = useState(
  //   {
  //   //   fname:"Pratham",
  //   //   lname: "Bande",
  //   //   salary: 690000
  //   }
  // );

  const cfname = useRef();
  const clname = useRef();
  const csalary = useRef();

  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [salary, setsalary] = useState(); 
  const [id, setid] = useState();
  
  const update = (emp) => {
    setfname(emp.first_name);
    setlname(emp.last_name);
    setsalary(emp.salary);
    setid(emp.emp_id);
    setWarn(<p></p>)
  }

  const updateQ = (event) => {
    event.preventDefault();
    if(!id || cfname.current.value.trim().length === 0 || clname.current.value.trim().length === 0 || csalary.current.value <= 0){
      if(!id) setWarn(<p>Please Select an Employee</p>);
      else  setWarn(<p>Please Enter Correct Value</p>);
      return;
    }
    // console.log(cfname.current.value);
    // console.log(clname.current.value);
    // console.log(csalary.current.value);
    // console.log(id);
    Axios.put("http://localhost:3001/update", {fname:cfname.current.value, lname:clname.current.value,salary:csalary.current.value,id:id});
    setid(null);
    setWarn(<p>Updated Successfully</p>);
    
    cfname.current.value = '';
    clname.current.value = '';
    csalary.current.value = '';
  }

  let bruhmomento = <Card>
    {id && <div className={wut.smh} ><Employee fname={fname}lname={lname}salary={salary}/></div>}
    {warn}
  <form className={classes.formcontrol} onSubmit={updateQ}>
      <div className={classes.comp}><label htmlFor='fname'>First Name</label>
      <input placeholder={id ? " " : "Select an Employee"} ref={cfname} type='text' id='fname' /></div>
      <div className={classes.comp}><label htmlFor='lname'>Last Name</label>
      <input placeholder={id ? " " : "Select an Employee"} ref={clname} type='text' id='lname' /></div>
      <div className={classes.comp}><label htmlFor='salary'>Salary</label>
      <input placeholder={id ? " " : "Select an Employee"} ref={csalary} type='number' id='salary' /></div>
      <button type="submit">Edit Employee</button>
  </form>
</Card>

  
  //console.log(box);

  return (
    <div className="App">
      <h1>The Office</h1>
      <div>
        <button onClick={() => {setshowform(!showform); if(!showform)setshowedit(false);}}>Add Employee</button>
        <button onClick={() => {setshowedit(!showEdit); if(!showEdit)setshowform(false);}}>Edit Employee</button>
        <button onClick={() => {setshowdelete(!showDelete);if(!showDelete){setshowform(false);setshowedit(false);}}}>Delete Employee</button>
      </div>
      {showform && <div><Form/></div>}
      {/* <EditForm 
        jbox={box}
      /> */}
      { showEdit && bruhmomento}
      <div><EmployeeList showedit={showEdit}  showdelete={showDelete}update={update}/></div>
    </div>
  );
}

export default App;
