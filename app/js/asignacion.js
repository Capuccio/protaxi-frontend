document.getElementById('formularioAsignarCliente').addEventListener('submit', function(e) {
    e.preventDefault()

    let numero = document.getElementById('numero-cliente').value

    if (numero.trim() == "" || numero.length < 9 || numero.length > 10) {
        document.getElementById('numero-cliente-error').innerHTML = 'Debe colocar un número Celular o Fijo'
    } else {
        document.getElementById('numero-cliente-error').innerHTML = ''

        let datos = {
            numero
        }

        fetch('http://localhost:3500/clientes/numero', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(datos)
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                const { error, servidor, respuesta } = data

                if (error && servidor) {
                    document.getElementById('numero-cliente-error').innerHTML = respuesta
                } else if (error && !servidor) {
                    ipcRenderer.send('ventana:nuevocliente')
                } else {
                    ipcRenderer.send('ventana:asignarcliente', respuesta)
                }
            })
    }
})

ipcRenderer.on('datos:respuestaAsignarCliente', async (e, mensaje) => {
    document.getElementById('numero-cliente-error').innerHTML = mensaje

    document.getElementById('numero-cliente').value = ''
    document.getElementById('numero-cliente').focus()
})

ipcRenderer.on('datos:respuestaNuevoCliente', (e, mensaje) => {
    document.getElementById('numero-cliente-error').innerHTML = mensaje

    document.getElementById('numero-cliente').value = ''

    document.getElementById('numero-cliente').focus()
})