<template>
<div>
    <Loading v-if="loading"></Loading>  
    <div class="sticky-top" style="z-index: 1;">
        <Navbar/>
    </div>
    <div v-if="!notFound">
    <nav class="navbar navbar-expand-lg bg-white navbar-primary w-100 justify-content-center" style="height: 60px;">
        <ul class="navbar-nav mr-auto bg-white">
            <li class="nav-item active">
                <router-link class="btn btn-white text-success" :to="{ name: 'DetailPeta', params: { kpsname: data.slug }}"><i class="bi bi-arrow-left"></i>&nbsp;&nbsp;&nbsp;{{ data.das_name }} <span class="sr-only">(current)</span></router-link>
            </li>
        </ul>
    </nav>


        <div class="bg-contour bg-light">
            <div class="container1 bg-white pb-1">
            <div class="row py-3 bg-white rounded" style="top:55px;">
                <div class="col-md-1 col-3 col-lg-1 ml-3 form-inline align-middle">
                    <img :src="'/images/logo/' + data.logo_kps"
                        onerror="this.src='/images/logokps.png'"    
                        style="object-fit: scale-down; width: 100%; max-width: 80px; ">
                </div>
                <div class="col-md-10 col-8 col-lg-10">
                    <span class="font-weight-bold form-inline align-middle" style="font-size: 1.2em;">{{data.potensi_das_name}}</span>
                    <span class="font-weight-bold form-inline align-middle text-success" style="font-size: 1em;">Potensi {{data.potensi_name}} {{data.das_name}}</span>
                </div>    
            </div>

            <div class="mx-3 mt-1">
                <div>
                    <img 
                    class="w-100 my-2 border-radius" 
                    :src="'/images/potensi/' + data.potensi_thumbnail" 
                    onerror="this.src='/images/default.png'">
                </div>
                <div v-html="data.potensi_deskripsi"></div>
            </div>
        </div> 
        </div>
    

    

    <nav class="navbar navbar-expand-lg bg-white navbar-primary w-100 justify-content-center" style="height: 60px;">
        <ul class="navbar-nav mr-auto bg-white">
            <li class="nav-item active">
                <router-link class="btn btn-white text-success" :to="{ name: 'DetailPeta', params: { kpsname: data.slug }}"><i class="bi bi-arrow-left"></i>&nbsp;&nbsp;&nbsp;{{ data.das_name }} <span class="sr-only">(current)</span></router-link>
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
    import FooterKPS from "@/components/Footer.vue";

export default {
    name: "DetailPotensi",
    components: {
        Navbar,
        Loading,
        FooterKPS,
    },
    data() {
        return {
        data: {},
        notFound: false,
        errorMessage: '',
        loading: true,
        };
    },
    created() {
        
    },
    mounted() {
        this.loading = true;

        // axios
        //     .get(API_URL + "/api/all/" + this.$route.params.kpsname + "/" + this.$route.params.id)
        //     .then((response) => {
        //         this.data = response.data;
        //         this.notFound = false;
        //     })
        //     .catch((error) => {
        //         this.notFound = true;
        //         console.log(error);
        //     });

        setTimeout(() => {
        axios
            .get(API_URL + "/api/all/" + this.$route.params.kpsname + "/" + this.$route.params.id)
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
            }
}
</script>