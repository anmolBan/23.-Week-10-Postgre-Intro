import { Client } from "pg";

async function createAddressTable(){
    const client = new Client({
        connectionString: "postgresql://bansal.anmol98:T6VBEsCA2GLq@ep-young-pond-a5pvdymu.us-east-2.aws.neon.tech/test?sslmode=require"
    });

    try{
        await client.connect();
        const result = await client.query(`
            CREATE TABLE addresses (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                city VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                street VARCHAR(100) NOT NULL,
                pincode VARCHAR(20) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `)
        console.log(result);
    } catch(err){
        console.error(err);
    } finally{
        await client.end();
    }
}

createAddressTable();