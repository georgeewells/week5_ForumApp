var app = new Vue({
    el: "#app",
    data: {
        usernameInput: "",
        passwordInput: "",

        newEmailInput: "",
        newPasswordInput: "",
        newFullNameInput: "",
    },
    methods: {
        getSession: async function () {
            let response = await fetch(`$(URL)/session`,{
                method: "GET",
                credentials: "include"
            });
            console.log(response);
        }
        // POST /session - Attempt to log in
        // POST /user - 
    },
    created: function () {
        this.getSession();
    }
});