<template>
  <div class="container">
    <img
      src="../../assets/img/img_68.png"
      :style="styleheight"
      class="b_img_g"
      alt=""
    />
    <div class="no__more">
      <div class="no_name">{{ down_title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      down_title: this.$variate.downtitle,
      styleheight: {
        height: ''
      }
    }
  },
  created() {
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.styleheight.height = windowHeight
    setTimeout(() => {
      this.$router.push('/login')
    }, 3000);
  },
  methods: {

  },
}

</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  .b_img_g {
    width: 100%;
  }
  .no__more {
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
    height: 30px;

    .no_name {
      padding: 0 20px;
      box-sizing: border-box;
      height: 30px;
      line-height: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
      color: #fff;
      font-size: 12px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 2px;
      // background-color: #ebedf0;
      z-index: 1;
    }
  }
}
</style>