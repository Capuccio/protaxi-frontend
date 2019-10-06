fetch('http://localhost:3500/reportes')
.then(resolve => resolve.json())
.then(res => {
    for (let i = 0; i < res.datos.length; i++) {
        let prueba = res.datos[i].hora.split(":", 3)

        let hora = prueba[0].toString()
        let minutos = prueba[1].toString()
        let segundos = prueba[2].toString()

        if (hora.length != 2) {
            var nuevaHora = 0 + prueba[0]
        } else {
            var nuevaHora = prueba[0]
        }
        
        if (minutos.length != 2) {
            var nuevoMinuto = 0 + prueba[1]
        } else {
            var nuevoMinuto = prueba[1]
        }
        
        if (segundos.length != 2) {
            var nuevoSegundo = 0 + prueba[2]
        } else {
            var nuevoSegundo = prueba[2]
        }

        prueba[0] = nuevaHora
        prueba[1] = nuevoMinuto
        prueba[2] = nuevoSegundo

        res.datos[i].hora = prueba.join(':')
    }

    fetch('http://localhost:3500/reportes/actualizarhora', {
        method: 'POST',
        body: JSON.stringify(res.datos),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(rest => console.log(rest))

})