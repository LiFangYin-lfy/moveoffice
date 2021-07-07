<template>
  <div class="container">
    <div class="paycroll1"></div>
    <div class="page__title">
      <div class="let_arrow" @click.stop="$router.go(-1)">
        <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
        <div class="arr_name">返回</div>
      </div>
      <div class="page_names">审批日志</div>
    </div>
    <div class="lsit_box">
      <!-- <van-steps direction="vertical">
        <van-step v-for="(item, index) in list" :key="index"> -->
      <div v-for="(item, index) in list" :key="index">
        <div class="list__red">
          <div class="bs_boxs">
            <div class="box_icons" v-if="item.isaudit != 1"></div>
            <img
              src="../../assets/img/suss.png"
              v-else
              alt=""
              class="is_isaudit"
            />
          </div>
          <div class="step_box">
            <div class="date_setp">{{ item.czdate }}</div>
            <div class="step__item">
              <div class="let_setp">
                <div
                  class="number_item"
                  :class="item.isaudit == 1 ? 'green' : ''"
                >
                  <span>{{ index + 1 }}</span>
                </div>
                <div
                  class="setp_title"
                  :class="item.isaudit == 1 ? 'setp_title__green' : ''"
                >
                  <div class="p_names">{{ item.shjd }}</div>
                  <div class="p_namet">
                    {{ item.shrmc }}
                  </div>
                  <div class="n_names">
                    办理意见:{{ item.isaudit == 1 ? item.blyj : "未审核" }}
                  </div>
                </div>
              </div>
              <img
                :src="item.imageByte"
                v-if="item.isaudit == 1 && item.imageByte != null"
                class="ri_img"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- </van-step>
      </van-steps> -->
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {

  data() {
    return {
      list: [],
      dillId: '',
    }
  },
  created() {
    let query = this.$route.query
    console.log(query);
    this.dillId = query.id
    this.getlist()
  },
  methods: {
    getlist() {
      this.$http.get('working/pof/auditDetail?dillId=' + this.dillId).then(res => {
        console.log(res.data);
        if (res.data.data.length != 0) {
          res.data.data.forEach(item => {
            if (item.imageByte != null) {
              item.imageByte = 'data:image/png;base64,' + item.imageByte
            }
          });
        }
        this.list = res.data.data
        console.log(this.list);
      }).catch(err => {
        console.log(err);
        Toast(err.msg || err.data.msg)
      })
    },
  },
}

</script>

<style scoped lang='less'>
.container {
  .lsit_box {
    width: 100%;
    padding-top: 16px;
    box-sizing: border-box;

    .list__red {
      width: 100%;
      display: flex;
      position: relative;
      margin-bottom: 8px;
      box-sizing: border-box;

      .bs_boxs {
        width: 20px;
        display: flex;
        justify-content: center;

        .box_icons {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ccc;
          position: relative;
          z-index: 2;
        }
        .is_isaudit {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          position: relative;
          z-index: 2;
        }
      }

      .step_box {
        flex: 1;
        padding: 0 8px;
        box-sizing: border-box;

        .date_setp {
          width: 100%;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #969799;
          margin-bottom: 6px;
        }
        .step__item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 16px 12px 24px;
          box-sizing: border-box;
          background: #ffffff;
          border-radius: 8px;

          .let_setp {
            flex: 1;
            display: flex;
            align-items: center;
            height: 50px;

            .number_item {
              width: 40px;
              height: 40px;
              opacity: 1;
              background: #c0c0c0;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;

              span {
                color: #fff;
                font-size: 28px;
                font-family: DIN Alternate, DIN Alternate-Bold;
                font-weight: 500;
                text-align: center;
              }
            }

            .green {
              background-color: #1bcb7b;
              span {
                font-weight: 700;
              }
            }
            .setp_title {
              flex: 1;
              height: 50px;
              padding: 0 12px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .p_names {
                width: 100%;
                font-size: 14px;
                font-family: PingFang SC, PingFang SC-Medium;
                font-weight: 600;
                text-align: left;
                color: #c0c0c0;
              }
              .p_namet {
                width: 100%;
                font-size: 14px;
                font-family: PingFang SC, PingFang SC-Medium;
                font-weight: 600;
                text-align: left;
                color: #c0c0c0;
                padding: 4px 0;
                font-weight: 400;
                box-sizing: border-box;
              }
              .n_names {
                width: 100%;
                font-size: 14px;
                font-family: PingFang SC, PingFang SC-Regular;
                font-weight: 400;
                text-align: left;
                // color: #646566;
                color: #c0c0c0;
              }
            }

            .setp_title__green {
              .p_names {
                color: #333;
              }
              .n_names {
                color: #333;
              }
              .p_namet {
                color: #333;
              }
            }
          }

          .ri_img {
            width: 76px;
            height: 50px;
            flex-shrink: 0;
          }
        }
      }

      &::after {
        content: "";
        position: absolute;
        left: 10px;
        top: 14px;
        width: 2px;
        height: 90%;
        background-color: #ccc;
      }
    }
  }
}
</style>