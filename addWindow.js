/**
 * Takes the text entered in the addWindow.html form and adds
 * them to the relevant coloumn of the Postgres database.
 */ 
var pgp = require('pg-promise')
var db = pgp('postgres://postgres:ridgeback@localhost:5432/database') // Fix this