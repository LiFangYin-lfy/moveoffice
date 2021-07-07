const get = () => {
  return
}
const mobile = (value) => {
  return /^1[23456789]\d{9}$/.test(value)
}

function throttle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0,
    timer = null
  // 将throttle处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer)
      let that = this
      timer = setTimeout(function () {
        last = now
        that[fn](context, args);
      }, delay)
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now
      this[fn](context, args);
    }
  }
}

function debounce(fnName, wait) {
  let timeout = null;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      this[fnName]();
    }, wait);
  };
}
const ModalHelper = (function (bodyCls) {
  var scrollTop;
  return {
    afterOpen: function () { //弹框弹出时
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function () { //弹框消失时
      document.body.classList.remove(bodyCls);
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open')

const onscroll = function (total, list) {
  var tota = total
  var lit = list
  window.onscroll = function () {
    // scrollTop 滚动条滚动时，距离顶部的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // windowHeight 可视区的高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // scrollHeight 滚动条的总高度
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 滚动条到底部的条件
    if (scrollTop + windowHeight >= scrollHeight) {
      // 加载数据
      if (tota != lit.length) {
        return true
      } else if (tota == lit.length) {
        return false
      }
    }
  }
}
export default {
  get,
  mobile,
  ModalHelper,
  debounce,
  throttle,
  onscroll,
}
