<template>
    <button class="back-to-top shadow" title="Back to top page" v-if="showButton" @click="scrollToTop">
      <i class="bi bi-chevron-up"></i>
    </button>
  </template>
  
  <script>

export default {
  data() {
    return {
      showButton: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showButton = window.pageYOffset > window.innerHeight * 0.5;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
  
  <style scoped>
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: #007bff;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
  }
  
  .back-to-top:hover {
    opacity: 1;
  }
  </style>