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
                    <li class="breadcrumb-item text-muted" aria-current="page"><router-link to="/admin/sungai">List Sungai Induk</router-link></li>
                </ol>
            </nav>
        <h3 class="my-3">
            <!-- <router-link to="/admin" class="btn btn-dark mr-1">
                <i class="bi bi-arrow-left"></i>
            </router-link> -->
            List <strong>Sungai Induk</strong>
        
        </h3>
        <div class="form-inline">
            <input
                v-model="search"
                type="search"
                class="form-control text-center mr-auto"
                style="width: 50vw;"
                placeholder="Cari Sungai Induk ..."
                aria-label="Cari"
                aria-describedby="basic-addon1"
                />
            <!-- <router-link to="/admin/sungai/add" class="ml-auto btn btn-primary"><i class="bi bi-plus"></i> Add New</router-link> -->
        </div>
        <div class="p-0 bg-white mx-auto table-responsive table-striped table-bordered mt-3">
                <table class="table">
                    <thead class="text-center text-nowrap">
                        <tr>
                            <th>ID</th>
                            <th>Sungai Induk</th>
                            <th>Panjang Sungai</th>
                            <th>Jumlah Sub DAS</th>
                        </tr>
                    </thead>
                        <tbody class="text-center">
                            <tr v-for="sungai in paginateData" :key="sungai.sungai_id" data-toggle="modal" :data-target="'#modal-das-' + sungai.sungai_id" @click="fetchSubDasSungai(sungai.sungai_id)">
                                <th>{{ sungai.sungai_id }}</th>
                                <td>{{ sungai.sungai_name }}</td>
                                <td>{{ sungai.panjang_sungai }} meter</td>
                                <td>
                                    {{ sungai.jml_das }}
                                    <div :id="'modal-das-' + sungai.sungai_id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">List Sub DAS Sungai <strong>{{ sungai.sungai_name }}</strong></h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="bg-white mx-auto table-responsive table-bordered mt-3">
                                                        <table class="table">
                                                            <thead class="text-center text-nowrap">
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>Nama Sub DAS</th>
                                                                    <th>KPS Pengelola</th>
                                                                    <th>Alamat</th>  
                                                                    <th>Kecamatan</th>                                                                  
                                                                </tr>
                                                            </thead>
                                                                <tbody class="text-center">
                                                                    <tr v-for="das in das" :key="das.das_id">
                                                                        <th>{{ das.das_id }}</th>
                                                                        <td>{{ das.das_name }}</td>
                                                                        <td>{{ das.kps_name }}</td>
                                                                        <td>{{ das.alamat }}</td>
                                                                        <td>{{ das.kecamatan }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
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
                        <strong> {{ paginateData.length }} </strong> of <strong> {{ sungai.length }} </strong> data
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
    import API_URL from "../../../services/api";

    export default {
    name: "ListSungaiInduk",
    components: {
    Sidebar,
    Navbar,
    },
data() {
    return {
        sungai: [],
        das: [],
        search: '',
        currentPage: 1,
        itemsPerPage: 10,
    };
    },

    created() {
        this.fetchSungai();
    },

    mounted() {
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
    },

    //Universal search
    filteredData() {
        const filteredSungai = this.sungai.filter((sungai) => {
            // Search by all in searchbar
            const isSearched = !this.search || Object.values(sungai) 
                .map((val) => String(val).toLowerCase())
                .some((val) => val.includes(this.search.toLowerCase()));
            return isSearched;
        });
        return filteredSungai;
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
        async fetchSungai() {
            try {
                const response = await axios.get(API_URL + "/api/sungai");
                this.sungai = response.data.sungai;
            } catch (err) {
                console.log(err);
            }
        },
        async fetchSubDasSungai(id) {
            try {
                const response = await axios.get(API_URL + "/api/sungai/" + id);
                this.das = response.data.das;
            } catch (err) {
                console.log(err);
            }
        },
        detail(id) {
            this.$router.push(`/admin/sungai/${id}`)
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