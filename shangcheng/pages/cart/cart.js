// pages/gwc/gwc.js
const app = getApp();
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    productPrice: 0.00, //总价
    checked:[], //默认全选
    ind: [],
    a: 0,
    b: 0,
    c: false,
    count: [],
    fid: ""
  },
  // 购买结算
  nowshop: function () {
    var aaa = "";
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.checked[i] === true) {
        aaa += ","
        aaa += this.data.list[i].productCartId;
      }
    }
    this.setData({ fid: aaa.substr(1) })
    if (this.data.fid.length == 0) {
      wx.showToast({
        title: '请选择商品',
        duration: 2000,
        icon: "none"
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/fill1/fill1?ddd=' + this.data.fid,
      })
    }

  },
  // 选中所有
  all: function () {
    if (this.data.checked == false){
        this.setData({
          checked: true
        })
    }
    
    // this.data.b += 1;
    // if (this.data.b % 2 != 0) {
    //   var a = 0;
    //   for (var i = 0; i < this.data.list.length; i++) {
    //     this.setData({ ['checked[' + i + ']']: true, ['ind[' + i + ']']: 1 })
    //     a += this.data.list[i].productPrice * this.data.count[i]
    //   }
    //   this.setData({ productPrice: a, c: true })
    // }
    // else {
    //   for (var i = 0; i < this.data.list.length; i++) {
    //     this.setData({ ['checked[' + i + ']']: false, ['ind[' + i + ']']: 0 })
    //   }
    //   this.setData({ productPrice: 0, c: false, ind: [] })
    // }
  },
  // 减
  jian: function (e) {
    var a = this.data.count[e.target.dataset.id] - 1;
    var b = e.target.dataset.uid;
    if (a < 1) { a = 1 }
    this.setData({ ['count[' + e.target.dataset.id + ']']: a })
    var that = this;
    var c = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, c.signId, c.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartNumModify',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: c.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { productCartId: b, operationType: 0 },
      success(res) {
      }
    })
  },
  jia: function (e) {
    var a = this.data.count[e.target.dataset.id] + 1;
    var b = e.target.dataset.uid;
    this.setData({ ['count[' + e.target.dataset.id + ']']: a })
    var that = this;
    var c = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, c.signId, c.signToken].sort().join('').toUpperCase();
    // 轮播图
    wx.request({
      url: app.globalData.url + '/api/Product/ProductCartNumModify',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: c.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { productCartId: b, operationType: 1 },
      success(res) {
      }
    })
  },
  change: function (e) {
    var c = e.target.dataset.ind;
    console.log(c)
    // var a = e.target.dataset.productprice;
    // var b = e.target.dataset.productnum;
    // var sum = 0;
    // if (!this.data.ind[c]) {
    //   var e = parseInt(this.data.a) + 1;
    // }
    // else {
    //   var e = parseInt(this.data.ind[c]) + 1;
    // }
    this.setData({ ['ind[' + c + ']']: e })
    if (this.data.ind[c] % 2 != 0) {
      this.setData({ ['checked[' + c + ']']: true })
    }
    else {
      this.setData({ ['checked[' + c + ']']: false })
    }
    // for (var i = 0; i < this.data.list.length; i++) {
    //   if (this.data.checked[i] === true) {
    //     sum += 1
    //   }
    // }
    // if (sum != this.data.list.length) {
    //   this.setData({ c: false, b: 0 })
    // } else { this.setData({ c: true, b: 1 }) }
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    that=this;
    // 获取用户购物车功能
    app.postData("GetShoppingData.ashx", {
      action: "Query",
      userid: app.globalData.userid
    }).then(res => { 
      console.log(res);
    })
    that.handCart()
  },
  // 获取购物车商品
  handCart: function () {
    app.postData("GetShoppingData.ashx", {
      userid: app.globalData.userid,
    }).then(res => {
      console.log(res);
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