// pages/goods/goods.js
var app = getApp();
const WxParse = require('../../wxParse/wxParse.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off: false,
    sid: "",
    list: [],
    length: '',
    current: 1,
    count: 1,
    shoplist: [],
    just: [],
    justOne: [],
    num: '',
    amount:1, //购买数量
  },
  aaa: function (e) {
    that.setData({
      current: e.detail.current += 1
    })

  },
  // 前往购物车
  tocart:function(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  handWhole: function () {
    that = this;
    var sendCoo = [];
    sendCoo = that.data.just.list;
    console.log(sendCoo!=null)
    if(sendCoo!=null){
    that.setData({
      justOne: sendCoo
      })
    } else {
      wx.showToast({
        title: '暂无评论',
        duration:2000,
        icon:"none"
      })
    }
  },
  // 获取购物车商品数量
  handMun: function () {
    that = this;
    var str = '';
    app.postData("GetShoppingData.ashx", {
      action: "Query",
      userid: app.globalData.userid
    }).then(res => {
      if (res.Result == null) {
        that.setData({
          num: 0
        })
      } else {
        str = res.Result.shoplist.length;
        that.setData({
          num: str
        })
      }
    })
  },
  // 加入购物车
  handCart: function () {
    that = this
    app.postData("GetShoppingData.ashx", {
      action: "AddShopping",
      goodsid: that.data.sid,
      userid: app.globalData.userid,
      shoppingnum: 1
    }).then(res => {
      if (res.Result == 1) {
        wx.showToast({
          title: '加入购物车成功',
          icon: 'none',
          duration: 2000
        })
        that.handMun();
      } else {
        wx.showToast({
          title: '加入购物车失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 立即购买
  // handgm() {
  //   wx.navigateTo({
  //     url: '/pages/order/order?sid=' + that.data.sid + "&id=" + "0",
  //   })
  // },

  // 立即购买
  handgm() {
    that = this;
    that.setData({
      off: true
    })
  },
  Delete() {
    that = this;
    that.setData({
      off: false
    })
  },

  jian(){
    that = this
    if (that.data.amount <= 1) {
      wx.showToast({
        title: '购买数量不能少于1',
        icon: "neno",
      })
      return
    } else {
      that.setData({
        amount: that.data.amount-1
      })
    }
  },
  jia(){
    that = this
    that.setData({
      amount: that.data.amount+1
    })
  },


  handTxdd: function () {
    that = this
   wx.navigateTo({
     url: '/pages/order/order?sid=' + that.data.sid + "&id=" + "0" + "&amount=" + that.data.amount,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      sid: options.id
    })
    // 商品详情
    app.postData("GetIndexData.ashx", {
      action: "GetDetails",
      goodsid: that.data.sid
    }).then(res => {
      console.log(res)
      that.setData({
        list: res.Result,
        urlLength: res.Result.piclist.length
      })
      let article = that.data.list.desc;
      WxParse.wxParse('article', 'html', article, that, 5);
      that.setData({
        length: that.data.list.piclist.length
      })
    })

  },
  // 评论
  hnadComment: function () {
    that = this;
    var coout = [];
    app.postData("GetGoodsData.ashx", {
      action: "GetComments",
      goodsid: that.data.sid
    }).then(res => {
      console.log(res)
      if(res.Result.list.length!=0){
      that.setData({
        just: res.Result
      })
        if (res.Result.list.length>3){
      for (let i = 0; i < 3; i++) {
        coout.push(res.Result.list[i]);
          }
          that.setData({
            justOne: coout
          })
        } else {
          that.setData({
            justOne: res.Result.list
          })
        }     
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that = this;
    that.hnadComment();
    that.handMun();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
