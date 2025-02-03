import mysql from 'mysql2/promise';

const connect = new mysql2.CreateConnecton({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    name:process.env.DB_NAME,
    pass:process.env.DB_PASS
})

async function testConnection(){
    try {
        
        await connect.connect()
        console.log("db connected succeffully"))
    } catch (error) {
        console.log("db connection failed", e.message))
    }
}

export default connect;