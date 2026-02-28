// models/PagoStrategy.js

// Interfaz base (Clase abstracta simulada)
class PagoStrategy {
    procesar(monto) {
        throw new Error("El método procesar debe ser implementado");
    }
}

// Estrategia Concreta: Contraentrega (Requisito RF07)
export class ContraEntregaStrategy extends PagoStrategy {
    procesar(monto) {
        // Aquí simulamos la lógica de aprobación
        return {
            estado: 'Aprobado',
            metodo: 'Contraentrega',
            detalle: 'Pago pendiente por recaudar al momento de la entrega'
        };
    }
}

// Clase Contexto que utiliza la estrategia
export class ProcesadorDePagos {
    constructor(estrategia) {
        this.estrategia = estrategia;
    }

    ejecutarPago(monto) {
        return this.estrategia.procesar(monto);
    }
}