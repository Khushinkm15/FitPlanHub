document.getElementById("loginBtn").addEventListener("click", async () => {
const email = document.getElementById("email").value.trim();
 const password = document.getElementById("password").value.trim();
 const message = document.getElementById("message");


  message.textContent = "";message.style.color = "red";

  if (!email || !password) {

 message.textContent ="Email and password are required";
    return;
  }

  try {

 const response = await fetch("http://localhost:5050/auth/login", {
      method: "POST",
 headers: {
 "Content-Type": 
 "application/json"
      }
      ,
      
      
      
      body: JSON.stringify({ email, password })
    })

    const data = await response.json();

    if (!response.ok) {
    
        message.textContent = data.message || "Login failed";
      return;
    }


localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)
)

    message.style.color = "lightgreen";
message.textContent = "Login successful! Redirecting...";

    setTimeout(()=> {
     
        window.location.href = "landing.html";
    }, 1500);

  } catch (error) {
   
   
 message.textContent = "Server error. Try again.";
    console.error(error);
  }
}
)
