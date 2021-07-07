<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">部门预算审批</div>
    </div>
    <div class="nav_year">
      <div
        class="yr_ite"
        v-for="(item, index) in years"
        :key="index"
        :class="currentIndex == index ? 'is_yeat' : ''"
        @click.stop="changedYear(item, index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="ban_gong">
      <div class="tan_box" @click.stop="clickSelect">
        <div class="left_name">财务处/学校办公室</div>
        <img
          src="../../assets/img/img_59.png"
          v-if="is_select == true"
          class="ri_arrow"
          alt=""
        />
        <img src="../../assets/img/img_60.png" v-else class="ri_arrow" alt="" />
      </div>
      <div class="tan_opo" v-if="is_select == true">
        <div class="text_opo">
          <div class="txt_cate">
            <div class="left_cate">
              <div class="left_in" v-for="(item1, send) in cate" :key="send">
                <div class="change_dui">
                  <div class="im_b">
                    <img
                      src="../../assets/img/img_20.png"
                      class="img_box"
                      alt=""
                    />
                  </div>
                  <div class="bd_men">
                    <div class="chane_txt">教育部门</div>
                    <img
                      src="../../assets/img/img_16.png"
                      class="img_bot"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="rihg_box__">
              <div
                class="cate_box"
                :class="inv == 2 ? 'is_caterindx' : ''"
                v-for="(item, inv) in cateItem"
                :key="inv"
              >
                <div class="im_b">
                  <img
                    src="../../assets/img/img_20.png"
                    class="img_box"
                    alt=""
                  />
                </div>
                <div class="left_nex">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lf_detail">
      <div class="box_one">
        <div class="one_itmes">
          <img src="../../assets/img/img_30.png" class="img_30" alt="" />
          <div class="o__dek">
            <div class="on_titles">计划财务处</div>
            <div class="on_names">【0105】</div>
          </div>
        </div>
        <div class="des_im">
          <div class="left_lable">初期余额</div>
          <div class="right_text">120000.00</div>
        </div>
        <div class="des_im">
          <div class="left_lable">调增数</div>
          <div class="right_text">2020-12-26</div>
        </div>
        <div class="des_im">
          <div class="left_lable">调减数</div>
          <div class="right_text">2020-12-26</div>
        </div>
        <div class="des_im">
          <div class="left_lable">调剂数+</div>
          <div class="right_text">2020-12-26</div>
        </div>
        <div class="des_im">
          <div class="left_lable">调剂数-</div>
          <div class="right_text">2020-12-26</div>
        </div>
        <div class="des_im">
          <div class="left_lable">指标金额</div>
          <div class="right_text">2020-12-26</div>
        </div>
        <div class="des_im">
          <div class="left_lable">执行金额</div>
          <div class="right_text">2020-12-26</div>
        </div>
        <div class="des_im">
          <div class="left_lable">可用金额</div>
          <div class="right_text">2020-12-26</div>
        </div>
        <div class="look_mores">
          <span>查看更多</span>
          <img src="../../assets/img/img_60.png" alt="" />
          <!-- <img src="../../assets/img/img_59.png" alt="" /> -->
        </div>
      </div>
      <div class="tu_biao">
        <div class="left_zhi">
          <div class="tip_on">
            <span class="left_tip" style="display: block"></span>
            <span class="left_ti_txt">已执行（59.26%）</span>
          </div>
          <div class="tip_on">
            <span
              class="left_tip"
              style="background: #eff3fe; display: block"
            ></span>
            <span class="left_ti_txt">未执行（40.74%）</span>
          </div>
        </div>
        <div class="right_tip">
          <van-circle
            v-model="currentRate"
            :rate="rate"
            :stroke-width="180"
            size="110px"
            color="#1bcb7b"
            layer-color="#eff3fe"
            text="宽度定制"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant';
export default {
  data() {
    return {
      years: ['2019', '2020', '2021'],
      cate: ['教学部门', '教学2门', '教学部3', '教学部4'],
      cateItem: ['教学部门', '教学2门', '教学部3', '教学部4'],
      currentIndex: 0,
      is_select: false,
      currentRate: 0,
      rate: '70',

    }
  },
  created() {
    let query = this.$route.query
    console.log(query);
  },
  methods: {
    changedYear(year, i) {
      console.log(year);
      console.log(i);
      this.currentIndex = i
    },
    clickSelect() {
      this.is_select = !this.is_select
    },
  }
}
</script>

<style scope lang="less">
.container {
  .nav_year {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    align-content: center;
    background-color: #fff;

    .yr_ite {
      flex: 1;
      line-height: 40px;
      opacity: 1;
      font-size: 18px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 600;
      text-align: center;
      color: #969799;
    }
    .is_yeat {
      color: #07c160;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%);
        width: 40px;
        height: 3px;
        border-radius: 2px;
        background-color: #07c160;
      }
    }
  }

  .ban_gong {
    width: 100%;
    margin-top: 4px;
    box-shadow: 0px 2px 12px 0px rgba(100, 101, 102, 0.08);

    .tan_box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      box-sizing: border-box;
      background: #ffffff;
      box-shadow: 0px 2px 12px 0px rgba(100, 101, 102, 0.08);
      height: 47px;

      .left_name {
        flex: 1;
        font-size: 15px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #323233;
      }
      .ri_arrow {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }
    }

    .tan_opo {
      width: 100%;
      opacity: 1;
      background: rgba(0, 0, 0, 0.5);

      .text_opo {
        width: 100%;
        background-color: #ffcccc;

        .txt_cate {
          width: 100%;
          display: flex;
          align-items: center;

          .left_cate {
            flex: 1;
            padding: 0 16px;
            box-sizing: border-box;

            .change_dui {
              width: 100%;
              display: flex;
              align-items: center;
              height: 44px;

              .im_b {
                width: 40px;
                flex-shrink: 0;
                display: flex;
                align-content: center;
                justify-content: flex-start;

                .img_box {
                  width: 18px;
                  height: 18px;
                }
              }

              .bd_men {
                flex: 1;
                display: flex;
                align-content: center;
                justify-content: space-between;

                .chane_txt {
                  font-size: 14px;
                  font-family: PingFang SC, PingFang SC-Regular;
                  font-weight: 400;
                  text-align: LEFT;
                  color: #07c160;
                  line-height: 20px;
                }
                .img_bot {
                  width: 8px;
                  height: 14px;
                  flex-shrink: 0;
                }
              }
            }
          }
          .rihg_box__ {
            flex: 1;
            padding: 0 16px;
            box-sizing: border-box;

            .cate_box {
              width: 100%;
              display: flex;
              align-items: center;
              height: 44px;

              .im_b {
                width: 40px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-shrink: 0;

                img {
                  width: 18px;
                  height: 18px;
                }
              }

              .left_nex {
                flex: 1;
                font-size: 14px;
                font-family: PingFang SC, PingFang SC-Regular;
                font-weight: 400;
                text-align: left;
                color: #323233;
                line-height: 20px;
              }
            }

            .is_caterindx {
              .left_nex {
                color: #07c160;
              }
            }
          }
        }
      }
    }
  }

  .lf_detail {
    width: 100%;
    padding: 18px 16px;
    box-sizing: border-box;
    .box_one {
      width: 100%;
      background-color: #fff;
      border-radius: 8px;
      padding: 12px;
      box-sizing: border-box;
      margin-bottom: 12px;

      .one_itmes {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 12px;
        border-bottom: 1px dashed #dcdee0;

        .img_30 {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          margin-right: 6px;
        }

        .o__dek {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .on_titles {
            flex: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #323233;
          }
          .on_names {
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: right;
            color: #323233;
          }
        }
      }

      .des_im {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        box-sizing: border-box;

        .left_lable {
          width: 70px;
          flex-shrink: 0;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #646566;
        }

        .right_text {
          text-align: right;
          flex: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #323233;

          .images_box {
            width: 250px;
            overflow-x: scroll;
            display: flex;
            align-items: center;

            img {
              width: 52px;
              height: 52px;
              border-radius: 4px;
              margin-right: 6px;
              flex-shrink: 0;
            }
          }
        }
      }

      .look_mores {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: LEFT;
          color: #646566;
        }
        img {
          width: 14px;
          height: 14px;
        }
      }
    }

    .tu_biao {
      width: 100%;
      display: flex;
      align-items: center;
      opacity: 1;
      background: linear-gradient(135deg, #ffffff 15%, #ecfff6 78%, #c6ffe5);
      border: 1px solid #f2f3f5;
      border-radius: 9px;
      padding: 16px;
      box-sizing: border-box;

      .left_zhi {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .tip_on {
          display: flex;
          align-items: center;
          margin-bottom: 19px;

          .left_tip {
            width: 16px;
            height: 16px;
            opacity: 1;
            background: #1bcb7b;
            border-radius: 2px;
            margin-right: 8px;
          }
          .left_ti_txt {
            font-size: 13px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #323233;
          }
        }
      }
      .right_tip {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>