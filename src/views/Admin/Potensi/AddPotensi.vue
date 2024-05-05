<template>
    <div id="add-modal-lg" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" :my-value="dasValue">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add New<strong> Kategori Potensi</strong> </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                    <form v-on:submit.prevent @submit="addPotensi" aria-required="true" class="">
                        <div class="mt-2 mx-3 ">
                            <div class="form-group text-left">
                                <label for="validationDefault03">Nama Potensi</label>
                                <input type="text" v-model="potensi_name" class="form-control shadow mt-2 w-100 mb-3 " id="validationDefault03" required>
                            </div>
                            <div class="row">
                                <div class="col text-left">
                                    <input type="submit" value="Add New Potensi" class="btn btn-success mt-3 mb-3">
                                </div>
                                <div class="col text-right">
                                    <button type="button" class="btn btn-secondary mt-3" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import API_URL from "../../../services/api";
    // // import Quill from "vue-quill-editor/src/editor.vue";

export default {
    name: "AddPotensi",

    components: {
        // Quill,
    },

    data() {
    return {
        deskripsi: '<br><br><br><br>',
        content: '<p>example content</p>',
    };
    },

    mounted() {
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        // onEditorChange({ quill, html, text }) {
        //     console.log('editor change!', quill, html, text);
        //     this.deskripsi = html
        // },
        async addPotensi() {
            const token = this.currentUser.accessToken;

            const formFields = {
                potensi_name: this.potensi_name,
                deskripsi: '',
            };

            const data = new URLSearchParams();
            for (const [key, value] of Object.entries(formFields)) {
                data.append(key, value);
            }

            try {
                await axios.post(API_URL + '/api/potensi', data, {
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'application/x-www-form-urlencoded'
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