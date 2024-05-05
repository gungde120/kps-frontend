<template>
    <div class="row">
        <Sidebar />
        <div class="col ">
        <div class="container">
            <header class="jumbotron bg-dark text-light ">
                <div class="row px-5">
                <!-- <img class="img rounded-circle ml-5 mr-5" style="width: 50px: height: 50px" src="/images/avatar.jpg" alt="..."> -->
                <div class="col">
                <h3>
                    <strong>{{currentUser.username}}</strong>
                </h3>
                <br>
                <p>
                <strong>Email :</strong>
                {{currentUser.email}}
                </p>
                <strong>Authorities :</strong>
                <ul>
                <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
                </ul>
                </div>
                </div>
            
            </header>
                <form v-on:submit.prevent @submit="EditProfile" aria-required="true" style="max-width: 15rem">
                <h3>
                <strong>
                    Edit Profile
                </strong>
                </h3>

                <div class="form-group" aria-required="true">
                <br>
                <input class="w-100 p-2" type="username" aria-label="Username" placeholder="username" v-model="editprofile.username" required />
                </div>

                <div class="form-group" aria-required="true">
                <br>
                <input class="w-100 p-2" type="email" aria-label="Email" placeholder="email" v-model="editprofile.email" required />
                </div>

                <input type="submit" value="Simpan" class="btn btn-success mt-3">

                <router-link to="/profile">
                <button type="submit" class="btn btn-danger ml-3 mt-3">
                Cancel
                </button>
                </router-link>
            </form>
        </div>
        
        </div>
    </div>

    
</template>

<script>
    import Sidebar from "@/components/Sidebar.vue";
    import axios from "axios";

export default {
    name: 'Profile',
    components: {
            Sidebar,
        },
    data() {
    return {
        editprofile: {},
        };
    },

    methods: {
        //JSON
    setUsers(data) {
        this.users = data;
    },

    async EditProfile() {
        try {
            await axios.put(
                `http://localhost:8081/users/${this.$route.params.id}`,
            {
                username: this.username,
                email: this.email,
            }
        );
        this.username = "";
        this.email = "";
        this.$router.push("/profile");
        } catch (err) {
            console.log(err);
        }
    },
    },

    computed: {
        currentUser() {
        return this.$store.state.auth.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
        this.$router.push('/login');
        }
    }
};
</script>