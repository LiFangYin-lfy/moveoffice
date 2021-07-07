<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">附件列表</div>
    </div>
    <div class="lsit">
      <div v-if="list.length != 0">
        <div class="is_lists" v-for="(item, index) in list" :key="index">
          <div class="is_item">
            <div class="top_ttle">
              <div class="left_id">
                <img src="../../assets/img/img_54.png" alt="" />
                <span>{{ item.fjlxmc }}</span>
              </div>
              <!-- <div class="ri_icon">
                <span v-if="item.type == 1">展开</span>
                <span v-else>合并</span>
                <img
                  src="../../assets/img/img_60.png"
                  v-if="item.type == 1"
                  alt=""
                />
                <img src="../../assets/img/img_59.png" v-else alt="" />
              </div> -->
            </div>
            <div class="new_tanpops">
              <div
                class="pop_iren"
                v-for="(item1, index1) in item.itmeVoList"
                :key="index1"
                @click.stop="turnaff(item1.atguid)"
              >
                <span class="oneway inds"> {{ item1.fjmc }}</span>
                <span> {{ item1.fjkzm }}</span>
              </div>
            </div>
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
      list2: [{
        title: '费用相关原始单据11',
        type: 1,
        lit: [{
          id: 1,
          namel: '火车票'
        }, {
          id: 2,
          namel: '乘坐飞机'
        }]
      }, {
        title: '费用相关原始单据11',
        type: 1,
        lit: [{
          id: 1,
          namel: '火车票'
        }, {
          id: 2,
          namel: '乘坐飞机'
        }]
      }],
      atguid: '',
      pageNum: 0,
      pageSize: 10,
      total: 0,
      list: [],
      djid: '',

    }
  },
  created() {
    let that = this
    let query = that.$route.query
    console.log(query);

    this.djid = query.mild
    console.log(this.djid, query.mild.toString());
    that.getFile()
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
          that.getFile();
        } else if (that.total == that.list.length) {
          that.is_no_more = true
        }
      }
    }
  },
  methods: {
    // closeOpen(index) {
    //   let that = this, send = index, list = that.list;
    //   if (list[send].type == 1) {
    //     list[send].type = 2
    //   } else {
    //     list[send].type = 1
    //   }
    // },
    turnaff(it) {
      this.$router.push({ path: '/affproview', query: { atguid: it } })
    },
    async getFile() {
      this.pageNum++
      try {
        const { data } = await this.$http.get('working/pubfjlxmod/list?djid=' + this.djid)
        console.log(data);
        this.list = data.data
      } catch (err) {
        console.log(err);
        Toast(err.msg || err.data.msg)
      }
    },
    getFilse() {
      this.$get({
        url: 'working/pubfjlxmod/list',
        data: {
          djid: this.djid
        }
      }).then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    }


  },
  beforeDestroy() {

  }
}

</script>

<style scoped lang='less'>
.container {
  .lsit {
    width: 100%;

    .is_lists {
      width: 100%;
      margin-bottom: 8px;
      background-color: #fff;
      padding: 0 16px;
      box-sizing: border-box;

      .is_item {
        width: 100%;

        .top_ttle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 44px;

          .left_id {
            flex: 1;
            display: flex;
            align-items: center;
            height: 44px;

            img {
              width: 22px;
              height: 22px;
              flex-shrink: 0;
            }
            span {
              flex: 1;
              padding: 0 8px;
              box-sizing: border-box;
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 500;
              text-align: left;
              color: #1bcb7b;
              line-height: 20px;
            }
          }

          .ri_icon {
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 44px;

            span {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: right;
              color: #646566;
              padding-right: 8px;
              box-sizing: border-box;
            }
            img {
              width: 14px;
              height: 14px;
              flex-shrink: 0;
            }
          }
        }

        .new_tanpops {
          width: 100%;
          padding-left: 30px;
          box-sizing: border-box;
          .pop_iren {
            width: 100%;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            border-bottom: 1px solid #f7f8fa;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #646566;
            .inds {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              color: #646566;
              text-align: left;
              // width: 70%;
            }

            &:last-child {
              border-bottom: 0 none;
            }
          }
        }
      }
    }
  }
}
</style>