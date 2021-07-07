<template>
  <div class="container">
    <div class="paycroll1"></div>
    <van-nav-bar title="移动办公" />
    <div class="health">
      <div class="bit_ttiles">费用报销</div>
      <div class="reimburse">
        <div class="rem_box">
          <div
            class="rem_item"
            v-for="(item, index) in cateRemburse"
            :key="index"
          >
            <div class="bton__img" @click.stop="chlickItem(index)">
              <img :src="item.image" alt="" />
              <div class="corner_mark posfixed" v-if="item.count != 0">
                <div
                  class="corner_mark_span"
                  :class="item.count > 10 ? 'corner_mark2' : ''"
                >
                  {{ item.count }}
                </div>
              </div>
            </div>
            <div class="cate_titme">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="bit_ttiles">部门经费</div>
      <div class="epartment_budget">
        <div class="bud_list">
          <div
            class="budget_item"
            style="width: 33.33%; flex: none"
            v-for="(item, index) in budget"
            :key="index"
            @click.stop="turnbranch(index)"
          >
            <div class="bton__img">
              <img :src="item.image" alt="" />
            </div>
            <div class="cate_titme">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="bit_ttiles">薪资查询</div>
      <div class="epartment_budget epar2">
        <div class="bud_list">
          <div
            class="budget_item"
            v-for="(item, index) in salaryquery"
            :key="index"
            @click.stop="changepage(index)"
          >
            <div class="bton__img">
              <img :src="item.image" alt="" />
            </div>
            <div class="cate_titme">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="wao_pop" v-if="ic_false">
      <div class="wai_txts">
        <img
          src="../../assets/img/img_61.png"
          class="close_icon"
          @click.stop="ic_false = false"
          alt=""
        />
        <div class="center_box">
          <img src="../../assets/img/img_14.png" alt="" />
          <p class="_p_icon">您所查看的内容正在开发中 尽情期待！</p>

          <div class="_popbuts">
            <button class="but_on" @click.stop="ic_false = false">确定</button>
          </div>
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
      cateRemburse: this.$variate.cateRemburse,
      budget: this.$variate.budget,
      salaryquery: this.$variate.salaryquery,
      ic_false: false
    }
  },
  created() {
    this.getBynum()
  },
  methods: {
    async onSearch() {
      try {
        const {
          data: { data }
        } = await this.$http.post('', { page: 1 });
        this.data = data
      } catch (err) {
        console.log(err, "出错了");
        Toast(err.msg || err.data.msg)
      }
    },
    async getBynum() {
      let that = this, cateRemburt = that.cateRemburse;
      this.$http.get('working/pof/selectByNumber').then(res => {
        console.log(res);
        cateRemburt[0].count = res.data.data.wdjk
        cateRemburt[1].count = res.data.data.wdbx
        cateRemburt[2].count = res.data.data.commission
        this.cateRemburse = cateRemburt
      }).catch(err => {
        console.log(err, "出错了");
        Toast(err.msg || err.data.msg)
      })
    },
    chlickItem(index) {
      let that = this, send = index;
      switch (send) {
        case 0:   // 我的借款
          that.$router.push('/meborrow')
          break;
        case 1:   // 我的报销
          that.$router.push('/myreimburse')
          break;
        case 2:   // 经费审批
          that.$router.push('/myapproval')
          // that.ic_false = true
          break;
        case 3:   // 业务归口说明
          // that.$router.push('/')
          that.ic_false = true
          break;
        case 4:   // 报账流程
          // that.$router.push('/')
          that.ic_false = true
          break;
        default:
          break;
      }
    },
    turnbranch(index) {
      let that = this, send = index;
      switch (send) {
        case 0:   // 部门预算审批
          that.$router.push('/budget')
          break;
        // case 1:   // 部门经费审批
        //   that.$router.push('/expenditure')
        //   break;
        case 1:   // 经费执行明细
          that.$router.push('/execute')
          break;
        default:
          break;
      }
    },
    changepage(index) {
      let that = this, send = index;
      switch (send) {
        case 0:   // 我的工资
          // that.$router.push('/mywage')
          that.ic_false = true
          break;
        case 1:   // 其他收入
          that.$router.push('/otherincome')
          break;
        default:
          that.ic_false = true
          break;
      }
    },
  }
}
</script>

<style scope lang="less">
.container {
  .health {
    width: 100%;
    padding: 0 16px 64px !important;
    box-sizing: border-box;

    .reimburse {
      width: 100%;
      opacity: 1;
      background: linear-gradient(135deg, #ffffff 15%, #ecfff6 94%, #c6ffe5);
      border: 1px solid #f2f3f5;
      border-radius: 9px;
      padding-top: 24px;
      box-sizing: border-box;

      .rem_box {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .rem_item {
          width: 25%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-bottom: 24px;

          .bton__img {
            width: 32px;
            position: relative;
            margin-bottom: 6px;

            img {
              width: 100%;
              height: 32px;
            }

            .posfixed {
              position: absolute;
              top: -12px;
              right: -50%;
              z-index: 2;
            }
          }
          .cate_titme {
            width: 100%;
            text-align: center;
            font-size: 11px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #646566;
          }
        }
      }
    }

    .epartment_budget {
      width: 100%;
      height: 95px;
      opacity: 1;
      background: linear-gradient(135deg, #ffffff, #e5f7ff);
      border: 1px solid #f2f3f5;
      border-radius: 9px;

      .bud_list {
        width: 100%;
        height: 95px;
        display: flex;
        align-items: center;

        .budget_item {
          width: 25%;
          display: flex;
          align-items: center;
          flex-direction: column;

          .bton__img {
            width: 32px;
            margin-bottom: 6px;

            img {
              width: 100%;
              height: 32px;
            }
          }
          .cate_titme {
            opacity: 1;
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            color: #646566;
          }
        }
      }
    }
    .epar2 {
      background: linear-gradient(135deg, #ffffff, #e2e9ff);
      border: 1px solid #f2f3f5;
      border-radius: 9px;
    }
  }

  .wao_pop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 5;

    .wai_txts {
      width: 80%;
      height: 400px;
      background-color: #fff;
      border-radius: 16px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;

      .close_icon {
        position: absolute;
        top: -40px;
        right: 0;
        z-index: 6;
        width: 24px;
        height: 24px;
      }

      .center_box {
        padding: 60px 16px 16px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 158px;
          height: 158px;
        }
        ._p_icon {
          width: 198px;
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #646566;
          line-height: 23px;
          letter-spacing: 0px;
          padding: 20px 0 40px;
          box-sizing: border-box;
        }

        ._popbuts {
          width: 100%;
          .but_on {
            width: 100%;
            background: #1bcb7b;
            border-radius: 24px;
            box-shadow: 0px 5px 15px 0px rgba(48, 234, 149, 0.37);
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>