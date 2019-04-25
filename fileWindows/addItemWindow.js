const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
window.onload = function () {
    const addButton = document.getElementById('add-part')

    const client = new Client(connectionString)

    client.connect()

    addButton.onclick = function () {
        // Add functionality that if there is an error it doesn't clear the form
        var partId = document.getElementById('partIdInput')
        var vendId = document.getElementById('vendorIdInput')
        var price = document.getElementById('manuCostInput')
        var desc = document.getElementById('itemDescInput')
        var quant = document.getElementById('quantityInput')
        var values = [partId.value, vendId.value, price.value, desc.value, quant.value]
        console.log(price.value)
        if (partId.value === "" || vendId.value === "" || desc.value === "" || price.value === null || quant.value === null) {
            window.alert("Please make sure all sections are filled.")
        } else {
            client.query('INSERT INTO public.inventory (item_id, vend_id, item_price, item_desc, item_quantity) VALUES ($1, $2, $3, $4, $5);', values, (err, res) => {
                console.log(err, res)
                if (err !== null) {
                    window.alert("Invalid input. Make sure the fields are filled in correctly.")
                } else {
                    document.location.reload()
                }
            })            
        }
    }
    window.onbeforeunload = function () {
        client.end()
    }
}


