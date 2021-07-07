<template>
  <div class="container">
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">其他收入</div>
    </div>
    <div class="bx_list">
      <div class="two_list">
        <!-- <div class="tip_quan">
          <div class="left_bx">
            <van-circle
              v-model="currentRate"
              :rate="rate"
              :stroke-width="60"
              :text="text + rate"
              layer-color="#f7f8fa"
            />
          </div>
          <div class="ri_bx">
            <div class="boxs_wage">
              <span class="r_one"></span>
              <span class="r_two">课时费</span>
              <span class="r_three">2500.00</span>
            </div>
            <div class="boxs_wage">
              <span class="r_one"></span>
              <span class="r_two">评审费</span>
              <span class="r_three">2500.00</span>
            </div>
            <div class="boxs_wage">
              <span class="r_one"></span>
              <span class="r_two">监考费</span>
              <span class="r_three">2500.00</span>
            </div>
            <div class="boxs_wage">
              <span class="r_one"></span>
              <span class="r_two">加班费</span>
              <span class="r_three">2500.00</span>
            </div>
          </div>
        </div> -->
        <div class="issue_list" v-if="list.length != 0">
          <div class="sue_liss" style="height: 48px">
            <span class="is_sue"> 发放时间</span>
            <span class="is_sue new__its"> 事由</span>
            <span class="is_sue"> 项目名称</span>
            <span class="is_sue new__withe"> 发放金额</span>
          </div>
          <div class="sue_lim" v-for="(item, index) in list" :key="index">
            <span class="is_sut"> {{ item.ffsj }}</span>
            <span class="is_sut new__its"> {{ item.zt }}</span>
            <span class="is_sut"> {{ item.srxmc }}</span>
            <span class="is_sut new__withe"> {{ item.je }}</span>
          </div>
          <div class="on_more" v-if="is_no_more == true">
            <img src="../../assets/img/img_35.png" alt="" />
          </div>
        </div>
        <div class="empty_page" v-else>
          <div class="empty_box">
            <img src="../../assets/img/empty.png" alt="" />
            <div class="empty_text">暂无更多数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';

export default {
  components: {

  },
  data() {
    return {
      total: 0,
      list: [],
      is_no_more: false,
      text: "其他收入",
      currentRate: 70,
      currentIndex: 0,
      rate: '70',
      pageNum: 0,
      pageSize: 10,

    }
  },
  created() {
    let that = this
    that.getother()
    window.onscroll = function () {
      // scrollTop 滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // windowHeight 可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // scrollHeight 滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight) {
        // 加载数据
        if (that.total != that.list.length) {
          that.getother();
        } else if (that.total == that.list.length) {
          that.is_no_more = true
        }
      }
    }
  },
  methods: {
    async getother() {
      this.pageNum++
      try {
        const { data } = await this.$http.get('working/gzgzmxbl/list?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
        console.log(data);
        this.list = [...this.list, ...data.rows]
        this.total = data.total
        if (this.total == this.list.length) {
          this.is_no_more = true
        }
      } catch (err) {
        console.log(err);
        Toast(err.msg || err.data.msg)
      }

    },
  },
  beforeDestroy() {

  }
}

</script>

<style scoped lang='less'>
.container {
  .bx_list {
    .two_list {
      width: 100%;
      padding: 0 8px;
      box-sizing: border-box;

      .tip_quan {
        width: 100%;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #ffffff 15%, #ecfff6 78%, #c6ffe5);
        border: 1px solid #f2f3f5;
        border-radius: 9px;
        padding: 21px 16px;
        box-sizing: border-box;

        .left_bx {
          flex: 1;
        }

        .ri_bx {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          .boxs_wage {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 6px;

            .r_one {
              display: block;
              width: 4px;
              height: 4px;
              background-color: #07c160;
              border-radius: 50%;
            }
            .r_two {
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: LEFT;
              color: #646566;
              padding: 0 8px 0 6px;
              box-sizing: border-box;
            }
            .r_three {
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 600;
              text-align: left;
              color: #07c160;
            }
          }
        }
      }

      .issue_list {
        width: 100%;
        // margin-top: 16px;
        .sue_liss,
        .sue_lim {
          width: 100%;
          display: flex;
          align-items: center;
          background-color: #fff;

          .is_sue {
            width: 25%;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #22272b;
          }
          .new__its {
            width: 30%;
          }
          .new__withe {
            width: 20%;
          }
        }
        .sue_lim {
          background-color: #f2f3f5;

          .is_sut {
            width: 25%;
            color: #646566;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            padding: 8px 0;
            box-sizing: border-box;
          }
          .new__its {
            width: 30%;
          }
          .new__withe {
            width: 20%;
          }
        }
      }
    }
  }
}
</style>