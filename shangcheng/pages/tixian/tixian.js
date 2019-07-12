// pages/tixian/tixian.js
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,
    inputVal:0
  },
  txjl:function(){
    wx.navigateTo({
      url: '/pages/cash/cash',
    })
  },
  // 获取key中的数据
  issj(){
    that = this
    wx.getStorage({
      key: 'Wmoney',
      success: function(res) {
        that.setData({
          sum:res.data
        })
      },
    })
  },

  inputVal(e){
    that = this
    that.setData({
      inputVal: e.detail.value
    })
  },

  // 全部提现
  handbtx(){
    that = this
    // that.inputVal()
    that.setData({
      inputVal:that.data.sum
    })
    console.log(1)
  },

  // 确认提现
  withdraw(){
    that = this
    if (that.data.sum>=100 && that.data.inputVal>=100){
      app.postData("GetAgentInfo.ashx",{
        action:'WithdrawAdd',
        userId: app.globalData.userid,
        money:that.data.sum
      }).then(res=>{
        wx.showToast({
          title: '提现成功',
          icon: 'none',
          duration: 2000,
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/cash/cash',
          })
        }, 1000)
      })
      
    }else{
      wx.showToast({
        title: '可提现金额不能少于100',
        icon: 'none',
        duration: 2000,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this
      that.issj()
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