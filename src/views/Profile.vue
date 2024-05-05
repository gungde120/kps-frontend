<template>
<div>
  <Navbar/>

<div class="row" style="min-height: 100vh;">
  <Sidebar class="h-auto" style="z-index: 0;"></Sidebar>  
  
  <div class="col p-5">
      <div class="row">
        <!-- <img class="img rounded-circle ml-5 mr-5" style="width: 50px: height: 50px" src="/images/avatar.jpg" alt="..."> -->
        <div class="col-sm-1 col-md-3 col-lg-2">
          <img src='/images/icon.ico'
              class="radius"
              style="object-fit: scale-down; width: 100%;"
          >
        </div>
        <div class="col-sm-1 col-md- col-lg-5">
          <form>
            <div class="form-group">
              <label for="validationDefault03">Username</label>
              <div id="disabledTextInput" class="form-control bg-gray">{{ currentUser.username }}</div>
              <input v-show="edit" type="text" v-model="newUsername" class="form-control shadow" id="validationDefault03">
              <div v-show="edit" class="mt-2 small text-info">Kosongkan bila tidak mengubah</div>
            </div>
            <div class="form-group">
              <label for="validationDefault03">Email</label>
              <div id="disabledTextInput" class="form-control bg-gray">{{ currentUser.email }}</div>
              <input v-show="edit" type="email" v-model="newEmail" class="form-control shadow" id="validationEmail">
              <span v-show="edit && !isEmailValid()" class="mt-2 small text-danger">Please add a valid email format.</span>
              <div v-show="edit" class="mt-2 small text-info">Kosongkan bila tidak mengubah</div>
            </div>
            <div class="form-group" v-show="edit">
              <label for="validationDefault03">Password</label>
              <input type="password" v-model="newPassword" class="form-control shadow" id="validationDefault03">
              <div class="mt-2 small text-info">Kosongkan bila tidak mengubah</div>
            </div>
            <div v-if="!edit" class="form-group">
              <label for="validationDefault03">Role</label>
              <div v-show="!edit" id="disabledTextInput" class="form-control bg-gray">{{ currentUser.roles }}</div>
            </div>
          </form>

          <div class="form-inline">
            <div v-if="!edit" @click="editing" class="btn btn-primary mt-3">
            <i class="bi bi-pencil"> </i> Edit Profile
            </div>
            <div v-if="edit && isEmailValid()" @click="updateProfile" class="btn btn-success mr-auto">
              <i class="bi bi-check"></i> Save
            </div>
            <div v-if="edit" @click="editing" class="ml-auto btn btn-danger">
              <i class="bi bi-x"></i> Cancel
            </div>
          </div>
        </div>
      </div>
      
      
  </div>
</div>
</div>
</template>

<script>
  import Sidebar from "@/components/Sidebar.vue";
  import Navbar from "@/components/Navbar.vue";
  import axios from "axios";
  import API_URL from "../services/api.js";

export default {
  name: 'Profile',
  components: {
        Sidebar,
        Navbar
    },
  data() {
  return {
    edit: false,
    newUsername: '',
    newEmail: '',
    newPassword: '',
  };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
  },
  methods: {
    editing() {
      this.edit = !this.edit;
    },
    isEmailValid() {
      const input = document.getElementById('validationEmail')
      return input.validity.valid
    },
    isButtonDisabled() {
      return !this.isEmailValid()
    },
    async updateProfile() {
      const token = this.currentUser.accessToken;

      const formFields = {
        username: this.currentUser.username,
        email: this.currentUser.email,
        password: this.currentUser.password,
        newEmail: this.newEmail ? this.newEmail : null,
        newUsername: this.newUsername ? this.newUsername : null,
        newPassword: this.newPassword ? this.newPassword : null,
      };

      try {
        await axios.put(API_URL + "/api/auth/user", formFields, {
          headers: {
            "x-access-token": token,
          },
        });

        this.$toast.success(
          "Berhasil edit profile, mohon login kembali.",
          {
            position: "top-right",
            duration: 8000,
          }
        );

        setTimeout(() => {
          this.$store.dispatch("auth/logout");
          this.$router.push("/loginkps");
          this.edit = false;
        }, 1); // delay for 3 seconds (adjust as needed)
      } catch (err) {
        // Handle error
        console.log(err);
        this.$toast.error(
          "Error edit data.",
          {
            position: "top-right",
            duration: 3000,
          }
        );
      }
    },
  }
};
</script>