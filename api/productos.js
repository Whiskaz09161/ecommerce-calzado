import dbInstance from '../models/db.js';

export default async function handler(req, res) {
    // Obtenemos el cliente de Supabase usando el Singleton
    const supabase = dbInstance.getClient();

    if (req.method === 'GET') {
        try {
            // Hacemos una consulta SQL (SELECT *) a la tabla 'productos'
            const { data, error } = await supabase.from('productos').select('*');

            if (error) throw error;

            // Devolvemos los productos en formato JSON (status 200 = OK)
            return res.status(200).json(data);
            
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener los productos del catálogo' });
        }
    } else {
        // Si alguien intenta hacer un POST o PUT aquí, lo bloqueamos
        return res.status(405).json({ error: 'Método no permitido' });
    }
}