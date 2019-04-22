/**
 * Takes the text entered in the addWindow.html form and adds
 * them to the relevant coloumn of the Postgres database.
 */
const pg = require('pg')
const add = document.querySelector('#add-part')
const connectionString = 'postgres://postgres:ridgeback@localhost:5432/InventoryApp'

var client = new pg.Client(connectionString)

client.connect()


var partId = document.getElementById('prod-id')
var vendId = document.getElementById('manufact-id')
var price = document.getElementById('manufact-cost')
var desc = document.getElementById('description')
var quant = document.getElementById('quantity')
var date = new Date(year, monthIndex[day])

var values = [req.query.partId, req.query.vendId, req.query.price, req.query.desc, req.query.quant, req.query.dateAdded, req.query.dateUpdated]

add.onClick() = function() {
    console.log('click')
    client.query('INSERT INTO Inventory (item_id, vend_id, item_price, item_desc, item_quantity, date_added, last_update) VALUES($1, $2, $3, $4, $5, $6, $7);',
    values, function (err, result) {
        console.log(err, result)
        res.end('success')
    })
}



