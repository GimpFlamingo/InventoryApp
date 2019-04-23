var pg = require('pg')
var addButton = document.getElementById('add-part')

var client = new pg.Client({
    connectionString: 'postgresql://postgres:ridgeback@localhost:5432/InventoryApp'
})
client.connect()

addButton.onclick = function () {
    
    var partId = document.getElementById('prod-id')
    var vendId = document.getElementById('manufact-id')
    var price = document.getElementById('manufact-cost')
    var desc = document.getElementById('description')
    var quant = document.getElementById('quantity')
    if (err) throw err
    console.log('Connected!')
    var sql = 'INSERT INTO public."Inventory" (item_id, vend_id, item_price, item_desc, item_quantity, date_added, last_update) '
    sql += 'VALUES (' + partId.value + ', ' + vendId.value + ', ' + price.value + ', ' + desc.value + ', ' + quant.value + ', current_date, current_date);'
    client.query(sql, function (err, result) {
        console.log(err, result)
        res.end('success')
    })

}
