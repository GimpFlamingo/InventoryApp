/**
 * The finished app on startup should have a home screen that presents the user with all the options
 * that can be done on the application such as: add an item to the inventory; create and order;
 * access sale history; access spread sheet of items; and manage contact information of sellers
 * and buyers.
 */
const { app, BrowserWindow, Menu } = require('electron')

let mainWindow
let addWindow
// Creates the main window of the app
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    })

    mainWindow.maximize()

    mainWindow.loadFile('index.html')
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // Insert menu
    Menu.setApplicationMenu(mainMenu)

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        app.quit()
    })
}

// Add a new part to the inventory list
function addItemWindow() {
    // Create the browser window.
    addWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        width: 500,
        height: 600,
        title: 'Add Inventory Item',
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    })

    addWindow.loadFile('fileWindows/addItemWindow.html')

    addWindow.once('ready-to-show', () => {
        addWindow.show()
    })

    addWindow.on('closed', function () {

        addWindow = null
    })
}

// Add a new vendor to the database
function newVendWindow() {
    // Create the browser window.
    addWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        width: 800,
        height: 1000,
        title: 'Add Inventory Item',
        webPreferences: {
            nodeIntegration: true
        }
    })

    addWindow.loadFile('fileWindows/addVendWindow.html')

    addWindow.once('ready-to-show', () => {
        addWindow.show()
    })

    addWindow.on('closed', function () {

        addWindow = null
    })
}

// Add a new customer to the databse
function newCustomerWindow() {
    // Create the browser window.
    addWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        width: 900,
        height: 1100,
        title: 'Add Inventory Item',
        webPreferences: {
            nodeIntegration: true
        }
    })

    addWindow.loadFile('fileWindows/addNewCustomer.html')

    addWindow.once('ready-to-show', () => {
        addWindow.show()
    })

    addWindow.on('closed', function () {

        addWindow = null
    })
}

// Edit an item's information in the databases
function editItemWindow() {
    addWindow = new BrowserWindow({
        width: 900,
        height: 1100,
        title: 'Edit Inventory Item',
        webPreferences: {
            nodeIntegration: true
        },  
        show: false
    })
    addWindow.maximize()

    addWindow.loadFile('editWindows/editItemWindow.html')

    addWindow.once('ready-to-show', () => {
        addWindow.show()
    })

    addWindow.on('closed', function () {

        addWindow = null
    })
}

// Edit a customer's information in the database
function editCustomerWindow() {
    addWindow = new BrowserWindow({
        width: 900,
        height: 1100,
        title: 'Edit Customer',
        webPreferences: {
            nodeIntegration: true
        },  
        show: false
    })
    addWindow.maximize()

    addWindow.loadFile('editWindows/editCustomerWindow.html')

    addWindow.once('ready-to-show', () => {
        addWindow.show()
    })

    addWindow.on('closed', function () {

        addWindow = null
    })
}

// Edit a vendor's information in the database
function editVendorWindow() {
    addWindow = new BrowserWindow({
        width: 900,
        height: 1100,
        title: 'Edit Inventory Item',
        webPreferences: {
            nodeIntegration: true
        },  
        show: false
    })
    addWindow.maximize()

    addWindow.loadFile('editWindows/editVendWindow.html')

    addWindow.once('ready-to-show', () => {
        addWindow.show()
    })

    addWindow.on('closed', function () {

        addWindow = null
    })
}

// Find a processed order
function findOrderWindow() {
    addWindow = new BrowserWindow({
        width: 900,
        height: 1100,
        title: 'Edit Inventory Item',
        webPreferences: {
            nodeIntegration: true
        },  
        show: false
    })
    addWindow.maximize()

    addWindow.loadFile('viewWindows/findOrderWindow.html')

    addWindow.once('ready-to-show', () => {
        addWindow.show()
    })

    addWindow.on('closed', function () {

        addWindow = null
    })
}

// Create a new sales order
function newSoWindow() {
    addWindow = new BrowserWindow({
        width: 900,
        height: 1100,
        title: 'Edit Inventory Item',
        webPreferences: {
            nodeIntegration: true
        },  
        show: false
    })
    addWindow.maximize()

    addWindow.loadFile('fileWindows/newSoWindow.html')

    addWindow.once('ready-to-show', () => {
        addWindow.show()
    })

    addWindow.on('closed', function () {

        addWindow = null
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click() {
                    addItemWindow()
                }
            },
            {
                label: 'New Vendor',
                click() {
                    newVendWindow()
                }
            },
            {
                label: 'New Customer',
                click() {
                    newCustomerWindow()
                }
            },
            {
                label: 'New Sales Order',
                accelerator: process.platform === 'darwin' ? 'Command+Shift+S' : 'Ctrl+Shift+S',
                click() {
                    newSoWindow()
                }
            },
            {
                label: 'Settings'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ],
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Edit Item',
                click() {
                    editItemWindow()
                }
            },
            {
                label: 'Edit Vendor',
                click() {
                    editVendorWindow()
                }
            },
            {
                label: 'Edit Customer',
                click() {
                    editCustomerWindow()
                }
            },
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Find Order',
                click() {
                    findOrderWindow()
                }
            },
            {
                label: 'Find Item'
            },
            {
                label: 'Find Vendor Information'
            },
            {
                label: 'Find Customer Information'
            }
        ]
    },
    {
        label: 'Generate',
        submenu: [
            {
                label: "Sales Report",
                submenu: [
                    {
                        label: 'YTD Sales'
                    },
                    {
                        label: 'Monthly Sales'
                    },
                    {
                        label: 'By Customer Sales'
                    }
                ]
            }
        ]
    }
]

// If mac, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({})
}

// Add developers tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Devtools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'F12',
                click(item, focusWindow) {
                    focusWindow.webContents.openDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}

