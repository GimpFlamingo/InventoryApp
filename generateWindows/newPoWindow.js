const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'

window.onload = function () {

    const client = new Client(connectionString)

    client.connect()
}