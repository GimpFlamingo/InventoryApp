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

    const modal = document.getElementById('id-finder')
    const partListSection = document.getElementById('part-adder')
    const partList = document.getElementById('part-list')
    const totalCostDisplay = document.getElementById('total-cost')
    const totalItemDisplay = document.getElementById('total-items')
    const header = document.getElementById('header')
    const custHead = document.getElementById('customer-header')
    var custId
    var totalCost = 0
    var totalItems = 0
    var temp = ''

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
        var enteredNum = document.getElementById('part-count')
        var addPart = document.getElementById("part-id")

        // Add way to check what parts need to be ordered in the inventory based off what is currently in stock
        client.query('SELECT item_price FROM public.inventory WHERE item_id=\'' + addPart.value + '\';', (err, res) => {
            if (err !== null) {
                console.log(err)
                window.alert("Error adding part")
            } else if (res.rows[0] == null) {
                window.alert("This part is not in inventory")
            } else {
                // Add part to list
                temp += '<tr><th scope="row">' + addPart.value + '</th><td>' + enteredNum.value + '</td></tr>'
                // Increase total cost and total items
                totalCost = Number(totalCost) + Number(res.rows[0].item_price) * Number(enteredNum.value)
                totalItems += Number(enteredNum.value)
                // Display part to list
                partList.innerHTML = temp
                totalCostDisplay.innerHTML = '$' + totalCost.toFixed(2)
                totalItemDisplay.innerHTML = totalItems
                addPart.value = ''
                enteredNum.value = ''
            }
        })
    }

    // Button to finish adding parts to the sales order
    finishAddingButton.onclick = () => {

    }

    // Add section that display in review area that shows the user what parts need to be ordered to complete the order as created
}

window.onbeforeunload = () => {
    client.end()
}