<template>
  <div class="container">
    <div class="paycroll1"></div>
    <template v-if="loading == false">
      <div class="top_tilepage">
        <div class="box_img">
          <div class="download" @click.stop="$router.go(-1)">
            <img src="../../assets/img/img_06.png" class="arrow_left" alt="" />
            <div class="arr_name">返回</div>
          </div>
          <span></span>
          <img
            src="../../assets/img/img_22.png"
            class="frise"
            @click="clock"
            alt=""
            :style="{
              transform: 'rotate(' + pageRotate + 'deg)',
            }"
          />
        </div>
      </div>
      <div style="height: 40px"></div>
      <div
        class="wai_boxs"
        :style="{
          height: height,
        }"
      >
        <div
          :style="{
            height: height,
          }"
        >
          <pdf
            :style="{
              width: scale + '%',
              transform: 'rotate(' + pageRotate + 'deg)',
            }"
            :src="URL"
            :page="currentPage"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
            @loaded="loadPdfHandler"
          />
        </div>
      </div>
      <div class="downd">
        <div class="pro_img">
          <div class="arrow">
            <span
              @click="changePdfPage(0)"
              class="prov"
              :class="{ grey: currentPage === 1 }"
              >上一页</span
            >
            <span class="number_count">
              {{ currentPage }} / {{ pageCount }}</span
            >
            <span
              @click="changePdfPage(1)"
              class="prov next"
              :class="{ grey: currentPage === pageCount }"
              >下一页</span
            >
          </div>
        </div>
      </div>

      <!-- <div class="butts">
      <div class="but_c">
        <button class="prov">上一张</button>
        <button class="prov next">上一张</button>
      </div>
    </div> -->
    </template>
    <template v-else>
      <van-loading
        color="#1bcb7b"
        class="van__load"
        size="88px"
        text-size="20px"
        vertical
      >
        加载中...</van-loading
      >
    </template>
  </div>
</template>

<script>
import { Toast } from 'vant';
import pdf from 'vue-pdf'
export default {
  components: {
    pdf,

  },
  data() {
    return {
      atguid: '',
      URL: '',
      openUrl: '',
      height: 0,
      loading: false,
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      pageRotate: 0,
      scale: 100,

    }
  },
  created() {
    let query = this.$route.query
    this.atguid = query.atguid
    this.getFile()
  },
  mounted() {
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.height = (windowHeight - 50) + 'px'
  },
  methods: {
    getFile() {
      this.loading = true
      this.$http.get('working/file/getFile?atguid=' + this.atguid).then(res => {
        console.log(res.data.data);
        this.URL = pdf.createLoadingTask(this.$variate.baseURL + res.data.data.url)
        this.openUrl = this.$variate.baseURL + res.data.data.url
        // console.log(this.URL);
        setTimeout(() => {
          this.loading = false
        }, 500);
      }).catch(err => {
        console.log(err);
        this.loading = false
        Toast(err.msg || err.data.msg)
      })
    },
    clock() {
      this.pageRotate += 90
      if (this.pageRotate === 360) {
        this.pageRotate = 0
      }
    },
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },
    // pdf加载时
    loadPdfHandler() {
      this.currentPage = 1 // 加载的时候先加载第一页
    }
  },
}

</script>

<style scoped lang='less'>
.container {
  .wai_boxs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .top_tilepage {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    .box_img {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 40px;
      padding: 0 16px;
      box-sizing: border-box;
      background: #4a4a4a;

      .download {
        width: 70px;
        display: flex;
        align-items: center;

        .arrow_left {
          width: 24px;
          height: 24px;
        }

        .arr_name {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          margin-left: 8px;
        }
      }

      .frise {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }
      span {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #ffffff;
        margin-left: -25px;
      }
    }
  }
  .downd {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    .pro_img {
      width: 100%;
      height: 40px;
      background: #4a4a4a;

      .arrow {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        box-sizing: border-box;
        .grey {
          color: #9c9c9c;
          font-size: 14px;
        }
        .number_count {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #fff;
        }

        .prov {
          width: 80px;
          height: 34px;
          background: #ffffff;
          border: 1px solid #dcdee0;
          border-radius: 8px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #323233;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .next {
          width: 80px;
          margin-left: 16px;
          box-sizing: border-box;
          background: #1bcb7b;
          color: #fff;
        }
      }
    }
  }

  .butts {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;

    .but_c {
      padding: 8px 16px;
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      align-items: center;

      .prov {
        width: 165px;
        height: 40px;
        background: #ffffff;
        border: 1px solid #dcdee0;
        border-radius: 20px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #323233;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .next {
        flex: 1;
        margin-left: 16px;
        box-sizing: border-box;
        background: #1bcb7b;
        color: #fff;
      }
    }
  }

  .van__load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>