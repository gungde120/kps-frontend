<template>
    <div class="loading-screen">
        <img src="/images/loader.gif" alt="Loading..." class="loading-gif" />
    </div>
</template>

<style>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background color */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loading-gif {
    width: 180px; /* Adjust the size of the loading GIF */
}
</style>