const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
const client = new Client(connectionString)

window.onload = function () {

    client.connect()

    // Buttons
    const createButton = document.getElementById('create-order')
    const addPartButton = document.getElementById('add-part')
    const finishAddingButton = document.getElementById('finish-adding')
    const finishShippingButton = document.getElementById('finish-shipping')
    const finishReview = document.getElementById('finish-review')
    // Buttons

    // Displays
    const modal = document.getElementById('id-finder')
    const partListSection = document.getElementById('part-adder')
    const shipScreenSection = document.getElementById('ship-screen')
    const review = document.getElementById('order-review')
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
    var shippingInfo = []
    var salesNum
    var jobName

    function deleteRow(btn) {
        row = btn.parentNode.parentNode.parentNode
        // Delete HTML table row
        row.parentNode.removeChild(row)
        var i = 0
        var inList = false
        // Find index value of item
        while (i < items.length && !inList) {
            if (items[i].itemId == row.firstChild.innerHTML) {
                inList = true
            } else {
                i++
            }
        }
        if (inList) {
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
        custId = document.getElementById("cust-id").value

        client.query('SELECT cust_id, cust_name FROM public.customers WHERE cust_id=\'' + custId + '\';', (err, res) => {
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
        jobName = custId
    }

    // Button to add part to the sales order
    addPartButton.onclick = () => {
        var inList = false
        var enteredNum = document.getElementById('part-count')
        var addPart = document.getElementById('part-id')
        var x = 0
        // Check if part is already in the list
        while (x < items.length && !inList) {
            if (items[x].itemId === addPart.value) {
                inList = true
            }
            x++
        }
        if (!inList && enteredNum.value > 0) {
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
                    var temp = '<tr><th scope="row">' + addPart.value + '</th><td>' + enteredNum.value + '</td>'
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
                    var addedParts = ''
                    // Build addedParts by pulling the strings from the array of parts
                    for (var i = 0; i < items.length; i++) {
                        addedParts += items[i].string + '<td><button type="button" class="close" aria-label="Delete"><span class="delete" aria-hidden="true">&times;</span></button></td></tr>'
                    }
                    // Build HTML
                    partList.innerHTML = addedParts
                    totalCostDisplay.innerHTML = '$' + totalCost.toFixed(2)
                    totalItemDisplay.innerHTML = totalItems
                    addPart.value = ''
                    enteredNum.value = ''
                }
            })
        } else if (enteredNum.value === 0) {
            window.alert('0 is an invalid item amount.')
        } else if (enteredNum.value == null) {
            window.alert('You must enter an item amount.')  
        } else {
            window.alert('This part is already in the list.')
        }
    }

    // Button to finish adding parts to the sales order
    finishAddingButton.onclick = () => {
        // Find the sale number
        client.query('SELECT COUNT(*) AS sales_num FROM orders', (err, res) => {
            console.log(err, res)
            salesNum = Number(res.rows[0].sales_num)
        })

        // Reveal the shipping screen and hide part list screen
        partListSection.style.display = 'none'
        shipScreenSection.style.display = 'block'
    }

    finishShippingButton.onclick = () => {
        var partReview = document.getElementById('part-review')
        var shippingReview = document.getElementById('shipping-review')
        var totalReview = document.getElementById('total-review')
        var finalList = ''
        shippingInfo = {
            'poNum': document.getElementById('po-number').value,
            'shipVia': document.getElementById('ship-via').value,
            'shipAddress': document.getElementById('ship-to-address').value,
            'shipCity': document.getElementById('ship-to-city').value,
            'shipZip': document.getElementById('ship-zip').value,
            'shipState': document.getElementById('ship-state').value
        }
        // TODO: Check to make sure the entered shipping information is valid with the customers information
        // Build final part list
        for (var i = 0; i < items.length; i++) {
            finalList += items[i].string
        }
        // Build table containing the shipping information
        var shippingTable = '<tr><th scope="row">PO Number</th><td>' + shippingInfo.poNum + '</td></tr>'
        shippingTable += '<tr><th scope="row">Sales Order Number</th><td>' + salesNum + '</td></tr>'
        shippingTable += '<tr><th scope="row">Shipping Via</th><td>' + shippingInfo.shipVia + '</td></tr>'
        shippingTable += '<tr><th scope="row">Shipping Address</th><td>' + shippingInfo.shipAddress + ' ' + shippingInfo.shipCity + ', ' + shippingInfo.shipState + ' ' + shippingInfo.shipZip + '</td></tr>'
        // Build total information
        var totals = '<tr><td scope="row">' + totalItems + '</td><td>' + totalCost + '</td></tr>'
        // Build HTML
        partReview.innerHTML = finalList
        shippingReview.innerHTML = shippingTable
        totalReview.innerHTML = totals
        // Hide ship screen and show review page
        shipScreenSection.style.display = 'none'
        review.style.display = 'block'
    }

    finishReview.onclick = () => {
        var proceed = window.confirm('Press ok if all the details are correct.')
        if (proceed) {
            // Add information to orders table
            var orderLog = [salesNum, shippingInfo.poNum, custId, totalCost, totalCost, jobName]
            var orderSql = 'INSERT INTO public.orders' + 
                '(sales_order_num, purchase_order_num, cust_id, quoted_price, sale_price, job_name) ' + 
                'VALUES ($1, $2, $3, $4, $5, $6);'
            
            client.query(orderSql, orderLog, (err, res) => {
                console.log(err, res)
            })
            // Add information to order_items table
            for (var i = 0; i < items.length; i++) {
                var itemsSql = 'INSERT INTO public.order_items(' +
                'sales_order_num, item_amount, part_id, total_price, multiplier_price)' + 
                'VALUES ($1, $2, $3, $4, $5);'
                var itemsLog = [salesNum, items[i].amount, items[i].itemId, items[i].totalCost, items[i].totalCost * 1.5]
                client.query(itemsSql, itemsLog, (err, res) => {
                    console.log(err, res)
                })
            }
            var shippingSql = 'INSERT INTO public.shipping' +
                '(sales_order_num, purchase_order_num, ship_via, ship_to_address, ship_to_city, ship_to_zip, ship_to_state, cust_id)' +
                'VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
            var shippingLog = [salesNum, shippingInfo.poNum, shippingInfo.shipVia, shippingInfo.shipAddress, shippingInfo.shipCity, shippingInfo.shipZip, shippingInfo.shipState, custId]
            // Add information to shipping tool
            client.query(shippingSql, shippingLog, (err, res) => {
                console.log(err, res)
            })
            
            window.alert('The order has been submited!')
            //document.location.reload()
        }
    }
}

window.onunload = () => {
    client.end()
}