// pages/commission/commission.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cuttVal:1,
    iSmaoy:[],
    sum:0
  },
  totx:function(){
    wx.navigateTo({
      url: '/pages/tixian/tixian',
    })
  },

  cutt(e){
    that = this
    that.setData({
      cuttVal: e.currentTarget.dataset.cutt
    })
  },

  // 分销明细
  isdistribution(){
    that = this
    app.postData("GetAgentInfo.ashx",{
      action:"GetDivideIntoList",
      userId: app.globalData.userid
    }).then(res=>{
      var sum = 0
      res.Result.forEach(item => {
        sum += item.Wmoney
      })
      wx.setStorage({
        key: 'Wmoney',
        data: sum,
      })
      that.setData({
        iSmaoy: res.Result,
        sum: sum
      })
     
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
    that = this
    that.isdistribution()
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