<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Create User</h3>
      <form @submit.prevent="handleSubmitForm">
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
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="user.email"
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
          <button class="btn btn-danger btn-block">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/create-user";

      axios
        .post(apiURL, this.user)
        .then(() => {
          this.$router.push("/view");
          this.user = {
            username: "",
            email: "",
            password: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
