<template>
<div>
  <div class="sticky-top" style="z-index: 1;">
    <Navbar/>
  </div>
  
  <div class="row">
    <div class="banner d-flex justify-content-center align-items-center text-center w-100 text-white" style="height: 80vh;">
          <div class="text-center mt-5 mb-5">
            <img
                id="profile-img"
                src="/images/kpslogo.png"
                style="width: 200px;">
              <!-- <h2 class="font-weight-bold responsive-font-example">Siaga Kedas</h2> -->
              <h5 class="font-weight-bold responsive-font-example">Sistem Informasi Geografis KPS Denpasar
              </h5>
              <br>
              <button @click="smoothScroll('section-peta')" class="btn btn-outline-light btn-lg" type="button">Menuju Peta <strong>KPS</strong></button>
          </div>
  </div>

  <div class="bg-white w-100">
    <div class="container">
    <div class="row py-5">
          <div class="col-md-6 col-sm-12 mb-5 text-center justify-content-center align-self-center">
              <img src="/images/logokps.png"
              style="width: 50%;">
          </div>
          <div class="col-md-6 col-sm-12 text-left ">
              <h5 class="font-weight-bold text-left">Komunitas Peduli Sungai Kota Denpasar</h5>
              <medium class="text-left">Komunitas Peduli Sungai Kota Denpasar atau disingkat KPS Kota Denpasar, merupakan komunitas masyarakat yang dibentuk pada tanggal 10 Februari 2021.
              </medium>
              <br><br>
              <medium class="text-left">Tujuan awal dari pembentukan komunitas ini adalah melakukan sosialisasi mengenai kebersihan sungai dan lingkungan, serta mengedukasi warga sekitar agar tidak membuang sampah atau limbah ke sungai. Adapun tujuan yang lain yaitu memanfaatkan potensi dan menciptakan potensi DAS baru, juga bekerjasama dengan dinas terkait hingga desa adat.
              </medium>
              <br><br>
              <router-link to="/about">
                  <button class="btn btn-secondary btn-lg" type="button">
                    <small>Read More About <strong>KPS</strong>...</small>
                  </button>
              </router-link>
          </div>
      </div>
    </div>
  </div>

<section id='section-peta' class="bg-dark w-100 text-white">
  <div class="container">
    <div class="row py-5">
          <div class="col-md-6 col-sm-12 mb-4 text-center">
            <router-link to="/peta" title="Go To Peta KPS"
            >
              <img src="/images/peta.png"
              style="width: 100%;">
            </router-link>
          </div>
          <div class="col-md-6 col-sm-12 text-left ">
              <h5 class="font-weight-bold text-left mt-4">Peta KPS Denpasar</h5>
              
              <small class="text-left">Merupakan peta yang dapat menampilkan informasi mengenai persebaran KPS hingga potensi sub DAS yang dikelola tiap KPS.
              </small>
              <br>
              <small class="text-left">Peta ini memiliki fitur search dan filter berdasarkan kategori secara instan agar mempermudah dalam pemilahan data dan informasi.
              </small>
              <br><br>
              <router-link to="/peta">
                  <button class="btn btn-primary btn-lg w-100" type="button">
                    <i class="bi bi-map"></i> &nbsp; <small><strong>Menuju Peta KPS Denpasar</strong></small> 
                  </button>
              </router-link>
          </div>
      </div>
    </div>
</section>

  </div>
    <!-- <div class="container">
    <header class="jumbotron">

      <h3>{{ content }}</h3>
    </header>
  </div> -->
  <FooterKPS></FooterKPS>
</div>
</template>

<script>
import UserService from "../services/user.service";
import Navbar from "@/components/Navbar.vue";
import FooterKPS from '@/components/Footer.vue';

export default {
  name: "Home",
  components: {
    Navbar,
    FooterKPS,
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    //Scroll to section system
    smoothScroll(id) {
            const element = document.getElementById(id);
            window.scrollTo({ 
                top: element.offsetTop - 60,
                behavior: 'smooth' });
        },
  }
};
</script>
