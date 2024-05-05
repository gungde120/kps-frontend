<template>
<div>
    <Navbar/>
    <div class="row" style="min-height: 100vh;">
    
    <Sidebar class="h-auto" style="z-index: 0;"></Sidebar>  

    <div class="col mt-2">
        <div class="container-fluid">
            <nav aria-label="breadcrumb" class="mt-2">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link class="" to="/admin">Dashboard</router-link></li>
                    <li class="breadcrumb-item text-muted" aria-current="page"><router-link to="/admin/kps">List KPS</router-link></li>
                </ol>
            </nav>
        <h3 class="my-3">
            <!-- <router-link to="/admin" class="btn btn-dark mr-1">
                <i class="bi bi-arrow-left"></i>
            </router-link> -->
            List <strong>KPS</strong>
        
        </h3>
        <div class="form-inline">
            <input
                v-model="search"
                type="search"
                class="form-control text-center mr-auto"
                style="width: 50vw;"
                placeholder="Cari Nama KPS, DAS, dll ..."
                aria-label="Cari"
                aria-describedby="basic-addon1"
                />
            <div class="ml-auto btn btn-primary" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#add-modal-lg"><i class="bi bi-plus"></i> Add New</div>
            <AddKps/>
        </div>
        <div class="p-0 bg-white mx-auto table-responsive table-striped table-bordered mt-3">
                <table class="table">
                    <thead class="text-center text-nowrap">
                        <tr>
                            <th>ID</th>
                            <th>Logo KPS</th>
                            <th>Nama KPS</th>
                            <th>Sub DAS Kelola</th>
                            <th>Alamat</th>
                            <th>Kecamatan</th> 
                        </tr>
                    </thead>
                        <tbody class="text-center">
                            <tr v-for="kps in paginateData" :key="kps.kps_id" @click="detail(kps.kps_id)">
                                <th>{{ kps.kps_id }}</th>
                                <td>
                                    <img :src="'/images/logo/' + kps.logo_kps" onerror="this.src='/images/icon.ico'" style="object-fit: scale-down; width: 70px; ">                               
                                </td>
                                <td>{{ kps.kps_name }}</td>
                                <td>{{ kps.das_name }}</td>
                                <td>{{ kps.alamat }}</td>
                                <td>{{ kps.kecamatan }}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <div class="form-inline align-items-center justify-content-center mb-3">
                    <ul class="pagination mt-3">
                        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                            <button class="page-link" @click="previousPage">Previous</button>
                        </li>
                        <div class="page-item" v-for="n in totalPages" :key="n"  @click="goToPage(n)" :class="{ 'active': n === currentPage }">
                            <li style="cursor: pointer;"><a class="page-link">{{ n }}</a></li>
                        </div>
                        <li class="page-item" :class="{ 'disabled': currentPage === totalPages}">
                            <a class="page-link" @click="nextPage" style="cursor: pointer;">Next</a>
                        </li>
                    </ul>

                    <select v-model="itemsPerPage" @change="onItemsPerPageChange" class="ml-2 page-link radius">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>

                    <div class="data-length">
                        <strong> {{ paginateData.length }} </strong> of <strong> {{ kps.length }} </strong> data
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
    import AddKps from "./AddKps.vue";
    import axios from "axios";
    import API_URL from "../../../services/api";

    export default {
    name: "ListKps",
    components: {
    Sidebar,
    Navbar,
    AddKps
    },
data() {
    return {
        kps: [],
        search: '',
        currentPage: 1,
        itemsPerPage: 10,
    };
    },

    created() {
        this.fetchKps();
    },

    mounted() {
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
    },

    //Universal search
    filteredData() {
        const filteredKps = this.kps.filter((kps) => {
            // Search by all in searchbar
            const isSearched = !this.search || Object.values(kps) 
                .map((val) => String(val).toLowerCase())
                .some((val) => val.includes(this.search.toLowerCase()));
            return isSearched;
        });
        return filteredKps;
    },

    paginateData() {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filteredData.slice(start, end)
    },

    totalPages() {
            return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    
    },
methods: {
        async fetchKps() {
            try {
                const response = await axios.get(API_URL + "/api/kps");
                this.kps = response.data.kps;
            } catch (err) {
                console.log(err);
            }
        },
        detail(id) {
            this.$router.push(`/admin/kps/${id}`)
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            window.scrollTo(0, 0);
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            window.scrollTo(0, 0);
        },
        goToPage(n) {
            this.currentPage = n;
            window.scrollTo(0, 0);
        },
        onItemsPerPageChange() {
            this.currentPage = 1;
            window.scrollTo(0, 0);
        },
    },
};
</script>