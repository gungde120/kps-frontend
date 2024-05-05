<template>
    <div>
        <div class="row mt-4">
            <div class="col mr-4">
                <h3>
                Jadwal
                <strong>Peminjaman</strong>
                Anda
                </h3>

                <input
                    v-model="searchPinjam"
                    type="search"
                    class="form-control text-center"
                    style="max-width: 21rem"
                    placeholder="Cari Tanggal.."
                    aria-label="Cari"
                    aria-describedby="basic-addon1"    
                />
            </div>
        </div>
        <div class="table-responsive mt-3 text-center">
            <table
                class="table table-striped table-bordered"
                data-pagination="true"
                data-search="true"
                data-url="http://localhost:3000/keranjangs"
                data-filter-control="true"
                data-show-search-clear-button="true"
                >
            <thead class="table-dark">
                <tr>
                <th scope="col">No.</th>
                <!-- <th scope="col">Tanggal</th> -->
                <th scope="col">Tanggal</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Email</th>
                <th scope="col">Instansi</th>
                <th scope="col">Ruang</th>
                <th scope="col">Jam</th>
                <th scope="col">Keperluan</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
                <tbody>
                <tr v-for="(keranjang, index) in filteredkeranjangs" :key="keranjang.id">
                    <th v-if="keranjang.email == this.currentUser.email" >{{index+1}}</th>
                        <td v-if="keranjang.email == this.currentUser.email">{{ keranjang.tgl_pinjam}}</td>
                        <td v-if="keranjang.email == this.currentUser.email">{{ keranjang.nama_lengkap }}</td>
                        <td v-if="keranjang.email == this.currentUser.email">{{ keranjang.email }}</td>
                        <td v-if="keranjang.email == this.currentUser.email">{{ keranjang.instansi }}</td>
                        <td v-if="keranjang.email == this.currentUser.email">
                            <strong>{{ keranjang.kodeProduct }}</strong>
                        </td>
                        <td v-if="keranjang.email == this.currentUser.email">{{ keranjang.jam_start }} - {{ keranjang.jam_end }} </td>
                        <td v-if="keranjang.email == this.currentUser.email">{{ keranjang.keterangan ? keranjang.keterangan : "-" }}</td>
                        <td v-if="keranjang.email == this.currentUser.email" class="h6"><strong>{{ keranjang.status }}</strong></td>
                        <td v-if="keranjang.email == this.currentUser.email">
                            <button type="button" class="btn btn-danger mb-2" @click="deleteKeranjang(keranjang.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                            </button>
                        </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";



export default {
    name: "Keranjang",
    data() {
    return {
        keranjangs: [],
        searchPinjam: '',
    };
    },
    methods: {
    
    async getKeranjangs() {
        try {
        const response = await axios.get("http://localhost:3000/keranjangs");
        this.keranjangs = response.data;
        } catch (err) {
        console.log(err);
        }
        },

        async deleteKeranjang(id) {
            try {
                await axios.delete(`http://localhost:3000/keranjangs/${id}`);
                this.getKeranjangs();
            } catch (err) {
                console.log(err);
            }
        },

    setKeranjangs(data) {
        this.keranjangs = data;
    }
    },
    mounted() {
    axios
        .get("http://localhost:3000/keranjangs")
        .then((response) => this.setKeranjangs(response.data))
        .catch((error) => console.log(error));
    },
    computed: {
    currentUser() {
        return this.$store.state.auth.user;
    },

    filteredkeranjangs() {
        if(this.searchPinjam) {
        return this.keranjangs.filter(keranjang => {
            return keranjang.tgl_pinjam.toLowerCase().includes(this.searchPinjam.toLowerCase())
            })
        } else{
            return this.keranjangs;
        }
    }

    },
};
</script>