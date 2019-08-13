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
    list: []
  },
  payment: function (e) {
    that = this;
    that = this;
    let numid = e.currentTarget.dataset.numid;
    console.log(numid)
    app.postData("GetOrderData.ashx", {
      action: "Receive",
      orderid: numid
    }).then(res => {
      console.log(res)
      if (res.Result == 1) {
        wx.showToast({
          title: "收货成功",
          icon: "none",
          duration: 2000,
          success: res => {
            // that.beg()
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },2000)          
          }
        });
      } else {
        wx.showToast({
          title: "收货失败",
          icon: "none",
          duration: 2000
        });
      }
    })
  },
  payment1: function (e) {
    var OrderNo = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '/pages/order/order?ddd=' + OrderNo + '&id=' + 2,
    })
  },
  handPinjia: function (e) {
    let index = e.currentTarget.dataset.num;
    let sid = that.data.list.OrderId;
    wx.navigateTo({
      url: '../publish/publish?ccc=' + sid,
    })
  },
  handCode: function () {
    that = this;
    if (that.data.list.OrderStatus == '待付款') {
      that.setData({
        orderStatus: 0
      })
    } else if (that.data.list.OrderStatus == '待收货') {
      that.setData({
        orderStatus: 1
      })
    } else if (that.data.list.OrderStatus == '已收货') {
      that.setData({
        orderStatus: 2
      })
    } else if (that.data.list.OrderStatus == '待退款') {
      that.setData({
        orderStatus: 3
      })
    } else if (that.data.list.OrderStatus == '已退货') {
      that.setData({
        orderStatus: 4
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    app.postData("GetOrderData.ashx", {
      action: "GetOrderDetails",
      orderid: options.id
    }).then(res => {
      that.setData({
        list: res.Result
      })
      that.handCode();
    })
  },


  // 取消订单
  abolish() {
    that = this
    var OrderId = that.data.list.OrderId;
    wx.showModal({
      title: '取消订单',
      content: '您确认取消订单吗？',
      success(res) {
        if (res.confirm) {
          app.postData("GetOrderData.ashx", {
            action: "Cancel",
            orderid: OrderId
          }).then(res => {
            if (res.Result > 0) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 拨打电话
  Tel(){
    that = this
    wx.makePhoneCall({
      phoneNumber:that.data.list.Tel
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