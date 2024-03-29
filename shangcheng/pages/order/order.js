// pages/order/order.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingid: "",
    detailsdlist: [],
    sid: "",
    sum: 0, //商品总金额
    off: true,
    ffo: false,
    amount: 1,
    TotalPrice: 0, //商品总金额
    shifu: 0, //实付
    OrderNo:""
  },

  handDizhi: function () {
    wx: wx.navigateTo({
      url: '../administration/administration'
    })
  },

  // 获取地址
  site() {
    that = this
    app.postData("GetShoppingData.ashx", {
      action: "GetAddressList",
      userid: app.globalData.userid
    }).then(res => {
      if (res.Result.length == 0) {
        that.setData({
          off: true,
          ffo: false
        })
      }
      if (this.data.addressid == undefined) {
        res.Result.forEach(item => {
          if (item.isdefault == 1) {
            that.setData({
              coco: item,
              off: false,
              ffo: true
            })
            var site = []
            site.push(item.city)
            site.push(item.province)
            site.push(item.region)
            site.push(item.useraddress)
            site = site.join().replace(/,/g, "")
            that.setData({
              site: site
            })
          }
        })
      } else {
        res.Result.forEach(item => {
          if (item.addressid == this.data.addressid) {
            that.setData({
              coco: item,
              off: false,
              ffo: true
            })

            var site = []
            site.push(item.city)
            site.push(item.province)
            site.push(item.region)
            site.push(item.useraddress)
            site = site.join().replace(/,/g, "")
            that.setData({
              site: site
            })
          }
        })
      }
    })
  },

  //商品详情和价格
  loadmore() {
    that = this
    if (that.data.id == "0") {
      app.postData("GetShoppingData.ashx", {
        action: "Submit",
        userid: app.globalData.userid,
        goodsid: that.data.sid,
        goodscount: that.data.amount
      }).then(res => {
        that.setData({
          detailsdlist: res.Result,
          yunfei: res.Result.yunfei
        })

        that.data.detailsdlist.detailsdlist.forEach(item => {
          let goodsprice = item.goodsprice
          let goodsnum = item.goodsnum
          let sum = goodsprice * goodsnum
          that.setData({
            // 商品总金额
            TotalPrice: sum,
            // 计算运费实付款
            shifu: sum - that.data.yunfei
          })
        })
      })
    } else if (that.data.id == "2"){
      app.postData("GetOrderData.ashx", {
        action: "GetOrderDetails",
        orderid: that.data.OrderNo
      }).then(res=>{
        that.setData({ detailsdlist: res.Result,})
      })
    }
      else {
      app.postData("GetShoppingData.ashx", {
        action: "Submit",
        userid: app.globalData.userid,
        shopppingid: that.data.shoppingid,
      }).then(res => {
        console.log(res)
        that.setData({
          detailsdlist: res.Result
        })
      })
    }
  },


  // 提交订单
  submit() {
    that = this
    if (that.data.off !== true) {
      app.postData("GetShoppingData.ashx", {
        action: 'Pay',
        orderid: that.data.detailsdlist.OrderId,
        username: that.data.coco.username,
        usertel: that.data.coco.usertel,
        address: that.data.site
      }).then(res => {
        // 发起微信支付
        wx.requestPayment({
          'timeStamp': res.timeStamp,
          'nonceStr': res.nonceStr,
          'package': res.package,
          'signType': res.signType,
          'paySign': res.paySign,
          'success': function (res) {
            console.log(res);
            if (res.errMsg == "requestPayment:ok") {
              wx.navigateTo({
                url: '../payment/payment?shifu=' + that.data.detailsdlist.OrderPrice
              })
            }
          },
        })
        // wx.navigateTo({
        //   url: '../payment/payment'
        // })
      })
    } else {
      wx.showToast({
        title: '小主收货地址不能为空哦~',
        icon: 'none',
        duration: 2000
      })
    }
  },


  handgm(options) {
    that = this
    if (options.id == 0) {
      that.setData({
        sid: options.sid,
        amount: options.amount
      })
    } else {
      that.setData({
        shoppingid: options.ddd,

      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    that = this;
    that.setData({
      id: options.id,
      OrderNo: options.ddd
    })
    that.handgm(options)
    that.loadmore()
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
    this.site()

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