<template>
<div>
    <div class="sticky-top" style="z-index: 0;">
        <Navbar/>
    </div>
    <!-- <div class="goto-table-button">
        <button class="pagination-button" v-on:click="smoothScroll('section-tabel')">Go To Table</button>
    </div> -->
    <div class="sticky-top" style="z-index: 999;">
        <nav class="form-inline navbar navbar-primary bg-dark w-100" style="height: 60px;">
                        <button @click="sidebarCollapse" type="button" class="btn btn-black round" title="Filter Menu" style="position: absolute;">
                            <span class="d-none d-md-block d-lg-block"><i class="fas fa-filter"></i>
                                    &nbsp;
                                    Menu
                            </span>
                            <i class="fas fa-filter d-sm-block d-md-none d-lg-none"></i>
                        </button>
                    
                        <input
                        v-model="search"
                        type="search"
                        class="form-control text-center my-1 mx-auto"
                        style="position: absolute; left: 19.5%; width: 60vw; border-radius: 100px; height: 36px; font-size: small;"
                        placeholder="Cari Nama KPS, Alamat dll..."
                        aria-label="Cari"
                        aria-describedby="basic-addon1"
                        @input="searchData"
                        />

                        <button v-show="!sectionTable" v-on:click="smoothScroll('section-card')" type="button" class="btn btn-black round" title="Go To List" style="position: absolute; right: 15px;">
                            <i  class="fas fa-table"></i>
                        </button>

                        <button v-show="sectionTable" v-on:click="smoothScroll('section-map')" type="button" class="btn btn-black ml-auto round" title="Go To Map" style="position: absolute; right: 15px;">
                            <i class="bi bi-map-fill"></i>
                        </button>
        </nav>

        <div id="result-bar" v-show="search" class="bg-light text-left" style="position:absolute; top:47px; left: 19.5%; border-radius: 20px; max-height: 225px; overflow-y: hidden; width: 60vw ;z-index: 999;">
            <div v-for="(das, index) in paginateData.slice(0, 4)" :key="index">
                <router-link class="text-dark" :to="{ name: 'DetailPeta', params: { id: das.das_id, kpsname: das.slug}}">
                    <div class="btn btn-light text-left pt-2 pb-1" style="max-height:180px; overflow-y: hidden;border-radius: 20px;width: 100%;">
                        <img
                            :src="'/images/logo/' + das.logo_kps"  
                            onerror="this.src='/images/icon.ico'"                       
                            style="object-fit: scale-down; width: 20px;"
                            >   
                        <label class="ml-3 small" style="cursor: pointer;">{{ das.kps_name }}</label>
                    </div>
                </router-link>   
            </div>
        </div>

    </div>
    
    <div class="row bg-light">

        <div class="col-mr-auto">
            <div class="row h-100 bg-light" style="position: relative;" >
                <div v-if="showAdminBoard" style="z-index: 99;">
                    <Sidebar />
                </div>
                <!-- filter menu -->
                <div class="bg-dark" v-if="!collapsed" style="left: 100%; z-index: 998;">
                    <div id="sidebar-container" class="sticky-top" :class="{'sidebar-collapsed': collapsed, 'sidebar-expanded': !collapsed}" style="top: 60px; max-height: 80vh; overflow-y: auto; width:220px; font-size: small; ">
                        <ul class="list-group sticky-top" style="overflow-y: auto;">
                            <label class="list-group-item list-group-item-action m-0">
                                <div class="d-flex w-100 justify-content-start align-items-center text-dark" >
                                    <!-- <span class="bi bi-compass fa-fw ml-1 mr-1"></span> -->
                                    <input type="radio" class="ml-2 mr-4" v-model="selectedTile" 
                                        value="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
                                    > 
                                    <span class="small ml-1" v-show="!collapsed">Default Map Style</span>
                                </div>
                            </label>
                            <label class="list-group-item list-group-item-action m-0">
                                <div class="d-flex w-100 justify-content-start align-items-center text-dark">
                                <!-- <span class="bi bi-geo-alt-fill fa-fw ml-1 mr-1"></span> -->
                                <input type="radio" class="ml-2 mr-4" v-model="selectedTile"
                                    value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    > 
                                <span class="small ml-1" v-show="!collapsed">Earth Map Style</span>
                                </div>
                            </label>

                            <li v-show="!collapsed" class="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                                <small class="text-white" v-show="!collapsed">Watershed</small>
                            </li>

                            <label class="list-group-item list-group-item-action m-0">
                                <div class="d-flex w-100 my-1 justify-content-start align-items-center text-dark">
                                <!-- <span class="bi bi-geo-alt-fill fa-fw ml-1 mr-1"></span> -->
                                <button class="btn btn-secondary ml-1" v-if="!show" @click="showGeoJson"></button>
                                <button class="btn btn-success ml-1" v-if="show" @click="hideGeoJson"></button>
                                <!-- <input type="checkbox" class="ml-2 mr-4" v-model="show" @change="toggleGeoJson">  -->
                                <span class="small ml-4" v-show="!collapsed">Show River Network</span>
                                <!-- <span class="small ml-1" v-show="!collapsed">Hide River Network</span> -->
                                </div>
                            </label>

                            <div class="bg-dark list-group-item flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-start align-items-center text-white">
                                    <span class="bi bi-globe-central-south-asia mr-4 ml-1"></span>
                                    <small>Filter Kecamatan</small>
                                </div>
                            </div>
                            <!-- Submenu content -->
                            <label class="bg-light m-0" v-for="kecamatan in kecamatan" :key="kecamatan.kecamatan_id">
                                <div class="list-group-item list-group-item-action form-inline d-flex">
                                    <input type="checkbox" class="ml-1 mr-4" :value="kecamatan.kecamatan" v-model="selectedKecamatan" @change="updateSelectedKecamatan"> 
                                    <span class="small mr-2">{{ kecamatan.kecamatan }}</span>
                                    <span v-if="getFilteredKecamatanTotal(kecamatan.kecamatan)" class="badge badge-primary badge-pill ml-auto">{{ getFilteredKecamatanTotal(kecamatan.kecamatan) }}</span>
                                </div>
                            </label>
                                    
                            <!-- with collapsed -->
                                    <!-- <a href="#potensi" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-start align-items-center text-white">
                                            <span class="bi bi-stars mr-4 ml-2"></span>
                                            <small class="menu-collapsed">Potensi</small>
                                    <span class="bi bi-caret-down-fill ml-auto"></span>
                                </div>
                            </a>
                            <label id='potensi' class="collapse sidebar-submenu bg-light m-0" v-for="potensi in potensi" :key="potensi.potensi_id">
                                <div class="list-group-item list-group-item-action form-inline d-flex">
                                    <input type="checkbox" class="menu-collapsed ml-2 mr-4" :value="potensi.potensi_name" v-model="selectedPotensi" @change="updateSelectedPotensi"> 
                                    <span class="small mr-2">{{ potensi.potensi_name }}</span>
                                    <span v-if="getFilteredPotensiTotal(potensi.potensi_name) > 0" class="badge badge-primary badge-pill ml-auto">{{ getFilteredPotensiTotal(potensi.potensi_name) }}</span>
                                </div>
                            </label> -->         

                            <div class="bg-dark list-group-item flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-start align-items-center text-white">
                                    <span class="bi bi-stars mr-4 ml-1"></span>
                                    <small>Filter Potensi</small>
                                </div>
                            </div>
                            <!-- Submenu content -->
                            <label class="bg-light m-0" v-for="potensi in potensi" :key="potensi.potensi_id">
                                <div class="list-group-item list-group-item-action form-inline d-flex">
                                    <input type="checkbox" class="ml-1 mr-4" :value="potensi.potensi_name" v-model="selectedPotensi" @change="updateSelectedPotensi"> 
                                    <span class="small mr-2">{{ potensi.potensi_name }}</span>
                                    <span v-if="getFilteredPotensiTotal(potensi.potensi_name) > 0" class="badge badge-primary badge-pill ml-auto">{{ getFilteredPotensiTotal(potensi.potensi_name) }}</span>
                                </div>
                            </label>

                            <div class="bg-dark list-group-item flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-start align-items-center text-white">
                                    <span class="bi bi-water mr-4 ml-1"></span>
                                    <small class="menu-collapsed mr-3">Filter Sungai Induk</small>
                                </div>
                            </div>
                            <!-- Submenu content -->
                            <label id='sungai' class="sidebar-submenu bg-light m-0" v-for="sungai in sungai" :key="sungai.sungai_id" >
                                <div class="list-group-item list-group-item-action form-inline d-flex">
                                    <input type="checkbox" class="ml-1 mr-4" :value="sungai.sungai_name" v-model="selectedSungai" @change="updateSelectedSungai">
                                    <span class="small mr-2">{{ sungai.sungai_name }}</span>
                                    <span v-if="getFilteredSungaiTotal(sungai.sungai_name) > 0" class="badge badge-primary badge-pill ml-auto">{{ getFilteredSungaiTotal(sungai.sungai_name) }}</span>
                                </div>
                            </label>                                  
                        </ul>
                    </div>
                </div>
            </div>    
        </div>

        <div class="col">
<section id='section-map'>
                <div class="row">

                    <!-- MAP -->
                    <l-map
                        style="height:545px; width: 100%; z-index: 3;" 
                        ref="myMap" 
                        :zoom="zoom" 
                        :options="{zoomControl: false}"
                        :center="mapCenter"
                        > 
                    <l-control-zoom position="topright" style="z-index: 1;"></l-control-zoom>
                    <!-- <l-wms-tile-layer
                        key="Saluran Irigasi"
                        url="https://api.npoint.io/477b73d9496c806eef7a"
                        layers="layer"
                        :visible="true"
                        name="Saluran Irigasi"
                        layer-type="layer"
                        style="z-index: 999"
                    /> -->
                    <div v-show="show">
                        <l-geo-json
                        :geojson="geojson" 
                        style="z-index: 1; opacity: 0.1;"
                        :style="style"
                        color="green"
                    ></l-geo-json>
                    </div>
                    
                    <l-tile-layer
                        :url="selectedTile"
                        layer-type="layer"
                        :attribution="attribution"
                        :transparent="true"
                        style="z-index: 2;"
                        >                                    
                    </l-tile-layer>  
                        <l-marker v-for="(das, id) in filteredData" :key = "id" :lat-lng="latLng(das.latitude, das.longitude)">
                        <!-- <l-icon 
                            :icon-url ="das.logo_kps !== null && das.logo_kps !== '' ? '/images/logo/' + das.logo_kps : '/images/icon.ico'" 
                            :icon-size = "[40,40]"
                        >
                        </l-icon>  -->
                        <l-tooltip :options="{ permanent: true, direction: 'center' }">
                            {{ das.kps_name }}                                                    
                        </l-tooltip>  
                        <l-popup ref="myPopup">
                                <div style="text-align:center">
                                <img :src="'/images/logo/' + das.logo_kps" onerror="this.src='/images/icon.ico'" style="position: absolute; left: -30px; top: -30px;object-fit: scale-down; width: 80px;">  
                                </div>

                                <div style="text-align:center">
                                    <img class="border-radius mb-2" :src="'/images/das/' + das.thumbnail" onerror="this.src='/images/default.png'" style="object-fit: scale-down; width: 100%; min-width: 180px;">    
                                </div>
                                <router-link class="btn btn-success d-block text-white" :to="{ name: 'DetailPeta', params: { id: das.das_id, kpsname: das.slug}}"><small>{{ das.kps_name }} &nbsp; <i class="bi bi-arrow-right"></i></small></router-link>
                        </l-popup>              
                    </l-marker>
                    
                    </l-map> 

                
                
                </div>
</section>
            
<section id='section-card'>    
            <!-- LIST DAS -->
            
            <div class="form-inline bg-dark text-white pt-3 px-3 pb-2" v-on:click="smoothScroll('section-card')" style="cursor: pointer;">
                <span class="mr-auto">
                    
                    <h4 v-if="isEmpty">
                        Data<strong> Tidak Ditemukan</strong>
                    </h4>
                    
                    <h4 v-else>
                        List<strong> Data</strong>
                    </h4>
                
                </span>
                <span class="ml-auto"><h4 class="bi bi-caret-down-fill"></h4></span>
            </div>
            

        
            <div class="col bg-light" ref="sectionTable">    
                <!-- table hide on mobile -->
                <div class="container p-0 bg-white mx-auto d-none d-lg-block d-md-block table-responsive table-striped table-bordered my-3">
                <table class="table">
                    <thead class="text-center text-nowrap">
                        <tr>
                            <th>No</th>
                            <th>Thumbnail</th>
                            <th>Logo KPS</th>
                            <th>Nama Sub DAS</th>
                            <th>KPS Pengelola</th>
                            <!-- <th>Sungai Induk</th> -->
                            <th>Alamat</th>
                            <th>Kecamatan</th>
                            <!-- <th>Luas DAS</th> -->
                            <!-- <th>Latitude</th>
                            <th>Longitude</th> -->
                            <th>Potensi</th>
                        </tr>
                    </thead>
                        <tbody class="text-center">
                            <tr v-for="das in paginateData" :key="das.das_id" >
                                <th>{{ das.das_id }}</th>
                                <td class="py-2 px-0 justify-content-center align-items-center">
                                    <img
                                    :src="'/images/das/' + das.thumbnail"  
                                    class="img-fluid"            
                                    onerror="this.src='/images/default.png'"                 
                                    style="object-fit: scale-down; width: 500px;"
                                    >                               
                                </td>
                                <td>
                                    <img
                                    :src="'/images/logo/' + das.logo_kps"  
                                    onerror="this.src='/images/icon.ico'"                       
                                    style="object-fit: scale-down; width: 100px; "
                                    >                               
                                </td>
                                <td><router-link class="text-dark" :to="{ name: 'DetailPeta', params: { id: das.das_id, kpsname: das.slug}}">{{ das.das_name }}</router-link></td>
                                <td><router-link class="text-dark" :to="{ name: 'DetailPeta', params: { id: das.das_id, kpsname: das.slug}}">{{ das.kps_name }}</router-link></td>
                                <!-- <td>{{ das.sungai_name }}</td> -->
                                <td @click="changeMapCenter(das.latitude, das.longitude)">{{ das.alamat }}</td>
                                <td>{{ das.kecamatan }}</td>
                                <!-- <td>{{ das.luas_das }}</td> -->
                                <!-- <td @click="changeMapCenter(das.latitude, das.longitude)">{{ das.latitude }}</td>
                                <td @click="changeMapCenter(das.latitude, das.longitude)">{{ das.longitude }}</td> -->
                                <td>{{ das.jml_potensi}}</td>   
                                <!-- <td v-if="paginateData.length = 0">Data Tidak Ditemukan</td>                                              -->
                            </tr>
                        </tbody>
                        </table>
                        
                        <!-- <div class="pagination-container mt-3 mb-3">
                            <button class="pagination-button" v-if="currentPage > 1" @click="previousPage">Previous</button>                           
                            <span class="pagination-page-number" v-for="n in totalPages" :key="n" @click="goToPage(n)" :class="{ 'active': n === currentPage }">{{ n }}</span>
                            <button class="pagination-button" v-if="currentPage < totalPages" @click="nextPage">Next</button>
                        
                            <select v-model="itemsPerPage" class="pagination-button">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>

                            <div class="data-length">
                                {{ paginateData.length }} of {{ totalData }} data
                            </div>
                    </div> -->
                    
                </div>
                
                

                <div v-if="isEmpty" class="card align-items-center d-md-none mx-3 mb-3 mt-3" style="overflow: hidden;">
                    <div class="align-items-center">
                                <div class="col text-center">
                                    <img src="/images/default.png" style=" border-radius: 5px; object-fit: scale-down; width: 100%;">
                                </div>
                                
                    </div>
                </div>

                <div class="align-items-center justify-content-center mt-1 mb-3 mx-3 d-md-none " v-for="das in filterId" :key="das.das_id">
                <!-- <Card :das="das" /> -->
                
                        <div class="card align-items-center d-lg-none d-md-none shadow mt-3" style="width: 100%;">
                            
                            <div class="align-items-center">
                                <div class="col text-center">
                                    <img :src=" '/images/logo/' + das.logo_kps" class="card-img-logo" onerror="this.src='/images/icon.ico'" style="position: absolute; top:25%; left: 35%; object-fit: scale-down; width: 30%; z-index:1;">
                                    <img :src=" '/images/das/' + das.thumbnail" class="card-img" onerror="this.src='/images/default.png'" style=" border-radius: 5px; object-fit: scale-down; width: 100%;">
                                </div>
                                <div class="col">
                                    <div class="card-body">
                                    <small>
                                    <strong>{{ das.kps_name }}</strong>
                                    </small>
                                    <!-- <br>
                                    <small>
                                    {{ das.alamat }}
                                    </small> -->
                                    <br>
                                    <small>
                                    Jumlah Potensi : <strong>{{ das.jml_potensi }}</strong>
                                    </small>
                                    </div>
                                    <router-link :to="{ name: 'DetailPeta', params: { id: das.das_id, kpsname: das.slug}}" class="card-footer text-center py-1 mb-0 h5 d-block bg-primary text-white" style="height: fit-content;">
                                        <label style="cursor: pointer;"><small>Detail &nbsp; <i class="bi bi-arrow-right"></i></small> </label>
                                    </router-link>
                                </div> 
                            </div>
                            
                            
                            
                                
                        </div>
                    </div>

                    <div class="d-none d-lg-block d-md-block">
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
                        <strong> {{ paginateData.length }} </strong> of <strong> {{ totalData }} </strong> data
                    </div>        
                    </div>
                </div>

                    
            </div>       
</section>
        </div> 
    </div>

    <FooterKPS></FooterKPS>
</div>
</template>

<script>
    import axios from "axios";
    import API_URL from "../services/api";
    // import Card from "@/components/Card.vue";
    // import geo from "./../data/Jaringan_Irigasi_LN.geojson";
    import "leaflet/dist/leaflet.css";
    import L from 'leaflet';
    import { LMap, LTileLayer, LGeoJson, LControlZoom,LMarker, LTooltip, LPopup} from "@vue-leaflet/vue-leaflet";
    import Navbar from "@/components/Navbar.vue";
    import Sidebar from '@/components/Sidebar.vue';
    import FooterKPS from "@/components/Footer.vue";

    export default {
    name: "Peta",
    components: {
        // Card,
        LMap,
        LTileLayer,
        LGeoJson,
        LControlZoom,
        LMarker,
        
        LTooltip,
        LPopup,
        Navbar,
        Sidebar,
        FooterKPS,
    },
    data() {
        return {
            result: [],
            sungai: [],
            kecamatan: [],
            potensi: [],
            location: [],
            collapsed: true,
            search: '',
            selectedSungai: [],
            selectedKecamatan: [],
            selectedPotensi: [],
            // selectedTile: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
            selectedTile: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            show: false,
            geojson: null,
            geojsonsaver: null,
            selectedOption: "",
            currentPage: 1,
            itemsPerPage: 10,
            zoom: 13,
            mapCenter: [-8.6694,115.2164],
            fillColor: "#e4ce7f",
            sectionTable: false,
            sectionTableEl: null,
        };
    },
    watch: {
        search(val) {
            if (val) {
                this.checkResultBarVisibility();
                document.getElementById("result-bar").style.display = "block";
            } else {
                document.getElementById("result-bar").style.display = "none";
            }
        },
    },
    created() {
    },
    mounted() {
        this.$toast.success(
            'Klik Icon Filter "Menu" pada pojok kiri atas untuk filterisasi data.',
            {
            position: "bottom-left",
            duration: 3000,    
        });
        this.$toast.success(
            'Klik Icon Tabel pada pojok kanan atas untuk menuju tabulasi data.',
            {
            position: "bottom-right",
            queue: true,
            duration: 3000,    
        });

        window.scrollTo(0, 0);

        this.sectionTableEl = this.$refs.sectionTable;
        this.checkShowButton();
        window.addEventListener("scroll", this.checkShowButton);

        setTimeout (() => {
            axios
            .get(API_URL + "/api/all")
            .then((response) => this.result = response.data.result)
            .catch((error) => console.log(error));
        },1000);

        axios
        .get(API_URL + "/api/sungai")
        .then((response) => this.sungai = response.data.sungai)
        .catch((error) => console.log(error));

        axios
        .get(API_URL + "/api/kecamatan")
        .then((response) => this.kecamatan = response.data.kecamatan)
        .catch((error) => console.log(error));

        axios
        .get(API_URL + "/api/potensi")
        .then((response) => this.potensi = response.data.potensi)
        .catch((error) => console.log(error));

        axios
        .get('https://api.npoint.io/477b73d9496c806eef7a')
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok')
            }
            // this.geojson = response.data;
            this.geojsonsaver = response.data;
        })
        .catch(error => {
            console.error('Error fetching geoJSON:', error)
        });

    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.checkShowButton);
    },
    computed: {
        style() {
            return {
            color: 'green',
            weight: 1,
            opacity: 0.7
            }
        },
        logoUrl() {
            if (this.das.logo_kps) {
                return '/images/logo/' + this.das.logo_kps;
            } else {
                return '/images/icon.ico';
            }
        },
        imageSrc(){
            return this.imagePath + this.das.thumbnail
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
        showAdminBoard() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('ROLE_ADMIN');
            }

            return false;
        },

        //Universal filter data combiner - checkbox filter + searchbar
        filteredData() {
            return this.result.filter(das => {
                //For filtering by each field
                let isSelectedSungai = !this.selectedSungai.length || this.selectedSungai.includes(das.sungai_name);
                let isSelectedKecamatan = !this.selectedKecamatan.length || this.selectedKecamatan.includes(das.kecamatan);
                let isSelectedPotensi = !this.selectedPotensi.length || this.selectedPotensi.includes(das.potensi_name);
                
                //Search by all in searchbar
                let isSearched = !this.search || Object.values(das).map(val => 
                    String(val).toLowerCase()).some(val => val.includes(this.search.toLowerCase()));

                return isSelectedSungai && isSelectedKecamatan && isSelectedPotensi && isSearched;
            });
        },

        //Get total data for each checkbox filter in each field
        getFilteredSungaiTotal() {
            return (sungaiName) => {
                let filteredDataBySungai = this.filteredData.filter(data => data.sungai_name === sungaiName);
                let uniqueDasIds = new Set(filteredDataBySungai.map((data) => data.das_id));
                return uniqueDasIds.size
            }
        },
        getFilteredKecamatanTotal() {
            return (kecamatanName) => {
                let filteredDataByKecamatan = this.filteredData.filter((data) => data.kecamatan === kecamatanName);
                let uniqueDasIds = new Set(filteredDataByKecamatan.map((data) => data.das_id));
                return uniqueDasIds.size;
            };
        },
        getFilteredPotensiTotal() {
            return (potensiName) => {
                let filteredDataByPotensi = this.filteredData.filter((data) => data.potensi_name === potensiName);
                let uniqueDasIds = new Set(filteredDataByPotensi.map((data) => data.das_id));
                return uniqueDasIds.size;
            };
            
        },

        filterId() {
            const uniqueFilteredData = this.filteredData.filter((item, index, self) => {
                return index === self.findIndex(i => i.das_id === item.das_id);
            });

            return uniqueFilteredData;
        },
        
        //Special paginated data + filtering duplicate data id
        paginateData() {
            // Filter out duplicate das_id values from filteredData
            const uniqueFilteredData = this.filteredData.filter((item, index, self) => {
                return index === self.findIndex(i => i.das_id === item.das_id);
            });

            // Store unique das_id values in a set
            const uniqueDasIds = new Set();
            uniqueFilteredData.forEach(item => {
                uniqueDasIds.add(item.das_id);
            });

            // Paginate the data from uniqueFilteredData
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return uniqueFilteredData.slice(start, end);
        },
        isEmpty() {
            return this.filteredData.length === 0;
        },
        totalPages() {
            return Math.ceil(this.filteredData.length / this.itemsPerPage)
            },
        totalData() {
            let uniqueIds = new Set();
            this.filteredData.forEach(item => uniqueIds.add(item.das_id));
            return uniqueIds.size;
        }   
    },
    methods: {
        toggleGeoJson() {
            if (this.show) {
                this.hideGeoJson();
            } else {
                this.showGeoJson();
            }
        },
        hideGeoJson() {
            this.geojson = '';
            this.show = false;
        },
        showGeoJson() {
            this.geojson = this.geojsonsaver;
            this.show = true;
        },
        checkShowButton() {
            const sectionTableRect = this.sectionTableEl.getBoundingClientRect();
            if (sectionTableRect.top <= window.innerHeight * 0.8 && sectionTableRect.bottom >= 0) {
                this.sectionTable = true;
            } else {
                this.sectionTable = false;
            }
        },

        changeMapCenter(latitude, longitude) {
            this.mapCenter = [latitude, longitude];
            
            // Find the marker at the new center
            const marker = this.filteredData.find(das => das.latitude === latitude && das.longitude === longitude);
            
            // If a marker is found, open its popup
            if (marker) {
                const popup = marker.__popup;
                if (popup) {
                popup.openPopup();
                }
            }
        },
        openPopup() {
            this.$refs.myPopup.openPopup();
        },

        // Universal Checkbox filter system
        updateCheckboxGroup(selectedItems, items, idName) {
            if (selectedItems.length === 0) {
            items.forEach((item) => {
                document.getElementById(item[idName]).checked = false;
            });
            } else {
            selectedItems = selectedItems.filter((item) => {
                return items.some((i) => i[idName] === item);
            });
            }
        },

        //Checkbox filter each field
        updateSelectedSungai() {
            this.updateCheckboxGroup(this.selectedSungai, this.sungai, 'sungai_name');
        },
        updateSelectedKecamatan() {
            this.updateCheckboxGroup(this.selectedKecamatan, this.kecamatan, 'kecamatan');
        },
        updateSelectedPotensi() {
            this.updateCheckboxGroup(this.selectedPotensi, this.potensi, 'potensi_name');
        },

        checkResultBarVisibility() {
            document.addEventListener("click", event => {
                const div = document.getElementById("result-bar");
                if (!div.contains(event.target)) {
                div.style.display = "none";
                }
            });
        },
        toggleSection() {
            if (this.toggle) {
                this.smoothScroll('section-map')
                this.sectionTable = true;
            } else {
                this.smoothScroll('section-card')
                this.sectionTable = false;
            }
            this.toggle = !this.toggle;
        },

        //Map settings
        latLng: function(lat, lng) {
            return L.latLng(lat, lng)
        },
        changeTileLayer() {
            this.selectedOption = this.selectedTile
        },
        addZoomControl () {
            if (this.map.zoomControl) {
                this.map.zoomControl.remove()
            }
            this.zoomControl = L.control.zoom({'position': 'bottomleft'})
            this.map.addControl(this.zoomControl)
        },

        //Pagination setting
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.smoothScroll('section-card')
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            this.smoothScroll('section-card')
        },
        goToPage(n) {
            this.currentPage = n;
            this.smoothScroll('section-card')
        },
        onItemsPerPageChange() {
            this.currentPage = 1;
            this.smoothScroll('section-card')
        },

        //Scroll to section system
        smoothScroll(id) {
            const element = document.getElementById(id);
            window.scrollTo({ 
                top: element.offsetTop,
                behavior: 'smooth' });
        },

        //Sidebar settings
        sidebarCollapse() {
            this.collapsed = !this.collapsed
        }
    },
};
</script>

<style>
    input[type="radio"] {
        cursor: pointer;
        transform: scale(1.5);
    }
</style>
