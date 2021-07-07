<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">我的审批</div>
    </div>
    <div class="top_nav">
      <div
        class="nav_item"
        :class="send == status ? 'is__navcolor' : ''"
        v-for="(title, send) in nav"
        :key="title + send"
        @click.stop="changeTitle(send)"
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
            placeholder="金额/单据类型/预算项目/摘要/报销人"
            class="vant_input"
            v-model="selectData"
          />
        </div>
      </div>
      <div class="imgs_d" @click.stop="getlist">
        <img src="../../assets/img/img_33.png" alt="" />
      </div>
    </div>
    <div class="health_b">
      <div v-if="rows.length != 0">
        <div
          class="my_list"
          v-for="(item, index) in rows"
          :key="index"
          @click.stop="turnMyauthorization(item.djlxid, item.mlid, item.djlxmc)"
        >
          <div class="top_name">
            <div class="left_name">{{ item.djlxmc }}</div>
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
            <div class="flex_one" v-if="to_reimburse == false">
              <div class="button button2" @click.stop="turnMicroservice(item)">
                <span>审批日志</span>
              </div>
            </div>
            <div class="flex_one itam" v-if="status == 0">
              <div class="button" @click.stop="onshow(item)">
                <span>审 批</span>
              </div>
            </div>
            <div class="flex_one itam" v-if="status == 1">
              <div
                class="button"
                @click.stop="onrevoke(item)"
                v-if="item.zt == 1"
              >
                <span>撤回审批</span>
              </div>
            </div>
            <div class="flex_one itam" v-if="item_is == 2">
              <div class="button button3">
                <!-- <span>不可撤回</span> -->
              </div>
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
    <div class="shou_pop" v-if="show_pop == true">
      <div class="tan_pop" :style="bodystyle" ref="canvasHW">
        <div class="white__pop">
          <div class="top_whiel">
            <div class="ppop_title">
              <div class="left_bxos">
                <img
                  src="../../assets/img/img_65.png"
                  class="icon_popa"
                  alt=""
                />
                <span>附件图片</span>
              </div>
              <div class="rigt__list" @click.stop="turnAffix">
                <span>前往附件列表</span>
                <img
                  src="../../assets/img/img_11.png"
                  class="icon_arrow__pop"
                  alt=""
                />
              </div>
            </div>
            <div class="wai_opp">
              <div class="er_title_pop">
                <img
                  src="../../assets/img/img_66.png"
                  class="title_icons"
                  alt=""
                />
                <span>审核类型</span>
              </div>
              <div class="button__as">
                <div
                  class="item_one"
                  :class="statusStay == 0 ? 'item_a' : ''"
                  @click.stop="approve"
                >
                  审核通过
                </div>
                <div
                  class="item_one"
                  :class="statusStay == 1 ? 'item_a' : ''"
                  @click.stop="backup"
                >
                  退回到上一步
                </div>
                <div
                  class="item_one"
                  :class="statusStay == 2 ? 'item_a' : ''"
                  @click.stop="backrove"
                >
                  退回到编制人
                </div>
              </div>
            </div>
            <div class="wai_opp" style="padding-bottom: 16px">
              <div class="er_title_pop">
                <img
                  src="../../assets/img/img_64.png"
                  class="title_icons"
                  alt=""
                />
                <span>审核意见</span>
              </div>
              <div class="test_box">
                <van-cell-group>
                  <van-field
                    v-model="obj.shyj"
                    rows="4"
                    autosize
                    type="textarea"
                    maxlength="100"
                    placeholder="请输入留言"
                    show-word-limit
                  />
                </van-cell-group>
              </div>
            </div>
            <div class="buttons_a">
              <div class="lets_qianzi">
                <div class="ctx__name">
                  <img src="../../assets/img/img_62.png" alt="" />
                  <span class="span_name">签字盖章</span>
                </div>
                <div
                  class="ctx__name"
                  @click.stop="overwrite"
                  style="justify-content: flex-end"
                >
                  <img src="../../assets/img/img_63.png" alt="" />
                  <span class="span_name">擦除</span>
                </div>
              </div>
              <div class="signa_ture">
                <div class="signatureBox">
                  <canvas-lfy
                    @resetting="replacement"
                    :reject="rechat"
                    @getcanvasimg="canvasImg"
                  ></canvas-lfy>
                </div>
                <img class="imgCanvas" :src="imgUrl" />
              </div>
            </div>
          </div>
          <div class="btn_oxs">
            <button class="qu_xiao" @click.stop="show_pop = false">取消</button>
            <button class="qu_xiao ture_click" @click.stop="trueOrder">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
export default {
  data() {
    return {
      nav: this.$variate.navlist,
      list: [],
      total: 0,
      rows: [],
      pageSize: 10,
      pageNum: 0,
      is_no_more: true,
      item_is: 0,
      to_reimburse: false,   //  我的报销时不显示 , 我的审核显示
      status: 0,     // 0-审批待处理 1-审批已处理
      selectData: '',

      show_pop: false,
      bodystyle: {
        "height": '',
        "width": ''
      },

      mild: '',
      itemOne: {},
      obj: {
        bz: '',
        shyj: '同意',
        djlx: '',
        djid: '',
        djflmx: '',
        djzt: '',
        status: '1',
        file: '',
      },
      statusStay: 0,
      rechat: false,
      imgUrl: '',
      is_button: true,
    }
  },
  mounted() {
    let screenWidth = document.body.clientWidth;   // 屏幕宽
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.bodystyle.height = windowHeight - 160 + 'px'
    this.bodystyle.width = screenWidth - 64 + 'px'
  },
  created() {
    let that = this
    console.log(this.obj);
    that.getmyroval()
    window.addEventListener('scroll', this.jandle, true)
    // window.onscroll = function () {
    //   // scrollTop 滚动条滚动时，距离顶部的距离
    //   var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //   // windowHeight 可视区的高度
    //   var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //   // scrollHeight 滚动条的总高度
    //   var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //   // 滚动条到底部的条件
    //   if (scrollTop + windowHeight >= scrollHeight) {
    //     // 加载数据
    //     console.log(that.total);
    //     if (that.total != that.rows.length) {
    //       that.getmyroval()
    //     } else if (that.total == that.rows.length) { 
    //       that.is_no_more = true
    //     }
    //   }
    // }

  },
  methods: {
    jandle() {
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
        console.log(that.total);
        console.log(that.rows);
        if (that.total != that.rows.length) {
          that.getmyroval()
        } else if (that.total == that.rows.length) {
          that.is_no_more = true
        }
      }
    },
    onshow(item) {
      this.itemOne = item
      this.mild = item.mlid
      this.show_pop = true
      this.obj = {
        bz: 'H',
        shyj: '同意',
        djlx: item.djlxid,
        djid: item.mlid,
        djflmx: item.mlid,
        djzt: '1',
        status: '1',
      }
    },
    turnAffix() {
      this.$router.push({ path: '/affix', query: { mild: this.mild } })
    },
    overwrite() {  //重写
      this.rechat = true
    },
    replacement(ls) {
      this.rechat = ls
    },
    canvasImg(ls) {
      this.obj.file = ls
      console.log(this.obj);
    },
    trueOrder() {  // 确定
      console.log(this.obj);
      if (this.statusStay == 0) {
        if (this.obj.file != undefined || '') {
          this.pufun()
        } else {
          return Toast.fail('请先签名')
        }
      } else {
        this.pufun()
      }
    },
    approve() {  // 审核通过
      this.statusStay = 0
      this.obj = {
        bz: 'H',
        shyj: '同意',
        djlx: this.itemOne.djlxid,
        djid: this.itemOne.mlid,
        djflmx: this.itemOne.mlid,
        djzt: '1',
        status: '1',
      }
    },
    backup() {  //  返回上一步
      this.statusStay = 1
      this.obj = {
        bz: 'X',
        shyj: '不同意',
        djlx: this.itemOne.djlxid,
        djid: this.itemOne.mlid,
        djflmx: this.itemOne.mlid,
        djzt: '1',
        status: '2',
      }
    },
    backrove() {   // 退回到编制人
      this.statusStay = 2
      this.obj = {
        bz: 'T',
        shyj: '不同意',
        djlx: this.itemOne.djlxid,
        djid: this.itemOne.mlid,
        djflmx: this.itemOne.mlid,
        djzt: '0',
        status: '2',
      }
    },
    async pufun() {
      try {
        const { data } = await this.$http.put('working/gbizbxmb/updateAudit', this.obj)
        console.log(data, "-审核操作");
        this.show_pop = false
        this.pageNum = 0
        this.rows = []
        this.$forceUpdate()
        Toast.success(data.msg)
        setTimeout(() => {
          this.getmyroval()
        }, 800);
      } catch (err) {
        console.log(err);
        Toast(err.data.msg)
      }
    },
    onrevoke(item) {  // 撤回审核
      let obj = {
        bz: 'X',
        shyj: '销审,退回上一步',
        djlx: item.djlxid,
        djid: item.mlid,
        djflmx: item.mlid,
        djzt: '1',
      }
      Dialog.confirm({
        title: '温馨提示',
        message: '您确认要撤回审核吗？',
      })
        .then(async () => {
          try {
            const { data } = await this.$http.put('working/gbizbxmb/updateWithdraw', obj)
            console.log(data, "-审核操作");
            Toast(data.msg)
            this.pageNum = 0
            this.rows = []
            this.$forceUpdate()
            setTimeout(() => {
              this.getmyroval()
            }, 800);
          } catch (err) {
            console.log(err);
            Toast(err.data.msg)
          }
        })
        .catch(() => {

        })
    },
    getlist() {

      if (this.is_button == true) {
        this.is_button = false
        this.rows = [];
        this.is_no_more = false;
        this.total = 0;
        this.pageNum = 0;
        this.getmyroval()
      }

    },
    turnMicroservice(item) {   // 审批日志
      this.$router.push({ path: '/microservice', query: { id: item.mlid } })
    },
    turnMyauthorization(djlxid, mlid, pagename) {
      this.$router.push({ path: '/myauthorization', query: { djlxid: djlxid, mlid: mlid, pagename: pagename } })
    },
    changeTitle(send) {
      console.log(send);
      let that = this, nav = that.nav;
      that.status = send
      that.rows = []
      that.selectData = ''
      that.pageNum = 0
      that.getmyroval()
      that.nav = nav
    },
    async getmyroval() {
      this.pageNum++
      let that = this
      try {
        const { data } = await this.$http.get('working/pof/list?status=' + this.status + '&pageSize=' + this.pageSize + '&pageNum=' + this.pageNum + '&selectData=' + this.selectData)
        console.log(data);
        console.log(that.rows);
        that.rows = [...that.rows, ...data.rows]
        that.total = data.total
        that.is_button = true
        if (that.total == that.rows.length) {
          that.is_no_more = true
        }
      } catch (err) {
        console.log(err);
        that.is_button = true
        Toast(err.msg || err.data.msg)
      }
    },
    getBudgetTarget() {   //部门预算指标
      this.$http.get('working/gbizbxmb/selectByBmZb').then(res => {
        console.log(res);
        if (res.code == 500) {
          Toast(res.msg)
        }
      }).catch(err => {
        console.log(err);
        Toast(err.msg || err.data.msg)
      })
    },
    beforeDestroy() {
      // 页面卸载时移除监听事件
      window.removeEventListener('scroll', this.jandle, true)
    }
  }
}
</script>

<style scope lang="less">
.container {
  .top_nav {
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
      color: #f5f5f5;
      font-size: 14px;
      opacity: 0.6;
    }
    .is__navcolor {
      color: #fff;
      font-weight: 700;
      opacity: 1;
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

  .health_b {
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
          flex: 1;
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
</style>