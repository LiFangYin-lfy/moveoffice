<template>
  <div class="container">
    <div class="my-wrapper">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <span>待办</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <!-- :badge="storeCount" -->
      <van-tabbar-item to="/adhibition">
        <span>应用</span>
        <template #icon="props">
          <img :src="props.active ? icon.active_ : icon.inactive_" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/userinfo">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon.active_l : icon.inactive_l" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { Toast, Dialog } from 'vant';
export default {
  name: "layout",
  data() {
    return {
      value: "",
      active: 0,
      storeCount: 0,
      icon: {
        active: require('../assets/img/icon_04.png'),
        inactive:
          require('../assets/img/icon_01.png'),
        active_:
          require('../assets/img/icon_05.png'),
        inactive_:
          require('../assets/img/icon_02.png'),
        active_l:
          require('../assets/img/icon_06.png'),
        inactive_l:
          require('../assets/img/icon_03.png'),
      }
    };
  },
  computed: {
  },

  created() {
    // let token = window.localStorage.getItem('move_token')
    // if (!token) {
    //   Dialog.confirm({
    //     title: '温馨提示',
    //     message: '您尚未登陆，请先登录',
    //   })
    //     .then(() => {
    //       this.$router.push("/login");
    //     })
    //     .catch(() => {
    //       Toast('登录后才可访问')
    //     })
    // }

  },
  methods: {
  }
};
</script>

<style scoped lang='less'>
// .container {
//   width: 100%;
//   min-height: 100%;
//   background-color: #f5f5f5;

//   .my-wrapper {
//     width: 100%;
//     min-height: 100%;
//     padding-bottom: 50px;
//     box-sizing: border-box;
//     &.noTop {
//       padding-top: 0;
//     }
//   }
//   img {
//     width: 24px;
//     height: 24px;
//   }
// }
</style>