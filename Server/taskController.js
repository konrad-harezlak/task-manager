const pool = require('./pool');

async function addTask(req, res) {
    const { taskData, selectedCategory, user } = req.body;

    pool.query(`
    INSERT INTO tasks (title, description, datecreate, userid, categoriesid)
    VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)
  `, [taskData.title, taskData.description, user.userid, selectedCategory+1], (error, results) => {
        if (error) {
            console.error('Error with inserting task:', error);
        } else {
            console.log('Task addition completed.');
        }
    });
}

async function getCategories(req, res) {
    const categories = await pool.query('SELECT title FROM categories')
    res.status(200).json(categories);
}

module.exports = {
    addTask,
    getCategories,
}