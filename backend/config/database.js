
const mySql = require("mysql2/promise");

   const database_pool = mySql.createPool({
    host  : "localhost",
    user: "root",
      password : "Khushi2803*",
    database: "fitplanhub"
   })




   module.exports = database_pool;