import { createWebHistory, createRouter } from "vue-router";
// import {getIdFromName} from './utils.js'
import PageNotFound from "./views/PageNotFound.vue";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import About from "./views/About.vue"

import Peta from "./views/Peta.vue";
import DetailPeta from "./views/DetailPeta.vue";
import DetailPotensi from "./views/DetailPotensi.vue";

// ADMIN KPS DPS
import ListSubDas from "./views/Admin/SubDas/ListSubDas.vue"
import DetailSubDas from "./views/Admin/SubDas/DetailSubDas.vue"
import AddSubDas from "./views/Admin/SubDas/AddSubDas.vue"
import DetailPotensiSubDas from "./views/Admin/SubDas/DetailPotensiSubDas.vue"

import ListKps from "./views/Admin/Kps/ListKps.vue"
import AddKps from "./views/Admin/Kps/AddKps.vue"
import DetailKps from "./views/Admin/Kps/DetailKps.vue"

import ListKecamatan from "./views/Admin/Kecamatan/ListKecamatan.vue"
import ListSungaiInduk from "./views/Admin/Sungai/ListSungaiInduk.vue"
import ListPotensi from "./views/Admin/Potensi/ListPotensi.vue"
import ListPotensiSubDas from "./views/Admin/PotensiDas/ListPotensiSubDas.vue"

// import Rooms from "./views/User/Rooms.vue";
// import RoomDetail from './views/User/RoomDetail.vue';
// import Keranjang from './views/User/Riwayat.vue';
// import Jadwal from './views/Jadwal.vue';
// import EditProfile from './views/EditProfile.vue';

//ADMIN
// import EditRuangan from './views/Admin/EditRuangan.vue';

//MODERATOR
// import ModEditRuangan from './views/Moderator/ModEditRuangan.vue';
// import ModListRuangan from './views/Moderator/ModListRuangan.vue';
// import ModAddRuangan from './views/Moderator/ModAddRuangan.vue';

// lazy-loaded
const Profile = () => import("./views/Profile.vue")
const BoardAdmin = () => import("./views/Admin/BoardAdmin.vue")
// const BoardModerator = () => import("./views/Moderator/BoardModerator.vue")
// const BoardUser = () => import("./views/User/BoardUser.vue")

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: { public: true },
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { public: true },
  },
  {
    path: "/home",
    component: Home,
    meta: { public: true },
  },
  {
    path: "/about",
    component: About,
    meta: { public: true },
  },
  {
    path: "/peta",
    component: Peta,
    meta: { public: true },
  },
  {
    path: '/:kpsname',
    name: 'DetailPeta',
    component: DetailPeta,
    meta: { public: true },
  },
  {
    path: '/:kpsname/:id',
    name: 'DetailPotensi',
    component: DetailPotensi,
    meta: { public: true },
  },
  
  {
    path: "/loginkps",
    component: Login,
    meta: { public: true },
  },
  {
    path: "/register",
    component: Register,
    // meta: { public: true },
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  // {
  //   path: "/profile/edit",
  //   component: EditProfile,
  // },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: '/admin/subdas',
    name: 'ListSubDas',
    component: ListSubDas
  },
  {
    path: '/admin/subdas/:id',
    name: 'DetailSubDas',
    component: DetailSubDas
  },
  {
    path: '/admin/subdas/add',
    name: 'AddSubDas',
    component: AddSubDas
  },
  {
    path: '/admin/subdas/potensi/:id',
    name: 'DetailPotensiSubDas',
    component: DetailPotensiSubDas
  },
  {
    path: '/admin/kps',
    name: 'ListKps',
    component: ListKps
  },
  {
    path: '/admin/kps/:id',
    name: 'DetailKps',
    component: DetailKps
  },
  {
    path: '/admin/kps/add',
    name: 'AddKps',
    component: AddKps
  },
  {
    path: '/admin/kecamatan',
    name: 'ListKecamatan',
    component: ListKecamatan
  },
  {
    path: '/admin/sungai',
    name: 'ListSungaInduk',
    component: ListSungaiInduk
  },
  {
    path: '/admin/potensi',
    name: 'ListPotensi',
    component: ListPotensi
  },
  {
    path: '/admin/potensi-das',
    name: 'ListPotensiSubDas',
    component: ListPotensiSubDas
  },


  // {
  //   path: '/admin/ruangan/editruangan/:id',
  //   name: 'EditRuangan',
  //   component: EditRuangan
  // },

  // // MOD
  // {
  //   path: "/moderator",
  //   name: "moderator",
  //   // lazy-loaded
  //   component: BoardModerator,
  // },
  // {
  //   path: '/moderator/ruangan',
  //   name: 'ListRuangan',
  //   component: ModListRuangan
  // },
  // {
  //   path: '/moderator/ruangan/addruangan',
  //   name: 'ModAddRuangan',
  //   component: ModAddRuangan
  // },
  // {
  //   path: '/moderator/ruangan/editruangan/:id',
  //   name: 'EditRuangan',
  //   component: ModEditRuangan
  // },

  // //USER
  // {
  //   path: "/user",
  //   name: "user",
  //   // lazy-loaded
  //   component: BoardUser,
  // },
  // {
  //   path: "/jadwalpeminjaman",
  //   component: Jadwal,
  // },
  // {
  //   path: "/user/ruangan",
  //   component: Rooms,
  // },
  // {
  //   path: '/user/ruangan/:id',
  //   name: 'RoomDetail',
  //   component: RoomDetail
  // },
  // {
  //   path: '/user/riwayat',
  //   name: 'Keranjang',
  //   component: Keranjang
  // },
  
];

const router = createRouter({
  history: createWebHistory(),
  // mode: 'history',
  routes,
});

// router.beforeEach((to, from, next) => {
//   window.scrollTo(0, 0);
//   // const publicPages = ['/loginkps', '/register', '/home', '/peta', '/peta/*'];
//   // const authRequired = !publicPages.includes(to.path);
//   const authRequired = !to.meta.public;
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   // or redirect to landing page
//   if (authRequired && !loggedIn) {
//     next('/home');
//   } else {
//     next();
//   }
// });

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  const body = document.body;
  body.classList.add('fade-transition'); // Add the CSS class for the transition

  setTimeout(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);

    const authRequired = !to.meta.public;
    const loggedIn = localStorage.getItem('user');

    // Trying to access a restricted page + not logged in
    // Redirect to login page or redirect to the landing page
    if (authRequired && !loggedIn) {
      next('/home');
    } else {
      next();
    }
  }, 100); // Adjust the duration to match the duration of your fade transition
});

// After each route update
router.afterEach(() => {
  const body = document.body;
  body.classList.remove('fade-transition'); // Remove the CSS class for the transition
});


export default router;