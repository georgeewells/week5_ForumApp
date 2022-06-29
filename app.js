const URL = "https://forum2022.codeschool.cloud"

var app = new Vue({
    el: "#app",
    data: {
        usernameInput: "",
        passwordInput: "",

        newEmailInput: "",
        newPasswordInput: "",
        newFullNameInput: "",

        loginMessage: "",
    },
    methods: {
        getSession: async function () {
            let response = await fetch(`${URL}/session`, {
                method: "GET",
                credentials: "include"
            });
            
            // Are we logged in?
            if (response.status == 200) {
                //logged in!
                console.log("logged in");
            } else if (response.status == 400) {
                //not logged in.
                console.log("not logged in");
                let data = await response.json();
                console.log(data);
            } else {
                console.log("Unique error in GET /session: ", response.status, response);
            }
        },
        // POST /session - Attempt to log in
        // POST /user - 
        postSession: async function () {
            if (this.usernameInput != null && this.passwordInput != null) {
                let loginCredentials = {
                    username: this.usernameInput,
                    password: this.passwordInput
                };
                this.usernameInput = "";
                this.passwordInput = "";

                let response = await fetch(URL + "/session", {
                    method: "POST",
                    body: JSON.stringify(loginCredentials),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                    
            });

            //Are we logged in?
            if  (response.status == 201) {
                //logged in!
                console.log("Logged in!");
            } else if (response.status == 401) {
                //not logged in :(
                console.log("Not logged in.");
            } else if (response.status == 400) {
                //empty log in box...
                console.log("No entry - enter username and password.");
            } else {
                console.log("Unique error in POST /session: ", response.status, response);
            }
        }},

        postUser: async function () {
            if (this.newEmailInput == null) {
                console.log("Please enter an email address");
                return
            } else if (this.newPasswordInput == null) {
                console.log("Please enter a new password");
                return
            } else if (this.newFullNameInput == null) {
                console.log("Please enter your full name");
                return
            } else {
                console.log("Credentials can be accepted. Account created.")
                }

            },






    },
    created: function () {
        this.getSession();
    }
});