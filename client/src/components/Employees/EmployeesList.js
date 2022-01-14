import Axios from 'axios';
import { useState } from 'react';
import Employee from './Employee';
import { FaUserTimes } from 'react-icons/fa'
import { FaClipboard } from 'react-icons/fa'
import classes from './EmployeeList.module.css'
const { default: Card } = require("../UI/Card")
const EmployeeList = props => {
    const [employeeList, setEmployeeList] = useState([]);

    const getEmployees = () => {
        Axios.get("http://localhost:3001/employees").then((response) => {
          setEmployeeList(response.data);
        });
    };

    const removeEmployee = (id) => {
        console.log(id);
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            console.log(response);
        });
    }
    return(
        <Card>
            <div className={classes.wut}><button onClick={getEmployees}>Get Employees</button></div>
            {employeeList.map((emp) => {
                return(<div key={emp.salary}>
                    <div className={classes.smh} ><Employee 
                        fname={emp.first_name}
                        lname={emp.last_name}
                        salary={emp.salary}
                    />
                    <div>
                        {props.showdelete && <FaUserTimes onClick={() => {
                        removeEmployee(emp.emp_id);
                    }}className={classes.big}/>}
                    {props.showedit && <FaClipboard onClick={() => {props.update(emp)}}></FaClipboard>}
                    </div>
                    </div>
                </div>)
            })}
        </Card>
    )
}

export default EmployeeList;