/**
 * Takes the text entered in the addWindow.html form and adds
 * them to the relevant coloumn of the Postgres database.
 */
var partId = document.getElementById('prod-id')
var vendId = document.getElementById('manufact-id')
var price = document.getElementById('manufact-cost')
var desc = document.getElementById('description')
var quant = document.getElementById('quantity')

var values = [req.query.partId, req.query.vendId, req.query.price, req.query.desc, req.query.quant, req.query.dateAdded, req.query.dateUpdated]

add.onClick() = function() {
    console.log('click')
    client.query('INSERT INTO Inventory (item_id, vend_id, item_price, item_desc, item_quantity, date_added, last_update) VALUES($1, $2, $3, $4, $5, $6, $7);',
    values, function (err, result) {
        console.log(err, result)
        res.end('success')
    db.connect(function (req, res) {
        var partId = document.getElementById('prod-id')
        var vendId = document.getElementById('manufact-id')
        if (err) throw err
        console.log('Connected!')
        var sql = 'INSERT INTO Inventory (item_id, vend_id, item_price, item_desc, item_quantity, date_added, last_update) '
        sql += 'VALUES (' + partId + ', ' + vendId + ', ' + price + ', ' + desc + ', ' + quant + ', '
        sql += new Date(year) + '-' + new Date(month) + '-' + new Date(day) + ');'
        db.query(sql, function (err, result) {
            console.log(err, result)
            res.end('success')
        })
    })
}
