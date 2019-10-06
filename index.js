'use strict'
const { app, BrowserWindow, Menu, ipcMain } = require('electron')

const path = require('path')

/*
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules/', '.bin', 'electron')
    })
}
*/

let windowPrincipal

/** VENTANAS ASIGNACIÓN */
let ventanaNuevoCliente
let ventanaAsignarCliente

/** VENTANAS ADMINISTRACIÓN */
let ventanaNuevaUnidad
let ventanaEditarCliente
let ventanaEditarUnidad

/** Ventana principal */
app.on('ready', () => {
    windowPrincipal = new BrowserWindow({
        width: 800,
        height: 450,
        center: true,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    windowPrincipal.setMenu(null)

    windowPrincipal.loadFile('app/vistas/index.html')

    windowPrincipal.once('ready-to-show', () => {
        windowPrincipal.show()
    })

    windowPrincipal.on('closed', () => {
        windowPrincipal = null
        app.quit()
    })

    /*
    const menuPrincipal = Menu.buildFromTemplate(plantillaMenu)
    Menu.setApplicationMenu(menuPrincipal)
    */

})

/** VENTANAS */

/**
 * ASIGNACIÓN
 */
function nuevoCliente() {
    ventanaNuevoCliente = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    ventanaNuevoCliente.setMenu(null)
    ventanaNuevoCliente.loadFile('app/vistas/asignacion/nuevo_cliente.html')
}

function asignarCliente() {
    ventanaAsignarCliente = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    ventanaAsignarCliente.setMenu(null)
    ventanaAsignarCliente.loadFile('app/vistas/asignacion/asignar_cliente.html')
}

/**
 * ADMINISTRACIÓN
 */

function nuevaUnidad() {
    ventanaNuevaUnidad = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    ventanaNuevaUnidad.setMenu(null)
    ventanaNuevaUnidad.loadFile('app/vistas/administracion/nueva_unidad.html')
}

function editarCliente() {
    ventanaEditarCliente = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    ventanaEditarCliente.setMenu(null)
    ventanaEditarCliente.loadFile('app/vistas/administracion/editar_cliente.html')
}

function editarUnidad() {
    ventanaEditarUnidad = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    ventanaEditarUnidad.setMenu(null)
    ventanaEditarUnidad.loadFile('app/vistas/administracion/editar_unidad.html')
}

/** IPC VISTAS */
ipcMain.on('vista:inicio', (e, vista) => {
    windowPrincipal.loadFile(`${vista}`)
})

/** IPC VENTANAS */
ipcMain.on('ventana:nuevocliente', (e) => {
    nuevoCliente()
})

ipcMain.on('ventana:nuevaunidad', (e) => {
    nuevaUnidad()
})

ipcMain.on('ventana:asignarcliente', async (e, datos) => {
    asignarCliente()

    setTimeout(() => {
        ventanaAsignarCliente.webContents.send('datos:asignarcliente', datos)
    }, 1000)
})

ipcMain.on('ventana:editarCliente', async (e, datos) => {
    editarCliente()

    setTimeout(() => {
        ventanaEditarCliente.webContents.send('ventana:datosCliente', datos)
    }, 1000)
})

ipcMain.on('ventana:editarUnidad', async (e, datos) => {
    editarUnidad()

    setTimeout(() => {
        ventanaEditarUnidad.webContents.send('ventana:datosUnidad', datos)
    }, 1000)
})

/** IPC DATOS */
ipcMain.on('datos:cerrarAsignarCliente', async (e, mensaje) => {
    ventanaAsignarCliente.close()

    windowPrincipal.webContents.send('datos:respuestaAsignarCliente', mensaje)
})

ipcMain.on('datos:cerrarNuevoCliente', (e, mensaje) => {
    ventanaNuevoCliente.close()

    windowPrincipal.webContents.send('datos:respuestaNuevoCliente', mensaje)
})

ipcMain.on('datos:cerrarNuevaUnidad', async (e, mensaje) => {
    ventanaNuevaUnidad.close()

    windowPrincipal.webContents.send('datos:respuestaNuevaUnidad', mensaje)
})

ipcMain.on('datos:clienteEditado', async (e, mensaje) => {
    ventanaEditarCliente.close()

    windowPrincipal.webContents.send('datos:respuestaClienteEditado', mensaje)
})

ipcMain.on('datos:unidadEditada', async (e, mensaje) => {
    ventanaEditarUnidad.close()

    windowPrincipal.webContents.send('datos:respuestaUnidadEditada', mensaje)
})

/** Menú */

/*
const plantillaMenu = [
    {
        label: 'Registrar',
        submenu: [
            {
                label: 'Registrar cliente',
                accelerator: 'Ctrl+Alt+N',
                click() {
                    nuevoCliente()
                }
            }
        ]
    }
]


if (process.env.NODE_ENV !== 'production') {
    plantillaMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Ocultar/Mostrar Dev Tools',
                accelerator: 'Ctrl+Shift+i',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            },
        ]
    })
}
*/