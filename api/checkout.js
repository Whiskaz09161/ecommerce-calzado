import dbInstance from '../models/db.js';
import { ProcesadorDePagos, ContraEntregaStrategy } from '../models/PagoStrategy.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const { usuarioId, totalCarrito } = req.body;
        const supabase = dbInstance.getClient();

        // 1. Aplicar Patrón Strategy
        const estrategia = new ContraEntregaStrategy();
        const procesador = new ProcesadorDePagos(estrategia);
        const resultadoPago = procesador.ejecutarPago(totalCarrito);

        // 2. Registrar el pedido
        const { data, error } = await supabase
            .from('pedidos')
            .insert([
                { 
                    usuario_id: usuarioId, 
                    total: totalCarrito, 
                    estado: 'Pendiente',
                    metodo_pago: resultadoPago.metodo 
                }
            ])
            .select();

        // Si hay un error de llave foránea (usuario no existe), lo atrapamos aquí
        if (error) {
            console.error("❌ Error de Supabase:", error.message);
            return res.status(400).json({ 
                error: "Error de base de datos", 
                detalle: "Asegúrate de que el usuario ID 1 exista en la tabla usuarios." 
            });
        }

        return res.status(200).json({
            mensaje: "Pedido registrado con éxito",
            pago: resultadoPago
        });

    } catch (error) {
        return res.status(500).json({ error: 'Fallo crítico en el servidor' });
    }
}