<template>
    <div id="sidebar-container" class="bg-dark d-none d-md-block d-lg-block" :class="{'sidebar-collapsed': collapsed, 'sidebar-expanded': !collapsed}" style=";height:100%; border-radius: 0px; width: fit-content;font-size: small;">
        <!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' -->
        <!-- Bootstrap List Group -->
        <ul class="list-group sticky-top" style="border-radius: 0px;">
            <!-- Separator with title -->
            <div v-show="!collapsed" class="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center" style="height: 60px;">
                <small v-show="!collapsed" >KPS Denpasar</small>
            </div>
            <!-- /END Separator -->
            <!-- Menu with submenu -->
            <router-link to="/admin" class="bg-dark list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center text-white">
                    <span class="bi bi-compass fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Dashboard</small>
                </div>
            </router-link>
            <router-link to="/peta" class="bg-dark list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center text-white">
                    <span class="bi bi-geo-alt-fill fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Peta KPS</small>
                </div>
            </router-link>

            <!-- <a href="#submenu1" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-start align-items-center text-white">
                    <span class="bi bi-compass mr-3"></span>
                    <small class="menu-collapsed">Dashboard</small>
                    <span class="bi bi-caret-down-fill ml-auto"></span>
                </div>
            </a>
            Submenu content
            <div id='submenu1' class="collapse sidebar-submenu">
                <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
                    <span class="menu-collapsed">Chahgag</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
                    <span class="menu-collapsed">Reports</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
                    <span class="menu-collapsed">Tables</span>
                </a>
            </div> -->
            
            <!-- Separator with title -->
            <li v-show="!collapsed" class="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center">
                <!-- <small v-show="!collapsed">DATA</small> -->
            </li>
            <!-- /END Separator -->
            <router-link to="/admin/subdas" class="bg-dark list-group-item list-group-item-action">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data DAS</small>
                </div>
            </router-link>
            <router-link to="/admin/kps" class="bg-dark list-group-item list-group-item-action">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data KPS</small>
                </div>
            </router-link>
            <router-link to="/admin/kecamatan" class="bg-dark list-group-item list-group-item-action">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Kecamatan</small>
                </div>
            </router-link>
            <router-link to="/admin/sungai" class="bg-dark list-group-item list-group-item-action">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Sungai Induk</small>
                </div>
            </router-link>
            <router-link to="/admin/potensi-das" class="bg-dark list-group-item list-group-item-action">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Potensi</small>
                </div>
            </router-link>
            <router-link to="/admin/potensi" class="bg-dark list-group-item list-group-item-action">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Kategori Potensi</small>
                </div>
            </router-link>
            <!-- <a href="#" class="bg-dark list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Berita</small>
                </div>
            </a> -->
            

            <!-- Separator without title -->
            <li v-show="!collapsed" class="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small v-show="!collapsed"> </small>
            </li>
            <!-- /END Separator -->
            <router-link to="/profile" class="bg-dark list-group-item list-group-item-action">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-user-circle fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Profile</small>
                </div>
            </router-link>
            <a @click="sidebarCollapse" class="bg-dark list-group-item list-group-item-action" style="cursor: pointer;">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span v-show="!collapsed" class="bi bi-arrows-angle-contract fa-fw ml-1 mr-1" ></span>
                    <span v-show="collapsed" class="bi bi-arrows-angle-expand fa-fw ml-1 mr-1" ></span>
                    <small class="ml-4" v-show="!collapsed">Minimize</small>
                </div>
            </a>
        </ul><!-- List Group END-->
    </div><!-- sidebar-container END -->
    <!-- <div class="d-flex flex-column flex-shrink-0 bg-dark vh-100% py-2 pl-1" style="max-width: 190px;min-height: 900px; font-size: 14px">
        <ul class="nav nav-pills nav-flush flex-column mb-auto text-left">
            <li class="nav-item">
                <router-link to="/home" class="nav-link text-white mb-3 ">
                <font-awesome-icon icon="home" class="mr-2"/> Home
            </router-link>
            </li>

            <li v-if="showAdminBoard" class="nav-item">
                <router-link to="/admin" class="nav-link text-white mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer mr-2" viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                    <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/>
                </svg>
                Dashboard</router-link>
            </li>
            <li v-if="showAdminBoard" class="nav-item">
                <router-link to="/admin/peminjaman" class="nav-link text-white mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack mr-2" viewBox="0 0 16 16">
                <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z"/>
                <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z"/>
                </svg>
                Peminjaman</router-link>
            </li>
            <li v-if="showAdminBoard" class="nav-item">
                <router-link to="/moderator/ruangan" class="nav-link text-white mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill mr-2" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                Edit Ruangan</router-link>
            </li>

            <li v-if="showModeratorBoard" class="nav-item">
                <router-link to="/moderator" class="nav-link text-white mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                    <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/>
                </svg>
                Dashboard</router-link>
            </li>
            <li v-if="showModeratorBoard" class="nav-item">
                <router-link to="/moderator/ruangan" class="nav-link text-white mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                Edit Ruangan</router-link>
            </li>
        </ul>
    </div> -->
</template>

<script>
export default {
    data() {
        return{
            collapsed: false,
        }
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
        this.$router.push('/login');
        },

        sidebarCollapse() {
            this.collapsed = !this.collapsed
            }
    }
};


</script>

<style>
    .sidebar-collapsed .menu-collapsed {
        display: none;
    }
</style>