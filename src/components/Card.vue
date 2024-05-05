<template>
    <div class="card" style="width: 18rem;">
        <div class="col">
            <img :src=" '/images/das/' + das.thumbnail" class="card-img" alt="...">
        </div>
        <div class="col">
            <div class="card-body">
            <h5 class="card-title mb-2">
                <strong>{{ das.das_name }}</strong>
            </h5>
            <h6>
            KPS Pengelola : <strong>{{ das.kps_name }}</strong>
            </h6>
            <h6>
            Alamat : <strong>{{ das.alamat }}</strong>
            </h6>
            <router-link class="btn btn-primary" :to="'/user/ruangan/'+das.das_id"> Detail </router-link>
        </div>
        </div>    
    </div>
</template>

<script>
export default {
    name: "Card",
    props: ["das"],
};
</script>