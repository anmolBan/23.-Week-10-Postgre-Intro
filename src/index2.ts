import { Client } from 'pg';

async function insertData(username: string, email: string, password: string){
    const client = new Client({
        host: "ep-young-pond-a5pvdymu.us-east-2.aws.neon.tech",
        port: 5432,
        database: "test",
        user: "bansal.anmol98",
        password: "T6VBEsCA2GLq", 
        ssl: {
            rejectUnauthorized: false // Set this to true if the server has a valid SSL certificate
        }
    });

    try{
        await client.connect();
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = [username, email, password];
        const res = await client.query(insertQuery, values);
        console.log("Insertion success:", res);
    } catch(err){
        console.error("Error during the insertion:", err);
    } finally{
        await client.end();
    }
}


insertData("kunalBan", "kunalbansal@gmail.com", "12345678").catch(console.error);
