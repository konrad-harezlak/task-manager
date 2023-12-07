const pool = require('./pool');



async function getUsers(req, res) {

    const users = await pool.query(`SELECT * FROM users`)

    res.status(200).json(users);

}
async function deleteUser(req, res) {
    const { userId } = req.body;
    await pool.query(`DELETE FROM users WHERE userid = $1`, [userId]);
    await getUsers(req, res)
}

module.exports = {
    getUsers,
    deleteUser
}