document.addEventListener('keydown', e => {

    let nivel = localStorage.getItem('nivel')

    if (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT') {

    } else {

        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].classList.contains('active')) {
                var posicion = i
                break;
            }
        }

        let atras = posicion - 1
        let siguiente = posicion + 1

        switch (e.keyCode) {
            case 38:
                if (atras < 0) {
                    opciones[4].click()
                } else if (atras == 3 && nivel == 1) {
                    opciones[2].click()
                } else {
                    opciones[atras].click()
                }
                break;

            case 40:
                if (siguiente > 4) {
                    opciones[0].click()
                } else if (siguiente == 3 && nivel == 1) {
                    opciones[4].click()
                } else {
                    opciones[siguiente].click()
                }
                break;
            default:
                break;
        }

    }

})