<template>
  <div class="shou_pop" v-if="show_pop == true">
    <div class="tan_pop" :style="bodystyle" ref="canvasHW">
      <div class="white__pop">
        <div class="top_whiel">
          <div class="ppop_title">
            <div class="left_bxos">
              <img src="../assets/img/img_65.png" class="icon_popa" alt="" />
              <span>附件图片</span>
            </div>
            <div class="rigt__list" @click.stop="turnAffix">
              <span>前往附件列表</span>
              <img
                src="../assets/img/img_11.png"
                class="icon_arrow__pop"
                alt=""
              />
            </div>
          </div>
          <div class="wai_opp">
            <div class="er_title_pop">
              <img src="../assets/img/img_66.png" class="title_icons" alt="" />
              <span>审核类型</span>
            </div>
            <div class="button__as">
              <div class="item_one item_a" @click.stop="approve">审核通过</div>
              <div class="item_one" @click.stop="$router.go(-1)">
                退回到上一步
              </div>
              <div class="item_one" @click.stop="backrove">退回到编制人</div>
            </div>
          </div>
          <div class="buttons_a">
            <div class="lets_qianzi">
              <div class="ctx__name">
                <img src="../assets/img/img_62.png" alt="" />
                <span class="span_name">签字盖章</span>
              </div>
              <div
                class="ctx__name"
                @click.stop="overwrite"
                style="justify-content: flex-end"
              >
                <img src="../assets/img/img_63.png" alt="" />
                <span class="span_name">擦除</span>
              </div>
            </div>
            <div class="signa_ture">
              <div class="signatureBox">
                <div class="canvasBox">
                  <canvas
                    class="is_canvas"
                    ref="canvasF"
                    @touchstart="touchStart"
                    @touchmove="touchMove"
                    @touchend="touchEnd"
                  ></canvas>
                </div>
              </div>
              <img class="imgCanvas" :src="imgUrl" />
            </div>
          </div>
          <div class="wai_opp" style="padding-bottom: 16px">
            <div class="er_title_pop">
              <img src="../assets/img/img_64.png" class="title_icons" alt="" />
              <span>审核意见</span>
            </div>
            <div class="test_box">
              <van-cell-group>
                <van-field
                  v-model="message"
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
</template>

<script>
export default {
  name: "popup-lfy",
  data() {
    return {
      show_pop: true,
      bodystyle: {
        "height": '',
        "width": ''
      },
      windowHeight: 0,
      stageInfo: '',
      imgUrl: '',
      client: {},
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      isViewAutograph: this.$route.query.isViews > 0,
      contractSuccess: this.$route.query.contractSuccess,
      mild: '',
    }
  },
  created() {

  },
  methods: {
    onshow(item) {
      this.mild = item.mlid
      console.log(this.mild);
      this.show_pop = true
    },
    turnAffix() {
      this.$router.push({ path: '/affix', query: { mild: this.mild } })
    },
    touchStart(ev) {
      console.log('我开始了');
      console.log(ev);
      ev.preventDefault()
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clienX,
          y: ev.targetTouches[0].clientY,
        }
        this.startX = obj.x
        this.startY = obj.y
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
      }
    },
    touchMove(ev) {
      ev.preventDefault()
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top
        }
        this.moveY = obj.y
        this.moveX = obj.x
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    touchEnd(ev) {
      ev.preventDefault()
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
      }
    },
    //重写
    overwrite() {
      this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
      this.points = []
    },
    trueOrder() {  // 确定

    },
    approve() {  // 审核通过

    },
    backrove() {   // 退回到编制人

    },
  },
  beforeDestroy() {

  }
}

</script>

<style scoped lang='less'>
</style>