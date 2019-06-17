// pages/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off:false,
    menuTapCurrent: 0,  //默认选择第1个
  },
  // 选项卡
  menuTap:function(e){
    this.setData({
      menuTapCurrent: e.currentTarget.dataset.current
    })
  },
  handPinjia:function(){
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  handDdxqOne: function(){
    wx.navigateTo({
      url: '../ddxq1/ddxq1',
    })
  },
  handDdxqTow: function () {
    wx.navigateTo({
      url: '../ddxq2/ddxq2',
    })
  },
  payment:function(){
    wx.navigateTo({
      url: '../tuikuan/tuikuan',
    })
  },
  handCheng: function () {
    wx.navigateTo({
      url: '../After/After',
    })
  },
  cancel: function () {
    wx.navigateTo({
      url: '../logistics/logistics',
    })
  },  
  handwait:function(){
    wx.navigateTo({
      url: '../ddxq/ddxq',
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