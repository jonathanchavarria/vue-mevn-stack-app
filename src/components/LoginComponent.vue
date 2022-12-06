<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Login</h3>
      <form>
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            class="form-control"
            v-model="user.username"
            required
          />
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            v-model="user.password"
            required
          />
        </div>


        <div class="form-group">
          <button class="btn btn-danger btn-block" id="login-button">Login</button>
        </div>
      </form>
    </div>
  </div>

  
</template>

<script>




export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
    };
  },


  

};

const logInButton = document.getElementById("login-button");
const loginForm = document.forms[0];
console.log(logInButton);
async function logIn(event) {
  event.preventDefault();
  const username = loginForm[0].value;
  const password = loginForm[1].value;
  const response = await fetch("/login/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.redirected) window.location.replace(response.url);
}
if(logInButton){
  logInButton.addEventListener("click", logIn);
}

</script>