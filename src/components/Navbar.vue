<template>
        <nav class="navbar navbar-expand-lg navbar-light navbar-fixed-top sticky-top bg-light shadow">
            <router-link to="/">
                <img id="profile-img" src="/images/kpslogo.png" style="width: 38px; position: absolute; top:8px" />
                <span class="font-weight-bold" style="position: absolute; top:15px; left: 68px;">KPS Denpasar</span>
            </router-link>

            <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mx-auto mt-2 mt-lg-0">
                <li  class="nav-item mx-2">
                    <router-link to="/peta" class="nav-link">Peta KPS Denpasar</router-link>
                </li>
                <!-- <li  class="nav-item mx-2">
                    <a class="nav-link disabled" href="#">Berita</a>
                </li> -->
                <li  class="nav-item mx-2">
                    <router-link class="nav-link" to="/about">About KPS</router-link>
                </li>
                <li v-if="showAdminBoard" class="nav-item mx-2 d-none d-lg-block">
                    <router-link class="nav-link" to="/admin">Admin</router-link>
                </li>
                <li v-if="showAdminBoard" class="nav-item dropdown d-sm-block d-lg-none">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                    Admin Menu
                    </a>
                    <div class="dropdown-menu">
                    <router-link class="dropdown-item" to="/admin">Dashboard</router-link>
                    <div class="dropdown-divider"></div>
                    <router-link class="dropdown-item" to="/admin/subdas">Data sub DAS</router-link>
                    <router-link class="dropdown-item" to="/admin/kps">Data KPS</router-link>
                    <router-link class="dropdown-item" to="/admin/sungai">Data Sungai Induk</router-link>
                    <router-link class="dropdown-item" to="/admin/kecamatan">Data Kecamatan</router-link>
                    <router-link class="dropdown-item" to="/admin/potensi-das">Data Potensi</router-link>
                    <router-link class="dropdown-item" to="/admin/potensi">Data Kategori Potensi</router-link>
                    </div>
                </li>
                </ul>
                <ul v-if="currentUser" class="navbar-nav mt-2 mt-lg-0">
                <li class="nav-item" style="cursor: pointer;" >
                    <a class="nav-link" @click.prevent="logOut" >
                        <font-awesome-icon icon="sign-out-alt" /> Log Out
                    </a>
                </li>
                <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Profile
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <router-link to="/profile" class="dropdown-item">Profile</router-link>
                    <div class="dropdown-divider"></div>
                        <a class="nav-link" @click.prevent="logOut" >
                            <font-awesome-icon icon="sign-out-alt" /> Log Out
                        </a>
                    </div>
                </li> -->
                </ul>
            </div>
            </nav>
</template>

<script>
    export default {
        components: {
    },
    computed: {
        currentUser() {
        return this.$store.state.auth.user;
        },
        showAdminBoard() {
        if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_ADMIN');
        }

        return false;
        },
        showModeratorBoard() {
        if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_MODERATOR');
        }

        return false;
        }
    },
    methods: {
        logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/home');
        },
    }
};
</script>