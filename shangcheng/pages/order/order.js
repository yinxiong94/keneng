// pages/order/order.js
const app=getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingid:"",
    detailsdlist:[]
  },
  handDizhi:function(){
    wx:wx.navigateTo({
      url: '../address/address'
    })
  },
  handZhifu:function(){
    wx: wx.navigateTo({
      url: '../payment/payment'
    })
  },
  loadmore:function(){
    that = this
    app.postData("GetShoppingData.ashx",{
      action:"Submit",
      userid: app.globalData.userid,
      shopppingid: that.data.shoppingid
    }).then(res=>{
      console.log(res)
      that.setData({
        detailsdlist: res.Result
        
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that=this;
    that.setData({ shoppingid:options.ddd})
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