let vistaReporte = 1
let maximoReportes

let opcionBusquedaReportes
let valorBusquedaReportes

const consultarReportes = (pagina) => {
    fetch(`http://localhost:3500/reportes/${pagina}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'opcionBusquedaReportes': opcionBusquedaReportes,
            'valorBusquedaReportes': valorBusquedaReportes
        },
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(data => {
        if (data.error) {
            document.getElementById('reportes-error').innerHTML = data.respuesta
        } else {
            maximoReportes = data.maximo
            data.respuesta.forEach(element => {

                if (!element.descripcion) {
                    var descripcion = 'Vacío'
                } else {
                    var descripcion = element.descripcion
                }

                let filasReportes = `
                <tr>
                    <td>${element.cliente}</td>
                    <td>${element.numeroCliente}</td>
                    <td>${element.unidad}</td>
                    <td>${element.hora}</td>
                    <td>${element.fecha}</td>
                    <td>${element.operador}</td>
                    <td>${descripcion}</td>
                </tr>
                `

                document.querySelector('#filasReportes').innerHTML += filasReportes
            });
        }

        document.getElementById('reportes').style.display = ""
    })
}

const mostrarReportes = () => {
    document.getElementById('reportes-error').innerHTML = ''
    document.querySelector('#filasReportes').innerHTML = ''

    opcionBusquedaReportes = 'undefined'
    valorBusquedaReportes = 'undefined'

    consultarReportes(vistaReporte)
}

const anterioresReportes = () => {
    if (vistaReporte > 1) {
        document.getElementById('reportes').style.display = "none"
        document.querySelector('#filasReportes').innerHTML = ''
        vistaReporte--
        consultarReportes(vistaReporte)
    }
}

const siguientesReportes = () => {
    if (vistaReporte < maximoReportes) {
        document.getElementById('reportes').style.display = "none"
        document.querySelector('#filasReportes').innerHTML = ''
        vistaReporte++
        consultarReportes(vistaReporte)
    }
}

const buscarReporte = () => {
    document.getElementById('reportes').style.display = ""
    document.querySelector('#filasReportes').innerHTML = ''

    opcionBusquedaReportes = document.getElementById('select-reportes').value
    valorBusquedaReportes = document.getElementById('busqueda-reportes').value

    vistaReporte = 1

    consultarReportes(vistaReporte)
}