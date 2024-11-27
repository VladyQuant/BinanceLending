const express = require('express')
const pg = require('pg')

const app = express()
const app_port = process.env.APP_PORT || 5000;
const db_port = process.env.DB_PORT || 5432;
const db_name = process.env.DB_NAME || "mr_market"
const user_balances_table_name = process.env.BALANCES_TABLE_NAME || "user_balances"
const user_strategies_table_name = process.env.STRATEGIES_TABLE_NAME || "user_strategies"

app.use(express.urlencoded({extended: true})); // New
app.use(express.json()); // New

// Listen on enviroment port or 5000
app.listen(app_port, () => console.log(`Listening on port ${app_port}`))

const pool  = new pg.Pool({
    idleTimeoutMillis: 100000, 
    connectionLimit : 10,
    user: 'vlady',
	password: '123',
	host: '127.0.0.1',
	port: `${db_port}`,
	database: db_name,
})


app.get('/user_balances', (req, res) => {
    pool.connect((err, connection, done) => {
        if(err) throw err
        connection.query(`SELECT * FROM ${user_balances_table_name}`, (err, res_) => {
            if (!err) {
                res.send(res_.rows)
            } else {
                console.log(err)
            }

            console.log(`The data from ${user_balances_table_name} table are: \n`, res_.rows)
        })
        done()
    })
})

app.get('/user_balances/:username&:coin', (req, res) => {
    pool.connect((err, connection, done) => {
        if(err) throw err
        connection.query(`SELECT amount FROM user_balances WHERE username = '${req.params.username}' AND coin = '${req.params.coin}'`, 
            (err, res_) => {
            if (!err) {
                res.send(res_.rows.map((x) => x['amount']))
            } else {
                console.log(err)
            }

            console.log(`The data from ${user_balances_table_name} table are: \n`, res_.rows)
        })
        done()
    })
})

app.post('/user_balances', (req, res) => {
    pool.connect((err, connection, done) => {
        if(err) throw err
        const params = req.body
        const query = `INSERT INTO user_balances (username, coin, amount) VALUES ('${params.username}', '${params.coin}', '${params.amount}')`
        const msg = `User with username ${params.username}, coin ${params.coin}, amount ${params.amount} has been added`
        connection.query( query, 
            (err, _) => {
            if (!err) {
                res.send(msg)
            } else {
                console.log(err)
            }
        })
        done()
    })
})

app.put('/user_balances', (req, res) => {
    pool.connect((err, connection, done) => {
        if(err) throw err
        const params = req.body
        const query = `UPDATE user_balances SET amount = '${params.amount}' WHERE username = '${params.username}' AND coin = '${params.coin}'`
        const msg = `Amount ${params.amount} has been assigned to username ${params.username}, coin ${params.coin}`
        connection.query( query, 
            (err, _) => {
            if (!err) {
                res.send(msg)
            } else {
                console.log(err)
            }
        })
        done()
    })
})

app.get('/user_strategies', (req, res) => {
    pool.connect((err, connection, done) => {
        if(err) throw err
        connection.query(`SELECT * FROM ${user_strategies_table_name}`, (err, res_) => {
            if (!err) {
                res.send(res_.rows)
            } else {
                console.log(err)
            }

            console.log(`The data from ${user_strategies_table_name} table are: \n`, res_.rows)
        })
        done()
    })
})

app.get('/user_strategies/:username&:strategy&:coin', (req, res) => {
    pool.connect((err, connection, done) => {
        if(err) throw err
        connection.query(`SELECT amount FROM ${user_strategies_table_name} WHERE username = '${req.params.username}' AND strategy = '${req.params.strategy}' AND coin = '${req.params.coin}'`, 
            (err, res_) => {
            if (!err) {
                res.send(res_.rows.map((x) => x['amount']))
            } else {
                console.log(err)
            }

            console.log(`The data from ${user_strategies_table_name} table are: \n`, res_.rows)
        })
        done()
    })
})

app.post('/user_strategies', (req, res) => {
    pool.connect((err, connection, done) => {
        if(err) throw err
        const params = req.body
        const query = `INSERT INTO user_strategies (username, strategy, coin, amount) VALUES ('${params.username}', '${params.strategy}', '${params.coin}', '${params.amount}')`
        const msg = `Strategy with username ${params.username}, coin ${params.coin}, strategy ${params.strategy}, amount ${params.amount} has been added`
        connection.query( query, 
            (err, _) => {
            if (!err) {
                res.send(msg)
            } else {
                console.log(err)
            }
        })
        done()
    })
})

app.put('/user_strategies', (req, res) => {
    pool.connect((err, connection, done) => {
        if(err) throw err
        const params = req.body
        const query = `UPDATE user_strategies SET amount = '${params.amount}' WHERE username = '${params.username}' AND strategy = '${params.strategy}' AND coin = '${params.coin}'`
        const msg = `Amount ${params.amount} has been assigned to username ${params.username}, strategy ${params.strategy}, coin ${params.coin}`
        connection.query( query, 
            (err, _) => {
            if (!err) {
                res.send(msg)
            } else {
                console.log(err)
            }
        })
        done()
    })
})