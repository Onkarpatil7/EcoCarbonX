// ==========================
// SIDEBAR ACTIVE MENU
// ==========================

const menuItems =
document.querySelectorAll(".menu li");

menuItems.forEach(item => {

  item.addEventListener("click", () => {

    menuItems.forEach(menu => {

      menu.classList.remove("active");

    });

    item.classList.add("active");

  });

});


// ==========================
// MONTHLY EMISSION CHART
// ==========================

new Chart(
  document.getElementById("lineChart"),
  {
    type:"line",

    data:{

      labels:[
        "Jan","Feb","Mar","Apr",
        "May","Jun","Jul","Aug",
        "Sep","Oct","Nov","Dec"
      ],

      datasets:[{

        label:"Emission",

        data:[
          1200,
          1400,
          1500,
          1800,
          1700,
          2100,
          1900,
          1850,
          1600,
          1700,
          1650,
          1550
        ],

        borderColor:"#16a34a",

        backgroundColor:
        "rgba(22,163,74,0.1)",

        fill:true,

        tension:0.4

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false

    }

  }
);


// ==========================
// PREDICTION CHART
// ==========================

new Chart(
  document.getElementById("barChart"),
  {
    type:"bar",

    data:{

      labels:[
        "Next 1M",
        "Next 2M",
        "Next 3M",
        "Next 4M"
      ],

      datasets:[{

        label:"Predicted Emission",

        data:[
          1800,
          1700,
          1600,
          1500
        ],

        backgroundColor:[
          "#16a34a",
          "#3b82f6",
          "#f59e0b",
          "#8b5cf6"
        ],

        borderRadius:8

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false

    }

  }
);


// ==========================
// CSV FILE UPLOAD
// ==========================

const uploadBtn =
document.querySelector(".upload-btn");

const fileInput =
document.querySelector("input[type='file']");

uploadBtn.addEventListener("click", () => {

  if(fileInput.files.length === 0){

    alert("Please Select CSV File");

    return;

  }

  const fileName =
  fileInput.files[0].name;

  if(!fileName.endsWith(".csv")){

    alert("Only CSV Files Allowed");

    return;

  }

  alert(
    fileName +
    " Uploaded Successfully"
  );

});


// ==========================
// SEARCH FUNCTION
// ==========================

const searchInput =
document.querySelector(".search-box input");

searchInput.addEventListener("keyup", () => {

  const value =
  searchInput.value.toLowerCase();

  const rows =
  document.querySelectorAll("table tr");

  rows.forEach((row,index) => {

    if(index === 0){
      return;
    }

    const text =
    row.innerText.toLowerCase();

    if(text.includes(value)){

      row.style.display = "";

    }

    else{

      row.style.display = "none";

    }

  });

});


// ==========================
// BUY TOKEN BUTTON
// ==========================

const buyButtons =
document.querySelectorAll(".buy-btn");

buyButtons.forEach(button => {

  button.addEventListener("click", () => {

    alert(
      "Buy Token Request Sent"
    );

  });

});


// ==========================
// SELL TOKEN BUTTON
// ==========================

const sellButtons =
document.querySelectorAll(".sell-btn");

sellButtons.forEach(button => {

  button.addEventListener("click", () => {

    alert(
      "Sell Token Request Sent"
    );

  });

});


// ==========================
// REPORT TABLE HOVER
// ==========================

const rows =
document.querySelectorAll("table tr");

rows.forEach(row => {

  row.addEventListener("mouseenter", () => {

    row.style.transition = "0.3s";

  });

});


// ==========================
// SMART ANALYTICS
// ==========================

const analyticsCards =
document.querySelectorAll(".card");

analyticsCards.forEach(card => {

  card.addEventListener("mouseenter", () => {

    card.style.boxShadow =
    "0 10px 25px rgba(0,0,0,0.15)";

  });

  card.addEventListener("mouseleave", () => {

    card.style.boxShadow =
    "0 2px 10px rgba(0,0,0,0.05)";

  });

});


// ==========================
// AI RISK DETECTION
// ==========================

const emissionValue = 2100;

if(emissionValue > 2000){

  console.log(
    "High Emission Risk Detected"
  );

}


// ==========================
// LOGOUT BUTTON
// ==========================

const logoutBtn =
document.querySelector(".logout-btn");

if(logoutBtn){

  logoutBtn.addEventListener("click", () => {

    const confirmLogout =
    confirm("Are You Sure Want To Logout?");

    if(confirmLogout){

      alert("Logout Successful");

      window.location.href = "login.html";

    }

  });

}


// ==========================
// PROFILE UPDATE
// ==========================

const profileBtn =
document.querySelector(".profile-save-btn");

if(profileBtn){

  profileBtn.addEventListener("click", () => {

    alert(
      "Profile Updated Successfully"
    );

  });

}


// ==========================
// REPORT DOWNLOAD
// ==========================

const downloadBtns =
document.querySelectorAll(".download-btn");

downloadBtns.forEach(button => {

  button.addEventListener("click", () => {

    alert(
      "Report Download Started"
    );

  });

});


// ==========================
// TOKEN COUNTER UPDATE
// ==========================

const tokenValue =
document.querySelector(".token-number");

if(tokenValue){

  let current =
  parseInt(tokenValue.innerText);

  setInterval(() => {

    current += 1;

    tokenValue.innerText =
    current;

  },5000);

}


// ==========================
// NOTIFICATION SYSTEM
// ==========================

function showNotification(message){

  const notification =
  document.createElement("div");

  notification.innerText =
  message;

  notification.style.position =
  "fixed";

  notification.style.top =
  "20px";

  notification.style.right =
  "20px";

  notification.style.background =
  "#16a34a";

  notification.style.color =
  "white";

  notification.style.padding =
  "15px";

  notification.style.borderRadius =
  "10px";

  notification.style.zIndex =
  "1000";

  document.body.appendChild(notification);

  setTimeout(() => {

    notification.remove();

  },3000);

}


// ==========================
// AUTO ALERTS
// ==========================

setTimeout(() => {

  showNotification(
    "New Sustainability Report Uploaded"
  );

},4000);


// ==========================
// DARK MODE TOGGLE
// ==========================

const darkModeBtn =
document.querySelector(".dark-mode-btn");

if(darkModeBtn){

  darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle(
      "dark-mode"
    );

  });

}