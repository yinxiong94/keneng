// pages/ddxq/ddxq.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off: false,
    orderStatus: 0,
    liste: [],
    images: [],
    ContentValue: "",
    showUpload: true
  },
  payment: function() {
    console.log("付款按钮被点击了")
  },
  handCode: function() {
    that = this;
    console.log(that.data.liste.OrderStatus);
    if (that.data.liste.OrderStatus == '待付款') {
      that.setData({
        orderStatus: 0
      })
    } else if (that.data.liste.OrderStatus == '待收货') {
      that.setData({
        orderStatus: 1
      })
    } else if (that.data.liste.OrderStatus == '已收货') {
      that.setData({
        orderStatus: 2
      })
    } else if (that.data.liste.OrderStatus == '待退款') {
      that.setData({
        orderStatus: 3
      })
    } else if (that.data.liste.OrderStatus == '已退货') {
      that.setData({
        orderStatus: 4
      })
    }
    console.log(that.data.orderStatus);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    console.log(1);
    app.postData("GetOrderData.ashx", {
      action: "GetOrderDetails",
      orderid: options.id
    }).then(res => {
      that.setData({
        liste: res.Result
      })
      that.handCode();
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