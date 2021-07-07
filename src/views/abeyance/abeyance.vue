<template>
  <div class="container">
    <div class="paycroll1"></div>
    <van-nav-bar title="" />
    <div class="health">
      <div class="bit_ttiles">我的工作台</div>
      <div class="bit_one_box">
        <div class="letf_one__bk" @click="turnMyapproval">
          <div class="t_items">
            <div class="t_names ms_name">
              审批办理
              <span class="corner_markspan" v-if="cateRemburse != 0">
                {{ cateRemburse }}</span
              >
            </div>
            <div class="b_names">前往申请审批</div>
          </div>
          <div class="down__ont">
            <div class="left_button">立即前往</div>
            <img src="../../assets/img/img_01.png" class="icon_img1" alt="" />
          </div>
        </div>
        <div class="rig_one__bk">
          <div class="top_bk" @click="turnMeborrow">
            <div class="t_items">
              <div class="t_names ms_name">
                我的借款
                <span class="corner_markspan" v-if="wdjk != 0">
                  {{ wdjk }}</span
                >
              </div>
              <div class="b_names">查看我的借款详情</div>
            </div>
            <img src="../../assets/img/img_03.png" class="icon_img1" alt="" />
          </div>
          <div class="top_bk down__bk" @click="turnReimburse">
            <div class="t_items">
              <div class="t_names ms_name">
                我的报销
                <span class="corner_markspan" v-if="wdbx != 0">
                  {{ wdbx }}</span
                >
              </div>
              <div class="b_names">查看我的报销详情</div>
            </div>
            <img src="../../assets/img/img_02.png" class="icon_img1" alt="" />
          </div>
        </div>
      </div>
      <div class="bit_ttiles">待办进度统计</div>
      <div class="statistics__lsit">
        <div class="" v-if="statList.length != 0">
          <div class="stat_item" v-for="(item, index) in statList" :key="index">
            <div class="left_stat">
              <div class="top_date">{{ item.month }}</div>
              <div class="down_list">
                <div class="one_kef">
                  <div class="img_ones">
                    <img
                      src="../../assets/img/img_04.png"
                      class="icon_small"
                      alt=""
                    />
                  </div>

                  <div class="one_kef__name">
                    总任务 <span class="count">{{ item.task }}</span>
                  </div>
                </div>
                <div class="one_kef">
                  <div class="img_ones">
                    <img
                      src="../../assets/img/img_05.png"
                      class="icon_small"
                      alt=""
                    />
                  </div>
                  <div class="one_kef__name">
                    已完成
                    <span class="count" style="color: #4e9fff">{{
                      item.done
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="right_bingtu">
              <van-circle
                v-model="item.ratio"
                :rate="item.ratio"
                :text="item.ratio + '%'"
                layer-color="#ebedf0"
                stroke-width="80"
                size="54px"
              />
            </div>
          </div>
          <div class="on_more" v-if="is_no_more == true">
            <img src="../../assets/img/img_35.png" alt="" />
          </div>
        </div>
        <div class="empty_page" v-else>
          <div class="empty_box" style="margin: 10px auto">
            <img src="../../assets/img/empty.png" alt="" />
            <div class="empty_text">暂无更多数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from 'vant';
export default {
  data() {
    return {
      currentRate: 0,   //Circle 环形进度条
      rate: '60',   // 必须为字符串
      statList: [],
      pageNum: 0,
      pageSize: 10,
      total: 0,
      is_no_more: false,
      cateRemburse: '',
      wdbx: '',
      wdjk: '',

    }
  },
  created() {
    this.getBynum()
    let token = window.localStorage.getItem('move_token')
    if (token) {
      // this.getWork()
    }
    this.getWork()
    let that = this
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
        if (that.total != that.statList.length) {
          // that.getWork();
        } else if (that.total == that.statList.length) {
          that.is_no_more = true
        }
      }
    }
  },
  methods: {
    async getBynum() {
      let that = this;
      this.$http.get('working/pof/selectByNumber').then(res => {
        console.log(res);
        that.cateRemburse = res.data.data.commission
        that.wdjk = res.data.data.wdjk
        that.wdbx = res.data.data.wdbx
      }).catch(err => {
        console.log(err, "出错了");
        Toast(err.msg || err.data.msg)
      })
    },
    turnMyapproval() {  // 进入我的审核
      this.$router.push('/myapproval')
    },
    turnMeborrow() {  // 进入我的借款
      this.$router.push('/meborrow')
    },
    turnReimburse() {   // 我的报销
      this.$router.push('/myreimburse')
    },
    async getWork() {
      try {
        this.pageNum++
        const { data: { data } } = await this.$http.get('working/pof/selectByStatistics?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum)
        console.log(data);
        this.statList = [... this.statList, ...data]
      } catch (err) {
        console.log(err);
        Toast(err.data.msg || err.msg)
      }

    },
  },

}
</script>

<style lang="less" scoped>
.container {
  .health {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;

    .bit_ttiles {
      opacity: 1;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 600;
      text-align: left;
      color: #323233;
      position: relative;
      width: 100%;
      padding: 12px 0 12px 8px;
      box-sizing: border-box;

      &::after {
        position: absolute;
        content: "";
        top: 50%;
        left: 0px;
        z-index: 1;
        transform: translateY(-50%);
        width: 4px;
        height: 16px;
        opacity: 1;
        background: linear-gradient(135deg, #1bcb7b, rgba(255, 255, 255, 0));
        border-radius: 5px;
      }
    }

    .bit_one_box {
      width: 100%;
      display: flex;
      align-items: center;

      .letf_one__bk {
        width: 50%;
        padding: 22px 12px 25px;
        box-sizing: border-box;
        height: 180px;
        opacity: 1;
        background: linear-gradient(135deg, #ffffff 15%, #ecfff6 78%, #c6ffe5);
        border: 1px solid #f2f3f5;
        box-sizing: border-box;
        box-shadow: 0px 8px 12px 0px rgba(0, 62, 34, 0.03);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .t_items {
          width: 100%;
          .t_names {
            width: 100%;
            height: 22px;
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #323233;
          }
          .b_names {
            width: 100%;
            height: 17px;
            opacity: 1;
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #969799;
          }
          .ms_name {
            display: flex;
            align-items: center;
            .corner_markspan {
              display: block;
              height: 16px;
              width: 20px;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              border-radius: 4px;
              margin-left: 4px;
              background-color: #ee0a24;
              color: #fff;
            }
          }
        }

        .down__ont {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;

          .left_button {
            width: 64px;
            height: 25px;
            opacity: 1;
            border: 1px solid #51f5ab;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            color: #1bcb7b;
          }

          .icon_img1 {
            width: 40px;
            height: 40px;
            opacity: 1;
            flex-shrink: 0;
          }
        }
      }

      .rig_one__bk {
        width: 50%;

        .top_bk {
          width: 100%;
          height: 90px;
          opacity: 1;
          background: linear-gradient(135deg, #ffffff, #e5f7ff);
          border: 1px solid #f2f3f5;
          box-shadow: 0px 8px 12px 0px rgba(0, 62, 34, 0.03);
          display: flex;
          align-items: center;
          padding: 22px 12px;
          box-sizing: border-box;

          .t_items {
            flex: 1;
            .t_names {
              width: 100%;
              height: 22px;
              opacity: 1;
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 500;
              text-align: left;
              color: #323233;
            }
            .b_names {
              width: 100%;
              height: 17px;
              opacity: 1;
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #969799;
            }
            .ms_name {
              display: flex;
              align-items: center;
              .corner_markspan {
                display: block;
                height: 16px;
                width: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                border-radius: 4px;
                margin-left: 4px;
                background-color: #ee0a24;
                color: #fff;
              }
            }
          }
        }
        .down__bk {
          background: linear-gradient(135deg, #ffffff, #e2e9ff);
          border: 1px solid #f2f3f5;
          box-shadow: 0px 8px 12px 0px rgba(0, 62, 34, 0.03);
        }
      }
    }

    .statistics__lsit {
      width: 100%;
      min-height: 200px;

      .stat_item {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 12px;
        box-sizing: border-box;
        background: linear-gradient(135deg, #ffffff, #e5f7ff);
        border: 1px solid #f2f3f5;
        border-radius: 9px;
        margin-bottom: 16px;

        .left_stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 54px;
          .top_date {
            width: 100%;
            height: 22px;
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 600;
            text-align: left;
            color: #323233;
            letter-spacing: 0px;
          }
          .down_list {
            width: 100%;
            display: flex;
            align-items: center;
            height: 21px;

            .one_kef {
              display: flex;
              align-items: center;
              margin-right: 20px;
              height: 21px;

              .img_ones {
                display: flex;
                align-items: center;
                .icon_small {
                  width: 14px;
                  height: 14px;
                  margin-right: 4px;
                  flex-shrink: 0;
                }
              }

              .one_kef__name {
                opacity: 1;
                font-size: 12px;
                font-family: PingFang SC, PingFang SC-Regular;
                font-weight: 400;
                text-align: left;
                color: #969799;
                letter-spacing: 0px;
                line-height: 21px;
                .count {
                  opacity: 1;
                  font-size: 12px;
                  font-family: PingFang SC, PingFang SC-Regular;
                  font-weight: 400;
                  text-align: left;
                  color: #1bcb7b;
                  letter-spacing: 0px;
                }
              }
            }
          }
        }

        .right_bingtu {
          width: 64px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }

      .no__more {
        width: 100%;
        position: relative;
        height: 30px;

        .no_name {
          width: 100px;
          height: 30px;
          line-height: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          background-color: #f5f5f5;
          color: #969799;
          font-size: 14px;
        }
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 2px;
          background-color: #eee;
          z-index: 1;
        }
      }
    }
  }
}
</style>