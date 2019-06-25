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
    off: 0,
    OrderId: "",
    coco: []
  },

  handDizhi: function() {
    wx.navigateTo({
      url: '../administration/administration'
    })
  },


  handCache: function() {
    wx.getStorage({
      key: 'item',
      success(res) {
        that.setData({
          detailsdlist: res.data
        })
        that.data.detailsdlist.detailsdlist.forEach(item => {
          let goodsprice = item.goodsprice
          let goodsnum = item.goodsnum
          let sum = goodsprice * goodsnum
          that.setData({
            sum: sum
          })
        })
      }
    })
    console.log(that.data.detailsdlist);
  },
  handZhifu: function() {
    that = this;
    console.log(that.data.detailsdlist);
    // let OrderId = that.data.detailsdlist.OrderId;
    // let username = that.data.coco.username;
    // let usertel = that.data.coco.usertel;
    // let address = that.data.coco.province + that.data.coco.city + that.data.coco.region + that.data.coco.useraddress;
    // app.postData("GetShoppingData.ashx", {
    //   action: "Pay",
    //   orderid: OrderId,
    //   username: username,
    //   usertel: usertel,
    //   address: address
    // }).then(res => {
    //   console.log(res);
    //   // if (res == '1') {
    //   //   wx: wx.navigateTo({
    //   //     url: '../payment/payment'
    //   //   })
    //   // }
    // })
  },



  loadmore() {
    that = this
    if (that.data.id == "0") {
      app.postData("GetShoppingData.ashx", {
        action: "Submit",
        userid: app.globalData.userid,
        goodsid: that.data.sid
      }).then(res => {
        wx.setStorageSync({
          key: "item",
          data: res.Result
        })
        that.setData({
          detailsdlist: res.Result,
          OrderId: res.Result.OrderId
        });
        console.log(1);
        console.log(that.data.detailsdlist);
        that.data.detailsdlist.detailsdlist.forEach(item => {
          let goodsprice = item.goodsprice
          let goodsnum = item.goodsnum
          let sum = goodsprice * goodsnum
          that.setData({
            sum: sum
          })
        })
      })
      console.log('loadmore');
      console.log(that.data.detailsdlist);
    } else {
      app.postData("GetShoppingData.ashx", {
        action: "Submit",
        userid: app.globalData.userid,
        shopppingid: that.data.shoppingid
      }).then(res => {
        // wx.setStorageSync({
        //   key: "item",
        //   data: res.Result
        // })
        that.setData({
          detailsdlist: res.Result
        })
      })
    }
  },




  handgm(options) {
    that = this;
    if (options.id == 0) {
      that.setData({
        sid: options.sid
      })
    } else {
      that.setData({
        shoppingid: options.ddd
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      id: options.id
    })
    that.handgm(options);
    if (options.id == 0) {
      that.loadmore();
      that.handCache();
      // console.log(1);
      // console.log(that.data.detailsdlist);
      that.setData({
        off: 0
      })
    } else{
      that.setData({
        off: 1,
        coco: options
      })
      that.handCache();
    }
    // app.postData("GetShoppingData.ashx", {
    //   action: "AddAress",
    //   addressid: that.data.addressid
    // }).then(res => {
    //   console.log(res)
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {

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