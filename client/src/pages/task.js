import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from './AuthContext';
import './task.css';

const Task = ({ title, category, description, date, taskId, fetchTasks }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { user } = useAuth();
    const categoriesTitles = [
            'Cleaning',
            'Work',
            'Meetings',
            'Training/Fitness',
            'Personal Development',
            'Shopping',
            'Cooking',
            'Entertainment',
            'Finance',
            'Travel',
            'Pet Care',
            'Health',
            'Home Projects',
            'Other'
          ];
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

    const handleDeleteTask = async () => {
        try {
            console.log("to jest taskId: " + taskId)
            await axios.post('http://localhost:4000/deleteTask', { taskId, user });
            await fetchTasks();
            //const response = await axios.post('http://localhost:4000/tasks', user);
            alert('Task delete completed.');
        } catch (error) {
            console.log("Error with adding a task: ", error)
        }

        return 0;

    }

    return (
        <div className='task'>
            <div className='task_info'>
                <h2 className='task_title'>{title}</h2>
                <p className='title_category'>{categoriesTitles[category-1]}</p>
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
                <input type='submit' onClick={handleDeleteTask} value='delete' />
            </div>
        </div>
    );
};

export default Task;
