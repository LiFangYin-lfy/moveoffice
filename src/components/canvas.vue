<template>
  <div class="signature">
    <div>
      <canvas
        id="myCanvas"
        ref="canvas"
        :width="canvasWidth"
        :height="canvasHeight"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend.prevent="touchEnd"
        @mousedown.prevent="mouseDown"
        @mousemove.prevent="mouseMove"
        @mouseup.prevent="mouseUp"
      >
        您的浏览器不支持 HTML5 canvas 标签。
      </canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'canvas-lfy',
  props: ['reject'],
  data() {
    return {
      canvasWidth: '',
      canvasHeight: '160',
      canvasImg: '', // 签名图片地址
      ctx: null, //画板
      stage_info: [], // 移动端按下点到屏幕的偏差
      isDown: false, //是否按下
      points: [], //按下点组合
      startX: 0, // 起始点x坐标
      startY: 0, // 起始点y坐标
      img: new Image(),
      imgUrl: '',
    }
  },
  mounted() {
    let that = this
    let screenWidth = document.body.clientWidth;   // 屏幕宽
    this.canvasWidth = screenWidth - 90
    let canvas = this.$refs.canvas;
    this.ctx = canvas.getContext("2d");
    this.stage_info = canvas.getBoundingClientRect();
    //   var img = new Image();
    this.img.src = this.imgUrl
    this.img.setAttribute('crossOrigin', 'anonymous');

    this.img.onload = function () {

      var pattern = that.ctx.createPattern(that.img, "no-repeat");
      that.ctx.fillStyle = pattern;

      that.ctx.fillRect(0, 0, that.canvasWidth, that.canvasHeight);
    }
  },
  created() {

  },
  watch: {
    reject(v) {
      if (v == true)
        this.clear()
    },
  },
  methods: {
    // pc
    mouseDown(ev) {
      let e = ev || event;
      e.preventDefault();
      this.isDown = true;
      console.log(this.isDown, "this.idDown");
      let obj = {
        x: e.offsetX,
        y: e.offsetY
      }
      this.startX = obj.x;
      this.startY = obj.y;
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(obj.x, obj.y);
      this.ctx.stroke();
      this.ctx.closePath();
      this.points.push(obj);
    },
    mouseMove(ev) {
      let e = ev || event;
      e.preventDefault();
      if (this.isDown) {
        let obj = {
          x: e.offsetX,
          y: e.offsetY
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    mouseUp(ev) {
      let e = ev || event;
      e.preventDefault();
      let obj = {
        x: ev.offsetX,
        y: ev.offsetY
      }
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(obj.x, obj.y);
      this.ctx.stroke();
      this.ctx.closePath();
      this.points.push(obj);
      this.points.push({ x: -1, y: -1 });
      this.isDown = false;
    },
    // mobile
    touchStart(ev) {
      let e = ev || event;
      e.preventDefault();  // 取消默认事件
      if (e.touches.length == 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        }
        this.startX = obj.x;
        this.startY = obj.y;
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        this.ctx.font = 'bold 24px 华文行楷';
        // this.ctx.fillText('24px的宋体呈现', 20, 20);
        this.ctx.beginPath();

        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.points.push(obj);
      }
    },
    touchMove(ev) {
      let e = ev || event;
      e.preventDefault();
      if (e.touches.length == 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.startX = obj.x;
        this.startY = obj.y;
        this.points.push(obj)


      }
    },
    touchEnd(ev) {
      let e = ev || event;
      e.preventDefault();
      if (e.touches.length == 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        }
        this.startX = obj.x;
        this.startY = obj.y;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.points.push(obj)

      } else {
        this.getValue()
      }
    },
    clear() {     //清空
      this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
      this.points = []
      this.$emit('resetting', false)
    },

    getValue() {    //获取图片数据
      this.canvasImg = this.$refs.canvas.toDataURL('image/png'); //签名img
      // console.log(this.canvasImg);
      let noPrefix = this.canvasImg.replace(/^data:image\/\w+;base64,/, '')
      this.$emit('getcanvasimg', noPrefix)
      // return this.canvasImg
    }
  }
}
</script>

<style lang="less">
.signature {
  text-align: center;
  touch-action: false;
  .canvas {
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    font-size: 0;
    touch-action: false;
  }
  .save-btn {
    position: absolute;
    top: 50%;
    left: -48px;
    z-index: 9;
    margin-top: -20px;
    transform: rotate(90deg);
    transform-origin: center center;
    font-size: 18px;
    color: #fcfcfc;
    line-height: 25px;
    padding: 8px 43px;
    background: linear-gradient(
      90deg,
      rgba(57, 115, 230, 1) 0%,
      rgba(57, 115, 230, 1) 100%
    );
    border-radius: 2px;
  }
  .back-btn {
    position: absolute;
    top: 14px;
    right: -26px;
    z-index: 9;
    transform: rotate(90deg);
    transform-origin: left top;
    display: flex;
    flex-direction: column;
    .icon {
      display: inline-block;
      width: 42px;
      height: 42px;
      //   background: url("../../assets/images/signature_back.png") no-repeat center center;
      background-size: contain;
    }
    .label {
      font-size: 16px;
      color: #d8d8d8;
      text-align: center;
    }
  }
  .clear-btn {
    display: flex;
    flex-direction: column;
    .label {
      font-size: 16px;
      color: #d8d8d8;
      text-align: center;
    }
  }
}
</style>