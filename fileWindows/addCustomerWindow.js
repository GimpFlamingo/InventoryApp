const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
window.onload = function () {
    const addButton = document.getElementById('add-customer')

    const client = new Client(connectionString)

    client.connect()

    addButton.onclick = function () {
        // Add functionality that if there is an error it doesn't clear the form
        var custId = document.getElementById('customerIdInput')
        var custName = document.getElementById('customerNameInput')
        var custAddress = document.getElementById('customerAddressInput')
        var custCity = document.getElementById('customerCityInput')
        var custState = document.getElementById('customerStateInput')
        var custZip = document.getElementById('customerZipInput')
        var custCountry = document.getElementById('customerCountryInput')
        var custPhone = document.getElementById('customerPhoneInput')
        var custEmail = document.getElementById('customerEmailInput')

        if (cust_id.value === "" || cust_name.value === "" || cust_address.value === "" || cust_city.value === "" || cust_zip.value === "" || cust_email.value === "") {
            window.alert("The following fields must be filled: Customer ID, Customer Name, Customer Address, Customer City, Customer ZIP code, Customer E-mail.")
        } else {
            var values = [custId.value, custName.value, custAddress.value, custCity.value, custState.value, custZip.value, custCountry.value, custPhone.value, custEmail.value]
            client.query('INSERT INTO public.customers (cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_phone, cust_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);', values, (err, res) => {
                console.log(err, res)
                if (err !== null) {
                    window.alert("Invalid input. Make sure the fields are filled in correctly.")
                } else {
                    document.location.reload()
                }
            })
            document.location.reload()
        }
    }
    window.onbeforeunload = function () {
        client.end()
    }
}