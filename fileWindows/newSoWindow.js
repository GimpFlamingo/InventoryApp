const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
const client = new Client(connectionString)

window.onload = function () {

    client.connect()

    // Buttons
    const createButton = document.getElementById('create-order')
    const addPartButton = document.getElementById('add-part')
    const finishAddingButton = document.getElementById('finish-adding')
    // Buttons

    // Displays
    const modal = document.getElementById('id-finder')
    const partListSection = document.getElementById('part-adder')
    const shipScreenSection = document.getElementById('ship-screen')
    // Displays

    const partList = document.getElementById('part-list')
    const totalCostDisplay = document.getElementById('total-cost')
    const totalItemDisplay = document.getElementById('total-items')
    const header = document.getElementById('header')
    const custHead = document.getElementById('customer-header')

    var itemTable = document.getElementById('item-table')
    var custId
    var totalCost = 0
    var totalItems = 0
    var items = []

    function deleteRow(btn) {
        row = btn.parentNode.parentNode.parentNode
        // Delete HTML table row
        row.parentNode.removeChild(row)
        var i = 0
        var found = false
        // Find index value of item
        while (i < items.length && !found) {
            if (items[i].itemId == row.firstChild.innerHTML) {
                found = true
            } else {
                i++
            }
        }
        if (found) {
            // Adjust global values
            totalCost -= items[i].totalCost
            totalItems -= items[i].amount
            // Write to HTML
            totalCostDisplay.innerHTML = '$' + totalCost.toFixed(2)
            totalItemDisplay.innerHTML = totalItems
            // Remove element
            items.splice(i, 1)
            console.log(items)
        } else {
            console.log('Something is wrong')
        }

    }



    // Button to create sales order
    createButton.onclick = () => {
        custId = document.getElementById("cust-id")

        client.query('SELECT cust_id, cust_name FROM public.customers WHERE cust_id=\'' + custId.value + '\';', (err, res) => {
            console.log(err, res)
            if (res.rows[0] == null) {
                console.log(err)
                window.alert("This customer does not exist.")
            } else {
                modal.style.display = 'none'
                partListSection.style.display = 'block'
                header.style.display = 'block'
                custHead.innerHTML = '<u>Shipping for ' + res.rows[0].cust_name + ' (' + res.rows[0].cust_id + ')</u>'
            }
        })
    }

    // Button to add part to the sales order
    addPartButton.onclick = () => {
        var found = false
        var enteredNum = document.getElementById('part-count')
        var addPart = document.getElementById('part-id')
        var x = 0
        // Check if part is already in the list
        while (x < items.length && !found) {
            if (items[x].itemId === addPart.value) {
                found = true
            }
            x++
        }
        if (!found) {
            // Add way to check what parts need to be ordered in the inventory based off what is currently in stock
            client.query('SELECT item_price FROM public.inventory WHERE item_id=\'' + addPart.value + '\';', (err, res) => {
                if (err !== null) {
                    console.log(err)
                    window.alert('Error adding part')
                } else if (res.rows[0] == null) {
                    window.alert('This part is not in inventory')
                } else {
                    // Add part to list
                    // Think about changing delete icon to a trash can icon
                    // Maybe add an edit icon to allow the user to edit the amount added instead of deleting and retyping
                    var temp = '<tr><th scope="row">' + addPart.value + '</th><td>' + enteredNum.value + '</td><td><button type="button" class="close" aria-label="Delete"><span class="delete" aria-hidden="true">&times;</span></button></td></tr>'
                    // Add entry to global parts list
                    var tempCost = Number(res.rows[0].item_price) * Number(enteredNum.value)
                    items.push({ 'string': temp, 'itemId': addPart.value, 'amount': Number(enteredNum.value), 'totalCost': tempCost })
                    // Add event listener to delete row if necessary
                    itemTable.addEventListener('click', function (e) {
                        if (e.target.className == 'delete') {
                            deleteRow(e.target)
                        }
                    }, false)
                    // Increase total cost and total items
                    totalCost += tempCost
                    totalItems += Number(enteredNum.value)
                    // Display part to list
                    var addedParts = ''
                    // Build addedParts by pulling the strings from the array of parts
                    for (var i = 0; i < items.length; i++) {
                        addedParts += items[i].string
                    }
                    // Build HTML
                    partList.innerHTML = addedParts
                    totalCostDisplay.innerHTML = '$' + totalCost.toFixed(2)
                    totalItemDisplay.innerHTML = totalItems
                    addPart.value = ''
                    enteredNum.value = ''
                }
            })
        } else {
            window.alert('This part is already in the list')
        }
    }

    // Button to finish adding parts to the sales order
    finishAddingButton.onclick = () => {
        var salesNum
        // Find the sale number
        client.query('SELECT COUNT(*) AS sales_num FROM orders', (err, res) => {
            console.log(err, res)
            salesNum = Number(res.rows[0].sales_num)
        })

        // Need to start a client.query that requires all parts of the order and order items to be entered
        // for the order to be saved to the database (commit queries). Need to add the order to the orders table
        // and the order_items table. Make sure all fields are filled in order to be added to database.

        // Reveal the shipping screen and hide part list screen
        partListSection.style.display = 'none'
        shipScreenSection.style.display = 'block'
    }

    // Add section that display in review area that shows the user what parts need to be ordered to complete the order as created

    itemTable.addEventListener('click', function (e) {
        if (e.target.className == 'close') {
            deleteRow(e)
        }
    }, false)
}

window.onbeforeunload = () => {
    client.end()
}