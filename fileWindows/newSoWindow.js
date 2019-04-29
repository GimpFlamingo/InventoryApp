const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'

window.onload = function () {

    const client = new Client(connectionString)

    client.connect()

    const modal = document.getElementById("id-finder")
    const partListSection = document.getElementById("part-adder")
    const partList = document.getElementById("part-list")
    const createButton = document.getElementById("create-order")
    const addPart = document.getElementById("add-part")
    const costDisplay = document.getElementById("total-cost")
    var custId
    var addedParts = []
    var totalCost = 0.00
    var temp = ''

    function addToList(itemPrice) {

        totalCost += itemPrice
        for (var i = 0; i < addedParts.length; i++) {
            temp += '<li class="list-group-item>' + addedParts[i].id + '</li>'
            console.log(addedParts[i].price)
            totalCost += addedParts[i].price
        }
        partList.innerHTML = temp
        // Displaying NaN
        costDisplay.innerHTML = '$' + totalCost
    }

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
        var addPart = document.getElementById("part-id")

        client.query('SELECT item_price FROM public.inventory WHERE item_id=\'' + addPart.value + '\';', (err, res) => {
            console.log(err, res)
            if (err !== null) {
                console.log(err)
                window.alert("Error adding part")
            } else if (res.rows[0].length === 0) {
                window.alert("This part is not in inventory")
            } else {
                addedParts.push({ 'id': addPart.value, price: Number(res.rows[0].item_price)})
                console.log(addedParts)
                addToList(res.rows[0].item_price)
            }
        })
    }
}