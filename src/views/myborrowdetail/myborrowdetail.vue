<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="goback">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">我的借款明细情况</div>
    </div>
    <div class="healthd">
      <div v-if="borrow.length != 0">
        <div class="my_broow" v-for="(item, index) in borrow" :key="index">
          <div class="brow_title">
            <span class="date_title">{{ item.pzrq }}</span>
            <span style="margin-left: 20px">{{ item.pzh }}</span>
          </div>
          <div class="small_title">
            <img src="../../assets/img/img_51.png" alt="" />
            <div class="title__names">{{ item.pzzy }}</div>
          </div>
          <div class="down_boxs">
            <div class="bw__itme">
              <div class="moneys_item">
                <!-- <span class="pt_icon" style="color: #1bcb7b">¥</span> -->
                <span class="pt_monty" style="color: #1bcb7b">{{
                  item.pzh == "" ? "0.00" : item.pzh
                }}</span>
              </div>
              <div class="status_bw">{{ item.pzrq }}</div>
            </div>
            <div class="bw__itme">
              <div class="moneys_item">
                <span class="pt_icon">¥</span>
                <span class="pt_monty">{{
                  item.je == null ? "0.00" : item.je
                }}</span>
              </div>
              <div class="status_bw">借款</div>
            </div>
            <div class="bw__itme">
              <div class="moneys_item">
                <span class="pt_icon" style="color: #1bcb7b">¥</span>
                <span class="pt_monty" style="color: #1bcb7b">{{
                  item.hxje == null ? "0.00" : item.hxje
                }}</span>
              </div>
              <div class="status_bw">已核销</div>
            </div>
            <div class="bw__itme">
              <div class="moneys_item">
                <span class="pt_icon" style="color: #ee0a24">¥</span>
                <span class="pt_monty" style="color: #ee0a24">{{
                  item.ye == null ? "0.00" : item.ye
                }}</span>
              </div>
              <div class="status_bw">未核销</div>
            </div>
          </div>
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
    <div class="down__buttoen">
      <div class="back_box">
        <button class="button_callback" @click.stop="goback">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      list: this.$variate.four,
      is_no_more: false,
      borrow: [],
      total: 0,
      pageSize: 10,
      pageNum: 0,
    }
  },
  created() {
    let that = this
    that.ongetbor()
    window.addEventListener('scroll', this.scrolllist, true)
  },
  methods: {
    scrolllist() {
      let that = this
      // scrollTop 滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // windowHeight 可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // scrollHeight 滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight) {
        // 加载数据
        if (that.total != that.borrow.length) {
          that.ongetbor();
        } else if (that.total == that.borrow.length) {
          that.is_no_more = true
        }
      }
    },
    goback() {
      this.$router.go(-1)
    },
    async ongetbor() {
      try {
        const {
          data
        } = await this.$http.get('working/glyebk/selectBorrowingDetail');
        console.log(data);
        this.borrow = [...this.borrow, ...data.rows]
        this.total = data.total
      } catch (err) {
        console.log(err, "出错了");
        Toast(err.msg || err.data.msg)
      }
    },
    beforeDestroy() {
      // 页面卸载时移除监听事件
      window.removeEventListener('scroll', this.scrolllist, true)
    }
  }
}
</script>

<style scope lang="less">
.container {
  .healthd {
    width: 100%;
    padding: 16px 16px 70px;
    box-sizing: border-box;

    .my_broow {
      width: 100%;
      opacity: 1;
      background: linear-gradient(135deg, #ffffff 15%, #effff8 94%, #e1fff1);
      border: 1px solid #f2f3f5;
      border-radius: 9px;
      padding: 12px;
      box-sizing: border-box;
      margin-bottom: 12px;

      .brow_title {
        width: 100%;
        display: flex;
        align-items: center;

        span {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 600;
          text-align: left;
          color: #323233;
        }
      }
      .small_title {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 8px 0;
        box-sizing: border-box;
        img {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
        }

        .title__names {
          flex: 1;
          padding-left: 5px;
          box-sizing: border-box;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #646566;
          letter-spacing: 0px;
        }
      }

      .down_boxs {
        width: 100%;
        display: flex;
        align-content: center;
        padding-top: 8px;
        box-sizing: border-box;

        .bw__itme {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .moneys_item {
            display: flex;
            align-items: baseline;
            justify-content: center;

            .pt_icon,
            .pt_monty {
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              color: #5e95fb;
            }
            .pt_monty {
              font-size: 16px;
            }
          }
          .status_bw {
            padding-top: 4px;
            box-sizing: border-box;
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            color: #646566;
          }
        }
      }
    }
  }

  .down__buttoen {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;

    .back_box {
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
      background-color: #fff;
      .button_callback {
        width: 100%;
        height: 40px;
        background-color: #1bcb7b;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>