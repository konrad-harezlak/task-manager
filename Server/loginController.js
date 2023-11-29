const bcrypt = require('bcrypt');
const pool = require('./pool');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE username = $1', [userName]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Nieprawidłowy email lub hasło.' });
        }


        const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Nieprawidłowy email lub hasło.' });
        }


        const token = jwt.sign({ user: user.rows[0] }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('authToken', token);
        res.status(200).json({user,token})

    } catch (error) {
        console.error('Błąd logowania', error);
        res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
    }
};

module.exports = {
    loginUser
}