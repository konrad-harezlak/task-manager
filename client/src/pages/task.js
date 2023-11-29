import React from 'react';
import './task.css'
const Task = ({title,description, date}) => {

    return(
        <div className='task'>
            <h2 className='task_title'>{title}</h2>
            <p className='task_description'>{description}</p>
            <p className='task_date'>{date}</p>
        </div>
    )};

export default Task;