// pages/basics/basics.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },
  
  /**
   * 获取社区基本信息
   */
  ismessage(key){
    that = this
    app.postData("GetAgentInfo.ashx",{
      action:"CommunityInfo",
      userId: app.globalData.userid,
      key: key == undefined?"":key
    }).then(res=>{
      console.log(res)
      that.setData({
        list: res.Result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.ismessage()
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