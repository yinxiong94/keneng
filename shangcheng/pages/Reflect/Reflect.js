// pages/Reflect/Reflect.js
var that;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    currentTab:0,
    value:0
=======
    currentTab: 0,
    value: 0
>>>>>>> 895a1cba28dfb58122187a1685ec8dddeba08633
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
<<<<<<< HEAD
      that.setData({
        Wmoney: res.data
      })
=======
        that.setData({
          Wmoney: res.data
        })
>>>>>>> 895a1cba28dfb58122187a1685ec8dddeba08633
      }
    })
  },
  /**
   * 获取输入框的值
   */
<<<<<<< HEAD
  hopminput(e){
=======
  hopminput(e) {
>>>>>>> 895a1cba28dfb58122187a1685ec8dddeba08633
    that = this
    that.setData({
      value: e.detail.value
    })
  },
  /**
   * 确认提现
   */
<<<<<<< HEAD
  withdrawal(){
    that = this
    if (that.data.value==""){
      wx.showToast({
        title: '提现金额不能为空',
=======
  withdrawal() {
    that = this
    if (that.data.value == "") {
      wx.showToast({
        title: '金额不能为空',
>>>>>>> 895a1cba28dfb58122187a1685ec8dddeba08633
        icon: 'none',
        duration: 2000
      })
      return
    }
<<<<<<< HEAD
    
    app.postData("GetAgentInfo.ashx",{
      action:"WithdrawAdd",
      userId: app.globalData.userid,
        money: that.data.value
    }).then(res=>{
      if (res.Msg == "可提现金额不足"){
=======
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
>>>>>>> 895a1cba28dfb58122187a1685ec8dddeba08633
        wx.showToast({
          title: res.Msg,
          icon: 'none',
          duration: 2000
        })
<<<<<<< HEAD
      }else{
        wx.showToast({
          title: '提现成功',
          icon: 'none',
          duration: 2000
        })
      }
=======
>>>>>>> 895a1cba28dfb58122187a1685ec8dddeba08633
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