const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
const client = new Client(connectionString)

window.onload = function () {
    // User only has to enter one of the following variables to search the database
    // The Part ID will hold priority over the part name
    const searchButton = document.getElementById('search-cust')
    const editItemButton = document.getElementById('edit-cust')
    const save = document.getElementById('save-cust')
    const cancel = document.getElementById('cancel')


    client.connect()

    var custID = document.getElementById('cust-id')
    var enterCustSection = document.getElementById('id-finder')
    var displayCustSection = document.getElementById('display-cust')
    var editCustSection = document.getElementById('edit-cust-menu')
    var vals = []

    searchButton.onclick = function () {
        // Add functionality that if part is not in database it shows error that part-id or part 
        // name is invalid. Make sure modal is hidden after a valid id/name is entered

        // If a valid input is given hide the modal and display the query results
        if (custID.value === "") {
            window.alert("Please enter a valid Customer ID")
        } else {
            var sql = 'SELECT * FROM public.customers WHERE cust_id = \'' + custID.value + '\';'
            client.query(sql, (err, res) => {
                console.log(err, res)
                if (err !== null) {
                    window.alert("Invalid Customer ID")
                } else {
                    if (res.rows.length === 0) {
                        window.alert("This Customer does not exist")
                    } else {
                        var custElement = document.querySelector('#cust')
                        let temp = ''
                        // Make sure to try and reformate the date from the database to be YYYY/MM/DD                    

                        vals = [res.rows[0].cust_id, res.rows[0].cust_name, res.rows[0].cust_address, res.rows[0].cust_city, res.rows[0].cust_state, res.rows[0].cust_zip, res.rows[0].cust_country, res.rows[0].cust_phone, res.rows[0].cust_email]

                        temp += '<table class="table-responsive table-bordered m-1" id="table">'
                        temp += '<thead>'
                        temp += '<tr>'
                        temp += '<th scope ="col" style="padding: 12px;">Customer ID</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Customer Name</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Customer Address ID</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Customer City</th>'
                        temp += '<th scope ="col" style="padding: 12px;"">Customer State</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Customer ZIP</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Customer Country</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Customer Phone</th>'
                        temp += '<th scope ="col" style="padding: 12px;">Customer E-mail</th>'
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

                        custElement.innerHTML = temp
                        enterCustSection.style.display = 'none'
                        displayCustSection.style.display = 'block'
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
        temp += '<td><input type="text" class="form-control"  id="new-cust-name" placeholder="' + vals[1] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-cust-address" placeholder="' + vals[2] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-cust-city" placeholder="' + vals[3] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-cust-state" placeholder="' + vals[4] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-cust-zip" placeholder="' + vals[5] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-cust-country" placeholder="' + vals[6] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-cust-phone" placeholder="' + vals[7] + '"></td>'
        temp += '<td><input type="text" class="form-control"  id="new-cust-email" placeholder="' + vals[8] + '"></td>'
        temp += '</tr>'
        temp += '</tbody>'
        temp += '</table>'

        editElement.innerHTML = temp
        displayCustSection.style.display = 'none'
        editCustSection.style.display = 'block'

    }

    // Saves the user's changes to the database
    save.onclick = function () {
        // Get the user's input. If the user doesn't change the field make sure to leave the current values in there
        var newCustName = document.getElementById('new-cust-name')
        var newCustAddress = document.getElementById('new-cust-address')
        var newCustCity = document.getElementById('new-cust-city')
        var newCustZip = document.getElementById('new-cust-zip')
        var newCustCountry = document.getElementById('new-cust-country')
        var newCustPhone = document.getElementById('new-cust-phone')
        var newCustEmail = document.getElementById('new-cust-email')
        var newVals = [vals[0], newCustName.value, newCustAddress.value, newCustCity.value, newCustCity.value, newCustZip.value, newCustCountry.value, newCustPhone.value, newCustEmail.value]
        var prior = false;

        var sql = 'UPDATE public.customers SET '

        if (newVals[1] !== "") {
            sql += 'cust_name = \'' + newVals[1] + '\''
            prior = true
        }
        if (newVals[2] !== "") {
            if (prior) {
                sql += ', cust_address = \'' + newVals[2] + '\''
            } else {
                sql += 'cust_address = \'' + newVals[2] + '\''
            }
            prior = true
        }
        if (newVals[3] !== "") {
            if (prior) {
                sql += ', cust_city = \'' + newVals[3] + '\''
            } else {
                sql += 'cust_city = \'' + newVals[3] + '\','
            }
            prior = true
        }
        if (newVals[4] !== "") {
            if (prior) {
                sql += ', cust_state = \'' + newVals[4] + '\''
            } else {
                sql += 'cust_state = \'' + newVals[4] + '\''
            }
            prior = true
        }
        if (newVals[5] !== "") {
            if (prior) {
                sql += ', cust_zip = \'' + newVals[5] + '\''
            } else {
                sql += 'cust_zip = \'' + newVals[5] + '\''
            }
            prior = true
        }
        if (newVals[6] !== "") {
            if (prior) {
                sql += ', cust_country = \'' + newVals[6] + '\''
            } else {
                sql += 'cust_country = \'' + newVals[6] + '\''
            }
            prior = true
        }
        if (newVals[7] !== "") {
            if (prior) {
                sql += ', cust_phone = \'' + newVals[7] + '\''
            } else {
                sql += 'cust_phone = \'' + newVals[7] + '\''
            }
            prior = true
        }
        if (newVals[8] !== "") {
            if (prior) {
                sql += ', cust_email = \'' + newVals[8] + '\''
            } else {
                sql += 'cust_email = \'' + newVals[8] + '\''
            }
        }
        sql += ' WHERE cust_id = \'' + newVals[0] + '\';'
        console.log(sql)
        // Query the database to update the values
        client.query(sql, (err, res) => {
            console.log(err, res)
            // On error use an alert to let the user know that they need to enter a valid item
            if (err === null) {
                window.alert('Your changes have been saved!')
                document.location.reload()
            } else {
                window.alert('There was an error updating the customer information.')
            }
        })
    }
    // Reloads the document without saving the changes to the database
    cancel.onclick = function () {
        document.location.reload()
    }
}

window.onbeforeunload = function () {
    client.end()
}