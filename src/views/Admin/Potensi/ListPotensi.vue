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
                    <li class="breadcrumb-item text-muted" aria-current="page"><router-link to="/admin/potensi">List Kategori Potensi</router-link></li>
                </ol>
            </nav>
        <h3 class="my-3">
            <!-- <router-link to="/admin" class="btn btn-dark mr-1">
                <i class="bi bi-arrow-left"></i>
            </router-link> -->
            List <strong>Kategori Potensi</strong>
        
        </h3>
        <div class="form-inline">
            <input
                v-model="search"
                type="search"
                class="form-control text-center mr-auto"
                style="width: 50vw;"
                placeholder="Cari Kategori Potensi ..."
                aria-label="Cari"
                aria-describedby="basic-addon1"
                />
                <div class="ml-auto btn btn-primary" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#add-modal-lg"><i class="bi bi-plus"></i> Add New</div>
            <AddPotensi/>
        </div>
        <div class="p-0 bg-white mx-auto table-responsive table-striped table-bordered mt-3">
                <table class="table">
                    <thead class="text-center text-nowrap">
                        <tr>
                            <th>ID</th>
                            <th>Kategori Potensi</th>
                            <th>Jumlah Potensi</th>
                            <th>Jumlah Sub DAS</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                        <tbody class="text-center">
                            <tr v-for="(potensi, index) in paginateData" :key="potensi.potensi_id">
                                <th>{{ index+1 }}</th>
                                <td><h5>{{ potensi.potensi_name }}</h5></td>
                                <td data-toggle="modal" :data-target="'#modal-jml-' + potensi.potensi_id" @click="fetchSubDasPotensi(potensi.potensi_id)">
                                    <h5>{{ potensi.jml_potensi_das }}</h5>
                                    <div :id="'modal-jml-' + potensi.potensi_id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">List Potensi Sub Das : <strong>{{ potensi.potensi_name }}</strong></h5>
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
                                                                    <th>Nama Potensi</th>
                                                                    <th>Nama Sub DAS</th>
                                                                    <th>KPS Pengelola</th>
                                                                    <th>Sungai Induk</th>
                                                                    <th>Kecamatan</th>                                                                        
                                                                </tr>
                                                            </thead>
                                                                <tbody class="text-center">
                                                                    <tr v-for="das in das" :key="das.das_id">
                                                                        <th>{{ das.das_id }}</th>
                                                                        <td>{{ das.potensi_das_name }}</td>
                                                                        <td>{{ das.das_name }}</td>
                                                                        <td>{{ das.kps_name }}</td>
                                                                        <td>{{ das.sungai_name }}</td>
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
                                <td data-toggle="modal" :data-target="'#modal-das-' + potensi.potensi_id" @click="fetchSubDasPerPotensi(potensi.potensi_id)">
                                    <h5>{{ potensi.jml_das }}</h5>
                                    <div :id="'modal-das-' + potensi.potensi_id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">List Sub Das Berpotensi <strong>{{ potensi.potensi_name }}</strong></h5>
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
                                                                    <th>Sungai Induk</th>
                                                                    <th>Kecamatan</th>                                                                        
                                                                </tr>
                                                            </thead>
                                                                <tbody class="text-center">
                                                                    <tr v-for="das in das" :key="das.das_id">
                                                                        <th>{{ das.das_id }}</th>
                                                                        <td>{{ das.das_name }}</td>
                                                                        <td>{{ das.kps_name }}</td>
                                                                        <td>{{ das.sungai_name }}</td>
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
                                <td >
                                    <div class="ml-3 my-1 btn btn-warning" data-toggle="modal" :data-target="'#modal-edit-' + potensi.potensi_id"><i class="bi bi-pencil text-white"></i></div>
                                    <div :id="'modal-edit-' + potensi.potensi_id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Edit Data <strong>{{ potensi.potensi_name }}</strong> ? </h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form v-on:submit.prevent @submit="editPotensi(potensi)" aria-required="true" class="">
                                                        <div class="mt-2 mx-3 ">
                                                                <div class="form-group text-left">
                                                                    <label for="validationDefault03">Nama Potensi</label>
                                                                    <input type="text" v-model="potensi.potensi_name" class="form-control shadow mt-2 " id="validationDefault03" required>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col text-left">
                                                                        <input type="submit" value="Simpan" class="btn btn-success mt-3 mb-3">
                                                                    </div>
                                                                    <div class="col text-right">
                                                                        <button type="button" @click="cancelEditing" class="btn btn-secondary mt-3" data-dismiss="modal">Cancel</button>
                                                                    </div>
                                                                </div>
                                                    </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="ml-3 my-1 btn btn-danger" data-toggle="modal" :data-target="'#modal-delete-' + potensi.potensi_id"><i class="bi bi-trash text-white"></i></div>
                                    <div :id="'modal-delete-' + potensi.potensi_id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Apakah anda ingin menghapus potensi <strong>{{ potensi.potensi_name }}</strong> ? </h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-danger mr-auto" @click="deletePotensi(potensi.potensi_id)" data-dismiss="modal">Hapus</button>
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
                        <strong> {{ paginateData.length }} </strong> of <strong> {{ potensi.length }} </strong> data
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
    import AddPotensi from "./AddPotensi.vue";
    import axios from "axios";
    import API_URL from "../../../services/api";


    export default {
    name: "ListSungaiInduk",
    components: {
    Sidebar,
    Navbar,
    AddPotensi,
    },
data() {
    return {
        potensi: [],
        das: [],
        search: '',
        currentPage: 1,
        itemsPerPage: 10,
    };
    },

    created() {
        this.fetchPotensi();
    },

    mounted() {
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
    },

    //Universal search
    filteredData() {
        const filteredPotensi = this.potensi.filter((potensi) => {
            // Search by all in searchbar
            const isSearched = !this.search || Object.values(potensi) 
                .map((val) => String(val).toLowerCase())
                .some((val) => val.includes(this.search.toLowerCase()));
            return isSearched;
        });
        return filteredPotensi;
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
        async fetchPotensi() {
            try {
                const response = await axios.get(API_URL + "/api/potensi");
                this.potensi = response.data.potensi;
            } catch (err) {
                console.log(err);
            }
        },
        async fetchSubDasPotensi(id) {
            try {
                const response = await axios.get(API_URL + "/api/potensi/" + id);
                this.das = response.data.das;
            } catch (err) {
                console.log(err);
            }
        },
        async fetchSubDasPerPotensi(id) {
            try {
                const response = await axios.get(API_URL + "/api/potensi/" + id + "/das");
                this.das = response.data.das;
            } catch (err) {
                console.log(err);
            }
        },
        detail(id) {
            this.$router.push(`/admin/potensi/${id}`)
        },
        cancelEditing() {
            this.$router.go();
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
        async editPotensi(potensi) {
            const id = potensi.potensi_id
            const token = this.currentUser.accessToken;

            const formFields = {
                potensi_name: potensi.potensi_name,
                deskripsi: '',
            };

            const data = new URLSearchParams();
            for (const [key, value] of Object.entries(formFields)) {
                data.append(key, value);
            }

            try {
                await axios.put(API_URL + '/api/potensi/' + id, data, {
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                this.$toast.success(
                    "Berhasil edit data.",
                    {
                    position: "top-right",
                    duration: 3000,
                });
                this.$router.go();
            } catch (err) {
                console.log(err);
                this.$toast.error(
                    "Error edit data.",
                    {
                    position: "top-right",
                    duration: 3000,
                });
            }
        },
        deletePotensi(id) {
            const token = this.currentUser.accessToken;

            try {
                    axios.delete(API_URL + "/api/potensi/" + id,
                    {
                        headers: {
                            'x-access-token': token,
                            'Content-Type': 'multipart/form-data'
                    }
                });

                this.$toast.success(
                    "Berhasil hapus data.",
                    {
                    position: "top-right",
                    duration: 3000,
                });
                this.$router.go();

                } catch (err) {
                    // Handle error
                    console.log(err);
                    this.$toast.error(
                        "Error hapus data.",
                        {
                        position: "top-right",
                        duration: 3000,
                    });
                }
        }
    },
};
</script>