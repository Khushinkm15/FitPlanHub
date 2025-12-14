const token = localStorage.getItem("token");

if (!token) {
  window.location.href = 
  "login.html";
}


document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.clear();
  window.location.href = "login.html";
})

async function loadPlans() {
  try {
    const response = await fetch("http://localhost:5050/plans", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json();


    if (!response.ok) {
              alert("Failed to load ");
      return;
    }

    renderPlans(data.plans);

  } catch (error) {
    console.error(error);
    
    alert("Server error");
  }
}

function renderPlans(plans) {
 
    const container = document.getElementById("plansContainer");
  container.innerHTML = "";

  plans.forEach(plan => {

    const card = document.createElement("div");
                card.className = "plan-card";

    card.innerHTML = `
      <span class="status ${plan.subscription_status}">
        ${plan.subscription_status.replace("_", " ")}
      </span>



      <h3>${plan.title}</h3>
      
      <p>${plan.description}</p>

      <div class="price">₹${plan.price}</div>
      <div class="trainer">Trainer: ${plan.trainer_name}</div>
    `;

    container.appendChild(card);
  })
}

loadPlans();
