<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">部门预算执行明细</div>
    </div>
    <div class="budget__top">
      <div class="bud_item">
        <div class="left_ond">
          <div class="title_box" style="width: 98px" @click.stop="openYear">
            <input
              type="text"
              :value="yearitem"
              class="exe_input"
              placeholder="预算年度"
            />
            <img src="../../assets/img/img_17.png" class="top_down" alt="" />
          </div>
        </div>
        <div class="left_ont">
          <div class="ject_select" @click.stop="openject">
            <input
              type="text"
              :value="proitem"
              class="exe_input"
              placeholder="预算项目"
            />
            <img src="../../assets/img/img_17.png" class="top_down" alt="" />
          </div>
        </div>
        <img
          src="../../assets/img/img_32.png"
          class="icon_search"
          @click.stop="searchList"
          alt=""
        />
      </div>
      <div class="selcet_list" v-if="year_select == true">
        <div class="new__tsty">
          <div class="ssese">
            <div
              class="sct_item"
              :class="yearList == kjnd ? 'is_kjnd' : ''"
              @click.stop="changeYear(yearList)"
            >
              {{ yearList }}
            </div>
          </div>
          <div class="was">
            <div
              class="sct__tem"
              :class="item.zbid == kjnd ? 'is_kjnd' : ''"
              @click.stop="changePro(item)"
              v-for="(item, index) in VoList"
              :key="index"
            >
              {{ item.xmmc }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wai_btte">
      <div v-if="rows.length != 0">
        <div class="list_item" v-for="(item, index) in rows" :key="index * 2">
          <div class="top_date">
            <img src="../../assets/img/img_15.png" class="date_img" alt="" />
            <span>{{ item.ywrq }}</span>
          </div>
          <div class="lef_txts">
            <div class="txt_name">指标说明</div>
            <div class="text_tx oneway">
              {{ item.zys }}
            </div>
          </div>
          <div class="zhnag">
            <div class="span_ds" style="min-width: 60px">
              {{ item.zt }}
            </div>
            <div class="span" style="margin-left: 10px">
              <span class="ji_span" style="margin-right: 12px">金 额</span>
              <div class="num_spat">
                <span class="icon_pt">¥</span>
                <span class="icon_price">{{ item.je }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="lef_txts">
            <div class="txt_name">年初预算</div>
            <div class="text_tx oneway">
              张锋包2019年经费结题报告张锋包2019年经费结题报告
            </div> style="align-items: normal"
          </div> -->
          <div class="lef_txts">
            <div class="txt_name">明细摘要</div>
            <div class="text_tx">{{ item.zy }}</div>
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
</template>

<script>
import Pubfun from '@/utils/commit'
import { Toast } from 'vant';
export default {
  data() {
    return {
      is_no_more: false,
      item_is: 0,
      yearList: '',
      VoList: [],
      year_select: false,
      ject_select: false,
      yearitem: '',
      proitem: '',
      pageNum: 0,
      pageSize: 10,
      rows: [],
      total: 1,
      kjnd: '',
      jhid: '',
      number: 0,
      is_button: true
    }
  },
  mounted() {

  },
  created() {
    let that = this, query = this.$route.query;
    console.log(query);
    that.proitem = query.xmmc
    this.rows = []
    this.kjnd = query.kjnd || ''
    this.jhid = query.jhid || ''
    this.yearitem = query.kjnd || ''
    this.getBudgetDetail()
    this.getBudgetYear()
    if (query && query.qu3r == 2) {
      that.gett();
      this.number = 1
    } else if (query && query.qu3r == 3) {
      this.number = 3
      this.rows = []
    } else {
      this.getBudgetTarget();
    }
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
        if (that.total != that.rows.length && this.pageNum !== 0) {
          console.log(this.number);
          if (this.number == 'undefined' || this.number !== 3) {
            that.gett();
          } else {
            console.log('进来了');
          }

        } else if (that.total == that.rows.length) {
          that.is_no_more = true
        }
      }
    }
  },
  methods: {
    gett: Pubfun.debounce('getBudgetTarget', 500),
    changedYear(year, i) {
      this.currentIndex = i
    },
    clickSelect() {
      this.is_select = !this.is_select
    },
    getBudgetTarget() {   //部门预算执行明细
      if (this.number == 3) return
      this.pageNum++
      this.$http.get('working/gbizbxmb/selectBmyszxmx?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum + '&kjnd=' + this.kjnd + '&jhid=' + this.jhid).then(res => {
        this.rows = this.rows.concat(res.data.rows)
        this.total = res.data.total
        console.log(res.data);
        this.is_button = true
        if (this.rows.length == this.total) {
          this.is_no_more = true
        }
      }).catch(err => {
        console.log(err);
        this.is_button = true
        Toast(err.msg || err.data.msg)
      })
    },
    getBudgetYear() {   //年份
      this.$http.get('working/gbizbxmb/selectByDate').then(res => {
        // console.log(res.data);
        this.yearList = res.data.data[0]
        this.yearitem = res.data.data[0]
      }).catch(err => {
        console.log(err);
        Toast(err.msg || err.data.msg)
      })
    },
    async getBudgetDetail() {   //部门项目
      try {
        const { data } = await this.$http.get('working/gbizbxmb/selectByBmYsZxMx?kjnd=' + this.kjnd)
        // console.log(data);
        this.VoList = data.data
      } catch (err) {
        console.log(err);
        Toast(err.msg || err.data.msg)
      }
    },
    openYear() {
      if (this.year_select == true) {
        this.year_select = false
      } else if (this.ject_select == false && this.year_select == false) {
        this.year_select = true
      } else {
        this.year_select = true
        this.ject_select = false
      }
    },
    openject() {
      if (this.ject_select == true) {
        this.ject_select = false
      } else if (this.ject_select == false && this.year_select == false) {
        this.ject_select = true
      } else {
        this.year_select = false
        this.ject_select = true
      }

    },
    changeYear(item) {
      this.yearitem = item
      this.kjnd = item
      this.VoList = []
      this.pageNum = 0
      this.getBudgetDetail()
    },
    changePro(item) {
      this.proitem = item.xmmc
      this.jhid = item.zbid
      this.pageNum = 0
      this.year_select = false
      this.getBudgetTarget()
      this.rows = []
    },
    searchList() {
      if (this.is_button == true) {
        this.is_button = false
        this.pageNum = 0
        this.rows = []
        this.ject_select = false
        this.getBudgetTarget()
      }

    },
    beforeDestroy() {
      // 页面卸载时移除监听事件
      // window.removeEventListener('scroll', this.getBudget, true)
    }

  }
}
</script>

<style scope lang="less">
.container {
  .budget__top {
    width: 100%;
    background-color: #fff;
    padding: 8px 16px;
    box-sizing: border-box;
    position: relative;

    .bud_item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 36px;

      .left_ond,
      .left_ont {
        position: relative;
        .title_box,
        .ject_select {
          display: flex;
          align-items: center;
          width: 98px;
          height: 36px;
          background: #f7f8fa;
          padding: 0 8px;
          box-sizing: border-box;
          border-radius: 4px;

          .exe_input {
            flex: 1;
            width: 60px;
            height: 36px;
          }

          .top_down {
            width: 14px;
            height: 14px;
            flex-shrink: 0;
          }
        }
      }

      .left_ont {
        width: 193px;
        .ject_select {
          width: 193px;
        }
      }
      .icon_search {
        width: 28px;
        height: 28px;
        flex-direction: 0;
      }
    }
    .selcet_list {
      width: 100%;
      height: 200px;
      position: absolute;
      left: 0;
      top: 52px;
      z-index: 2;
      box-sizing: border-box;
      box-shadow: 0px 8px 12px 0px rgba(0, 62, 34, 0.06);
      .new__tsty {
        display: flex;
        width: 100%;

        .ssese {
          width: 80px;
          overflow-y: scroll;
          height: 200px;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 1);
          .sct_item {
            width: 100%;
            padding: 0 16px;
            box-sizing: border-box;
            line-height: 36px;
            border-bottom: 1px solid #f7f8fa;
            // background: linear-gradient(135deg, #ffffff 15%, #effff8 94%, #e1fff1);
          }

          .is_kjnd {
            color: #1bcb7b;
          }
        }

        .was {
          flex: 1;
          overflow-y: scroll;
          height: 200px;
          background: rgba(255, 255, 255, 1);
          box-sizing: border-box;

          .sct__tem {
            width: 100%;
            text-align: left;
            padding: 0 16px;
            box-sizing: border-box;
            line-height: 28px;
            // border-bottom: 1px solid #f7f8fa;
          }
          .is_kjnd {
            color: #1bcb7b;
          }
        }
      }
      .nelit {
        display: block;
        flex-direction: column;
      }
    }
    .fixedbox {
      width: 100%;
      height: 88px;
      position: absolute;
      top: 52px;
      left: 0;
      z-index: 2;
      background: rgba(0, 0, 0, 0.6);
    }
  }

  .wai_btte {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;

    .list_item {
      width: 100%;
      padding: 16px 16px;
      box-sizing: border-box;
      background: linear-gradient(135deg, #ffffff 15%, #effff8 94%, #e1fff1);
      border: 1px solid #f2f3f5;
      border-radius: 9px;
      margin-bottom: 12px;

      .top_date {
        width: 100%;
        display: flex;
        align-items: center;

        .date_img {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }
        span {
          flex: 1;
          padding-left: 8px;
          box-sizing: border-box;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #323233;
        }
      }

      .zhnag {
        width: 100%;
        display: flex;
        align-items: baseline;

        .span_ds {
          height: 21px;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #646566;
        }

        .span {
          display: flex;
          align-items: baseline;

          .ji_span {
            font-size: 10px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #646566;
          }

          .num_spam {
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 600;
            text-align: left;
            color: #323233;
          }

          .num_spat {
            display: flex;
            align-items: baseline;

            .icon_pt {
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 600;
              text-align: LEFT;
              color: #ff770b;
            }
            .icon_price {
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 600;
              text-align: LEFT;
              color: #ff770b;
            }
          }
        }
      }
      .lef_txts {
        display: flex;
        width: 100%;
        align-items: center;
        padding: 4px 0;
        box-sizing: border-box;

        .txt_name {
          width: 70px;
          text-align: left;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #646566;
        }
        .text_tx {
          flex: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #323233;
        }
      }
    }
  }
}
</style>