const { Client } = require('pg')
const connectionString = 'postgresql://postgres:ridgeback@localhost:5432/inventoryapp'
const client = new Client(connectionString)

window.onload = function () {
    const addButton = document.getElementById('add-vend')

    client.connect()

    addButton.onclick = function () {
        // Add functionality that if there is an error it doesn't clear the form
        var vendId = document.getElementById('vendIdInput')
        var vendName = document.getElementById('vendorNameInput')
        var vendAddress = document.getElementById('vendorAddressInput')
        var vendCity = document.getElementById('vendorCityInput')
        var vendState = document.getElementById('vendorStateInput')
        var vendZip = document.getElementById('vendorZipInput')
        var vendCountry = document.getElementById('vendorCountryInput')
        var values = [vendId.value, vendName.value, vendAddress.value, vendCity.value, vendState.value, vendZip.value,  vendCountry.value]        
        client.query('INSERT INTO public.vendors (vend_id, vend_name, vend_address, vend_city, vend_state, vend_zip, vend_country) VALUES ($1, $2, $3, $4, $5, $6, $7);', values, (err, res) => {
            console.log(err, res)
            if (err !== null) {
                window.alert("Invalid input. Make sure the fields are filled in correctly.")
            } else {
                document.location.reload()
            }
        })

    }
    
}

window.onbeforeunload = function () {
    client.end()
}