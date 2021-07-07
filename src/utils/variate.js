const imageUrl = '../../assets/img'
const four = 4
const downtitle = 'PWERED BY 慧瑞科技'
const baseURL = 'http://wisdom.jd.brotop.cn/prod' // 线上
// const baseURL = 'http://wisdom.jd.brotop.cn/dev-api'
// const baseURL = 'http://192.168.12.180:3086'
const navlist = [{
    title: '待处理',
    type: 1,
    is_nav: 1
  },
  {
    title: '已审批',
    type: 2,
    is_nav: 0
  }
]
const meblist = [{
    title: '审核中',
    type: 1,
    is_nav: 1
  },
  {
    title: '历史借款单',
    type: 2,
    is_nav: 0
  }
]
const mebburse = [{
    title: '审核中',
    type: 3,
    is_nav: 1
  },
  {
    title: '历史报销单',
    type: 4,
    is_nav: 0
  }
]
const mywage = [{
    title: '我的工资',
    type: 1,
    is_nav: 1
  },
  {
    title: '其他收入',
    type: 2,
    is_nav: 0
  }
]
const imgList = [require('../assets/img/img_10.png'), require('../assets/img/img_10.png'), require('../assets/img/img_10.png'), require('../assets/img/img_10.png'), require('../assets/img/img_10.png'), require('../assets/img/img_10.png'), require('../assets/img/img_10.png'), require('../assets/img/img_10.png')]
const iconlist = [require('../assets/img/img_77.png'), require('../assets/img/img_78.png'), require('../assets/img/img_79.png'), require('../assets/img/img_80.png'), ]

const cateRemburse = [{
  image: require('../assets/img/img_40.png'),
  title: '我的借款',
  count: 0,
  type: 1
}, {
  image: require('../assets/img/img_41.png'),
  title: '我的报销',
  count: 0,
  type: 1
}, {
  image: require('../assets/img/img_42.png'),
  title: '经费审批',
  count: 0,
  type: 1
}, {
  image: require('../assets/img/img_43.png'),
  title: '业务归口说明',
  count: 0,
  type: 1
}, {
  image: require('../assets/img/img_44.png'),
  title: '报账流程',
  count: 0,
  type: 1
}, ]
const budget = [{
    image: require('../assets/img/img_45.png'),
    title: '部门经费执行',
    type: 1
  },
  // {
  // image: require('../assets/img/img_46.png'),
  // title: '部门经费执行',
  // type: 2
  // },
  {
    image: require('../assets/img/img_47.png'),
    title: '经费执行明细',
    type: 3
  }
]
const salaryquery = [{
    image: require('../assets/img/img_48.png'),
    title: '我的工资',
    type: 1
  },
  {
    image: require('../assets/img/img_45.png'),
    title: '其他收入',
    type: 2
  },
  // {
  // image: require('../assets/img/img_49.png'),
  // title: '全年总收入',
  // type: 3
  // },
  {
    image: require('../assets/img/img_50.png'),
    title: '扣税指南',
    type: 3
  }
]
export default {
  imageUrl,
  navlist,
  meblist,
  downtitle,
  imgList,
  mywage,
  baseURL,
  four,
  cateRemburse,
  budget,
  salaryquery,
  mebburse,
  iconlist,
}
