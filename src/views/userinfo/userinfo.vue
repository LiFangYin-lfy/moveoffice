<template>
  <div class="container">
    <div class="head_top">
      <div class="paycroll1"></div>
      <van-nav-bar title="我的" class="nav_bar" />
      <div class="user__info" @click.stop="getUserinfo">
        <div class="left_inf">
          <img src="../../assets/img/img_71.png" class="head_tou_img" alt="" />
          <div class="nams">
            <div class="title__name">{{ info.name }}</div>
            <div class="dai__ma">职员代码:{{ info.zydm }}</div>
          </div>
        </div>
        <div class="arrow_box">
          <img src="../../assets/img/img_11.png" alt="" />
        </div>
        <img
          src="../../assets/img/img_69.png"
          class="ling_dang"
          @click.stop="turnMess"
          alt=""
        />
      </div>
    </div>
    <div class="order_llst">
      <div class="form_item" @click.stop="getUserinfo">
        <div class="form_one">
          <div class="ont_it">
            <div class="ic_name">部门</div>
            <div class="ic_txt">{{ info.bmmc }}</div>
          </div>
          <div class="arr_ow">
            <img src="../../assets/img/img_16.png" alt="" />
          </div>
        </div>
        <div class="form_one">
          <div class="ont_it">
            <div class="ic_name">电话</div>
            <div class="ic_txt">{{ info.tel }}</div>
          </div>
          <div class="arr_ow">
            <img src="../../assets/img/img_16.png" alt="" />
          </div>
        </div>
        <div class="form_one">
          <div class="ont_it">
            <div class="ic_name">性别</div>
            <div class="ic_txt">{{ info.xb }}</div>
          </div>
          <div class="arr_ow">
            <img src="../../assets/img/img_16.png" alt="" />
          </div>
        </div>
        <div class="form_one">
          <div class="ont_it">
            <div class="ic_name">身份证号</div>
            <div class="ic_txt">{{ info.sfzh }}</div>
          </div>
          <div class="arr_ow">
            <img src="../../assets/img/img_16.png" alt="" />
          </div>
        </div>
      </div>
      <div
        class="form_item"
        style="margin-bottom: 12px"
        @click.stop="getUserinfo"
      >
        <div class="form_one">
          <div class="ont_it">
            <div class="ic_name">开户银行</div>
            <div class="ic_txt">{{ info.khyh }}</div>
          </div>
          <div class="arr_ow">
            <img src="../../assets/img/img_16.png" alt="" />
          </div>
        </div>
        <div class="form_one">
          <div class="ont_it">
            <div class="ic_name">银行账号</div>
            <div class="ic_txt">{{ info.grzh }}</div>
          </div>
          <div class="arr_ow">
            <img src="../../assets/img/img_16.png" alt="" />
          </div>
        </div>
        <div class="form_one">
          <div class="ont_it">
            <div class="ic_name">公务卡开户银行</div>
            <div class="ic_txt">{{ info.gwkkhyh }}</div>
          </div>
          <div class="arr_ow">
            <img src="../../assets/img/img_16.png" alt="" />
          </div>
        </div>
        <div class="form_one">
          <div class="ont_it">
            <div class="ic_name">公务卡银行账号</div>
            <div class="ic_txt">{{ info.gwkzh }}</div>
          </div>
          <div class="arr_ow">
            <img src="../../assets/img/img_16.png" alt="" />
          </div>
        </div>
      </div>
      <div class="unbound" @click.stop="unclickbound">
        <div class="n_name">解除绑定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      info: {},
    }
  },
  created() {
    this.onuserinfo()
  },
  methods: {
    async onuserinfo() {
      try {
        const {
          data: { data }
        } = await this.$http.get('working/pubzyxx/getUserInfo');
        console.log(data);
        this.info = data
      } catch (err) {
        console.log(err, "出错了");
        Toast(err.msg || err.data.msg)
      }
    },
    async unclickbound() {
      let token = window.localStorage.getItem('move_token')
      if (token) {
        window.localStorage.removeItem('move_token')
        try {
          const {
            data
          } = await this.$http.get('logout');
          console.log(data);
          Toast(data.msg)
          setTimeout(() => {
            this.$router.push('/login')
          }, 800);
        } catch (err) {
          console.log(err, "出错了");
          Toast(err.msg || err.data.msg)
        }
      }
    },
    getUserinfo() {
      let token = window.localStorage.getItem('move_token')
      if (token) {
        this.$router.push('/personal')
      } else {
        console.log(token);
        this.$router.push('/login')
      }
    },
    turnMess() {
      this.$router.push('/examine')
    }
  }
}
</script>

<style scope lang="less">
.container {
  .head_top {
    width: 100%;
    background-color: #1bcb7b;
    .nav_bar {
      background-color: #1bcb7b;
      color: #fff;
    }

    .user__info {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 42px 16px 36px;
      box-sizing: border-box;
      position: relative;

      .left_inf {
        flex: 1;
        display: flex;
        align-items: center;

        .head_tou_img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .nams {
          flex: 1;
          padding: 0 16px;
          box-sizing: border-box;

          .title__name {
            width: 100%;
            opacity: 1;
            font-size: 22px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #ffffff;
          }
          .dai__ma {
            width: 100%;
            padding-top: 10px;
            box-sizing: border-box;
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: rgba(255, 255, 255, 0.9);
          }
        }
      }
      .arrow_box {
        width: 8px;
        img {
          width: 8px;
          height: 14px;
        }
      }

      .ling_dang {
        width: 28px;
        height: 28px;
        position: absolute;
        top: 0;
        right: 16px;
        z-index: 2;
      }
    }
  }

  .order_llst {
    width: 100%;
    .form_item {
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      margin-bottom: 24px;

      .form_one {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 52px;
        border-radius: 8px;
        padding: 16px;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: -16px;

        .ont_it {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 8px;
          box-sizing: border-box;

          .ic_name {
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #22272b;
            flex-shrink: 0;
          }
          .ic_txt {
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: right;
            color: #969799;
          }
        }
        .arr_ow {
          width: 16px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 16px;
            height: 16px;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .unbound {
      width: 100%;
      height: 44px;
      padding: 0 16px;
      box-sizing: border-box;
      border-radius: 8px;

      .n_name {
        width: 100%;
        text-align: center;
        line-height: 44px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #22272b;
        background-color: #fff;
        height: 44px;
      }
    }
  }
}
</style>