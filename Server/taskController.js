const pool = require('./pool');

async function addTask(req, res) {
    const { taskData, selectedCategory, user } = req.body;

    const categoryId = parseInt(selectedCategory) + 1;
    pool.query(`
    INSERT INTO tasks (title, description, datecreate, userid, categoriesid)
    VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)
  `, [taskData.title, taskData.description, user.userid, categoryId], (error, results) => {
        if (error) {
            console.error('Error with inserting task:', error);
        } else {
            console.log('Task addition completed.');
            res.status(200).json("Task addition completed");
        }
    });
}

async function getCategories(req, res) {
    const categories = await pool.query('SELECT title FROM categories')
    res.status(200).json(categories);
}
async function getTasks(req, res) {
    const { user } = req.body;
    const tasks = await pool.query('SELECT * FROM tasks WHERE userid = $1', [user.userid])
    res.status(200).json(tasks);
}
async function deleteTask(req, res) {
    const { taskId } = req.body;
    await pool.query('DELETE FROM tasks WHERE taskid = $1', [taskId])
    await getTasks(req, res);
}

async function changeTask(req, res) {
    const { taskId, taskData } = req.body;
    await pool.query(`UPDATE tasks SET title = $1,
     description = $2
    WHERE taskId = $3; `, [taskData.title, taskData.description, taskId])
    res.status(200).json("Task update completed")

}
module.exports = {
    addTask,
    getCategories,
    getTasks,
    deleteTask,
    changeTask,


}