const token = localStorage.getItem("token");if (!token) location.href = "login.html";

const plansDiv = document.getElementById("plans");

document.getElementById("createBtn").onclick = async ()=>
    {
const data = {
    title: title.value,
description:description.value,
    price:    price.value,
    duration : duration.value
  }

  
  
await fetch("http://localhost:5050/trainer/plans", {
    method: "POST",

headers: 
{
      "Content-Type":
       "application/json",
     Authorization: `Bearer ${token}`
    },

    body: JSON.stringify(data)
  })

  loadPlans();
}

async function loadPlans() {
    const res = await fetch("http://localhost:5050/trainer/plans", {
    
        headers: { Authorization: `Bearer ${token}` }
  })

  const plans = await res.json();
  plansDiv.innerHTML = "";

  plans.forEach(p => {
    const div = document.createElement("div");
 div.className = "plan";
    div.innerHTML = `
      
    <h3>${p.title}</h3>
      
    <p>${p.description}</p>

  <p>₹${p.price} | ${p.duration_days} days</p>
      <button onclick="deletePlan(${p.id})
      ">Delete</button>
    `;

    plansDiv.appendChild(div);
  })
}
async function deletePlan(id) {
  await fetch(`http://localhost:5050/trainer/plans/${id}`, {
    
 method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
 
  loadPlans();
}

loadPlans();
