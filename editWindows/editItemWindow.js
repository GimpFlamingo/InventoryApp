const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'

window.onload = function () {
    // User only has to enter one of the following variables to search the database
    // The Part ID will hold priority over the part name
    const searchButton = document.getElementById('search-part')

    const client = new Client(connectionString)

    client.connect()

    var partID = document.getElementById('part-id')
    var partName = document.getElementById('part-name')
    var modal = document.getElementById('id-finder')
    var display = document.getElementById('display-part')

    searchButton.onclick = function () {
        // Add functionality that if part is not in database it shows error that part-id or part 
        // name is invalid. Make sure modal is hidden after a valid id/name is entered

        // If a valid input is given hide the modal and display the querry results
        if (partID.value === "") {
            window.alert("Please enter a valid PartID")
        } else {
            var partElement = document.querySelector('#part')
            var sql = 'SELECT * FROM public.inventory WHERE item_id = ' + partID.value + ';'
            var values = []
            client.query(sql, (err, res) => {
                
            })
        }

    }
}