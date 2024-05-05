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
                    <li class="breadcrumb-item text-muted" aria-current="page"><router-link to="/admin/potensi-das">List Potensi Sub DAS</router-link></li>
                </ol>
            </nav>
        <h3 class="my-3">
            <!-- <router-link to="/admin" class="btn btn-dark mr-1">
                <i class="bi bi-arrow-left"></i>
            </router-link> -->
            List <strong>Potensi Sub DAS</strong>
        
        </h3>
        <div class="form-inline">
            <input
                v-model="search"
                type="search"
                class="form-control text-center mr-auto"
                style="width: 50vw;"
                placeholder="Cari Potensi, Nama Sub DAS, dll ..."
                aria-label="Cari"
                aria-describedby="basic-addon1"
                />
        </div>
        <div class="p-0 bg-white mx-auto table-responsive table-striped table-bordered mt-3">
                <table class="table">
                    <thead class="text-center text-nowrap">
                        <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Sub DAS</th>
                            <th>Nama Potensi</th>
                            <th>Kategori Potensi</th>
                        </tr>
                    </thead>
                        <tbody class="text-center">
                            <tr v-for="potensidas in paginateData" :key="potensidas.id" @click="detail(potensidas.id)">
                                <th>{{ potensidas.id }}</th>
                                <td class="py-2 px-0 justify-content-center align-items-center">
                                    <img :src="'/images/potensi/' + potensidas.thumbnail" class="img-fluid" onerror="this.src='/images/default.png'" style="object-fit: scale-down; width: 100px;">                               
                                </td>
                                <td>{{ potensidas.das_name }}</td>
                                <td>{{ potensidas.potensi_das_name }}</td>
                                <td>{{ potensidas.potensi_name }}</td>
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
                        <strong> {{ paginateData.length }} </strong> of <strong> {{ potensidas.length }} </strong> data
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
    name: "ListPotensiSubDas",
    components: {
    Sidebar,
    Navbar,
    },
data() {
    return {
        potensidas: [],
        search: '',
        currentPage: 1,
        itemsPerPage: 10,
    };
    },

    created() {
        this.fetchPotensiSubDas();
    },

    mounted() {
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
    },

    //Universal search
    filteredData() {
        const filteredPotensiDas = this.potensidas.filter((potensidas) => {
            // Search by all in searchbar
            const isSearched = !this.search || Object.values(potensidas) 
                .map((val) => String(val).toLowerCase())
                .some((val) => val.includes(this.search.toLowerCase()));
            return isSearched;
        });
        return filteredPotensiDas;
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
        async fetchPotensiSubDas() {
            try {
                const response = await axios.get(API_URL + "/api/potensi-das");
                this.potensidas = response.data.potensidas;
            } catch (err) {
                console.log(err);
            }
        },
        detail(id) {
            this.$router.push(`/admin/subdas/potensi/${id}`)
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