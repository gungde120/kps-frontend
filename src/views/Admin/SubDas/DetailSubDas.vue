<template>
<div>
    <Navbar/>
    
    <div class="row">
        <Sidebar class="h-auto" style="z-index: 0;"></Sidebar> 
        
        <div class="col">
            <div class="container px-2 py-4 bg-white">
                <nav aria-label="breadcrumb" class="mx-3">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link class="" to="/admin">Dashboard</router-link></li>
                        <li class="breadcrumb-item text-muted" aria-current="page"><router-link to="/admin/subdas">List Sub DAS</router-link></li>
                    </ol>
                </nav>

                <h4 v-if="!notFound" class="ml-3 mb-3">
                    <!-- <router-link to="/admin/subdas" class="btn btn-dark mr-2">
                        <i class="bi bi-arrow-left"></i>
                    </router-link> -->
                    Detail <strong>{{ das.das_name }}</strong>
                </h4>
                <h4 v-if="notFound" class="ml-3 mb-3">
                    Data Tidak Ditemukan
                </h4>

                <form v-on:submit.prevent @submit="updateSubDas" aria-required="true">
                
                <div class="row mb-4">
                    <div class="col-md-6 col-sm-12 col-lg-8">
                        <img :src="'/images/das/' + das.thumbnail"
                                v-show="!editImage"
                                class="radius"
                                onerror="this.src='/images/default.png'"    
                                style="object-fit: scale-down; width: 100%;"
                            >
                        <label for="imageInput" class="m-0">
                            <img :src="selectedImage ? selectedImage : '/images/default.png'"   
                                v-show="editImage"
                                class="radius"      
                                onerror="this.src='/images/default.png'"         
                                style="object-fit: scale-down; width: 100%;"
                            >   
                        </label> 
                        
                        <input v-show="editImage" id="imageInput" type="file" ref="image" class="form-control-file shadow p-3 rounded" @change="uploadImage" accept=".jpg,.jpeg,.png">
                        <button v-show="editImage" v-if="selectedImage" @click="removeImage" class="btn btn-white" style="position: absolute; bottom: 12px; right: 25px;">
                            <i class="bi bi-trash text-danger"></i>
                        </button>
                        <div v-if="formatError" class="bg-danger w-100 text-white rounded p-3">Only JPEG/PNG accepted with max 5MB size.</div>

                    </div>

                    <div class="col-md-6 col-sm-12 col-lg-4 pt-3">
                            <div class="form-group">
                                <label for="validationDefault03">Nama sub DAS</label>
                                <div v-show="!edit" id="disabledTextInput" class="form-control bg-gray">{{ das.das_name }}</div>
                                <input v-show="edit" type="text" v-model="das.das_name" class="form-control shadow" id="validationDefault03" required>
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">Sungai Induk</label>
                                <div id="disabledTextInput" class="form-control bg-gray">{{ das.sungai_name }}</div>
                                <select v-show="edit" class="form-control shadow" id="selectSungai" v-model="sungai.sungai_id">
                                    <option value=""></option>
                                    <option v-for="sungai in sungai" :key="sungai.sungai_id" :value="sungai.sungai_id">{{ sungai.sungai_name }}</option>
                                </select>
                                <div v-show="edit" class="text-muted small mt-2">
                                    Kosongkan bila tidak mengubah
                                </div> 
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">Kecamatan</label>
                                <div id="disabledTextInput" class="form-control bg-gray">{{ das.kecamatan }}</div>
                                <select v-show="edit" class="form-control shadow" id="selectKecamatan" v-model="kecamatan.kecamatan_id">
                                    <option></option>
                                    <option v-for="kecamatan in kecamatan" :key="kecamatan.kecamatan_id" :value="kecamatan.kecamatan_id">{{ kecamatan.kecamatan }}</option>
                                </select>
                                <div v-show="edit" class="text-muted small mt-2">
                                    Kosongkan bila tidak mengubah
                                </div> 
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">Alamat</label>
                                <textarea rows="3" readonly v-show="!edit" id="disabledTextInput" class="form-control bg-gray" v-model="das.alamat" style="resize: none;"></textarea>
                                <input v-show="edit" type="text" v-model="das.alamat" class="form-control shadow" id="validationDefault03" required>
                            </div>
                        
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6 col-sm-12 col-lg-8">
                        <div v-if="!edit">
                            <l-map
                            style="height:480px; width: 100%; z-index: 3;" 
                            ref="map" 
                            zoom="12" 
                            :options="{zoomControl: false}"
                            :center="mapCenter"
                            > 
                        <l-control-layers
                            position="topright"
                            :collapsed="false"
                            :sort-layers="true"
                        />
                        <l-control-zoom position="bottomleft" style="z-index: 1;"></l-control-zoom>
                        <l-tile-layer
                            v-for="tileProvider in tileProviders"
                            :key="tileProvider.name"
                            :name="tileProvider.name"
                            :visible="tileProvider.visible"
                            :attribution="attribution"
                            :url="tileProvider.url"
                            layer-type="base"
                            :transparent="true"
                            style="z-index: 2;"
                            >                                    
                        </l-tile-layer>      
                        <l-marker :lat-lng="mapCenter">
                        <l-tooltip>
                            {{ das.das_name }}                                                    
                        </l-tooltip>          
                        </l-marker>
                        </l-map> 
                        </div>
<!-- MAP GAP -->
                        <div v-if="edit">
                            <l-map
                            style="height:480px; width: 100%; z-index: 3;" 
                            ref="map" 
                            zoom="12" 
                            :options="{zoomControl: false}"
                            :center="mapCenter"
                            @click="moveMarker"
                            > 
                        <l-control-layers
                            position="topright"
                            :collapsed="false"
                            :sort-layers="true"
                        />
                        <l-control-zoom position="bottomleft" style="z-index: 1;"></l-control-zoom>
                        <l-tile-layer
                            v-for="tileProvider in tileProviders"
                            :key="tileProvider.name"
                            :name="tileProvider.name"
                            :attribution="attribution"
                            :visible="tileProvider.visible"
                            :url="tileProvider.url"
                            layer-type="base"
                            :transparent="true"
                            style="z-index: 2;"
                            >                                    
                        </l-tile-layer>      
                        <l-marker 
                            :lat-lng="mapCenter"
                            :draggable="true"
                            @dragend="updateMarkerLatLng"
                        >         
                        </l-marker>
                    </l-map> 
                        </div>

                    </div>

                    <div class="col-md-6 col-sm-12 col-lg-4 pt-3">
                            <div class="form-group">
                                <label for="validationDefault03">Latitude</label>
                                <div v-show="!edit" id="disabledTextInput" class="form-control bg-gray">{{ das.latitude }}</div>
                                <input v-show="edit" type="text" v-model="das.latitude" class="form-control shadow" id="validationDefault03" required>
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">Longitude</label>
                                <div v-show="!edit" id="disabledTextInput" class="form-control bg-gray">{{ das.longitude }}</div>
                                <input v-show="edit" type="text" v-model="das.longitude" class="form-control shadow" id="validationDefault03" required>
                            </div>
                            <button v-show="edit" type="button" class="btn btn-primary w-100 mt-3" @click="useGPSLocation">
                                <i class="bi bi-compass"></i> Use GPS Location</button>
                            <button v-show="edit" type="button" class="btn btn-danger w-100 mt-3" @click="resetLocation">
                                <i class="bi bi-arrow-clockwise"></i> Reset To Current Location</button>
                        
                    </div>
                </div>
                <div class="mx-3 mb-3">
                    Deskripsi : 
                </div>
                <div v-show="!edit" class="p-2 m-3 bg-gray" v-html="das.deskripsi" style="border: solid 1px white; border-radius: 5px ;max-height: 480px; overflow-y: auto;"> </div>
                <div v-if="!notFound" v-show="edit">
                    <Quill  class="shadow mx-3 mb-5" style="z-index: 999;" :content="das.deskripsi" @change="onEditorChange($event)"></Quill>
                </div>

                <div v-if="!edit && !notFound" class="mx-3 form-inline">
                    <div class="mr-auto">
                        Potensi
                    </div>
                    <div class="ml-auto btn btn-primary" data-toggle="modal" data-backdrop="static" :my-value="dasValue" data-keyboard="false" data-target="#add-modal-lg">
                        <i class="bi bi-plus"></i> Add New Potensi
                    </div>

                    <AddPotensiSubDas :das="das"></AddPotensiSubDas>
                </div>
                <div v-if="!edit && !notFound" class="bg-white table-responsive table-striped table-bordered m-3 w-auto">
                <table class="table">
                    <thead class="text-center text-nowrap">
                        <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Nama Potensi</th>
                            <th>Kategori Potensi</th>     
                        </tr>
                    </thead>
                        <tbody class="text-center">
                            <tr v-for="potensidas in potensidas" :key="potensidas.id" @click="detailPotensi(potensidas.id)">
                                <th>{{ potensidas.id }}</th>
                                <td class="py-2 px-0 justify-content-center align-items-center">
                                    <img :src="'/images/potensi/' + potensidas.thumbnail" class="img-fluid" onerror="this.src='/images/default.png'" style="object-fit: scale-down; width: 100px;">                               
                                </td>
                                <td>{{ potensidas.potensi_das_name }}</td>
                                <td>{{ potensidas.potensi_name }}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <div v-if="!notFound" class="mx-3  mt-5 form-inline">
                    <div v-show="!edit" @click="editing" class="mr-auto btn btn-info mb-3">
                        <i class="bi bi-pencil"></i> 
                        Edit Data <strong>{{ das.das_name }}</strong> 
                    </div>
                    <div v-show="!edit" class="ml-auto btn btn-secondary mb-3" data-toggle="modal" data-target=".modal-delete">
                        <i class="bi bi-trash"></i> 
                        Delete Data
                    </div>
                    <input type="submit" v-show="edit" value="Save" class="mr-auto btn btn-success">
                        <!-- <i class="bi bi-check"></i> Save
                    </input> -->
                    <div v-show="edit" @click="cancelEditing" class="ml-auto btn btn-danger">
                        <i class="bi bi-x"></i> Cancel
                    </div>
                </div>

            </form>
                <!-- Delete modal -->
                <div v-if="!notFound" class="modal fade modal-delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Apakah anda ingin menghapus data ini?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger mr-auto" @click="deleteSubDas(das.das_id)" data-dismiss="modal">Hapus</button>
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
    import AddPotensiSubDas from "./AddPotensiSubDas.vue";
    import axios from "axios";
    import API_URL from "../../../services/api";
    import Quill from "vue-quill-editor/src/editor.vue"
    import { LMap, LTileLayer, LControlLayers, LControlZoom, LMarker, LTooltip} from "@vue-leaflet/vue-leaflet";

    const tileProviders = [
    {
        name: 'Default Style',
        visible: true,
        attribution:'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
    },
    {
        name: 'Earth Style',
        visible: false,
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: ''
    },
    ];

export default {
    name: "DetailSubDas",

    components: {
        Sidebar,
        Navbar,
        AddPotensiSubDas,
        Quill,

        LMap,
        LTileLayer,
        LControlLayers,
        LControlZoom,
        LMarker,
        LTooltip,
    },

    data() {
    return {
        das: {},
        notFound: false,
        dasValue: '',
        sungai: [],
        kecamatan: [],
        potensidas: [],
        mapCenter: [-8.66940,115.21640],
        originalMapCenter: [],
        tileProviders: tileProviders,
        edit: false,
        editImage: false,
        selectedImage: '',
        imageFile: null,
        attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        content: '<p>example content</p>',
    };
    },

    watch: {
            'das.latitude': function(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.mapCenter = [newVal, this.das.longitude];
            }
            },
            'das.longitude': function(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.mapCenter = [this.das.latitude, newVal];
            }
            },
        },

    created() {
        this.fetchDetailSubDas();
    },

    mounted() {
        axios
            .get(API_URL + "/api/sungai/")
            .then((response) => {this.sungai = response.data.sungai;})
            .catch((error) => console.log(error));

        axios
            .get(API_URL + "/api/kecamatan/")
            .then((response) => {this.kecamatan = response.data.kecamatan;})
            .catch((error) => console.log(error));

        axios
        .get(API_URL + "/api/potensi-das/" + this.$route.params.id)
        .then((response) => {
            this.potensidas = response.data.potensidas;
            // this.notFound = false;
        })
        .catch((error) => {
            // this.notFound = true;
            console.log(error);
        });


        
        // this.mapCenter = [lat, lng];
        

        // console.log('this is current quill instance object', this.myQuillEditor)
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },


    methods: {
        async fetchDetailSubDas() {
            try {
                const response = await axios.get(API_URL + "/api/das/" + this.$route.params.id);
                this.das = response.data;
                // this.notFound = false;
                this.mapCenter = [this.das.latitude, this.das.longitude];
                this.originalMapCenter = [this.das.latitude, this.das.longitude];
                this.selectedImage = '/images/das/' + this.das.thumbnail;
                this.dasValue = this.das.das_id;
            } catch (err) {
                this.notFound = true;
                console.log(err);
            }
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text);
            this.das.deskripsi = html
        },
        detailPotensi(id) {
            this.$router.push(`/admin/subdas/potensi/${id}`)
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
                    //For get image filename
                    this.imageFile = this.$refs.image.files[0];
                } else {
                    // Display error message
                    this.formatError = true;
                    this.selectedImage = null;
                    this.$refs.image.value = null;
                    this.imageFile = null;
                }
            }
        },
        removeImage() {
            this.selectedImage = '/images/das/' + this.das.thumbnail;
            this.$refs.image.value = null;
            this.imageFile = null;
        },

        //For draggable marker
        updateMarkerLatLng(event) {
                this.mapCenter = event.target.getLatLng();
                this.das.latitude = this.mapCenter.lat.toFixed(5);
                this.das.longitude = this.mapCenter.lng.toFixed(5)
            },
        //Move marker if clicked somewhere on map
        moveMarker(event) {
            this.mapCenter = [event.latlng.lat, event.latlng.lng];
            this.das.latitude = event.latlng.lat.toFixed(5);
            this.das.longitude = event.latlng.lng.toFixed(5)
        },
        //For using GPS location
        useGPSLocation() {
            navigator.geolocation.getCurrentPosition((position) => {
            this.das.latitude = position.coords.latitude.toFixed(5);
            this.das.longitude = position.coords.longitude.toFixed(5);
            this.mapCenter = [this.das.latitude, this.das.longitude]
            });
        },
        //For reset location
        resetLocation() {
            this.mapCenter = this.originalMapCenter;
            this.das.latitude = this.originalMapCenter[0];
            this.das.longitude = this.originalMapCenter[1]
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
        //Handle update sub DAS
        async updateSubDas() {
            const token = this.currentUser.accessToken;

            const formData = new FormData();

            const formFields = {
                    das_name: this.das.das_name,
                    sungai_id: this.sungai.sungai_id ? this.sungai.sungai_id : this.das.sungai_id,
                    kecamatan_id: this.kecamatan.kecamatan_id ? this.kecamatan.kecamatan_id : this.das.kecamatan_id,
                    user_id: this.currentUser.id,
                    alamat: this.das.alamat,
                    luas_das: 0,
                    latitude: this.das.latitude,
                    longitude: this.das.longitude,
                    deskripsi: this.das.deskripsi,
                    thumbnail: this.imageFile ? this.imageFile : null,
            };

            //Update the thumbnail only if change thumbnail
            // if (this.imageFile) {
            //     formFields.thumbnail = this.imageFile;
            // }

            for (const [key, value] of Object.entries(formFields)) {
                formData.append(key, value);
            }

            try {
                    await axios.put(API_URL + "/api/das/" + this.das.das_id, formData ,
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
                this.editImage = false;
                

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

        deleteSubDas(id) {
            const token = this.currentUser.accessToken;

            try {
                    axios.delete(API_URL + "/api/das/" + id,
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
                // this.$toast.error("Sukses Delete Sub DAS", {
                //         type: "error",
                //         position: "top-right",
                //         duration: 3000,
                //         dismissible: true,
                //     });
                this.$router.push("/admin/subdas");

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

}
</script>