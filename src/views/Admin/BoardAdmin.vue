<template>
<div>
  <Navbar/>
  <div class="row">
    <div class="bg-dark" style="z-index: 0;">
      <Sidebar/>  
    </div>    
    
    <div class="col mt-2">  
      <h3 class="my-3 mx-4">Admin <strong>Dashboard</strong></h3>
      <div class="row mx-2">

      <!-- Icon Cards-->
      
        <div class=" col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
          <router-link to="/admin/subdas">
            <div class="btn btn-white w-100 border-radius p-0 shadow">
              <div class="row">
                <div class="border-radius d-flex col-lg-3 col-md-4 col-sm-4 col-4 bg-primary text-white" >
                  <h1 class="bi bi-pin-map-fill m-auto"></h1>                
                </div>
                <div class="col-lg-9 col-md-8 col-sm-8 col-8 pt-3 pb-2 text-right">
                    <h5>Sub DAS</h5>
                    <h2>{{ jumlahDas }}</h2>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        

        <div class=" col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
          <router-link  to="/admin/kps">
            <div class="btn btn-white w-100 border-radius p-0 shadow">
              <div class="row">
                <div class="border-radius d-flex col-lg-3 col-md-4 col-sm-4 col-4 text-white" style="background-color: rgba(0, 141, 150, 1);">
                  <h1 class="bi bi-postcard-fill m-auto"></h1>                
                </div>
                <div class="col-lg-9 col-md-8 col-sm-8 col-8 pt-3 pb-2 text-right">
                    <h5>KPS</h5>
                    <h2>{{ jumlahKps }}</h2>
                </div>
              </div>
            </div>
            </router-link>
        </div>

        <div class=" col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
          <router-link to="/admin/potensi">
            <div class="btn btn-white w-100 border-radius p-0 shadow">
              <div class="row">
                <div class="border-radius d-flex col-lg-3 col-md-4 col-sm-4 col-4 text-white" style="background-color: rgba(75, 192, 64, 1);">
                  <h1 class="bi bi-stars m-auto"></h1>
                </div>
                <div class="col-lg-9 col-md-8 col-sm-8 col-8 pt-3 pb-2 text-right">
                    <h5>Kategori Potensi</h5>
                    <h2>{{ jumlahPotensi }}</h2>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class=" col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
          <router-link to="/admin/potensi-das">
            <div class="btn btn-white w-100 border-radius p-0 shadow">
              <div class="row">
                <div class="border-radius d-flex col-lg-3 col-md-4 col-sm-4 col-4 text-white" style="background-color: rgba(94, 184, 147, 1);">
                  <h1 class="bi bi-list-stars m-auto"></h1>
                </div>
                <div class="col-lg-9 col-md-8 col-sm-8 col-8 pt-3 pb-2 text-right">
                    <h5>Potensi Sub DAS</h5>
                    <h2>{{ jumlahPotensiDas }}</h2>
                </div>
              </div>
            </div>
          </router-link>
        </div>

    </div>
    <div class="bg-gray" style="height: 5px;"></div>
    <h3 class="my-3 mx-4">Dashboard <strong>Charts</strong></h3>
    <div class="row mx-3">
      <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
          <canvas height="300" class="bg-white border-radius shadow p-3" id="subDasKecChart"></canvas>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
          <canvas height="300" class="bg-white border-radius shadow p-3" id="potensiChart"></canvas>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
          <canvas height="300" class="bg-white border-radius shadow p-3" id="potensiDasChart"></canvas>
      </div>
    </div>

    </div>
    

  </div>
</div>
</template>

<script>
  import Sidebar from "@/components/Sidebar.vue";
  import Navbar from "@/components/Navbar.vue";
  import Chart from 'chart.js/auto';
  import axios from "axios";
  import API_URL from "../../services/api";

export default {
  name: "Admin",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      kecamatan: [],
      jumlahDas: '',
      jumlahKps: '',
      jumlahPotensi: '',
      potensi: [],
      jumlahPotensiDas: '',
    };
  },
  created() {
    axios
        .get(API_URL + "/api/kecamatan")
        .then((response) => {
          this.kecamatan = response.data.kecamatan;
          this.createChart(
            'subDasKecChart', 'Jumlah Sub DAS Per Kecamatan', 
            this.kecamatan.map(kec => kec.kecamatan),
            this.kecamatan.map(kec => kec.jml_das),
            'rgba(54, 162, 235, 1)'
          );
        })
        .catch((error) => console.log(error));

    axios
      .get(API_URL + "/api/das")
      .then((response) => {this.jumlahDas = response.data.das.length})
      .catch((error) => console.log(error));

    axios
      .get(API_URL + "/api/kps")
      .then((response) => {this.jumlahKps = response.data.kps.length})
      .catch((error) => console.log(error));  

    axios
      .get(API_URL + "/api/potensi")
      .then((response) => {
        this.jumlahPotensi = response.data.potensi.length;
        this.potensi = response.data.potensi;
        this.createChart(
          'potensiChart', 'Jumlah Sub DAS Per Kategori Potensi', 
          this.potensi.map(pot => pot.potensi_name),
          this.potensi.map(pot => pot.jml_das),
          'rgba(75, 192, 64, 1)'
        );
        this.createChart(
          'potensiDasChart', 'Jumlah Potensi Per Kategori', 
          this.potensi.map(pot => pot.potensi_name),
          this.potensi.map(pot => pot.jml_potensi_das),
          'rgba(94, 184, 147, 1)'
        );
      })
      .catch((error) => console.log(error));  

    axios
      .get(API_URL + "/api/potensi-das")
      .then((response) => {this.jumlahPotensiDas = response.data.potensidas.length})
      .catch((error) => console.log(error));  
  },
  methods: {
    createChart(id, label, labels, data, color) {
      const ctx = document.getElementById(id)
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1
          }]
        },
        options: { scales: { y: { beginAtZero: true } } }
      });
      return chart;
    }
  },
  mounted() {
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
