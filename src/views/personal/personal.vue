<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">个人资料</div>
    </div>
    <div class="health">
      <div class="per_sonal">
        <div class="per__items">
          <div class="left_name">姓名</div>
          <div class="ri_box">
            <div class="ri_text">
              <input
                type="text"
                class="el_input"
                placeholder="请输入姓名"
                v-model="info.name"
              />
            </div>
          </div>
        </div>
        <div class="per__items">
          <div class="left_name">头像</div>
          <div class="ri_box">
            <img src="../../assets/img/img_12.png" class="head" alt="" />
            <img src="../../assets/img/img_16.png" class="arrpw__r" alt="" />
          </div>
        </div>
        <div class="per__items">
          <div class="left_name">职员代码</div>
          <div class="ri_box">
            <div class="ri_text">
              <input
                type="text"
                class="el_input"
                placeholder="请输入职员代码"
                readonly
                v-model="info.zydm"
              />
            </div>
          </div>
        </div>
        <div class="per__items">
          <div class="left_name">部门</div>
          <div class="ri_box">
            <div class="ri_text">
              <input
                type="text"
                class="el_input"
                placeholder="请输入部分"
                v-model="info.bmmc"
              />
            </div>
          </div>
        </div>
        <div class="per__items">
          <div class="left_name">电话</div>
          <div class="ri_box">
            <div class="ri_text">
              <input
                type="number"
                class="el_input"
                placeholder="请输入电话"
                maxlength="11"
                v-model="info.tel"
              />
            </div>
          </div>
        </div>
        <div class="per__items">
          <div class="left_name">性别</div>
          <div class="ri_box">
            <div class="ri_text">
              <input
                type="text"
                class="el_input"
                placeholder="请输入性别"
                v-model="info.xb"
              />
            </div>
          </div>
        </div>
        <div class="per__items">
          <div class="left_name">身份证号</div>
          <div class="ri_box">
            <div class="ri_text">
              <input
                type="idcard"
                class="el_input"
                placeholder="请输入身份证号"
                v-model="info.sfzh"
              />
            </div>
          </div>
        </div>
        <div class="per__items" @click.stop="onopenPop(0)">
          <div class="left_name">开户银行</div>
          <div class="ri_box">
            <div class="ri_text">
              {{ info.khyh }}
            </div>
          </div>
        </div>
        <div class="per__items">
          <div class="left_name">银行账号</div>
          <div class="ri_box">
            <div class="ri_text">
              <input
                type="number"
                maxlength="19"
                class="el_input"
                placeholder="请输入银行账号"
                v-model="info.grzh"
              />
            </div>
          </div>
        </div>
        <div class="per__items" @click.stop="onopenPop(1)">
          <div class="left_name">公务卡开户银行</div>
          <div class="ri_box">
            <div class="ri_text">
              {{ info.gwkkhyh }}
            </div>
          </div>
        </div>
        <div class="per__items">
          <div class="left_name">公务卡银行账号</div>
          <div class="ri_box">
            <div class="ri_text">
              <input
                type="number"
                class="el_input"
                placeholder="公务卡银行账号"
                v-model="info.gwkzh"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="unbound" @click.stop="keepUserinfo">
        <div class="n_name">保存信息</div>
      </div>
    </div>
    <div
      class="pop__up"
      v-if="opendown == true"
      @click.stop="opendown = false"
    ></div>
    <div class="op_bank" v-if="is_card == 1 && opendown == true">
      <div class="boxs__bank" v-for="(item, index) in list" :key="index">
        <div
          class="bank_item"
          :class="item.yhmc == info.gwkkhyh ? 'is_styles' : ''"
          @click.stop="changeTem(item.yhmc, item)"
        >
          {{ item.yhmc }}
        </div>
      </div>
    </div>
    <div class="op_bank" v-if="is_card == 0 && opendown == true">
      <div class="boxs__bank" v-for="(item, index) in list" :key="index">
        <div
          @click.stop="changeTem(item.yhmc, item)"
          class="bank_item"
          :class="item.yhmc == info.khyh ? 'is_styles' : ''"
        >
          {{ item.yhmc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      name: '',
      mobile: '',
      idcard: '',
      type: 2,
      info: {},
      list: [],
      is_card: 0,
      opendown: false,
      gwkkhyh: '',
      khyh: '',
    }
  },
  created() {
    this.onuserinfo()
    this.unclickbound()
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    async onuserinfo() {
      try {
        const {
          data: { data }
        } = await this.$http.get('working/pubzyxx/getUserInfo');
        console.log(data);
        this.info = data
        this.gwkkhyh = data.gwkkhyh
        this.khyh = data.khyh
      } catch (err) {
        console.log(err, "出错了");
        Toast(err.msg || err.data.msg)
      }
    },
    async keepUserinfo() {   // 保存信息
      if (this.info && this.info.grzh) {
        var pattern = /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,
          str = this.info.grzh.replace(/\s+/g, "");
        if (!pattern.test(str)) {
          Toast.fail('请正确输入银行卡号！')
          return;
        }
      }
      try {
        const {
          data
        } = await this.$http.put('working/pubzyxx/edit', this.info);
        console.log(data);
        Toast.success(data.msg)
      } catch (err) {
        console.log(err, "出错了");
        Toast(err.msg || err.data.msg)
      }
    },
    async unclickbound() {
      try {
        const {
          data: { data }
        } = await this.$http.get('working/pubzyxx/getBankVoInfo');
        console.log(data);
        this.list = data
      } catch (err) {
        console.log(err, "出错了");
        Toast(err.msg || err.data.msg)
      }
    },
    onopenPop(con) {
      this.is_card = con
      this.opendown = true
    },
    changeTem(con, item) {
      if (this.is_card == 0) {
        this.info.khyh = con
      } else {
        console.log(item);
        this.info.gwkkhyh = con
        this.info.gwkyh = item.yhdm
      }
      this.opendown = false
    }
  }
}
</script>

<style scope lang="less">
.container {
  .health {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;

    .per_sonal {
      width: 100%;
      background: #ffffff;
      border-radius: 8px;
      padding: 8px 16px;
      box-sizing: border-box;

      .per__items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        box-sizing: border-box;
        width: 100%;

        .left_name {
          width: 100px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #646566;
        }
        .ri_box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;

          .ri_text {
            width: 100%;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: right;
            color: #323233;
            .el_input {
              width: 100%;
              text-align: right;
              border: 0 none;
            }
          }

          .head {
            width: 32px;
            height: 32px;
          }

          .arrpw__r {
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .unbound {
      width: 100%;
      height: 44px;
      border-radius: 8px;
      margin-top: 16px;

      .n_name {
        width: 100%;
        text-align: center;
        line-height: 44px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        border-radius: 8px;
        color: #fff;
        background: #1bcb7b;
        height: 44px;
      }
    }
  }

  .pop__up {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100%;
    z-index: 10;
    opacity: 0.8;
    background-color: #000;
  }
  .op_bank {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 12;
    width: 100%;
    height: 50%;
    overflow-y: scroll;
    background-color: #fff;
    border-radius: 16px 16px 0 0;
    box-sizing: border-box;
    opacity: 1;
    padding: 16px;
    box-sizing: border-box;

    .fgd_box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 32px;
      .close_img {
        height: 24px;
        width: 24px;
      }
    }

    .boxs__bank {
      width: 100%;
      height: 44px;
      border-bottom: 1px solid #f7f8fa;

      .bank_item {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #646566;
        font-size: 14px;
      }

      .is_styles {
        color: #1bcb7b;
      }

      &:last-child {
        border-bottom: 0 none;
      }
    }
  }
}
</style>