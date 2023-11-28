import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Home = () => {

    return (

        <div className='home_container'>


            <div className='tasks'>
                <h2>Tasks:</h2>
            </div>
            <div className='create_task'>
                <input className='title' type='text'></input>
                <input className='description' type='text'></input>
                <button onClick=''> <FontAwesomeIcon className='font' icon={faPaperPlane} /></button>
            </div>
            <div className=''>


                <div className='file_transfer'>
                    <input className='file' type='file'></input>
                    <button onClick=''> <FontAwesomeIcon className='font' icon={faPaperPlane} /></button>
                </div>
                <div className='pdf_container'>
                    <h2>Download your tasks</h2>
                        pdf for user /txt to save your task in json
                    <button onClick=''> <FontAwesomeIcon className='font' icon={faPaperPlane} /></button>
                </div>
            </div>



        </div>

    )

}
export default Home;