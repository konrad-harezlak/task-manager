import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faSignOut, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';
import axios from 'axios';
import Task from './task'
import './home.css'

const Home = () => {
    const { logout, user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskData, setTaskData] = useState({
        title: '',
        description: ''
    })

    const fetchTasks = async (callback) => {
        try {
            const response = await axios.post('http://localhost:4000/tasks', { user })
            setTasks([...response.data.rows])
            console.log("tasks fetched successfully: ", tasks)
            if (callback) {
                callback();
            }
        } catch (error) {
            console.log("Error with fetching tasks");
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.post('http://localhost:4000/categories')
                setCategories(response.data.rows);
            } catch (error) {
                console.log("Error with fetching categories: ", error);
            }
        }


        fetchTasks();
        fetchCategories();
    }, []);

    const handleTaskInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    const handleAddTask = async (e) => {
        e.preventDefault();
        const title = document.getElementsByClassName('title')[0];
        const category = document.getElementById('category');
        if (title.value.length === 0) {
            alert('Empty \'title\' field ');
            title.style.border = "1px solid red"
            return;
        }
        else
            title.style.border = ''
        if (selectedCategory == -1) {
            alert('You have not selected a category!')
            category.style.border = "2px solid red"
            return;
        }
        else
            category.style.border = ''
        try {
            await axios.post('http://localhost:4000/addTask', { taskData, selectedCategory, user })
                .fetchTasks(() => {
                    alert('Task addition completed.');
                });
        } catch (error) {
            console.log("Error with adding a task: ", error)
        }
        try {
            await fetchTasks();
            alert('Task addition completed.');
        } catch (error) {
            console.log("Error fetching tasks: ", error);
        }
        return 0;
    }

    return (

        <div className='home_container'>

            <h1>Witaj, {user && user.username}!</h1>
            <div className='tasks'>
                <h2>Tasks:</h2>
                {tasks.length > 0 ? (tasks.map((task, index) => (
                    <Task
                        key={task.taskid}
                        title={task.title}
                        category={task.categoriesid}
                        description={task.description}
                        date={task.datecreate}
                        taskId={task.taskid}
                        fetchTasks={fetchTasks}
                    />
                ))) : (
                    <p>No tasks.</p>
                )}
            </div>
            <div className='create_task'>
                <input
                    className='title'
                    type='text'
                    name='title'
                    value={taskData.title}
                    onChange={handleTaskInputChange}
                    placeholder='Title' />
                <input
                    className='description'
                    type='text'
                    name='description'
                    value={taskData.description}
                    onChange={handleTaskInputChange}
                    placeholder='Description' />
                <select
                    id='category'
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value) }}
                >
                    <option value={-1} >Choose category</option>
                    {categories.map((category, index) => (
                        <option
                            key={index}
                            value={index}
                        >
                            {category.title}
                        </option>
                    ))}
                </select>

                <button onClick={handleAddTask} > <FontAwesomeIcon className='font' icon={faPlus} /></button>
            </div>
            <div className='file_container'>


                <div className='file_transfer'>
                    <input className='file' type='file' ></input>
                    <button /* onClick={} */> <FontAwesomeIcon className='font' icon={faPaperPlane} /></button>
                </div>
                <div className='pdf_container'>
                    <h2>Download your tasks</h2>
                    <select className="task_select">
                        <option value="PDF">PDF (For user view)</option>
                        <option value="TXT">TXT (Json file, to save your tasks)</option>
                    </select>
                    <button /* onClick={} */> <FontAwesomeIcon className='font' icon={faDownload} /></button>
                </div>
            </div>
            <div className='logout_container'>
                <button onClick={logout}>
                    <FontAwesomeIcon icon={faSignOut} className='font_icon' />
                </button>
            </div>
        </div>

    )
}
export default Home;