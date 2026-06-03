const API_URL = "http://127.0.0.1:8000";


async function registerUser(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("userType").value;

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            role: userType
        })
    });

    const data = await response.json();

    document.getElementById("message").innerText = data.message;
}


async function loginUser(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password

            })
        }
    );

    const data = await response.json();

    if(response.ok){

        // STORE TOKEN
        localStorage.setItem(
            "token",
            data.access_token
        );

        // STORE ROLE
        localStorage.setItem(
            "role",
            data.role
        );

        document.getElementById("message")
        .innerText = "Login Successful!";

        // REDIRECT BASED ON ROLE

        if(data.role === "admin"){

            window.location.href =
            "admin/admin.html";

        }

        else if(data.role === "company"){

            window.location.href =
            "company/company.html";

        }

    }

    else{

        document.getElementById("message")
        .innerText =
        data.detail || "Login failed.";

    }

}