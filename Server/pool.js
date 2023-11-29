const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://lrdzpnii:9ISkP_TIOJXPU6c8AKGEdLryZuS4W-ON@ella.db.elephantsql.com/lrdzpnii'
})

module.exports = pool;