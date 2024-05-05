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
                    <li class="breadcrumb-item text-muted" aria-current="page"><router-link to="/admin/subdas">List Sub DAS</router-link></li>
                </ol>
            </nav>
        <h3 class="my-3">
            <!-- <router-link to="/admin" class="btn btn-dark mr-1">
                <i class="bi bi-arrow-left"></i>
            </router-link> -->
            List <strong>Sub DAS</strong>
        
        </h3>
        <div class="mb-3">
            <l-map
                            style="height:430px; width: 100%; z-index: 3;" 
                            ref="map" 
                            zoom="13" 
                            :options="{zoomControl: false}"
                            :center="markerLatLng"
                            > 
                        <l-control-layers
                            position="topright"
                            :collapsed="false"
                            :sort-layers="true"
                        />
                        <l-control-zoom position="topright" style="z-index: 1;"></l-control-zoom>
                        <div v-show="show">
                            <l-geo-json
                                :geojson="geojson" 
                                style="z-index: 1; opacity: 0.1;"
                                :style="style"
                                color="green"
                            ></l-geo-json>
                        </div>
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
                        <l-control class="example-custom-control"
                            :position="'topleft'">
                            <div class="list-group-item p-2 rounded">
                                <div>
                                    <button class="btn btn-secondary ml-1" v-if="!show" @click="showGeoJson"></button>
                                    <button class="btn btn-success ml-1" v-if="show" @click="hideGeoJson"></button>
                                    <span class="small ml-2" v-show="!collapsed">Show River Network</span>
                                </div>
                                <!-- <div class="mt-2">
                                    <button class="btn btn-secondary ml-1" v-if="!popup" @click="toggleTooltip"></button>
                                    <button class="btn btn-success ml-1" v-if="popup" @click="toggleTooltip"></button>
                                    <span class="small ml-2">Popup</span>
                                </div> -->
                            </div>
                        </l-control>
                        <l-marker 
                            v-for="das in filteredData"
                            :key="das.das_id"
                            :lat-lng="[das.latitude,das.longitude]"
                        >
                        <l-icon 
                            icon-url ="/images/marker-icon-2x-red.png" 

                        >
                        </l-icon>        
                        <!-- <l-tooltip v-if="popup" :options="{ permanent: true }">
                            {{ das.das_name.replace("Sub DAS","") }}                                     
                        </l-tooltip> -->
                        <l-tooltip>
                            {{ das.das_name.replace("Sub DAS","") }}                                     
                        </l-tooltip>
                        <l-popup ref="myPopup">
                            <div style="text-align:center">
                                <img :src="'/images/logo/' + das.logo_kps" onerror="this.src='/images/icon.ico'" style="position: absolute; left: -30px; top: -30px;object-fit: scale-down; width: 80px;">  
                                </div>
                                <div style="text-align:center">
                                    <img class="border-radius mb-2" :src="'/images/das/' + das.thumbnail" onerror="this.src='/images/default.png'" style="object-fit: scale-down; width: 100%;">    
                                </div>
                                <router-link class="btn btn-success d-block text-white" :to="{ name: 'DetailSubDas', params: { id: das.das_id, kpsname: das.slug}}">{{ das.das_name }}</router-link>
                        </l-popup>  
                        </l-marker>
                    </l-map> 
        </div>
        <div class="form-inline">
            <input
                v-model="search"
                type="search"
                class="form-control text-center mr-auto"
                style="width: 50vw;"
                placeholder="Cari Nama DAS, KPS, Alamat dll ..."
                aria-label="Cari"
                aria-describedby="basic-addon1"
                />
            <router-link to="/admin/subdas/add" class="ml-auto btn btn-primary"><i class="bi bi-plus"></i> Add New</router-link>
        </div>
        <div class="p-0 bg-white mx-auto table-responsive table-striped table-bordered mt-3">
                <table class="table">
                    <thead class="text-center text-nowrap">
                        <tr>
                            <th @click="sortById">ID</th>
                            <th>Thumbnail</th>
                            <th>Logo KPS</th>
                            <th>Nama Sub DAS</th>
                            <th>KPS Pengelola</th>
                            <th>Sungai Induk</th>
                            <th>Alamat</th>
                            <th>Kecamatan</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                                
                            
                            <th @click="sortByPotensi" style="cursor: pointer;">Potensi 
                                <i v-show="sorted" class="bi bi-filter text-primary"></i>
                                <i v-show="!sorted" class="bi bi-filter" style="color:silver;"></i>
                            </th>
                                
                        </tr>
                    </thead>
                        <tbody class="text-center">
                            <tr v-for="das in paginateData" :key="das.das_id" @click="detail(das.das_id)">
                                <th>{{ das.das_id }}</th>
                                <td class="py-2 px-0 justify-content-center align-items-center">
                                    <img :src="'/images/das/' + das.thumbnail" class="img-fluid" onerror="this.src='/images/default.png'" style="object-fit: scale-down; width: 100px;">                               
                                </td>
                                <td>
                                    <img :src="'/images/logo/' + das.logo_kps" onerror="this.src='/images/icon.ico'" style="object-fit: scale-down; width: 70px; ">                               
                                </td>
                                <td>{{ das.das_name }}</td>
                                <td>{{ das.kps_name }}</td>
                                <td>{{ das.sungai_name }}</td>
                                <td>{{ das.alamat }}</td>
                                <td>{{ das.kecamatan }}</td>
                                <td>{{ das.latitude }}</td>
                                <td>{{ das.longitude }}</td>
                                <td>{{ das.jml_potensi}}</td>
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
                        <strong> {{ paginateData.length }} </strong> of <strong> {{ das.length }} </strong> data
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
    import { LMap, LGeoJson, LTileLayer, LControlLayers, LControlZoom, LMarker, LIcon, LTooltip, LControl, LPopup} from "@vue-leaflet/vue-leaflet";

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
        attribution: '',
    },
    ];

export default {
    name: "ListSubDas",
    components: {
    Sidebar,
    Navbar,
    LMap,
    LGeoJson,
    LTileLayer,
    LControlLayers,
    LControlZoom,
    LMarker,
    LIcon,
    LControl,
    LTooltip,
    LPopup,
    },
data() {
    return {
        das: [],
        jumlahKps: '',
        jumlahPotensi: '',
        jumlahPotensiDas: '',
        jml_potensiSortOrder: 'none',
        sorted: false,
        das_idSortOrder: 'asc',
        search: '',
        currentPage: 1,
        itemsPerPage: 10,
        attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        markerLatLng: [-8.66940,115.21640],
        zoomLevel: 13,
        tileProviders: tileProviders,
        popup: false,
        show: false,
        geojson: null,
        geojsonsaver: null,
    };
    },

    created() {
        this.fetchSubDas();
    },

    mounted() {
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

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
    },

    sortedData() {
        const sortBy = this.jml_potensiSortOrder !== 'none' ? 'jml_potensi' : '';
        const sortOrder = this[`${sortBy}SortOrder`];

        // Use filteredData to sort
        return this.filteredData.slice().sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
    },

    //Universal search
    filteredData() {
        const filteredDas = this.das.filter((das) => {
            // Search by all in searchbar
            const isSearched = !this.search || Object.values(das) 
                .map((val) => String(val).toLowerCase())
                .some((val) => val.includes(this.search.toLowerCase()));
            return isSearched;
        });
        return filteredDas;
    },

    paginateData() {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.sortedData.slice(start, end)
    },

    totalPages() {
            return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    
    },
methods: {
        async fetchSubDas() {
            try {
                const response = await axios.get(API_URL + "/api/das");
                this.das = response.data.das;
            } catch (err) {
                console.log(err);
            }
        },
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
        sortByPotensi() {
            if (this.jml_potensiSortOrder === 'asc') {
                this.jml_potensiSortOrder = 'desc'
            } else if (this.jml_potensiSortOrder === 'desc') {
                this.jml_potensiSortOrder = 'none'
                this.sorted = false
            } else if (this.jml_potensiSortOrder === 'none') {
                this.jml_potensiSortOrder = 'asc'
                this.sorted = true
            }
        },
        detail(id) {
            this.$router.push(`/admin/subdas/${id}`)
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
        toggleTooltip() {
            this.popup = !this.popup;
        }
    },
};
</script>
