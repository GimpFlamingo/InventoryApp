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
    var enterPartSection = document.getElementById('id-finder')
    var displayPartSection = document.getElementById('display-part')
    var vals = []
    searchButton.onclick = function () {
        // Add functionality that if part is not in database it shows error that part-id or part 
        // name is invalid. Make sure modal is hidden after a valid id/name is entered

        // If a valid input is given hide the modal and display the query results
        if (partID.value === "") {
            window.alert("Please enter a valid PartID")
        } else {
            var sql = 'SELECT * FROM public.inventory WHERE item_id = \'' + partID.value + '\';'
            client.query(sql, (err, res) => {
                console.log(err, res)
                if (err !== null) {
                    window.alert("Invalid Part ID")
                } else {
                    if (res.rows.length === 0) {
                        window.alert("This Part does not exist")
                    } else {
                        var partElement = document.querySelector('#part')
                        var temp = ''

                        temp += '<table class="table-responsive table-bordered" id="table">'
                        temp += '<thead>'
                        temp += '<tr>'
                        temp += '<th scope ="col" style="padding: 12px;">Part ID</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Vend ID</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Company Price</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Item Description</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Quantity in Stock</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Date Added/th>'
                        temp += '<th scope ="col" style="padding: 12px;">Date Last Updated</th>'
                        temp += '</tr>'
                        temp += '</thead>'
                        temp += '<tbody>'
                        temp += '<tr>'
                        temp += '<th scope="row">' + res.rows[0].item_id + '</th>'
                        temp += '<td>' + res.rows[0].vend_id + '</td>'
                        temp += '<td>' + res.rows[0].item_price + '</td>'
                        temp += '<td>' + res.rows[0].item_desc + '</td>'
                        temp += '<td>' + res.rows[0].item_quantity + '</td>'
                        temp += '<td>' + res.rows[0].date_added + '</td>'
                        temp += '<td>' + res.rows[0].last_update + '</td>'
                        temp += '</tr>'
                        temp += '</tbody>'
                        temp += '</table>'
                        partElement.innerHTML = temp
                        enterPartSection.style.display = 'none'
                        displayPartSection.style.display = 'block'
                    }
                }
            })
        }
    }
    // Add button to allow the user to edit the information

    // Add button to allow the user to save the information to the databse

    // Add button to allow the user to exit out of editing without saving to databse

    // Add button to repoen modal and query another part


    window.onbeforeunload = function () {
        client.end()
    }
}

