<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow"></div>
      <div class="page_names">【借款、预付款】审批单</div>
    </div>
    <div class="healthds">
      <div class="order_details">
        <div class="detail_status">
          <div class="left_detai">
            <img src="../../assets/img/img_29.png" class="img_29" alt="" />
            <div class="dail_txt">
              <div class="_top">{{ mydetail.spr }}</div>
              <div class="c_date">{{ mydetail.sps }}</div>
            </div>
          </div>
          <div class="r_arr">
            <img src="../../assets/img/img_11.png" alt="" />
          </div>
        </div>
      </div>
      <div class="details__box">
        <div class="box_one">
          <div class="one_itmes">
            <img src="../../assets/img/img_30.png" class="img_30" alt="" />
            <div class="o__dek">
              <div class="on_titles">{{ mydetail.djbh }}</div>
              <div class="on_names">{{ mydetail.grmc }}</div>
            </div>
          </div>
          <div class="des_im" v-for="(item, index) in voucherVos" :key="index">
            <div class="left_lable">{{ item.valueVo }}</div>
            <div class="right_text">{{ item.keys }}</div>
          </div>
        </div>
        <div class="box_otex">
          <div class="one_itmes">
            <img src="../../assets/img/img_31.png" class="img_30" alt="" />
            <div class="o__dek">
              <div class="on_titles">预计总额</div>
              <div class="on_names" style="color: #ee0a24; font-weight: 600">
                {{ mydetail.yjze }}元
              </div>
            </div>
          </div>
          <div class="bom_list">
            <div
              class="lit_item"
              v-for="(item, index) in billsVoList"
              :key="index"
            >
              <div
                class="des_im"
                v-for="(itema, indexa) in item.list"
                :key="indexa * indexa"
              >
                <div class="left_lable">
                  {{ itema.valueVo }}
                </div>
                <div class="right_text">
                  {{ itema.keys }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="down__buttoen">
      <div class="back_box">
        <button class="button_callback" @click.stop="goback">返回</button>
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
      imagesList: this.$variate.imgList,
      list: 4,
      mlid: '',
      djlxid: '',
      mydetail: {},
      voucherVos: [],
      ary: [],
      childarr: [],
      newlist: [],
      pagename: '',
      billsVoList: [],
    }
  },
  created() {
    let that = this, query = that.$route.query;
    this.mlid = query.mlid
    this.djlxid = query.djlxid
    this.pagename = query.pagename
    this.getmbdetail()
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    async getmbdetail() {
      let that = this;
      try {
        try {
          const { data: { data } } = await that.$http.get('working/oerdjml/selectByBillsDetails?MLID=' + that.mlid)
          that.detail = data
          that.voucherVos = data.list
          that.billsVoList = data.voList
          console.log(data);
        } catch (err) {
          Toast(err.msg || err.data.msg)
        }
      } catch (err) {
        console.log(err);
        Toast(err.msg || err.data.msg)
      }
    },
  },
  beforeDestroy() {

  }
}

</script>

<style scoped lang='less'>
.container {
  .healthds {
    width: 100%;
    height: 100%;
    padding-bottom: 80px;
    box-sizing: border-box;

    .order_details {
      width: 100%;
      padding: 16px 16px 80px;
      box-sizing: border-box;
      background: #1bcb7b;

      .detail_status {
        width: 100%;
        display: flex;
        align-items: center;

        .left_detai {
          flex: 1;
          display: flex;
          align-items: center;
          height: 48px;

          .img_29 {
            width: 34px;
            height: 34px;
            flex-shrink: 0;
          }

          .dail_txt {
            flex: 1;
            padding: 0 8px;
            box-sizing: border-box;
            height: 48px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            ._top {
              width: 100%;
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Medium;
              font-weight: 500;
              text-align: left;
              color: #ffffff;
            }

            .c_date {
              width: 100%;
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #ffffff;
              opacity: 0.7;
            }
          }
        }
        .r_arr {
          width: 26px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-shrink: 0;

          img {
            width: 10px;
            height: 14px;
          }
        }
      }
    }

    .details__box {
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;

      .box_one {
        width: 100%;
        margin-top: -60px;
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
          padding: 8px 0;
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
      }

      .box_otex {
        width: 100%;
        background-color: #fff;
        border-radius: 8px;
        padding: 12px;
        box-sizing: border-box;
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

        .bom_list {
          width: 100%;

          .lit_item {
            width: 100%;
            border-bottom: 1px dashed #dcdee0;
            .des_im {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 8px 0;
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

            &:last-child {
              border: 0 none;
            }
          }
        }
      }
    }
  }
}
</style>