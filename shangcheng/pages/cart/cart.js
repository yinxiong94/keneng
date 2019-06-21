// pages/gwc/gwc.js
const app = getApp();
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    productPrice: 0.00,
    checked: [],
    ind: [],
    a: 0,
    b: 0,
    c: false,
    count: [],
    fid: "",
    shoppingid: "",
    shoplist: [],
    d: 0
  },

  // 购买结算
  nowshop: function() {
    that = this
    var aaa = "";
    for (var i = 0; i < that.data.shoplist.Result.shoplist.length; i++) {
      if (this.data.checked[i] === true) {
        aaa += ","
        aaa += that.data.shoplist.Result.shoplist[i].shoppingid;
      }
    }
    this.setData({
      fid: aaa.substr(1)
    })
    if (this.data.fid.length == 0) {
      wx.showToast({
        title: '请选择商品',
        duration: 2000,
        icon: "none"
      })
    } else {
      wx.navigateTo({
        url: '/pages/order/order?ddd=' + this.data.fid+'&id='+1,
      })
    }

  },
  // 选中所有
  all: function() {
    this.data.b += 1;
    if (this.data.b % 2 != 0) {
      var a = 0;
      for (var i = 0; i < this.data.shoplist.Result.shoplist.length; i++) {
        this.setData({
          ['checked[' + i + ']']: true,
          ['ind[' + i + ']']: 1
        })
        a += this.data.shoplist.Result.shoplist[i].price * this.data.count[i]
      }
      this.setData({
        productPrice: a,
        c: true,
        d: this.data.shoplist.Result.shoplist.length
      })
    } else {
      for (var i = 0; i < this.data.shoplist.Result.shoplist.length; i++) {
        this.setData({
          ['checked[' + i + ']']: false,
          ['ind[' + i + ']']: 0
        })
      }
      this.setData({
        productPrice: 0,
        c: false,
        ind: [],
        d: 0
      })
    }
  },
  // 减
  jian: function(e) {
    that = this;
    var a = this.data.count[e.currentTarget.dataset.id] - 1; //商品数量
    var price = e.currentTarget.dataset.price; //商品价格
    var b = e.currentTarget.dataset.uid;
    var goodsid = e.currentTarget.dataset.goodsid;
    var d = e.currentTarget.dataset.id;
    if (a < 1) {
      a = 1
    }
    this.setData({
      ['count[' + e.currentTarget.dataset.id + ']']: a
    })
    var price1 = 0;
    var sum = 0;
    for (var i = 0; i < that.data.shoplist.Result.shoplist.length; i++) {
      if (this.data.checked[i] == true) {
        sum += that.data.shoplist.Result.shoplist[i].price * this.data.count[i]
      }
      that.setData({
        productPrice: sum
      })
    }

    if (a != 1) {
      app.postData("GetShoppingData.ashx", {
        action: "AddShopping",
        goodsid: goodsid,
        shoppingnum: that.data.count[d],
        userid: app.globalData.userid,
        shoppingid: b
      }).then(res => {

      })
    }
  },
  // 加
  jia: function(e) {
    that = this;
    var a = this.data.count[e.currentTarget.dataset.id] + 1;
    var price = e.currentTarget.dataset.price; //商品价格
    var b = e.currentTarget.dataset.uid;
    var goodsid = e.currentTarget.dataset.goodsid;
    var d = e.currentTarget.dataset.id;
    this.setData({
      ['count[' + e.currentTarget.dataset.id + ']']: a
    })
    var price1 = 0;
    var sum = 0;
    for (var i = 0; i < that.data.shoplist.Result.shoplist.length; i++) {
      if (this.data.checked[i] == true) {
        sum += that.data.shoplist.Result.shoplist[i].price * this.data.count[i]
      }
      that.setData({
        productPrice: sum
      })
    }
    app.postData("GetShoppingData.ashx", {
      action: "AddShopping",
      goodsid: goodsid,
      shoppingnum: that.data.count[d],
      userid: app.globalData.userid,
      shoppingid: b
    }).then(res => {

    })
  },
  // 单选
  change: function(e) {
    var c = e.target.dataset.ind;

    var a = e.target.dataset.productprice;
    var b = e.target.dataset.productnum;
    var sum = 0;
    if (!this.data.ind[c]) {
      var e = parseInt(this.data.a) + 1;
    } else {
      var e = parseInt(this.data.ind[c]) + 1;
    }
    this.setData({
      ['ind[' + c + ']']: e
    })
    if (this.data.ind[c] % 2 != 0) {
      this.setData({
        ['checked[' + c + ']']: true,
        productPrice: a * b + this.data.productPrice,
      })
    } else {
      this.setData({
        ['checked[' + c + ']']: false,
        productPrice: this.data.productPrice - a * b
      })
    }
    for (var i = 0; i < this.data.shoplist.Result.shoplist.length; i++) {
      if (this.data.checked[i] === true) {
        sum += 1
      }
    }
    if (sum != this.data.shoplist.Result.shoplist.length) {
      this.setData({
        c: false,
        b: 0,
        d: sum
      })
    } else {
      this.setData({
        c: true,
        b: 1,
        d: sum
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    that = this;

  },
  // 获取购物车商品
  handCart: function() {
    that = this;
    app.postData("GetShoppingData.ashx", {
      action: "Query",
      userid: app.globalData.userid
    }).then(res => {
      var ff = [];
      for (var i = 0; i < res.Result.shoplist.length; i++) {
        ff.push(res.Result.shoplist[i].num)
      }
      that.setData({
        shoplist: res,
        count: ff
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function() {
    that.handCart()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})