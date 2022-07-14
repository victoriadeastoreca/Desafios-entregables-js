//Calcular el monto por cuota que debe abonar el usuario y averiguar si ya pagó la mitad o la totalidad de las cuotas. Si no pago la totalidad, calcular el monto restante a abonar. 

function calcCuotas (monto, cuotas, cuotasPagadas) {
    let calculoCuotas = monto/cuotas;
    let calculoDeuda = monto - calculoCuotas;

    for (let i = 0; i <= cuotas; i++){

        if (cuotasPagadas === cuotas){
            console.log (`La cantidad de cuotas elegida fue de ${cuotas}. Entonces, el monto a abonar cada mes será de $${calculoCuotas}. Usted ya abonó la totalidad de la(s) ${cuotas} cuota(s).`)
        }
        
        else if (cuotasPagadas >= cuotas / 2){
            console.log (`La cantidad de cuotas elegida fue de ${cuotas}. Entonces, el monto a abonar cada mes será de $${calculoCuotas}. Usted ya abonó la mitad de las ${cuotas} cuotas pero aún adeuda $${calculoDeuda}.`)
        } 

        else {
            console.log (`La cantidad de cuotas elegida fue de ${cuotas}. Entonces, el monto a abonar cada mes será de $${calculoCuotas}. Sin embargo, usted aún no abonó la totalidad de las cuotas por lo que adeuda $${calculoDeuda}`)
        }
        break;
    }
}

calcCuotas (500, 5, 2)
calcCuotas (1000, 1, 1)
calcCuotas (50000, 12, 8)
calcCuotas (100000, 12, 5)