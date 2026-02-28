import { createClient } from '@supabase/supabase-js';

class DatabaseSingleton {
    constructor() {
        if (!DatabaseSingleton.instance) {
            // Vercel inyectará estas variables automáticamente desde tu archivo .env
            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_KEY;
            
            this.client = createClient(supabaseUrl, supabaseKey);
            DatabaseSingleton.instance = this;
            console.log("✅ Nueva conexión a Supabase creada (Singleton)");
        }
        return DatabaseSingleton.instance;
    }

    getClient() {
        return this.client;
    }
}

const dbInstance = new DatabaseSingleton();
export default dbInstance;