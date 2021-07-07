<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">{{ ffyf }}</div>
    </div>
    <div class="box_may">
      <div class="mar_bx">
        <div class="left_nema">职员姓名</div>
        <div class="input_text">{{ mywage.zyxm }}</div>
      </div>
      <div class="mar_bx">
        <div class="left_nema">所属部门</div>
        <div class="input_text">{{ mywage.bmmc }}</div>
      </div>
      <div class="mar_bx">
        <div class="left_nema">工资薪金收入</div>
        <div class="input_text">{{ mywage.gzxjsr }}</div>
      </div>
      <div class="mar_bx">
        <div class="left_nema">本期免税收入</div>
        <div class="input_text">{{ mywage.bqmssr }}</div>
      </div>
      <div class="mar_bx">
        <div class="left_nema">本期专项扣除合计</div>
        <div class="input_text">{{ mywage.bqzxkchj }}</div>
      </div>
      <div class="mar_bx">
        <div class="left_nema">本期其他扣除合计</div>
        <div class="input_text">{{ mywage.bqqtkchj }}</div>
      </div>
      <!-- <div class="mar_bx">
        <div class="left_nema">失业保险费</div>
        <div class="input_text">{{ mywage.sybxf }}</div>
      </div> -->
      <div class="mar_bx">
        <div class="left_nema">本期应缴税额</div>
        <div class="input_text" style="color: #ee0a24">{{ mywage.bqyjse }}</div>
      </div>
      <div class="mar_bx">
        <div class="left_nema">实发合计</div>
        <div class="input_text" style="color: #ee0a24">{{ mywage.sfhj }}</div>
      </div>
      <div class="mar_bx">
        <div class="left_nema">全年一次性奖金</div>
        <div class="input_text">{{ mywage.qnycxjj }}</div>
      </div>
      <div class="mar_bx">
        <div class="left_nema">全年一次性奖金应缴税额</div>
        <div class="input_text" style="color: #07c160">
          {{ mywage.qnycxjjyjse }}
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
      mlid: '',
      mlyf: '',
      ffyf: '',
      mywage: {}
    }
  },
  created() {
    let that = this, query = this.$route.query;
    that.mlid = query.nf
    that.mlyf = query.yf
    that.ffyf = query.ffyf
    that.getmywage()
  },
  methods: {
    async getmywage() {
      try {
        const { data } = await this.$http.get('working/gzgz/selectByGzDetails?ffnf=' + this.mlid + '&ffyf='
          + this.mlyf)
        console.log(data);
        this.mywage = data.data
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
  .box_may {
    width: 100%;
    .mar_bx {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 44px;
      padding: 0 16px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom: 1px solid #f7f8fa;

      .left_nema,
      .input_text {
        flex: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #646566;
        line-height: 44px;
      }
      .input_text {
        color: #323233;
        text-align: right;
      }

      &:last-child {
        border-bottom: 0 none;
      }
    }
  }
}
</style>