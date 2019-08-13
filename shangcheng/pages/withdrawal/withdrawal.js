// pages/withdrawal/withdrawal.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pirce: '',
    yu: ''
  },
  handGetPirce: function(e) {
    that = this;
    that.setData({
      pirce: e.detail.value
    })
  },
  // 提现
  handWithdrawal: function() {
    that = this;
    app.postData("GetAgentInfo.ashx", {
      action: "WithdrawAdd",
      userId: app.globalData.userid,
      money: that.data.pirce
    }).then(res => {
      if (res.Msg == '申请提现成功') {
        var oot = that.data.yu - that.data.pirce;
        that.setData({
          yu: oot
        })
        wx.showToast({
          title: '提现申请成功',
          duration: 2000,
          icon: "none"
        })
      } else {
        wx.showToast({
          title: res.Msg,
          duration:2000,
          icon:"none"
        })
      }
    })
  },
  handYu: function() {
    that = this;
    app.postData("GetAgentInfo.ashx", {
      action: "GetAgentInfo",
      userId: app.globalData.userid
    }).then(res => {
      that.setData({
        yu: res.Result.BalancePrice
      })
    })
  },
  // 社长提现记录列表
  handwithdrawal: function() {
    that = this;
    app.postData("GetAgentInfo.ashx", {
      action: "WithdrawList",
      userId: app.globalData.userid
    }).then(res => {
      that.setData({
        list: res.Result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    that = this;
    that.handwithdrawal();
    that.handYu();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})