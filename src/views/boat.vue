<style scoped>
  .image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }
</style> 

<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Boat Gallery</h2>
      <br />

      <div>
        <gallery
          :images="images"
          :index="index"
          @close="index = null"
        ></gallery>
        <div
          class="image"
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
          @click="index = imageIndex"
          :style="{
            backgroundImage: 'url(' + image + ')',
            width: '128px',
            height: '128px',
          }"
        ></div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
  data: function() {
    return {
      images: [
        require('../assets/20190902_080606.jpg'),
        require('../assets/20190714_085224.jpg'),
        require('../assets/20200523_202607.jpg'),
        require('../assets/FB_IMG_1590248312399.jpg'),
        require('../assets/20200523_130608.jpg'),
        require('../assets/20200515_100823.jpg'),
        require('../assets/FB_IMG_1590248318934.jpg'),
        require('../assets/20200419_154314.jpg'),
        require('../assets/20200419_154520.jpg'),
        require('../assets/20200423_122039.jpg'),
        require('../assets/20190817_163909.jpg'),
        require('../assets/20200806_173147.jpg'),
      ],
      index: null,
    };
  },

  components: {
    gallery: VueGallery,
  },
};
</script>


