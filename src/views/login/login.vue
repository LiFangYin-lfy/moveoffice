<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title"></div>
    <div class="wei_fuwu">
      <img src="../../assets/img/img_76.png" class="logo_imgs" alt="" />
      <img src="../../assets/img/img_75.png" class="logo_imged" alt="" />
    </div>
    <div class="form_order">
      <div class="form_item">
        <div class="item_left">
          <img src="../../assets/img/img_72.png" alt="" />
          <van-field
            v-model="username"
            class="login_texd"
            type="text"
            placeholder="请输入姓名/职员代码"
          />
        </div>
        <div class="item_left">
          <img src="../../assets/img/img_73.png" alt="" />
          <van-field
            v-model="phone"
            class="login_texd"
            maxlength="11"
            type="tel"
            placeholder="请输入手机号"
          />
        </div>
        <div class="item_left">
          <img src="../../assets/img/img_74.png" alt="" />
          <div class="code_input">
            <van-field
              v-model="code"
              class="login_texd"
              maxlength="6"
              type="number"
              placeholder="请输入手机验证码"
            />
          </div>
          <button :disabled="isDisable" class="code_name" @click="checkCode">
            {{ counted }}
          </button>
        </div>
        <div class="login_button">
          <div class="login_box" v-if="is_login == true">登录</div>
          <button
            class="login_box"
            style="opacity: 1"
            :disabled="disabled"
            @click.stop="loginSubmit"
            v-else
          >
            登录
          </button>
        </div>
      </div>
    </div>
    <div class="no__more">
      <div class="no_name">{{ down_title }}</div>
    </div>
    <!-- <popup-lfy></popup-lfy> -->
  </div>
</template>

<script>
import { Toast } from 'vant';
const Base64 = require('js-base64').Base64
export default {
  // components: { popupLfy },
  name: 'login',
  data() {
    return {
      down_title: this.$variate.downtitle,
      is_login: false,
      uuid: '',
      phone: '',   //  任建明  18630866803
      username: '',
      code: '',
      isDisable: false,
      disabled: false,
      counted: '获取验证码',
      remember: 0,
    }
  },
  created() {

    // 在页面加载时从cookie获取登录信息
    let mobile = Base64.decode(this.getCookie("mobile")),
      remember = this.getCookie("remember"),
      password = Base64.decode(this.getCookie("password"));
    if (remember) {
      this.phone = mobile
      this.username = password
      this.remember = remember
    }
    console.log(mobile, password);
  },
  methods: {
    setUserInfo() {   // 储存表单信息
      if (this.remember) {
        this.setCookie("mobile", Base64.encode(this.phone))
        this.setCookie("password", Base64.encode(this.username))
        this.setCookie("remember", this.remember)
      } else {
        this.setCookie("mobile", "")
        this.setCookie("password", "")
        this.setCookie("remember", "0")
      }
    },
    getCookie(key) {   // 获取cookie
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    setCookie(cName, value, expiredays) {      // 保存cookie
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
        ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    },
    inputPhone(e) {
      console.log(e);
    },
    checkCode() {  // 发送验证码
      let that = this
      if (that.username != '' && that.username != '') {
        if (that.isDisable) {
          return
        } else {
          that.isDisable = true;  //点击后禁用该按钮
          const TIME_COUNT = 180;
          that.count = TIME_COUNT;
          that.counted = "已发送" + this.count + '秒'
          if (!that.timer) {
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= TIME_COUNT) {
                that.count--;
                that.counted = "已发送" + this.count + '秒';
              } else {
                that.code_show = true;
                clearInterval(this.timer);
                that.counted = '发送验证码'
                that.timer = null;
                that.isDisable = false;
              }
            }, 1000);
          }
          this.$http.get('captchaImage?username=' + that.username + '&phone=' + that.phone + '&uuid=' + that.uuid).then(res => {
            that.uuid = res.data.uuid
            that.is_login = false;
            console.log(res.data.yzm);
          }).catch(err => {
            that.code_show = true;
            console.log(err);
            Toast(err.data.msg)
            that.code_show = true;
            clearInterval(this.timer);
            that.counted = '发送验证码'
            that.timer = null;
            that.isDisable = false;
          })

        }
      } else {
        Toast.fail('请输入姓名或手机号')
      }
    },
    async loginSubmit() {
      // let that = this, obj = {};
      // if (this.names == '') {
      //   Toast('请输入姓名/职员代码')
      //   return
      // } else if (this.mobile != '') {
      //   this.mobile = that.$commit.mobile(this.mobile)
      //   console.log(this.mobile);
      //   obj.mobile = this.mobile
      // } else if (this.code == '') {
      //   Toast('请输入验证码')
      //   return
      // }
      try {
        const { data } = await this.$http.post('login', { 'username': this.username, 'phone': this.phone, 'uuid': this.uuid, 'code': this.code, 'password': "" }
        )
        console.log(data);
        if (data.code == 200) {
          Toast(data.msg)
          this.remember = 1
          this.setUserInfo()
          let token = localStorage.getItem('move_token')
          if (token) {
            localStorage.removeItem('move_token')
            localStorage.setItem('move_token', data.token)
            setTimeout(() => {
              this.$router.push('/')
            }, 1000);
          } else {
            localStorage.setItem('move_token', data.token)
            setTimeout(() => {
              this.$router.push('/')
            }, 1000);
          }

        } else if (data.code == 500) {
          Toast(data.msg)
        }
      } catch (err) {
        console.log(err);
        Toast(err.msg || err.data.msg)
      }
    },
    async getcode() {
      try {
        const { data: { data } } = this.$http.post('', { mobile: this.mobile })
        console.log(data);
      } catch (err) {
        console.log(err);
        Toast(err.data.msg)
      }
    },

  }
}
</script>

<style lang="less" scoped>
.container {
  .wei_fuwu {
    width: 100%;
    padding: 16px 32px 86px;
    box-sizing: border-box;
    background: #1bcb7b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo_imgs {
      width: 80px;
      height: 80px;
      // margin-bottom: 12px;
    }

    .logo_imged {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .form_order {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;

    .form_item {
      width: 100%;
      margin-top: -76px;
      background-color: #fff;
      padding: 16px;
      box-sizing: border-box;
      border-radius: 8px;
      box-shadow: 0px 2px 16px 0px rgba(23, 37, 50, 0.06);

      .item_left {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #f2f3f5;
        display: flex;
        align-items: center;

        img {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          margin-right: 6px;
        }

        .login_text {
          width: 100%;
          height: 60px;
          line-height: 60px;
        }

        .code_input {
          flex: 1;
          .login_text {
            width: 100%;
            height: 60px;
            line-height: 60px;
          }
        }
        .code_name {
          width: 90px;
          flex-shrink: 0;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #1bcb7b;
          line-height: 60px;
          background-color: #fff;
        }
      }
      .login_button {
        width: 100%;
        margin: 40px 0 20px;
        .login_box {
          width: 100%;
          height: 50px;
          border-radius: 25px;
          box-sizing: border-box;
          background-color: #fff;
          opacity: 0.3;
          background: #1bcb7b;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
  .no__more {
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
    height: 30px;

    .no_name {
      padding: 0 20px;
      box-sizing: border-box;
      height: 30px;
      line-height: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
      background-color: #f7f8fa;
      color: #969799;
      font-size: 12px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 2px;
      background-color: #ebedf0;
      z-index: 1;
    }
  }
}
</style>