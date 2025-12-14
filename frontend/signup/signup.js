document.getElementById("signupBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const message = document.getElementById("message");

  message.textContent = "";

message.style.color = "red";

  if (!name ||!email|| !contact || !password||!role) 
    {
    message.textContent = 
    "All fields are required";
    return;
  }

  try {
    const       response = await fetch("http://localhost:5050/auth/signup", {
      method: "POST",
  headers: {
        "Content-Type": "application/json"
      },
     body: JSON.stringify({
        name,
     email,
        password,
        role
      })
    }
)

    const data = await response.json();

    if (!response.ok)
         {
message.textContent = data.message || "Signup failed";
      return;
    }

    message.style.color = "lightgreen";

 message.textContent = "sucessfl! eedirecting  login...";

    setTimeout(() => {
     
        window.location.href = "login.html";
    }, 2000);

  } catch (error) {
    message.textContent = "error";
    console.error(error);
  }
}
)
