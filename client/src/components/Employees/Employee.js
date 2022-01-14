import classes from './Employee.module.css'

const Employee = props => {
    return(
        <div className={classes.list}>
            <p>{props.fname} {props.lname}</p>
            <p>${props.salary}</p>
        </div>
    )
}

export default Employee;