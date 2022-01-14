import { useContext, useState } from 'react'
import Card from '../UI/Card'
import classes from './Form.module.css'
const EditForm = props => {

    console.log("jeez christ wya"); 
    console.log(props.jbox);

    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [salary, setsalary] = useState(); 
    const [id, setid] = useState();
    
    useContext(() => {
        console.log("kekd");
        setfname(props.jbox.first_name);
        setlname(props.jbox.last_name);
    }, [])

    //console.log(fname);

    return(
        <Card>
            <form className={classes.formcontrol} >
                <div className={classes.comp}><label htmlFor='fname'>First Name</label>
                <input placeholder="Select an Employee" value={fname} onChange={(event) => {setfname(event.target.value)}} type='text' id='fname' /></div>
                <div className={classes.comp}><label htmlFor='lname'>Last Name</label>
                <input placeholder="Select an Employee" value={lname} onChange={(event) => {setlname(event.target.value)}} type='text' id='lname' /></div>
                <div className={classes.comp}><label htmlFor='salary'>Salary</label>
                <input placeholder="Select an Employee" value={salary} onChange={(event) => {setsalary(event.target.value)}} type='number' id='salary' /></div>
                <button type="submit">Edit Employee</button>
            </form>
        </Card>
    )



}
export default EditForm;