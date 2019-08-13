// pages/wallet/wallet.js
var that;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    list:[]
  },
  handTx:function(){
    wx.navigateTo({
      url: '../Reflect/Reflect',
    })
  },

  /**
   * 佣金列表
   */
  detail(){
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
        list: res.Result,
        sum: sum
      })
      if (res.Result.length==0){
        that.setData({
          show:true,
          hide:false,
        })
      }else{
        that.setData({
          show: false,
          hide: true,
        })
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this
      that.detail()
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