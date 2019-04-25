const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
window.onload = function () {
    const addButton = document.getElementById('add-customer')

    const client = new Client(connectionString)

    client.connect()

    addButton.onclick = function () {
        // Add functionality that if there is an error it doesn't clear the form
        console.log('Click!')
        var custId = document.getElementById('customerIdInput')
        var custName = document.getElementById('customerNameInput')
        var custAddress = document.getElementById('customerAddressInput')
        var custCity = document.getElementById('customerCityInput')
        var custState = document.getElementById('customerStateInput')
        var custZip = document.getElementById('customerZipInput')
        var custCountry = document.getElementById('customerCountryInput')
        var custPhone = document.getElementById('customerPhoneInput')
        var custEmail = document.getElementById('customerEmailInput')

        var values = [custId.value, custName.value, custAddress.value, custCity.value, custState.value, custZip.value, custCountry.value, custPhone.value, custEmail.value]        
        client.query('INSERT INTO public.customers (cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_phone, cust_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);', values, (err, res) => {
            console.log(err, res)
            client.end()
        })

    }
}