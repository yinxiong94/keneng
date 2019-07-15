// pages/personal/personal.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[]
  },
  handJump1:function(){
    wx.redirectTo({
      url: '/pages/Dldindex/Dldindex',
    })
  },
  handJump2: function () {
    wx.redirectTo({
      url: '/pages/member/member',
    })
  },
  handJump3: function () {
    wx.redirectTo({
      url: '../personal/personal',
    })
  },
  toyj:function(){
    wx.navigateTo({
      url: '/pages/commission/commission',
    })
  },
  totx:function(){
    wx.navigateTo({
      url: '/pages/commission/commission',
    })
  },
  szgl:function(){
    wx.navigateTo({
      url: '/pages/Dldadministration/Dldadministration',
    })
  },
  shbb:function(){
    wx.navigateTo({
      url: '/pages/mymember/mymember',
    })
  },
  sqxx:function(){
    wx.navigateTo({
      url: '/pages/basics/basics',
    })
  },
  tgt:function(){
    wx.navigateTo({
      url: '/pages/extension/extension',
    })
  },
  wdtj:function(){
    wx.navigateTo({
      url: '/pages/code/code',
    })
  },
  spxs:function(){
    wx.navigateTo({
      url: '/pages/spxsdd/spxsdd',
    })
  },


  // 代理信息
  isinfo(){
    that = this
    app.postData("GetAgentInfo.ashx",{
      action:"GetAgentInfo",
      userId: app.globalData.userid
    }).then(res=>{
      that.setData({
        message: res.Result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.isinfo()
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