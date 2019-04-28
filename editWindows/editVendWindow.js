const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'

window.onload = function () {
    // User only has to enter one of the following variables to search the database
    // The Part ID will hold priority over the part name
    const searchButton = document.getElementById('search-vend')
    const editItemButton = document.getElementById('edit-vend')
    const save = document.getElementById('save-vend')
    const cancel = document.getElementById('cancel')

    const client = new Client(connectionString)

    client.connect()

    var vendId = document.getElementById('vend-id')
    var enterVendSection = document.getElementById('id-finder')
    var displayVendSection = document.getElementById('display-vend')
    var editVendSection = document.getElementById('edit-vend-menu')
    var vals = []

    searchButton.onclick = function () {
        // Add functionality that if part is not in database it shows error that part-id or part 
        // name is invalid. Make sure modal is hidden after a valid id/name is entered

        // If a valid input is given hide the modal and display the query results
        if (vendId.value === "") {
            window.alert("Please enter a valid Vendor ID")
        } else {
            var sql = 'SELECT * FROM public.vendors WHERE vend_id = \'' + vendId.value + '\';'
            client.query(sql, (err, res) => {
                console.log(err, res)
                if (err !== null) {
                    window.alert("Invalid Vendor ID")
                } else {
                    if (res.rows.length === 0) {
                        window.alert("This Vendor does not exist")
                    } else {
                        var vendElement = document.querySelector('#vend')
                        let temp = ''
                        // Make sure to try and reformate the date from the database to be YYYY/MM/DD                    

                        vals = [res.rows[0].vend_id, res.rows[0].vend_name, res.rows[0].vend_address, res.rows[0].vend_city, res.rows[0].vend_state, res.rows[0].vend_zip, res.rows[0].vend_country, res.rows[0].vend_phone, res.rows[0].vend_email]

                        temp += '<table class="table-responsive table-bordered m-1" id="table">'
                        temp += '<thead>'
                        temp += '<tr>'
                        temp += '<th scope ="col" style="padding: 12px;">Vendor ID</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Vendor Name</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Vendor Address ID</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Vendor City</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Vendor State</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Vendor ZIP</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Vendor Country</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Vendor Phone</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Vendor E-mail</th>'
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
                        temp += '<td>' + vals[7] + '</td>'
                        temp += '<td>' + vals[8] + '</td>'
                        temp += '</tr>'
                        temp += '</tbody>'
                        temp += '</table>'

                        vendElement.innerHTML = temp
                        enterVendSection.style.display = 'none'
                        displayVendSection.style.display = 'block'
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
        temp += '<table class="table-responsive table-bordered m-1" id="table">'
        temp += '<thead>'
        temp += '<tr>'
        temp += '<th id="current-id" scope ="col" style="padding: 12px;">' + vals[0] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[1] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[2] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[3] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[4] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[5] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[6] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[7] + '</th>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[8] + '</th>'
        temp += '</tr>'
        temp += '</thead>'
        temp += '<tbody>'
        temp += '<tr>'
        temp += '<th scope ="col" style="padding: 12px;">' + vals[0] + '</th>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-name" placeholder="' + vals[1] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-address" placeholder="' + vals[2] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-city" placeholder="' + vals[3] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-state" placeholder="' + vals[4] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-zip" placeholder="' + vals[5] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-country" placeholder="' + vals[6] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-phone" placeholder="' + vals[7] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-vend-email" placeholder="' + vals[8] + '"></td>'
        temp += '</tr>'
        temp += '</tbody>'
        temp += '</table>'

        editElement.innerHTML = temp
        displayVendSection.style.display = 'none'
        editVendSection.style.display = 'block'

    }

    // Saves the user's changes to the database
    save.onclick = function () {
        // Get the user's input. If the user doesn't change the field make sure to leave the current values in there
        var newVendName = document.getElementById('new-vend-name')
        var newVendAddress = document.getElementById('new-vend-address')
        var newVendCity = document.getElementById('new-vend-city')
        var newVendZip = document.getElementById('new-vend-zip')
        var newVendCountry = document.getElementById('new-vend-country')
        var newVendPhone = document.getElementById('new-vend-phone')
        var newVendEmail = document.getElementById('new-vend-email')
        var newVals = [vals[0], newVendName.value, newVendAddress.value, newVendCity.value, newVendCity.value, newVendZip.value, newVendCountry.value, newVendPhone.value, newVendEmail.value]
        var prior = false;

        var sql = 'UPDATE public.vendors SET '

        if (newVals[1] !== "") {
            sql += 'vend_name = \'' + newVals[1] + '\''
            prior = true
        }
        if (newVals[2] !== "") {
            if (prior) {
                sql += ', vend_address = \'' + newVals[2] + '\''
            } else {
                sql += 'vend_address = \'' + newVals[2] + '\''
            }
            prior = true
        }
        if (newVals[3] !== "") {
            if (prior) {
                sql += ', vend_city = \'' + newVals[3] + '\''
            } else {
                sql += 'vend_city = \'' + newVals[3] + '\','
            }
            prior = true
        }
        if (newVals[4] !== "") {
            if (prior) {
                sql += ', vend_state = \'' + newVals[4] + '\''
            } else {
                sql += 'vend_state = \'' + newVals[4] + '\''
            }
            prior = true
        }
        if (newVals[5] !== "") {
            if (prior) {
                sql += ', vend_zip = \'' + newVals[5] + '\''
            } else {
                sql += 'vend_zip = \'' + newVals[5] + '\''
            }
            prior = true
        }
        if (newVals[6] !== "") {
            if (prior) {
                sql += ', vend_country = \'' + newVals[6] + '\''
            } else {
                sql += 'vend_country = \'' + newVals[6] + '\''
            }
            prior = true
        }
        if (newVals[7] !== "") {
            if (prior) {
                sql += ', vend_phone = \'' + newVals[7] + '\''
            } else {
                sql += 'vend_phone = \'' + newVals[7] + '\''
            }
            prior = true
        }
        if (newVals[8] !== "") {
            if (prior) {
                sql += ', vend_email = \'' + newVals[8] + '\''
            } else {
                sql += 'vend_email = \'' + newVals[8] + '\''
            }
        }
        sql += ' WHERE vend_id = \'' + newVals[0] + '\';'
        console.log(sql)
        // Query the database to update the values
        client.query(sql, (err, res) => {
            console.log(err, res)
            // On error use an alert to let the user know that they need to enter a valid item
            if (err === null) {
                window.alert('Your changes have been saved!')
                document.location.reload()
            } else {
                window.alert('There was an error updating the vendor information.')
            }
        })
    }
    // Reloads the document without saving the changes to the database
    cancel.onclick = function () {
        document.location.reload()
    }

    window.onbeforeunload = function () {
        client.end()
    }
}