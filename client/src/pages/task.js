import React, { useState } from 'react';
import './task.css';

const Task = ({ title, description, date }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = () => {
        setIsUpdating(true);
    };

    const handleCancelUpdate = () => {
        setIsUpdating(false);
    };
    const beautifyDate = (inputDate) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = new Date(inputDate).toLocaleString('en-US', options);
        return formattedDate;
    };

    return (
        <div className='task'>
            <div className='task_info'>
                <h2 className='task_title'>{title}</h2>
                <p className='task_description'>{description}</p>
                <p className='task_date'>{beautifyDate(date)}</p>
            </div>
            <div className='task_buttons'>
                {!isUpdating && (
                    <input type='submit' onClick={handleUpdate} value='update' />
                )}
                {isUpdating && (
                    <div className='update_inputs'>
                        <input type='text' placeholder='Title' />
                        <input type='text' placeholder='Description' />
                        <input type='submit' value='Change' />
                        <input type='submit' onClick={handleCancelUpdate} value='Cancel' />
                    </div>
                )}
                <input type='submit' value='delete' />
            </div>
        </div>
    );
};

export default Task;
