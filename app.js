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

        page: "loginPage",
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
                this.page = "forumPage";
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
            if (this.newEmailInput != "") {
                if (this.newPasswordInput != "") {
                    if (this.newFullNameInput != "") {
                        console.log("Credentials can be accepted. Account created.")
                        let newAccountCredentials = {
                            "username": this.newEmailInput,
                            "password": this.newPasswordInput,
                            "fullname": this.newFullNameInput
                        };
                        this.newEmailInput = "";
                        this.newPasswordInput = "";
                        this.newFullNameInput = "";

                        // let response = await fetch(URL + "/session", {
                        //     method: "POST",
                        //     body: JSON.stringify(loginCredentials),
                        //     headers: {
                        //         "Content-Type": "application/json"
                        //     },
                        //     credentials: "include"

                        let response = await fetch(URL + "/user", {
                            method: "POST",
                            body: JSON.stringify(newAccountCredentials),
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include",
                        });
                    } else { console.log("Please enter your full name")};
                } else { console.log("Please enter a valid password.")};
            } else { console.log("Please enter a valid email address")};
        },
    },

    created: function () {
        //this.getSession();
    }
});


//=================STEPS:==============================
//
//   - POST user credentials, allow specific login
//   - Create second homescreen that only shows when you're logged in
//   - Pull from API database, print the other threads
//   - 
//