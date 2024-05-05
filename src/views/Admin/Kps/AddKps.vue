<template>
    <div id="add-modal-lg" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add New <strong>KPS</strong> </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                        <form v-on:submit.prevent @submit="addKps" aria-required="true">
                            <div class="row mt-2">
                            <div class="col-md-6 col-sm-12 col-lg-8">
                                <img src='/images/default.png'
                                    v-show="!editImage"
                                    class="radius"
                                    onerror="this.src='/images/default.png'"    
                                    style="object-fit: scale-down; width: 100%;"
                                >
                                <img :src="selectedImage"   
                                    v-show="editImage"
                                    class="radius"               
                                    style="object-fit: scale-down; width: 100%;"
                                >   
                            <input id="imageInput" type="file" ref="image" class="form-control-file shadow p-3 rounded" @change="uploadImage" accept=".jpg,.jpeg,.png">
                            <button v-if="selectedImage" @click="removeImage" class="btn btn-white" style="position: absolute; bottom: 12px; right: 25px;">
                                <i class="bi bi-trash text-danger"></i>
                            </button>
                            <div v-show="formatError" class="bg-danger w-100 text-white rounded p-3">Only JPEG/PNG accepted with max 5MB size.</div>
                        </div>
                        <div class="col-md-6 col-sm-12 col-lg-4 pt-3">                            
                                <div class="form-group">
                                    <label for="validationDefault03">Nama KPS</label>
                                    <input type="text" v-model="kps_name" class="form-control shadow mt-2 w-100" id="validationDefault03" required>
                                </div>
                                <div class="form-group mt-3">
                                    <label for="selectKps">Sub DAS Kelola</label>
                                    <select  class="form-control shadow mt-2 w-100" id="selectKps" v-model="dasId">
                                        <option value="">Kosong</option>
                                        <option v-for="das in das" :key="das.das_id" :value="das.das_id">
                                            {{ das.das_id }} - {{ das.das_name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group mt-3">
                                    <label for="validationDefault03">Tanggal Dibentuk</label>
                                    <input type="date" v-model="tgl_dibentuk" class="form-control shadow mt-2 w-100" id="validationDefault03">
                                </div>
                                <div class="form-group mt-3">
                                    <label for="validationDefault03">Jumlah Anggota</label>
                                    <input type="number" v-model="jml_anggota" class="form-control shadow mt-2 w-100" id="validationDefault03">
                                </div>
                                <div class="form-group mt-3">
                                    <label for="validationDefault03">Link Facebook</label>
                                    <input type="text" v-model="facebook" class="form-control shadow mt-2 w-100" id="validationDefault03">
                                </div>
                                <div class="form-group mt-3">
                                    <label for="validationDefault03">Link Instagram</label>
                                    <input type="text" v-model="instagram" class="form-control shadow mt-2 w-100" id="validationDefault03">
                                </div>                            
                        </div>
                        <div class="mx-3 my-3">
                            Deskripsi : 
                        </div>
                        <div class="shadow mx-3 mb-3 w-100">
                            <Quill style="z-index: 999;" :content="deskripsi" @change="onEditorChange($event)"></Quill>
                        </div>
                        
                        <input type="submit" value="Add New KPS" class="btn btn-success ml-3 mt-2 mb-3">
                    </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Quill from "vue-quill-editor/src/editor.vue";
    import API_URL from "../../../services/api";

export default {
    name: "AddKps",

    components: {
        Quill,
    },

    data() {
    return {
        das: [],
        selectedImage: '',
        editImage: false,
        dasId: "",
        imageFile: null,
        formatError: false,
        deskripsi: '<br><br><br><br>',
        content: '<p>example content</p>',
    };
    },

    mounted() {
        axios
            .get(API_URL + "/api/das/null")
            .then((response) => {this.das = response.data.das;})
            .catch((error) => console.log(error));
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text);
            this.deskripsi = html
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
            removeImage() {
                this.selectedImage = null;
                this.$refs.image.value = null;
                this.editImage = false;
                this.imageFile = null;
            },
            async addKps() {
                const token = this.currentUser.accessToken;
                const formData = new FormData();
                const formFields = {
                    kps_name: this.kps_name,
                    slug: this.kps_name.toLowerCase().replace(/\s+/g, '-'),
                    das_id: this.dasId,
                    user_id: this.currentUser.id,
                    tgl_dibentuk: this.tgl_dibentuk,
                    jml_anggota: this.jml_anggota ? this.jml_anggota : null,
                    facebook: this.facebook ? this.facebook: null,
                    profil_kps: this.deskripsi,
                    logo_kps: this.imageFile ? this.imageFile : '' ,
                    instagram: this.instagram ? this.instagram : null
                };
                for (const [key, value] of Object.entries(formFields)) {
                    formData.append(key, value);
                    console.log(value);
                }
                try {
                    await axios.post(API_URL + "/api/kps", formData ,
                    {
                        headers: {
                            'x-access-token': token,
                            'Content-Type': 'multipart/form-data'
                    }
                });
                this.$toast.success(
                    "Berhasil tambah data.",
                    {
                    position: "top-right",
                    duration: 3000,
                });
                this.$router.go();

                } catch (err) {
                    // Handle error
                    console.log(err);
                    this.$toast.error(
                        "Error tambah data.",
                        {
                        position: "top-right",
                        duration: 3000,
                    });
                }
            },
    }
}
</script>