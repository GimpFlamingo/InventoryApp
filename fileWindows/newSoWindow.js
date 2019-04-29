const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'

window.onload = function () {

    const client = new Client(connectionString)

    client.connect()

    const modal = document.getElementById("id-finder")
    const partList = document.getElementById("part-adder")
    const createButton = document.getElementById("create-order")
    const addPart = document.getElementById("add-part")
    var custId
    var addedParts = []
    var totalCost = 0.00
    var temp = ''

    function addToList (itemPrice) {
        
        totalCost += itemPrice
        temp += addedParts + '<br>'
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
                partList.style.display = 'block'
            }
        })
    }

    addPart.onclick = () => {
        var addPart = docuemnt.getElementById("part-id")

        client.query('SELECT price FROM public.inventory WHERE part_id=\'' + addPart.value + '\';', (err, res) => {
            console.log(err, res)
            if (err !== null) {
                console.log(err)
                window.alert("Error adding part")
            } else if (res.rows[0].length === 0) {
                window.alert("This part is not in inventory")
            } else {
                addedParts[addedParts.length] = addPart.value
                addToList(res.rows[0].item_price)
            }
        })
    }
}