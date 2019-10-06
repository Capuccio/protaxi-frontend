const opciones = document.querySelectorAll('.menu__opcion')
const asignacion = document.getElementById('asignacion')
const administracion = document.getElementById('administracion')
const reportes = document.getElementById('reportes')
const operadores = document.getElementById('operadores')
const info = document.getElementById('info')

opciones[0].addEventListener('click', function() {
    opciones[1].classList.remove('active')
    opciones[2].classList.remove('active')
    opciones[3].classList.remove('active')
    opciones[4].classList.remove('active')
    opciones[0].classList.add('active')

    administracion.style.display = "none"
    reportes.style.display = "none"
    operadores.style.display = "none"
    info.style.display = "none"
    asignacion.style.display = ""
})

opciones[1].addEventListener('click', function() {
    opciones[0].classList.remove('active')
    opciones[2].classList.remove('active')
    opciones[3].classList.remove('active')
    opciones[4].classList.remove('active')
    opciones[1].classList.add('active')

    reportes.style.display = "none"
    operadores.style.display = "none"
    asignacion.style.display = "none"
    info.style.display = "none"
    administracion.style.display = ""
})

opciones[2].addEventListener('click', function() {
    opciones[0].classList.remove('active')
    opciones[1].classList.remove('active')
    opciones[3].classList.remove('active')
    opciones[4].classList.remove('active')
    opciones[2].classList.add('active')

    operadores.style.display = "none"
    asignacion.style.display = "none"
    administracion.style.display = "none"
    info.style.display = "none"

    mostrarReportes()
})

opciones[3].addEventListener('click', function() {
    opciones[0].classList.remove('active')
    opciones[1].classList.remove('active')
    opciones[2].classList.remove('active')
    opciones[4].classList.remove('active')
    opciones[3].classList.add('active')

    reportes.style.display = "none"
    asignacion.style.display = "none"
    administracion.style.display = "none"
    info.style.display = "none"

    mostrarOperadores()
})

opciones[4].addEventListener('click', function() {
    opciones[0].classList.remove('active')
    opciones[1].classList.remove('active')
    opciones[2].classList.remove('active')
    opciones[3].classList.remove('active')
    opciones[4].classList.add('active')

    reportes.style.display = "none"
    operadores.style.display = "none"
    asignacion.style.display = "none"
    administracion.style.display = "none"
    info.style.display = ""
})

/** Sub Menú ADMINISTRACIÓN */

const sub_opciones = document.querySelectorAll('.sub_menu__opcion')
const administracion_clientes = document.querySelector('#administracion_clientes_contenido')
const administracion_unidades = document.querySelector('#administracion_unidades_contenido')

sub_opciones[0].addEventListener('click', function() {
    sub_opciones[1].classList.remove('active')
    sub_opciones[0].classList.add('active')

    administracion_unidades.style.display = "none"

    mostrarClientes()
})

sub_opciones[1].addEventListener('click', function() {
    sub_opciones[0].classList.remove('active')
    sub_opciones[1].classList.add('active')

    administracion_clientes.style.display = "none"

    mostrarUnidades()
})