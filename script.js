/*Elabora un programa que permita averiguar si una persona debe sacar su CUIL, 
sabiendo su fecha de nacimiento. El Código Único de Identificación Laboral (CUIL)
es el número que se otorga a todo trabajador al inicio de su actividad laboral en
relación de dependencia (mayores de 17 años) que pertenezca al Sistema Integrado
de Jubilaciones y Pensiones (SIJP), y a toda otra persona que gestione alguna 
prestación o servicio de la Seguridad Social en la República Argentina.
Nota: Se debe comparar con la fecha actual y no tener en cuenta los años bisiestos.*/

function formato_correcto(fechaNacimiento) {
    let calendario = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dia = parseInt(fechaNacimiento.substring(0, 2));
    let mes = parseInt(fechaNacimiento.substring(3, 5));
    let año = parseInt(fechaNacimiento.substring(6));
    let esNumero;
    if(fechaNacimiento.length != 10) {
        return false;
    } else {
        for(let i = 0; i < 10; i++) {
            esNumero = !isNaN(fechaNacimiento[i]);
            if((i == 2 || i == 5) && fechaNacimiento[i] != '-') {
                return false;
            } else if (i != 2 && i != 5 && !esNumero) {
                return false;
            }
        }
        if(mes <= 0 || mes > 12) {
            return false;
        }
        if(dia <= 0 || dia > calendario[mes - 1]) {
            return false;
        }
        if(año <= 0 || año > 2022) {
            return false;
        }
        if(año == 2022 && mes > 9) {
            return false;
        }
    }
    return true;
}

function leer_fecha_nacimiento() {
    var fechaNacimiento;
    var formatoCorrecto;
    do {
        fechaNacimiento = window.prompt("Introduce tu fecha de nacimiento (dd-mm-aaaa)");
        formatoCorrecto = formato_correcto(fechaNacimiento);
        if(!formatoCorrecto) {
            alert('Formato de fecha incorrecto. Vuelve a intentarlo');
        }
    }while(!formatoCorrecto)

    return [parseInt(fechaNacimiento.substring(0,2)), parseInt(fechaNacimiento.substring(3,5)), parseInt(fechaNacimiento.substring(6))];
}

function edad(fechaNacimiento) {
    var diaAct = 30;
    var mesAct = 9;
    var añoAct = 2022;
    var edad = 2022 - fechaNacimiento[2];
    if(fechaNacimiento[1] > mesAct) {
        edad--;
    } else if (fechaNacimiento[1] == mesAct) {
        if(fechaNacimiento[0] > diaAct) {
            edad--;
        }
    }
    return edad;
}

function necesita_cuil() {
    var años = edad(leer_fecha_nacimiento());
    if (años >= 17) {
        alert("Tienes " + años + " años. Tienes que sacar tu CUIL");
    } else {
        alert("Tienes " + años + " años. No tienes que sacar tu CUIL");
    }
}

necesita_cuil();