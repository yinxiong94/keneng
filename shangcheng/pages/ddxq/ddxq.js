// pages/ddxq/ddxq.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off:false
  },
  payment:function(){
    console.log("付款按钮被点击了")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    app.postData("GetOrderData.ashx", {
      action: "GetOrderDetails",
      orderid:options.id
    }).then(res => {
      that.setData({
        list: res.Result
      })
      console.log(that.data.list);
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