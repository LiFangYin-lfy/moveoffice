<template>
  <div class="container">
    <div class="paycroll1"></div>

    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">我的工资</div>
    </div>

    <div class="nav_boxs">
      <div class="bx_list">
        <div class="one_list" v-if="list.length != 0">
          <div
            class="one_irem"
            v-for="(item, index) in list"
            :key="index"
            @click.stop="openDetail(item)"
          >
            <img src="../../assets/img/img_21.png" class="big_img" alt="" />
            <div class="ri_box">
              <div class="top_dater">
                <div class="left_ttile">{{ item.ffyf }}</div>
                <img
                  src="../../assets/img/img_11.png"
                  class="arrow_bs"
                  alt=""
                />
              </div>
              <p class="s_pp">计薪范围：{{ item.jxfw }}</p>
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
      total: 0,
      list: [],
      is_no_more: false,
      pageNum: 0,
      pageSize: 10,
    }
  },
  created() {
    this.getmywage()
    let that = this
    let query = that.$route.query
    console.log(query);
    this.currentIndex = query.way
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
          that.getmywage();
        } else if (that.total == that.list.length) {
          that.is_no_more = true
        }
      }
    }
  },
  methods: {
    turnBorrowdetail() {
      this.$router.push('/myborrowdetail')
    },
    openDetail(item) {
      let im = item;
      this.$router.push({ path: '/mywagedetail', query: { nf: im.nf, yf: im.yf, ffyf: im.ffyf } })
    },
    async getmywage() {
      this.pageNum++
      try {
        const { data } = await this.$http.get('working/gzgz/selectBySalary?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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
}

</script>

<style scoped lang='less'>
.container {
  .nav_boxs {
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
        color: #fff;
        font-size: 14px;
        opacity: 0.8;
        height: 44px;
      }
      .is__navcolor {
        color: #fff;
        font-weight: 600;
        position: relative;
        opacity: 1;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          width: 40px;
          height: 3px;
          background-color: #fff;
        }
      }
    }

    .bx_list {
      .one_list {
        width: 100%;
        padding: 16px;
        box-sizing: border-box;

        .one_irem {
          width: 100%;
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          padding: 16px 12px;
          box-sizing: border-box;
          background: linear-gradient(
            135deg,
            #ffffff 15%,
            #ecfff6 94%,
            #c6ffe5
          );
          border: 1px solid #f2f3f5;
          border-radius: 12px;

          .big_img {
            width: 50px;
            height: 50px;
            flex-shrink: 0;
          }

          .ri_box {
            padding-left: 12px;
            box-sizing: border-box;
            flex: 1;

            .top_dater {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .left_ttile {
                flex: 1;
                font-size: 16px;
                font-family: PingFang SC, PingFang SC-Medium;
                font-weight: 500;
                text-align: left;
                color: #323233;
              }

              .arrow_bs {
                width: 18px;
                height: 18px;
                flex-shrink: 0;
              }
            }
            .s_pp {
              width: 100%;
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #646566;
              padding-top: 4px;
              box-sizing: border-box;
            }
          }
        }
      }

      .two_list {
        width: 100%;
        padding: 16px;
        box-sizing: border-box;

        .tip_quan {
          width: 100%;
          display: flex;
          align-items: center;
          background: linear-gradient(
            135deg,
            #ffffff 15%,
            #ecfff6 78%,
            #c6ffe5
          );
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
          margin-top: 16px;
          .sue_liss,
          .sue_lim {
            width: 100%;
            display: flex;
            align-items: center;
            height: 48px;
            background-color: #fff;

            .is_sue,
            .is_sut {
              flex: 1;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              color: #22272b;
            }
          }
          .sue_lim {
            background-color: #f2f3f5;

            .is_sut {
              color: #646566;
            }
          }
        }
      }
    }
  }
}
</style>