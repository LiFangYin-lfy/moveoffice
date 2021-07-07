<template>
  <div class="container">
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">消息（——）</div>
    </div>
    <div class="listy">
      <div class="ty_item">
        <div class="ty_box" v-for="(item, index) in list" :key="index">
          <img src="../../assets/img/img_07.png" alt="" />
          <div class="rig_ty">
            <div class="t_title">
              <div class="titls_name">待报销审批提醒</div>
              <div class="titls_date">12-05</div>
            </div>
            <div class="sm_title oneway">
              您有需要审批的单据，点击详情查看...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant"
export default {
  components: {

  },
  data() {
    return {
      list: 5,
    }
  },
  created() {
    // this.getmessage()
  },
  methods: {
    async getmessage() {
      try {
        const { data } = await this.$http.get('')
        console.log(data);
      } catch (err) {
        console.log(err);
        Toast(err.msg || err.data.msg)
      }
    }
  },
  beforeDestroy() {

  }
}

</script>

<style scoped lang='less'>
.container {
  .listy {
    width: 100%;

    .ty_item {
      width: 100%;
      padding: 16px;
      box-sizing: border-box;

      .ty_box {
        display: flex;
        align-items: center;
        width: 100%;
        background-color: #fff;
        padding: 16px;
        box-sizing: border-box;
        border-bottom: 1px solid #f7f8fa;

        img {
          width: 46px;
          height: 46px;
          border-radius: 8px;
        }

        .rig_ty {
          flex: 1;
          padding-left: 16px;
          box-sizing: border-box;
          .t_title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 23px;
            .titls_name {
              flex: 3;
              opacity: 1;
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
            }
            .titls_date {
              flex: 1;
              opacity: 1;
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: right;
              color: #969799;
            }
          }

          .sm_title {
            width: 100%;
            opacity: 1;
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #646566;
            letter-spacing: 0px;
          }
        }
      }
    }
  }
}
</style>