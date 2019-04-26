const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'

window.onload = function () {
    // User only has to enter one of the following variables to search the database
    // The Part ID will hold priority over the part name
    const searchButton = document.getElementById('search-part')
    const editItemButton = document.getElementById('edit-part')
    const savePart = document.getElementById('save-part')
    const cancel = document.getElementById('cancel')

    const client = new Client(connectionString)

    client.connect()

    var partID = document.getElementById('part-id')
    var enterPartSection = document.getElementById('id-finder')
    var displayPartSection = document.getElementById('display-part')
    var editPartSection = document.getElementById('edit-part-menu')
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
                        let temp = ''
                        // Make sure to try and reformate the date from the database to be YYYY/MM/DD
                        vals = [res.rows[0].item_id, res.rows[0].vend_id, res.rows[0].item_price, res.rows[0].item_desc, res.rows[0].item_quantity, res.rows[0].date_added, res.rows[0].last_update]
                        
                        temp += '<table class="table-responsive table-bordered" id="table">'
                        temp += '<thead>'
                        temp += '<tr>'
                        temp += '<th scope ="col" style="padding: 12px;">Part ID</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Vend ID</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Company Price</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Item Description</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Quantity in Stock</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Date Added</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Date Last Updated</th>'
                        temp += '</tr>'
                        temp += '</thead>'
                        temp += '<tbody>'
                        temp += '<tr>'
                        temp += '<th scope="row">' + vals[0] + '</th>'
                        temp += '<td>' + vals[1] + '</td>'
                        temp += '<td>' + vals[2] + '</td>'
                        temp += '<td>' + vals[3] + '</td>'
                        temp += '<td>' + vals[4] + '</td>'
                        temp += '<td>' + vals[5] + '</td>'
                        temp += '<td>' + vals[6] + '</td>'
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

    // Allows the user to edit the information of a part in the database
    editItemButton.onclick = function () {
        var editElement = document.querySelector('#edit-menu')
        let temp = ''
        console.log('Click!')
        temp += '<table class="table-responsive table-bordered" id="table">'
        temp += '<thead>'
        temp += '<tr>'
        temp += '<th id="current-id" scope ="col" style="padding: 12px;">' + vals[0] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[1] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[2] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[3] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[4] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[5] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[6] + '</th>'
        temp += '</tr>'
        temp += '</thead>'
        temp += '<tbody>'
        temp += '<tr>'
        temp += '<th scope="row"><input type="text" class="form-control" id="new-id" placeholder="' + vals[0] + '"</th>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-id" placeholder="' + vals[1] + '"></td>'
        temp += '<td><input type="number" step="0.01" class="form-control"  id="new-price" placeholder="' + vals[2] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-desc" placeholder="' + vals[3] + '"></td>'
        temp += '<td><input type="number" step="1" class="form-control"  id="new-quan" placeholder="' + vals[4] + '"></td>'
        temp += '</tr>'
        temp += '</tbody>'
        temp += '</table>'

        editElement.innerHTML = temp
        displayPartSection.style.display = 'none'
        editPartSection.style.display = 'block'
    }

    // Saves the user's changes to the database
    savePart.onclick = function () {
        // Get the user's input. If the user doesn't change the field make sure to leave the current values in there
        let oldId = docuemnt.getElementById('current-id')
        let newPartId = document.getElementById('new-id')
        let newVend = document.getElementById('new-vend-id')
        let newPrice = document.getElementById('new-price')
        let newDesc = document.getElementById('new-desc')
        let newQuan = document.getElementById('new-quan')

        // This is the general sql statement if all fields are filled. Need to write it so that unfilled fields are allowed
        var sql = 'UPDATE public.inventory SET item_id = \'' + newPartId + '\', vend_id = \'' + newVend + '\', item_price = \'' + newPrice + '\', item_desc = \'' + newDesc + 
                '\', item_quantity = \'' + newQuan + '\', last_update = CURRENT_DATE WHERE item_id = \'' + oldId + '\';'
        // Query the database to update the values
        // On error use an alert to let the user know that they need to enter a valid item
    }
    // Reloads the document without saving the changes to the database
    cancel.onclick = function () {
        document.location.reload()
    }

    window.onbeforeunload = function () {
        client.end()
    }
}