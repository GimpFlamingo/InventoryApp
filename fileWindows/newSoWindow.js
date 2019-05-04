const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
const client = new Client(connectionString)

window.onload = function () {

    client.connect()

    const modal = document.getElementById("id-finder")
    const partListSection = document.getElementById("part-adder")
    const partList = document.getElementById("part-list")
    const createButton = document.getElementById("create-order")
    const addPart = document.getElementById("add-part")
    const costDisplay = document.getElementById("total-cost")
    var custId
    var totalCost = 0
    var temp = ''

    createButton.onclick = () => {
        custId = document.getElementById("cust-id")

        client.query('SELECT cust_id FROM public.customers WHERE cust_id=\'' + custId.value + '\';', (err, res) => {
            console.log(err, res)
            if (res.rows[0].length === 0) {
                console.log(err)
                window.alert("This customer does not exist.")
            } else {
                modal.style.display = 'none'
                partListSection.style.display = 'block'
            }
        })
    }

    addPart.onclick = () => {
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
                temp += '<li class="list-group-item">' + addPart.value + '</li>'
                // Increase total cost to make 
                totalCost = Number(totalCost) + Number(res.rows[0].item_price) * Number(enteredNum.value)
                // Display part to list
                partList.innerHTML = temp
                costDisplay.innerHTML = '$' + totalCost.toFixed(2)
            }
        })
    }

    // Add section that display in review area that shows the user what parts need to be ordered to complete the order as created
}

window.onbeforeunload = () => {
    client.end()
}