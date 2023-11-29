import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faSignOut, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';
import './home.css'

const Home = () => {
    const { logout } = useAuth();

    return (

        <div className='home_container'>


            <div className='tasks'>
                <h2>Tasks:</h2>
            </div>
            <div className='create_task'>
                <input className='title' type='text' placeholder='Title'></input>
                <input className='description' type='text' placeholder='Description'></input>
                <button onClick=''> <FontAwesomeIcon className='font' icon={faPlus} /></button>
            </div>
            <div className='file_container'>


                <div className='file_transfer'>
                    <input className='file' type='file' ></input>
                    <button onClick=''> <FontAwesomeIcon className='font' icon={faPaperPlane} /></button>
                </div>
                <div className='pdf_container'>
                    <h2>Download your tasks</h2>
                    <select class="task_select">
                        <option value="PDF">PDF (For user view)</option>
                        <option value="TXT">TXT (Json file, to save your tasks)</option>
                    </select>
                    <button onClick=''> <FontAwesomeIcon className='font' icon={faDownload} /></button>
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