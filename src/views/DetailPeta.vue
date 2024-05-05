<template>  
<div>
    <Loading v-if="loading"></Loading>  
    <div class="sticky-top" style="z-index: 999;">
        <Navbar/>
    </div>
    
    <div v-if="!notFound">
    <nav class="navbar navbar-expand-lg bg-white navbar-primary w-100 justify-content-center" style="height: 60px;">
        <ul class="navbar-nav mr-auto bg-white">
            <li class="nav-item active">
                <router-link class="btn btn-white text-success" to="/peta"><i class="bi bi-arrow-left"></i>&nbsp;&nbsp;&nbsp;Back to Peta <span class="sr-only">(current)</span></router-link>
            </li>
        </ul>
    </nav>

    

    <div class="bg-light bg-contour">
        <div class="container1 bg-white py-3">

        <div class="row py-3 bg-white">
                <div class="col-md-4 col-sm-12 col-lg-4 text-center mb-5 mr-1">
                    <div class="sticky-top" style="top: 100px; margin-bottom: 0px; z-index: 1;">
                        <img :src="'/images/logo/' + data.logo_kps"
                        class="shadow circle"
                        onerror="this.src='/images/logokps.png'"    
                        style="object-fit: scale-down; width: 60%;">
                    </div>
                    <div  class="sosmed mt-5 text-center sticky-top" style="top: 280px; z-index: 0;">
                        <a v-if="data.instagram && data.instagram.toLowerCase() !== 'null' && data.instagram !== ''"
                            class="btn circle text-white btn-floating m-1 form-inline align-middle py-2"
                            style="background-color: #ac2bac; width: 50px; height: 50px;"
                            :href="data.instagram"
                            role="button"
                            target="_blank"
                            :title="'Instagram KPS / Sub ' + data.das_name"
                            >
                            <i class="h4 fab fa-instagram"></i>
                            
                        </a>
                        <a v-if="data.facebook && data.facebook.toLowerCase() !== 'null' && data.facebook !== ''"
                            class="btn text-white circle m-1 text-center py-2 "
                            style="background-color: #3b5998; width: 50px; height: 50px;"
                            :href="data.facebook"
                            role="button"
                            target="_blank"
                            :title="'Facebook KPS / Sub ' + data.das_name"
                            >
                            <i class="h4 fab fa-facebook-f"></i>
                        </a>
                    </div>
                        
                </div>
                <div class="col-md-7 col-sm-12 col-lg-7">
                    <h5 class="font-weight-bold text-success">{{data.kps_name}}</h5>
                    <div class="text-left" v-html="data.profil_kps">
                    </div>
                </div>
        </div>
        <div class="py-3 mx-3 bg-white border-radius">
                <img :src="'/images/das/' + data.thumbnail"
                    onerror="this.src='/images/default.png'"
                    class="shadow w-100"
                    style="border-radius: 10px; object-fit: scale-down;">
                <h5 class="font-weight-bold mt-4">{{data.das_name}}</h5>
                <div class="" v-html="data.deskripsi"></div>
        </div>

        <div class="bg-white py-4">
            <div class="row mx-3">
                <div class="col-mr-auto">
                    <span class="bi bi-stars text-success"></span>
                </div>
                <div class="col ml-4">
                    <h6 class="font-weight-bold text-success mb-4 form inline align-middle">
                    Potensi Sub {{data.das_name}}</h6>
                </div>
            </div>
            
            <h6 v-if="empty" class="text-success text-center text-muted">Belum ada potensi pada sub {{data.das_name}}</h6>
                <div v-if="!empty" class="d-flex flex-row flex-nowrap overflow-auto mx-3" style="overflow-x: auto;">
                    <div v-for="datapotensi in datapotensi" :key="datapotensi.potensi_id" class="card shadow ml-0 mr-3 mb-4" style="min-width: 190px; width: 16rem;">
                        <div class="p-3">
                            <p class="card-text text-success">{{datapotensi.potensi_name}}</p>
                        </div>
                        <img class="" :src="'/images/potensi/' + datapotensi.potensi_thumbnail" onerror="this.src='/images/default.png'"
                        style="object-fit: scale-down; width: 100%;">
                        <div class="card-body pb-3">
                            <h6>{{datapotensi.potensi_das_name}}</h6>
                        </div>
                        <div class="card-footer">
                            <router-link type="button" :to="{ name: 'DetailPotensi', params: { kpsname: datapotensi.slug, id: datapotensi.potensi_id}}" class="btn btn-success d-block w-100"><i class="bi bi-info-circle"></i> &nbsp; Detail</router-link>
                        </div>
                    </div>
                </div>
                
        </div>

        <div class="bg-dark p-4 border-radius">
            <a :href='"https://www.google.com/maps?saddr=My+Location&daddr=" +  data.latitude + "," + data.longitude' class="btn btn-success mb-4 " target="_blank"><i class="bi bi-cursor-fill"></i>
            <!-- https://www.google.com/maps?saddr=My+Location&daddr=" or https://www.google.com/maps/dir/My+Location/" -->
                &nbsp;Rute menuju alamat <strong>{{ data.kps_name }}</strong> </a>
            <iframe class="border-radius shadow"
            :src = '"https://maps.google.com/maps?width=100%25&height=600&hl=en&q=" +  data.latitude + "," + data.longitude + "&t=&z=14&ie=UTF8&iwloc=B&output=embed&dirflg=d"'
                width="100%" 
                height="300"
                aria-hidden="false"
                frameborder="0" 
                style="border:0; z-index: 1;"
                loading="lazy"
                >
            </iframe>
        </div>
    </div>
    </div>


    <nav class="navbar navbar-expand-lg bg-white navbar-primary w-100 justify-content-center" style="height: 60px;">
        <ul class="navbar-nav mr-auto bg-white">
            <li class="nav-item active">
                <router-link class="btn btn-white text-success" to="/peta"><i class="bi bi-arrow-left"></i>&nbsp;&nbsp;&nbsp;Back to Peta <span class="sr-only">(current)</span></router-link>
            </li>
        </ul>
    </nav>
</div>

    <div v-if="notFound">
        <div style="height: 80vh;" class="p-5 bg-dark text-white">
            <h1>404 Page Not Found</h1>
            -KPS DPS
        </div>
    </div>

    <FooterKPS></FooterKPS>
</div>
</template>

<script>
import axios from 'axios';
import API_URL from '../services/api';
import Navbar from '@/components/Navbar.vue';
import Loading from '@/components/Loading.vue';
import FooterKPS from '@/components/Footer.vue';

export default {
    name: "DetailPeta",
    components: {
        Navbar,
        Loading,
        FooterKPS,
    },
    data() {
        return {
        url : 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
        data: [],
        datapotensi: [],
        notFound: false,
        errorMessage: '',
        empty: false,
        loading: true,
        };
    },
    created() {
        
    },
    mounted() {
        this.loading = true;

        setTimeout(() => {
        axios
            .get(API_URL + '/api/all/' + this.$route.params.kpsname)
            .then((response) => {
            this.data = response.data;
            this.notFound = false;
            })
            .catch((error) => {
            console.log(error);
            this.notFound = true;
            })
            .finally(() => {
            this.loading = false;
            });
        }, 100);


        axios
            .get(API_URL + "/api/all/" + this.$route.params.kpsname + "/potensi")
            .then((response) => {
                this.empty = false;
                this.datapotensi = response.data.data;
            })
            .catch((error) => {
                console.log(error);
                this.empty = true;
            });
    },
    computed: {
    firstData() {
        return this.data.length > 0 ? this.data[0] : {};
        }
    },
    methods: {
    },
}
</script>