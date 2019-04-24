const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
window.onload = function () {
    const addButton = document.getElementById('add-part')

    const client = new Client(connectionString)

    client.connect()

    addButton.onclick = function () {
        console.log('Click!')
        var partId = document.getElementById('prod-id')
        var vendId = document.getElementById('manufact-id')
        var price = document.getElementById('manufact-cost')
        var desc = document.getElementById('description')
        var quant = document.getElementById('quantity')
        var values = [partId.value, vendId.value, price.value, desc.value, quant.value]        
        client.query('INSERT INTO public.inventory (item_id, vend_id, item_price, item_desc, item_quantity) VALUES ($1, $2, $3, $4, $5);', values, (err, res) => {
            console.log(err, res)
            client.end()
        })

    }
}

