import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from '../api.js'
import './admin.css';

const Admin = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.post('/users');
            setUsers(response.data.rows);
        } catch (error) {
            console.log("Error with fetching users: ", error);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.post(`/deleteUser`, {userId});
            console.log(`User with ID ${userId} deleted.`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    return (
        <div className='admin_panel_container'>
            <h1>Admin Panel</h1>
            <h2>Users: </h2>
            {users.length > 0 ? (
                users.map((user) => (
                    <div className='user_info' key={user.userid}>
                        <h2>Username: {user.username}</h2>
                        <p>
                            E-mail: {user.email} <br />
                            Role: {user.role}
                        </p>
                        {user.role === "user" ? (
                            <button className='delete' onClick={() => handleDeleteUser(user.userid)}>
                                Delete
                            </button>
                        ) : null}
                    </div>
                ))
            ) : (
                <p>No users.</p>
            )}
        </div>
    );
};

export default Admin;
