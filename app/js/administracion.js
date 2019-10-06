let vistaCliente = 1
let vistaUnidades = 1
let maximo

let opcionBusqueda
let valorBusqueda

/** CONSULTAS FETCH */
const consultasClientes = (pagina) => {
    fetch(`http://localhost:3500/clientes/${pagina}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'OpcionesBusqueda': opcionBusqueda,
            'ValorBusqueda': valorBusqueda
        },
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(data => {
        maximo = data.maximo
        data.respuesta.forEach(element => {
            let celular = (!element.celular) ? 'Vacío' : element.celular
            let telefono = (!element.telefono) ? 'Vacío' : element.telefono
            let direccionUno = (!element.direccionUno) ? 'Vacío' : element.direccionUno
            let direccionDos = (!element.direccionDos) ? 'Vacío' : element.direccionDos

            let filasClientes = `
            <tr>
                <td>${element.nombre}</td>
                <td>${element.apellido}</td>
                <td>${celular}</td>
                <td>${telefono}</td>
                <td>${direccionUno}</td>
                <td>${direccionDos}</td>
                <td><button class='btn btn-primary' onclick="editarCliente('${element._id}')"><i class="material-icons">edit</i></button></td>
                <td><button class='btn btn-danger' onclick="eliminar('http://localhost:3500/clientes/eliminar', '${element._id}')"><i class="material-icons">delete</i></button></td>
            </tr>
            `

            document.querySelector('#filasClientes').innerHTML += filasClientes
        });

        document.getElementById('administracion_clientes_contenido').style.display = ""
    })
}

const consultasUnidades = (pagina) => {
    fetch(`http://localhost:3500/unidades/${pagina}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'OpcionesBusqueda': opcionBusqueda,
            'ValorBusqueda': valorBusqueda
        },
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(data => {
        maximo = data.maximo
        data.respuesta.forEach(element => {
            let filasClientes = `
            <tr>
                <td>${element.numUnidad}</td>
                <td>${element.celular}</td>
                <td>${element.conductor }</td>
                <td>${element.placa}</td>
                <td>${element.modelo}</td>
                <td>${element.agno}</td>
                <td>${element.propietario}</td>
                <td>${element.chatId}</td>
                <td><button class='btn btn-primary' onclick="editarUnidad('${element._id}')"><i class="material-icons">edit</i></button></td>
                <td><button class='btn btn-danger' onclick="eliminar('http://localhost:3500/unidades/eliminar', '${element._id}')"><i class="material-icons">delete</i></button></td>
            </tr>
            `

            document.querySelector('#filasUnidades').innerHTML += filasClientes
        });

        document.getElementById('administracion_unidades_contenido').style.display = ""
    })
}

const eliminar = (url, id) => {
    const datos = {
        id: id
    }

    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'DELETE',
        body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(data => {
        document.getElementById(data.lugar).innerHTML = data.respuesta
    })
}


/** CLIENTES */
const mostrarClientes = async () => {
    document.getElementById('clientes-error').innerHTML = ''
    document.querySelector('#filasClientes').innerHTML = ''

    opcionBusqueda = 'undefined'
    valorBusqueda = 'undefined'

    consultasClientes(vistaCliente)
}

const siguientesClientes = async () => {
    if (vistaCliente < maximo) {
        document.getElementById('administracion_clientes_contenido').style.display = "none"
        document.querySelector('#filasClientes').innerHTML = ''
        vistaCliente++
        consultasClientes(vistaCliente)
    }
}

const anterioresClientes = async () => {
    if (vistaCliente > 1) {
        document.getElementById('administracion_clientes_contenido').style.display = "none"
        document.querySelector('#filasClientes').innerHTML = ''
        vistaCliente--
        consultasClientes(vistaCliente)
    }
}

const buscarClientes = async () => {
    document.getElementById('administracion_clientes_contenido').style.display = "none"
    document.querySelector('#filasClientes').innerHTML = ''

    opcionBusqueda = document.getElementById('select-clientes').value
    valorBusqueda = document.getElementById('busqueda-cliente').value

    vistaCliente = 1

    consultasClientes(vistaCliente)
}

const editarCliente = async (id) => {
    ipcRenderer.send('ventana:editarCliente', id)
}

const registrarCliente = async () => {
    ipcRenderer.send('ventana:nuevocliente')
}

ipcRenderer.on('datos:respuestaNuevoCliente', async (e, mensaje) => {
    document.getElementById('clientes-error').innerHTML = mensaje
})

ipcRenderer.on('datos:respuestaClienteEditado', async (e, mensaje) => {
    document.getElementById('clientes-error').innerHTML = mensaje
})

/** UNIDADES */
const mostrarUnidades = async () => {
    document.getElementById('unidades-error').innerHTML = ''
    document.querySelector('#filasUnidades').innerHTML = ''

    opcionBusqueda = 'undefined'
    valorBusqueda = 'undefined'

    consultasUnidades(vistaUnidades)
}

const siguientesUnidades = async () => {
    if (vistaUnidades < maximo) {
        document.getElementById('administracion_clientes_contenido').style.display = "none"
        document.querySelector('#filasUnidades').innerHTML = ''
        vistaUnidades++
        consultasUnidades(vistaUnidades)
    }
}

const anterioresUnidades = async () => {
    if (vistaUnidades > 1) {
        document.getElementById('administracion_clientes_contenido').style.display = "none"
        document.querySelector('#filasUnidades').innerHTML = ''
        vistaUnidades--
        consultasUnidades(vistaUnidades)
    }
}

const buscarUnidad = async () => {
    document.getElementById('administracion_clientes_contenido').style.display = "none"
    document.querySelector('#filasUnidades').innerHTML = ''

    opcionBusqueda = document.getElementById('select-unidades').value
    valorBusqueda = document.getElementById('busqueda-unidad').value

    vistaUnidades = 1

    consultasUnidades(vistaCliente)
}

const registrarUnidad = async () => {
    ipcRenderer.send('ventana:nuevaunidad')
}

const editarUnidad = async (id) => {
    ipcRenderer.send('ventana:editarUnidad', id)
}

ipcRenderer.on('datos:respuestaNuevaUnidad', (e, mensaje) => {
    document.getElementById('unidades-error').innerHTML = mensaje
})

ipcRenderer.on('datos:respuestaUnidadEditada', async (e, mensaje) => {
    document.getElementById('unidades-error').innerHTML = mensaje
})