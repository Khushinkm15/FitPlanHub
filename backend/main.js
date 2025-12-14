console.log("File starte")

const express = require("express");
const cors = require("cors")
const database_pool = require("./config/database")
require("dotenv").config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fitplanhub_secret_key";
const auth = require("./middleware/auth");


// express
 const main = express();
main.use(cors());
main.use(express.json());


// check 
  main.get("/",(request,response) =>{
      response.send("Backend Works - FitPlanHub");
  })
// database
main.get("/test-database", async(request,response) =>{
  try{
    const[tables] = await database_pool.query("SHOW TABLES");
    response.json({
      success:true,
      tables:tables,
    })
  } catch(err){
    response.status(500).json({
      success:false,
      err: err.message,
    })
  }
})

// additional features
main.get("/plans",async(req,res)=>{
  try{
    const user_id = 1;
    const {minPrice,maxPrice,duration,sort,order} = req.query


    let sql = `
      SELECT 
        fp.id,
        fp.title,
        fp.description,
        fp.price,
        fp.duration_days,
        u.name AS trainer_name,

        CASE
          WHEN s.id IS NULL THEN 'NOT_SUBSCRIBED'
          WHEN s.expiry_date >= CURDATE() THEN 'ACTIVE'
          ELSE 'EXPIRED'
        END AS subscription_status

      FROM fitness_plans fp
      JOIN users u ON fp.trainer_id = u.id
      LEFT JOIN subscriptions s 
        ON fp.id = s.plan_id AND s.user_id = ?
      WHERE 1 = 1
    `;
    const value = [user_id];

// filtering 

    if(minPrice){
      sql += "AND fp.price >= ?";
      value.push(minPrice);
    }
       if(maxPrice){
        sql += "AND fp.price <=?";
        value.push(maxPrice)
       }

       if(duration){
        sql += "AND fp.duration_days =?";
        value.push(duration)
       }

      //  sort
      if(sort){
        const Sort = ["price","created_at"];
        const Order = ['asc','desc'];


        const sortBy = Sort.includes(sort) ? sort:"created_at";
        const sortOrder = Order.includes(order?.toLowerCase())?order.toUpperCase():"DESC";
        sql += `ORDER BY fp.${sortBy} ${sortOrder}`;
      }

      const[plans] = await database_pool.query(sql,value);

      res.json({
        success:true,
        count:plans.length,
        plans:plans
      })
  }
  catch(error){
    console.error(error)
    res.status(500).json({
      success:false,
      error:error.message
    })
  }
})


// signup feature
main.post("/auth/signup", async (request,response)=>{
  try{
    const{name,email,password,role} = request.body;

    if(!name||!email||!password||!role){
      return response.status(400).json({
        success: false,
        message: "All Fields are required"
      })
    }
     const [existingUser] = await database_pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
     )

     if(existingUser.length>0){
      return response.status(409).json({
        success:false,
        message:"Email already exits"
      })
     }

     const Password = await bcrypt.hash(password,10);

  await database_pool.query(
    "INSERT INTO users(name,email,password,role) VALUES (?,?,?,?)",
    [name,email,Password,role]
  )

  response.status(201).json({
      success:true,
      message: "User Registration succesfull"
  });
  }
  catch(error){
    console.error("SignUp err:",error);
    response.status(500).json({
      success: false,
  message:"SErver error while signin up"
    })
  }
})

// login
main.post("/auth/login" , async (request,response) =>{
  console.log("Registering /auth/login route");
  try{
    const {email,password} = request.body;

    if(!email|| !password){
      return response.status(400).json({
        success:false,
        message:"Email and password Required"
      });
    }

    const [users] = await database_pool.query(
      "SELECT id , name, email, password , role FROM users where email = ?",
      [email]
    );
    console.log("Users found:",users.length)
    if(users.length ===0){
return response.status(401).json({
  success:false,
  message:"Invalid email Or Password",
})
    }
const user = users[0];

console.log("Stored pass:",user.password);
console.log("Entered pass:",password)
    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
      return response.status(401).json({
        success:false,
        message:"Invald email or passord",
      })
    }

 const token = jwt.sign(
  {
    id: user.id,
    role: user.role
  },
  JWT_SECRET ,
  {expiresIn: "1h"}
 )
 console.log("JWT TOKEN:", token);


 response.json({
  success:true,
  message: "LOgged In Succesfully",
  token : token,
  user:{
    id: user.id,
    name: user.name,
email:user.email,
role:user.role
  }
 })
  }
  catch(err){
    console.error("Login error:", err);
  response.status(500).json({
    success:false,
    message:"Server error"
  })
  }
})

main.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});
const PORT = 5050;

console.log("Listen");
main.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running on Port ${PORT}`);
});


