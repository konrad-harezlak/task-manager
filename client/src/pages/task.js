import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from './AuthContext';
import './task.css';

const Task = ({ title, category, description, date, taskId, fetchTasks }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [taskData, setTaskData] = useState({
        title: '',
        description: ''
    })

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

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    const handleUpdate = () => {
        setIsUpdating(true);
    };

    const handleUpdateData = async () => {
        try {
            await axios.post('https://task-manager-backend-umxh.onrender.com/changeTask', { taskId,taskData })
            await fetchTasks();
            setIsUpdating(false);
            setTaskData({title:'',description:''});
            alert('Task update completed')
        }
        catch (error) {
            console.log("Error with update data", error)
        }
    }

    const handleCancelUpdate = () => {
        setIsUpdating(false);
    };

    const beautifyDate = (inputDate) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' };
        const formattedDate = new Date(inputDate).toLocaleString('en-EN', options);
        return formattedDate;
    };

    const handleDeleteTask = async () => {
        try {
            console.log("to jest taskId: " + taskId)
            await axios.post('https://task-manager-backend-umxh.onrender.com/deleteTask', { taskId, user });
            await fetchTasks();
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
                <p className='title_category'>{categoriesTitles[category - 1]}</p>
                <p className='task_description'>{description}</p>
                <p className='task_date'>{beautifyDate(date)}</p>
            </div>
            <div className='task_buttons'>
                {!isUpdating && (
                    <input type='submit' onClick={handleUpdate} value='update' />
                )}
                {isUpdating && (
                    <div className='update_inputs'>
                        <input
                            type='text'
                            placeholder='Title'
                            name='title'
                            onChange={handleDataChange}
                            value={taskData.title}
                        />
                        <input
                            type='text'
                            placeholder='Description'
                            name='description'
                            onChange={handleDataChange}
                            value={taskData.description}
                        />
                        <input
                            type='submit'
                            onClick={handleUpdateData}
                            value='Change'
                        />
                        <input
                            type='submit'
                            onClick={handleCancelUpdate}
                            value='Cancel'
                        />
                    </div>
                )}
                <input type='submit' onClick={handleDeleteTask} value='delete' />
            </div>
        </div>
    );
};

export default Task;
