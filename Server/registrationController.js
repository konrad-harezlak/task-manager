const bcrypt = require('bcrypt');
const pool = require('./pool');
const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const emailExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Użytkownik o podanym emailu już istnieje.' });
        }
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [userName]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Użytkownik o podanej nazwie uzytkownika już istnieje.' });
        }

 
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [userName, email, hashedPassword]
        );

        res.redirect('/');
    } catch (error) {
        console.error('Błąd rejestracji', error);
        res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
    }
};
module.exports = {
    registerUser
};