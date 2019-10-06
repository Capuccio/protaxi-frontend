let vistaOperador = 1
let maximoOperadores

const consultarOperadores = (pagina) => {
    fetch(`http://localhost:3500/operadores/${pagina}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(data => {
        if (data.error) {
            document.getElementById('operadores-error').innerHTML = data.respuesta
        } else {
            maximoOperadores = data.maximo
            data.respuesta.forEach(element => {

                let filasOperadores = `
                <tr>
                    <td>${element.nombre}</td>
                    <td>${element.apellido}</td>
                    <td>${element.correo}</td>
                    <td>${element.clave}</td>
                    <td>${element.nivel}</td>
                </tr>
                `

                document.querySelector('#filasOperadores').innerHTML += filasOperadores
            });
        }

        document.getElementById('operadores').style.display = ""
    })
}

const mostrarOperadores = () => {
    document.getElementById('operadores-error').innerHTML = ''
    document.querySelector('#filasOperadores').innerHTML = ''

    consultarOperadores(vistaOperador)
}

const anterioresOperadores = () => {
    if (vistaOperador > 1) {
        document.getElementById('reportes').style.display = "none"
        document.querySelector('#filasOperadores').innerHTML = ''
        vistaOperador--
        consultarOperadores(vistaOperador)
    }
}

const siguientesOperadores = () => {
    if (vistaOperador < maximoOperadores) {
        document.getElementById('reportes').style.display = "none"
        document.querySelector('#filasOperadores').innerHTML = ''
        vistaOperador++
        consultarOperadores(vistaOperador)
    }
}