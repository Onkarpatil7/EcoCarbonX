// ==========================
// SIDEBAR NAVIGATION
// ==========================

const menuItems =
document.querySelectorAll(".menu-item");

const sections =
document.querySelectorAll(".content-section");

  menuItems.forEach(item => {

    item.addEventListener("click", () => {

      if(item.classList.contains("logout-btn")){

        const confirmLogout =
        confirm("Are you sure to logout?");

        if(confirmLogout){
          location.href = "../index.html";

        }

        return;

      }

      menuItems.forEach(menu => {

        menu.classList.remove("active");

      });

      item.classList.add("active");

      sections.forEach(section => {

        section.style.display = "none";

      });

      const target =
      item.getAttribute("data-section");

      document.getElementById(target)
      .style.display = "block";

    });

  });

menuItems.forEach(item => {


  item.addEventListener("click", () => {

    menuItems.forEach(i => {

      i.classList.remove("active");

    });

    item.classList.add("active");

    sections.forEach(section => {

      section.style.display = "none";

    });

    const target =
    item.getAttribute("data-section");

    document.getElementById(target)
    .style.display = "block";

  });

});




// ==========================
// LINE CHART
// ==========================

new Chart(
  document.getElementById("lineChart"),
  {
    type:"line",

    data:{
      labels:[
        "Jan","Feb","Mar",
        "Apr","May","Jun",
        "Jul","Aug","Sep",
        "Oct","Nov","Dec"
      ],

      datasets:[

        {

          label:"Actual Emission",

          data:[
            1200,
            1500,
            1800,
            2000,
            1700,
            2100,
            1900,
            1750,
            1600,
            1800,
            1700,
            1650
          ],

          borderColor:"#16a34a",

          backgroundColor:"rgba(22,163,74,0.1)",

          tension:0.4,

          fill:true

        },

        {

          label:"Predicted Emission",

          data:[
            null,
            null,
            null,
            null,
            null,
            2100,
            2200,
            2150,
            2050,
            2000,
            1950,
            1900
          ],

          borderColor:"#3b82f6",

          borderDash:[5,5],

          tension:0.4,

          fill:false

        }

      ]
    },

    options:{

      responsive:true,

      maintainAspectRatio:false

    }

  }
);


// ==========================
// PIE CHART
// ==========================

new Chart(
  document.getElementById("pieChart"),
  {
    type:"doughnut",

    data:{
      labels:[
        "Manufacturing",
        "IT",
        "Energy",
        "Transport"
      ],

      datasets:[{

        data:[
          40,
          25,
          20,
          15
        ],

        backgroundColor:[
          "#16a34a",
          "#3b82f6",
          "#f59e0b",
          "#8b5cf6"
        ]

      }]
    },

    options:{

      responsive:true,

      maintainAspectRatio:false

    }

  }
);


// ==========================
// BAR CHART
// ==========================

const barCanvas =
document.getElementById("barChart");

if(barCanvas){

  new Chart(
    barCanvas,
    {
      type:"bar",

      data:{
        labels:[
          "ABC",
          "EcoTech",
          "GreenPower",
          "FutureX",
          "BuildCo"
        ],

        datasets:[{

          label:"Emission",

          data:[
            2450,
            980,
            1650,
            2100,
            1300
          ],

          backgroundColor:[
            "#16a34a",
            "#3b82f6",
            "#f59e0b",
            "#8b5cf6",
            "#ef4444"
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

}


// ==========================
// ANALYTICS CHART
// ==========================

const analyticsCanvas =
document.getElementById("analyticsChart");

if(analyticsCanvas){

  new Chart(
    analyticsCanvas,
    {
      type:"radar",

      data:{

        labels:[
          "Emission",
          "Energy Saving",
          "Recycling",
          "Water Usage",
          "Green Score"
        ],

        datasets:[{

          label:"Company Sustainability",

          data:[
            80,
            70,
            85,
            60,
            90
          ],

          backgroundColor:"rgba(22,163,74,0.2)",

          borderColor:"#16a34a",

          pointBackgroundColor:"#16a34a"

        }]

      },

      options:{

        responsive:true,

        maintainAspectRatio:true

      }

    }
  );

}


// ==========================
// BUY TOKENS
// ==========================

document.querySelectorAll(".buy-btn")
.forEach(button => {

  button.addEventListener("click",function(){

    const row =
    this.closest("tr");

    if(!row){
      return;
    }

    const tokenCell =
    row.querySelector(".token-count");

    let tokens =
    parseInt(tokenCell.innerText);

    tokens += 10;

    tokenCell.innerText = tokens;

    alert("10 Tokens Purchased Successfully");

  });

});


// ==========================
// SELL TOKENS
// ==========================

document.querySelectorAll(".sell-btn")
.forEach(button => {

  button.addEventListener("click",function(){

    const row =
    this.closest("tr");

    if(!row){
      return;
    }

    const tokenCell =
    row.querySelector(".token-count");

    let tokens =
    parseInt(tokenCell.innerText);

    if(tokens <= 0){

      alert("No Tokens Left");

      return;

    }

    tokens -= 10;

    tokenCell.innerText = tokens;

    alert("10 Tokens Sold Successfully");

  });

});


// ==========================
// ADD COMPANY
// ==========================

function addCompany(){

  const name =
  document.getElementById("companyName").value;

  const industry =
  document.getElementById("companyIndustry").value;

  if(name === "" || industry === ""){

    alert("Fill all fields");

    return;

  }

  const table =
  document.getElementById("companyTable");

  const row =
  table.insertRow();

  row.innerHTML = `

    <td>${name}</td>

    <td>${industry}</td>

    <td>
      <button class="delete-btn">
        Delete
      </button>
    </td>

  `;

  document.getElementById("companyName").value = "";

  document.getElementById("companyIndustry").value = "";

  alert("Company Added Successfully");

}


// ==========================
// DELETE COMPANY
// ==========================

document.addEventListener("click",function(e){

  if(e.target.classList.contains("delete-btn")){

    e.target.closest("tr").remove();

    alert("Company Deleted");

  }

});


// ==========================
// SEARCH COMPANY
// ==========================

const searchInput =
document.querySelector(".search-box input");

if(searchInput){

  searchInput.addEventListener("keyup", () => {

    const filter =
    searchInput.value.toLowerCase();

    const rows =
    document.querySelectorAll("#companyTable tr");

    rows.forEach((row,index) => {

      if(index === 0){
        return;
      }

      const company =
      row.cells[0].innerText.toLowerCase();

      if(company.includes(filter)){

        row.style.display = "";

      }

      else{

        row.style.display = "none";

      }

    });

  });

}


// ==========================
// REPORT DOWNLOAD
// ==========================

const downloadBtn =
document.querySelector(".download-btn");

if(downloadBtn){

  downloadBtn.addEventListener("click", () => {

    alert("PDF Report Download Started");

  });

}


// ==========================
// SETTINGS SAVE
// ==========================

const saveSettingsBtn =
document.getElementById("saveSettings");

if(saveSettingsBtn){

  saveSettingsBtn.addEventListener("click", () => {

    alert("Settings Saved Successfully");

  });

}