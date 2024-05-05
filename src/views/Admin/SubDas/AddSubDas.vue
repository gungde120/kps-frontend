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
                        <li class="breadcrumb-item"><router-link to="/admin/subdas">List Sub DAS</router-link></li>
                    </ol>
                </nav>
                <h4 class="ml-3 mb-3">
                    <!-- <router-link to="/admin/subdas" class="btn btn-dark mr-2">
                        <i class="bi bi-arrow-left"></i>
                    </router-link> -->
                    Add New <strong>Sub DAS</strong>
                </h4>
                <form v-on:submit.prevent @submit="addSubdas" aria-required="true">
                <div class="row mb-4">
                    <div class="col-md-6 col-sm-12 col-lg-8">

                        <label for="imageInput" class="m-0">
                            <img src='/images/default.png'
                                v-show="!editImage"
                                class="radius"
                                onerror="this.src='/images/default.png'"    
                                style="object-fit: scale-down; width: 100%; cursor: pointer;"
                            >
                            <img :src="selectedImage"   
                                v-show="editImage"
                                class="radius"               
                                style="object-fit: scale-down; width: 100%;"
                            >   
                        </label> 
                        
                        <input id="imageInput" type="file" ref="image" class="form-control-file shadow p-3 rounded" @change="uploadImage" accept=".jpg,.jpeg,.png">
                        <button v-if="selectedImage" @click="removeImage" class="btn btn-white" style="position: absolute; bottom: 12px; right: 25px;">
                            <i class="bi bi-trash text-danger"></i>
                        </button>
                        <div v-show="formatError" class="bg-danger w-100 text-white rounded p-3">Only JPEG/PNG accepted with max 5MB size.</div>

                    </div>

                    <div class="col-md-6 col-sm-12 col-lg-4 pt-3">
                        
                            <div class="form-group">
                                <label for="validationDefault03">Nama sub DAS</label>
                                <input type="text" v-model="das_name" class="form-control shadow" id="validationDefault03" required>
                            </div>
                            <div class="form-group">
                                <label for="selectSungai">Sungai Induk : {{ sungai.sungai_id }}</label>
                                <select  class="form-control shadow" id="selectSungai" v-model="sungai.sungai_id" required>
                                    <option></option>
                                    <option v-for="sungai in sungai" :key="sungai.sungai_id" :value="sungai.sungai_id">{{ sungai.sungai_name }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="selectSungai">Kecamatan : {{ kecamatan.kecamatan_id }}</label>
                                <select  class="form-control shadow" id="selectKecamatan" v-model="kecamatan.kecamatan_id" required>
                                    <option></option>
                                    <option v-for="kecamatan in kecamatan" :key="kecamatan.kecamatan_id" :value="kecamatan.kecamatan_id">{{ kecamatan.kecamatan }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">Alamat</label>
                                <input type="text" v-model="alamat" class="form-control shadow" id="validationDefault03" required>
                            </div>
                        
                        
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6 col-sm-12 col-lg-8">
                        <l-map
                            style="height:480px; width: 100%; z-index: 3;" 
                            ref="map" 
                            zoom="13" 
                            :options="{zoomControl: false}"
                            :center="markerLatLng"
                            @click="moveMarker"
                            > 
                        <l-control-layers
                            position="topleft"
                            :collapsed="false"
                            :sort-layers="true"
                        />
                        <l-control-zoom position="topright" style="z-index: 1;"></l-control-zoom>
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
                        <l-marker 
                            :lat-lng="markerLatLng"
                            :draggable="true"
                            @dragend="updateMarkerLatLng"
                        >         
                        </l-marker>
                    </l-map> 
                        
                    </div>

                    <div class="col-md-6 col-sm-12 col-lg-4 pt-3">
                            <div class="form-group">
                                <label for="validationDefault03">Latitude</label>
                                <input type="number" v-model="latitude" class="form-control shadow" required step="0.00001">
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">Longitude</label>
                                <input type="number" v-model="longitude" class="form-control shadow" required step="0.00001">
                            </div>
                            <button type="button" class="btn btn-primary w-100 mt-3" @click="useGPSLocation">Use GPS Location</button>
                    </div>
                </div>
                <div class="mx-3 mb-3">
                    Deskripsi : 
                </div>
                <Quill class="shadow mx-3 mb-5" style="z-index: 999;" :content="deskripsi" @change="onEditorChange($event)"></Quill>
                <input type="submit" value="Add Sub DAS" class="btn btn-success mx-3 mt-5">
            </form>
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
    import { LMap, LTileLayer, LControlLayers, LControlZoom, LMarker} from "@vue-leaflet/vue-leaflet";
    import Quill from "vue-quill-editor/src/editor.vue"

    const tileProviders = [
    {
        name: 'Default Style',
        visible: true,
        attribution:'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
        name: "AddSubDas",

        components: {
            Sidebar,
            Navbar,
            LMap,
            LTileLayer,
            LControlLayers,
            LControlZoom,
            LMarker,
            Quill,
        },

        data() {
            return {
                sungai: [],
                kecamatan: [],
                selectedImage: '',
                deskripsi: '<br><br><br><br>',
                sungai_id: '',
                kecamatan_id: '',
                formatError: false,
                editImage: false,
                latitude: -8.66940,
                longitude: 115.21640,
                attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                markerLatLng: [-8.66940,115.21640],
                zoomLevel: 13,
                tileProviders: tileProviders,
            }
        },

        watch: {
            latitude: function(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.markerLatLng = [newVal, this.longitude];
            }
            },
            longitude: function(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.markerLatLng = [this.latitude, newVal];
            }
            },
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

            //For draggable marker
            updateMarkerLatLng(event) {
                this.markerLatLng = event.target.getLatLng();
                this.latitude = this.markerLatLng.lat.toFixed(5);
                this.longitude = this.markerLatLng.lng.toFixed(5)
            },
            //Move marker if clicked somewhere on map
            moveMarker(event) {
                this.markerLatLng = [event.latlng.lat, event.latlng.lng];
                this.latitude = event.latlng.lat.toFixed(5);
                this.longitude = event.latlng.lng.toFixed(5)
                
            },
            //For using GPS location
            useGPSLocation() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude.toFixed(5);
                this.longitude = position.coords.longitude.toFixed(5);
            });
            },

            async addSubdas() {
                const token = this.currentUser.accessToken;

                const formData = new FormData();

                const formFields = {
                    das_name: this.das_name,
                    sungai_id: this.sungai.sungai_id,
                    kecamatan_id: this.kecamatan.kecamatan_id,
                    user_id: this.currentUser.id,
                    alamat: this.alamat,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    deskripsi: this.deskripsi,
                    thumbnail: this.imageFile
                };

                for (const [key, value] of Object.entries(formFields)) {
                    formData.append(key, value);
                }

                try {
                    const response = await axios.post(API_URL + "/api/das", formData ,
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
                // Get the insertId value from the response
                const insertId = response.data.das.insertId;
                    
                this.$router.push("/admin/subdas/" + insertId);

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


    },
}
</script>