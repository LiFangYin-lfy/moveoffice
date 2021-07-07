<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">我的报销</div>
    </div>
    <div class="de_list">
      <div class="top_naw">
        <div
          class="nav_item"
          @click="changeTitle(send)"
          :class="title.type == status ? 'is__navcolor' : ''"
          v-for="(title, send) in nav"
          :key="send"
        >
          {{ title.title }}
        </div>
      </div>
      <div class="search_box">
        <div class="serch">
          <img src="../../assets/img/img_32.png" class="icon_search" alt="" />
          <div class="inp__t">
            <input
              type="text"
              placeholder="金额/单据类型/预算项目/摘要"
              class="vant_input"
              v-model="selectData"
            />
          </div>
        </div>
        <div class="imgs_d" @click="getlist">
          <img src="../../assets/img/img_33.png" alt="" />
        </div>
      </div>
      <div class="health__a">
        <div v-if="list.length != 0">
          <div
            class="my_list"
            v-for="(item, index) in list"
            :key="index"
            @click.stop="turnMyborrowdetail(item)"
          >
            <div class="top_name">
              <div class="left_name">
                {{ item.djlxmc }}
                <span style="color: #3fabc5">
                  {{ item.flag == "F" ? "【未送审】" : "" }}</span
                >
              </div>
              <div class="name_arrow">
                <span class="arr_names">{{ item.crermc }}</span>
                <img src="../../assets/img/img_16.png" alt="" />
              </div>
            </div>
            <div class="itembox">
              <div class="me_name1" style="align-items: normal">
                <div class="lable">摘要</div>
                <div class="right_text t_text">
                  {{ item.zy }}
                </div>
              </div>
              <div class="me_name1">
                <div class="lable">预算项目</div>
                <div class="right_text oneway" style="color: #dfb446">
                  {{ item.ysxm }}
                </div>
              </div>
              <div class="me_name1">
                <div class="lable">项目时间</div>
                <div class="right_text oneway">{{ item.djdate }}</div>
              </div>
              <div class="me_name1">
                <div class="lable">项目预算</div>
                <div class="riht_money">
                  <span class="my_icon">¥</span>
                  <span class="my_money">{{ item.je }}</span>
                </div>
              </div>
              <div class="tan_boxs">
                <div class="tan_tesx" v-if="status == 3 && item.flag == 'F'">
                  送审
                </div>
              </div>
            </div>
            <div class="down_ben">
              <div class="left_details">
                <span>查看详情</span>
                <img
                  src="../../assets/img/img_34.png"
                  class="detail_arrow"
                  alt=""
                />
              </div>
              <div class="flex_one">
                <div
                  class="button button2"
                  @click.stop="turnmicroservice(item.mlid)"
                >
                  <span>审批日志</span>
                </div>
              </div>
              <div class="flex_one itam">
                <!-- <div class="button" @click.stop="onshow(item)">
                  <span>审 批</span>
                </div> -->
              </div>
              <!-- <div class="flex_one itam" v-if="item_is == 1">
                <div class="button">
                  <span>撤回审批</span>
                </div>
              </div>
              <div class="flex_one itam" v-if="item_is == 2">
                <div class="button button3">
                  <span>不可撤回</span>
                </div>
              </div> -->
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
      nav: this.$variate.mebburse,
      list: [],
      is_no_more: false,
      total: 0,
      pageNum: 0,
      pageSize: 10,
      status: 3,   // 	1-审核中 2-历史借款 3-报销审核 4-历史报销单
      item_is: 0,
      to_reimburse: true,   //  我的报销时不显示 , 我的审核显示
      selectData: '',
      mild: '',
      message: '',
      is_button: true
    }
  },
  created() {
    let that = this;
    that.getmeb()
    window.addEventListener('scroll', this.scrollHandle, true)
  },
  methods: {
    scrollHandle() {
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
        if (that.total != that.list.length) {
          that.getmeb();
        } else if (that.total == that.list.length) {
          that.is_no_more = true
        }
      }
    },
    onshow(item) {
      this.mild = item.mlid
      console.log(this.mild);
    },
    turnAffix() {
      this.$router.push({ path: '/affix', query: { mild: this.mild } })
    },

    goback() {
      this.$router.go(-1)
    },
    turnMyborrowdetail(item) {
      console.log(item);
      this.$router.push({ path: '/myauthorization', query: { djlxid: item.djlxid, mlid: item.mlid, pagename: item.djlxmc } })
    },
    turnmicroservice(mlid) {
      this.$router.push({ path: '/microservice', query: { id: mlid } })
    },
    changeTitle(sevd) {
      let that = this, list = this.nav;
      list.forEach((iten, index) => {
        iten.is_nav = 0
        if (index == sevd) {
          iten.is_nav = 1
        }
      });
      that.nav = list
      that.pageNum = 0
      that.list = []
      if (sevd == 0) {
        that.status = 3
      } else {
        that.status = 4
      }
      that.getmeb()
    },

    async getmeb() {
      this.pageNum++
      try {
        const { data } = await this.$http.get('working/oerdjml/selectBorrowList?status=' + this.status + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&selectData=' + this.selectData)
        console.log(data);
        this.list = [...this.list, ...data.rows]
        this.total = data.total
        this.is_button = true
        if (this.total == this.list.length) {
          this.is_no_more = true
        }
      } catch (err) {
        console.log(err);
        this.is_button = true
        Toast(err.msg || err.data.msg)
      }
    },
    getlist() {
      if (this.is_button == true) {
        this.is_button = false
        this.list = [];
        this.is_no_more = false;
        this.total = 0;
        this.pageNum = 0;
        this.getmeb()
      }

    },
    beforeDestroy() {
      // 页面卸载时移除监听事件
      window.removeEventListener('scroll', this.scrollhandle, true)
    }


  },
}

</script>

<style scoped lang='less'>
.container {
  width: 100%;

  .de_list {
    width: 100%;

    .top_naw {
      width: 100%;
      display: flex;
      align-items: center;
      height: 44px;
      background: #1bcb7b;

      .nav_item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        opacity: 0.6;
        font-size: 14px;
      }
      .is__navcolor {
        color: #ffffff;
        font-weight: 600;
        position: relative;
        opacity: 1;

        &::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          width: 40px;
          height: 3px;
          background-color: #1bcb7b;
        }
      }
    }

    .search_box {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 8px 16px;
      box-sizing: border-box;
      background-color: #fff;

      .serch {
        flex: 1;
        display: flex;
        align-items: center;
        height: 36px;
        border-radius: 18px;
        background: #f7f8fa;
        padding: 0 10px;
        box-sizing: border-box;
        .icon_search {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }
        .inp__t {
          flex: 1;
          padding-left: 8px;
          box-sizing: border-box;
          .vant_input {
            width: 100%;
            height: 36px;
          }
        }
      }

      .imgs_d {
        width: 50px;
        padding-left: 20px;
        box-sizing: border-box;

        img {
          width: 22px;
          height: 22px;
        }
      }
    }

    .health__a {
      width: 100%;
      padding: 16px;
      box-sizing: border-box;

      .my_list {
        width: 100%;
        opacity: 1;
        background: #ffffff;
        border: 1px solid #f2f3f5;
        border-radius: 9px;
        padding: 0 12px;
        box-sizing: border-box;
        margin-bottom: 12px;

        .top_name {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          box-sizing: border-box;

          .left_name {
            flex: 3;
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #323233;
          }
          .name_arrow {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .arr_names {
              text-align: right;
              opacity: 1;
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              color: #323233;
            }
            img {
              width: 16px;
              height: 20px;
              flex-shrink: 0;
              margin-left: 8px;
            }
          }
        }
        .itembox {
          width: 100%;
          padding: 12px 0;
          box-sizing: border-box;
          border-bottom: 1px dashed #dcdee0;
          position: relative;

          .me_name1 {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 4px 0;
            box-sizing: border-box;

            .lable {
              width: 66px;
              opacity: 1;
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #646566;
              flex-shrink: 0;
            }
            .right_text {
              flex: 1;
              opacity: 1;
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #323233;
              letter-spacing: 0px;
            }
            .riht_money {
              display: flex;
              align-items: baseline;
              .my_icon {
                font-size: 8px;
                color: #ee0a24;
              }
              .my_money {
                font-size: 12px;
                color: #ee0a24;
              }
            }
          }

          .tan_boxs {
            position: absolute;
            right: 8px;
            bottom: 4px;
            z-index: 2;

            .tan_tesx {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background-color: #3fabc5;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #fff;
            }
          }
        }
        .down_ben {
          width: 100%;
          padding: 12px 0;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .left_details {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 26px;
            span {
              opacity: 1;
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              line-height: 26px;
              color: #14b8ff;
              margin-right: 4px;
            }
            img {
              width: 12px;
              height: 16px;
            }
          }
          .flex_one {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .button {
              width: 72px;
              height: 26px;
              border-radius: 12px;
              border: 1px solid #1bcb7b;
              text-align: center;
              line-height: 26px;
              span {
                font-size: 12px;
                font-family: PingFang SC, PingFang SC-Regular;
                font-weight: 400;
                color: #1bcb7b;
              }
            }
            .button2 {
              border: 1px solid #ff9417;
              span {
                color: #ff9417;
              }
            }
            .button3 {
              border: 1px solid #ee0a24;
              span {
                color: #ee0a24;
              }
            }
          }
          .itam {
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>