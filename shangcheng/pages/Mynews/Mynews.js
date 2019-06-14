// pages/Mynews/Mynews.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },
  handJump:function(){
    wx.navigateTo({
      url: '../dingdan/dingdan',
    })
  },
  handTel: function () {
    wx.navigateTo({
      url: '../Myphone/Myphone',
    })
  },
  handTgm:function(){
    wx.navigateTo({
      url: '../spread/spread',
    })
  },
  handWdqb:function(){
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  handTsjy: function () {
    wx.navigateTo({
      url: '../Complaint/Complaint',
    })
  },
  handYhka: function () {
    wx.navigateTo({
      url: '../binding/binding',
    })
  },
  handWdtg: function () {
    wx.navigateTo({
      url: '../extension/extension',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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