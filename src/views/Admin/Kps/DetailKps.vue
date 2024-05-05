<template>
<div>
    <Navbar/>

<div class="row">
    <Sidebar class="h-auto" style="z-index: 0;"></Sidebar> 

    <div class="col">
        <div class="container px-2 py-4 bg-white">
            <nav aria-label="breadcrumb" class="mx-3">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link to="/admin">Dashboard</router-link></li>
                    <li class="breadcrumb-item"><router-link to="/admin/kps">List KPS</router-link></li>
                </ol>
            </nav>
            <h4 v-if="!notFound" class="ml-3 mb-3">
                <!-- <router-link to="/admin/kps" class="btn btn-dark mr-2 mb-2">
                    <i class="bi bi-arrow-left"></i>
                </router-link> -->
                Detail <strong>{{ kps.kps_name }}</strong>
            </h4>
            <h4 v-if="notFound" class="ml-3 mb-3">
                Data Tidak Ditemukan
            </h4>

            <form v-on:submit.prevent @submit="updateKps" aria-required="true">

            <div class="row mb-4">
                <div class="col-md-6 col-sm-12 col-lg-8">
                    <img :src="'/images/logo/' + kps.logo_kps"
                            v-show="!editImage"
                            class="radius"
                            onerror="this.src='/images/icon.ico'"    
                            style="object-fit: scale-down; width: 100%;"
                        >
                    <label for="imageInput" class="m-0">
                        <img :src="selectedImage ? selectedImage : '/images/icon.ico'"   
                            v-show="editImage"
                            class="radius" 
                            onerror="this.src='/images/icon.ico'"               
                            style="object-fit: scale-down; width: 100%;"
                        >   
                    </label> 
                    
                    <input v-show="editImage" id="imageInput" type="file" ref="image" class="form-control-file shadow p-3 rounded" @change="uploadImage" accept=".jpg,.jpeg,.png">
                    <button v-show="editImage" v-if="imageFile" @click="resetImage" class="btn btn-white" style="position: absolute; bottom: 12px; right: 75px;">
                        <i class="bi bi-repeat text-danger"></i>
                    </button>
                    <button v-show="editImage" v-if="selectedImage" @click="removeImage" class="btn btn-white" style="position: absolute; bottom: 12px; right: 25px;">
                        <i class="bi bi-trash text-danger"></i>
                    </button>
                    <div v-show="formatError" class="bg-danger w-100 text-white rounded p-3">Only JPEG/PNG accepted with max 5MB size.</div>
                </div>
                <div class="col-md-6 col-sm-12 col-lg-4 pt-3">
                        <div class="form-group">
                            <label for="validationDefault03">Nama KPS</label>
                            <div v-show="!edit" id="disabledTextInput" class="form-control bg-gray">{{ kps.kps_name }}</div>
                            <input v-show="edit" type="text" v-model="kps.kps_name" class="form-control shadow" id="validationDefault03" required>
                        </div>
                        <div class="form-group">
                            <label for="validationDefault03">Sub DAS Kelola</label>
                            <div id="disabledTextInput" class="form-control bg-gray">{{ kps.das_name }}</div>
                            <select v-show="edit" class="form-control shadow" id="selectDas" v-model="dasId">
                                <option value="">Kosong</option>
                                <option v-for="das in das" :key="das.das_id" :value="das.das_id">
                                    {{ das.das_id }} - {{ das.das_name }}
                                </option>
                            </select>
                            <div v-show="edit" class="text-muted small mt-2">
                                Kosongkan bila tidak mengubah
                            </div> 
                        </div>
                        <div class="form-group">
                            <label for="validationDefault03">Tanggal Dibentuk</label>
                            <div id="disabledTextInput" class="form-control bg-gray">{{ formattedDate(kps.tgl_dibentuk) }}</div>
                            <input v-show="edit" type="date" v-model="kps.tgl_dibentuk" class="form-control shadow" id="validationDefault03">
                            <div v-show="edit" class="text-muted small mt-2">
                                Kosongkan bila tidak mengubah
                            </div> 
                        </div>
                        <div class="form-group">
                            <label for="validationDefault03">Jumlah Anggota</label>
                            <div v-show="!edit" id="disabledTextInput" class="form-control bg-gray">{{ kps.jml_anggota }}</div>
                            <input v-show="edit" type="text" v-model="kps.jml_anggota" class="form-control shadow" id="validationDefault03">
                        </div>
                        <div class="form-group">
                            <label for="validationDefault03">Link Facebook</label>
                            <textarea rows="3" readonly v-show="!edit" id="disabledTextInput" class="form-control bg-gray" v-model="kps.facebook" style="resize: none;"></textarea>
                            <input v-show="edit" type="text" v-model="kps.facebook" class="form-control shadow" id="validationDefault03">
                        </div>
                        <div class="form-group">
                            <label for="validationDefault03">Link Instagram</label>
                            <textarea rows="3" readonly v-show="!edit" id="disabledTextInput" class="form-control bg-gray" v-model="kps.instagram" style="resize: none;"></textarea>
                            <input v-show="edit" type="text" v-model="kps.instagram" class="form-control shadow" id="validationDefault03">
                        </div>
                </div>

            </div>
            <div class="mx-3 mb-3">
                Deskripsi :
            </div>
            <div v-show="!edit" class="p-2 m-3 bg-gray" v-html="kps.profil_kps" style=" border: solid 1px white; border-radius: 5px ;max-height: 480px; overflow-y: auto;"> </div>
            <div v-show="edit">
                <Quill class="shadow mx-3 mb-5" style="z-index: 999;" :content="kps.profil_kps" @change="onEditorChange($event)"></Quill>
            </div>

            <div v-if="!notFound" class="mx-3 mt-5 form-inline">
                <div v-if="!edit" @click="editing" class="mr-auto btn btn-info mb-3">
                    <i class="bi bi-pencil"></i> 
                    Edit Data <strong>{{ kps.kps_name }}</strong> 
                </div>
                <div v-if="!edit" class="ml-auto btn btn-secondary mb-3" data-toggle="modal" data-target=".modal-delete">
                    <i class="bi bi-trash"></i> 
                    Delete Data
                </div>
                <input type="submit" v-if="edit" value="Save" class="mr-auto btn btn-success">
                <div v-if="edit" @click="cancelEditing" class="ml-auto btn btn-danger">
                    <i class="bi bi-x"></i> Cancel
                </div>
            </div>

        </form>
            <!-- Delete modal -->
            <div class="modal fade modal-delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Apakah anda ingin menghapus data ini?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger mr-auto" @click="deleteKps(kps.kps_id)" data-dismiss="modal">Hapus</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
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
    import API_URL from "../../../services/api";
    import Quill from "vue-quill-editor/src/editor.vue";

export default {
    name: "DetailKps",

    components: {
        Sidebar,
        Navbar,
        Quill,
    },

    data() {
    return {
        notFound: false,
        kps: {},
        das: [],
        dasId: "",
        edit: false,
        editImage: false,
        selectedImage: '',
        imageFile: null,
        content: '<p>example content</p>',
    };
    },

    created() {
        this.fetchDetailKps();
    },

    mounted() {
        axios
            .get(API_URL + "/api/das/null/")
            .then((response) => {this.das = response.data.das;})
            .catch((error) => console.log(error));
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        async fetchDetailKps() {
            try {
                const response = await axios.get(API_URL + "/api/kps/id/" + this.$route.params.id);
                this.kps = response.data;
                this.notFound = false;
                this.selectedImage = '/images/logo/' + this.kps.logo_kps
            } catch (err) {
                this.notFound = true;
                console.log(err);
            }
        },
        formattedDate(dateString) {
            if (dateString && !isNaN(Date.parse(dateString))) {
                const date = new Date(dateString)
                const day = date.getDate()
                const month = date.toLocaleString('default', { month: 'long' })
                const year = date.getFullYear()
                return `${day} ${month} ${year}`
            } else {
                return ''
            }
        },
        //Universal element edits
        editing() {
            this.edit = !this.edit;
            this.editImage = !this.editImage;
        },
        cancelEditing() {
            this.edit = !this.edit;
            this.editImage = !this.editImage;
            this.$router.go();
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text);
            this.kps.profil_kps = html
        },
        uploadImage(event) {
            const input = event.target;
            if (input.files && input.files[0]) {
                const fileType = input.files[0].type;
                const fileSize = input.files[0].size;

                if (fileType === 'image/jpeg' || fileType === 'image/png'  && fileSize <= 5242880) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        // For get image place in folder
                        this.selectedImage = e.target.result;
                    };
                    reader.readAsDataURL(input.files[0]);
                    this.formatError = false;
                    this.editImage = true;
                    //For get image filename
                    this.imageFile = this.$refs.image.files[0];
                } else {
                    // Display error message
                    this.formatError = true;
                    this.editImage = false;
                    this.selectedImage = null;
                    this.$refs.image.value = null;
                    this.imageFile = null;
                }
            }
        },
        resetImage() {
            this.selectedImage = '/images/logo/' + this.kps.logo_kps;
            this.$refs.image.value = null;
            this.imageFile = null;
        },
        removeImage() {
            // this.selectedImage = '/images/logo/' + this.kps.logo_kps;
            this.$refs.image.value = null;
            this.imageFile = null;
            this.selectedImage = null;
        },
        //Handle update sub DAS
        async updateKps() {
            const token = this.currentUser.accessToken;

            const formData = new FormData();

            const formFields = {
                    kps_name: this.kps.kps_name,
                    slug: this.kps.kps_name.toLowerCase().replace(/\s+/g, '-'),
                    das_id: this.dasId ? this.dasId : this.kps.das_id,
                    user_id: this.currentUser.id,
                    tgl_dibentuk: this.kps.tgl_dibentuk,
                    jml_anggota: this.kps.jml_anggota,
                    facebook: this.kps.facebook ? this.kps.facebook : null,
                    profil_kps: this.kps.profil_kps,
                    logo_kps: this.imageFile ? this.imageFile : null,   
                    instagram: this.kps.instagram ? this.kps.instagram : null                 
            };

            for (const [key, value] of Object.entries(formFields)) {
                formData.append(key, value);
            }

            try {
                await axios.put(API_URL + "/api/kps/" + this.kps.kps_id, formData ,
                {
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'multipart/form-data'
                }
            });

            this.$toast.success(
                "Berhasil edit data.",
                {
                position: "top-right",
                duration: 3000,
            });

            this.$router.go();
            this.edit = false;
            this.selectedImage = '';
                
            } catch (err) {
                // Handle error
                console.log(err);
                this.$toast.error(
                    "Error edit data.",
                    {
                    position: "top-right",
                    duration: 3000,
                });
            }
        },
        deleteKps(id) {
            const token = this.currentUser.accessToken;

            try {
                    axios.delete(API_URL + "/api/kps/" + id,
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
                this.edit = false;
                this.selectedImage = '';
                this.editImage = false;
                this.$router.push("/admin/kps/");

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
    }
}
</script>