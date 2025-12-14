const token = localStorage.getItem("token");
if (!token) location.href = "login.html";
const plansDiv = document.getElementById("plans");
const myPlansDiv = document.getElementById("myPlans");

async function loadPlans() {
  
    
    const res = await fetch("http://localhost:5050/plans", 
        {
    headers: { Authorization: `Bearer ${token}` }
  }
)
  ;

 
const data = await res.json();
  plansDiv.innerHTML = "";

  data.plans.forEach(p => 
    {
const div = document.createElement("div");
    div.className = "plan";
div.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
 <p>₹${p.price} | ${p.duration_days} days</p>
      <button onclick=
      "subscribe(${p.id})">
      Subscribe</button>
    `;
    plansDiv.appendChild(div);
  });
}

async function subscribe(planId) {
  await fetch
  (`http://localhost:5050/subscribe/${planId}`, {
    method: "POST",

    headers: { Authorization: `Bearer ${token}` }
  }
)
  loadMyPlans();
}

async function 
loadMyPlans() {
  const res = await fetch("http://localhost:5050/my-subscriptions", {
    headers: 
    { Authorization: `Bearer ${token}` }
  })

const plans = await res.json();
  myPlansDiv.innerHTML = "";

  plans.forEach(p => {
    const div = document.createElement("div");
 div.className = "plan"; div.innerHTML = `
      <h3>${p.title}</h3>


      <p>Valid till: ${p.expiry_date}</p>
    `;
    myPlansDiv.appendChild(div);
  })
}

loadPlans();
loadMyPlans();
