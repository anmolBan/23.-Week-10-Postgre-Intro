import { Client } from 'pg';

async function getUser(email: string){
    const client = new Client({
        host: "ep-young-pond-a5pvdymu.us-east-2.aws.neon.tech",
        port: 5432,
        database: "test",
        user: "bansal.anmol98",
        password: "T6VBEsCA2GLq",
        ssl: {
            rejectUnauthorized: false
        }
    });

    try{
        await client.connect();
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const result = await client.query(query, values);

        if(result.rows.length > 0){
            console.log("user found:", result.rows[0]);
            return result.rows[0];
        } else{
            console.log("No user found with the given email.");
            return null;
        }
    } catch(err){
        console.error("Error while fetching user:", err);
        throw err;
    } finally{
        await client.end();
    }
}

getUser("bansal.anmol98@gmail.com").catch(console.error);