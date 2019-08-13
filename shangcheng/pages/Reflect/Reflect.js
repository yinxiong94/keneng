// pages/Reflect/Reflect.js
var that;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    value:0
  },
  on: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'Wmoney',
      success(res) {
        console.log(res.data)
      that.setData({
        Wmoney: res.data
      })
      }
    })
  },
  /**
   * 获取输入框的值
   */
  hopminput(e){
    that = this
    that.setData({
      value: e.detail.value
    })
  },
  /**
   * 确认提现
   */
  withdrawal(){
    that = this
    if (that.data.value==""){
      wx.showToast({
        title: '提现金额不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.value > that.data.Wmoney) {
      wx.showToast({
        title: '大于可提现金额',
        icon: 'none',
        duration: 2000
      })
      return
    }
    app.postData("GetAgentInfo.ashx", {
      action: "WithdrawAdd",
      userId: app.globalData.userid,
      money: that.data.value
    }).then(res => {
        wx.showToast({
          title: res.Msg,
          icon: 'none',
          duration: 2000
        })
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