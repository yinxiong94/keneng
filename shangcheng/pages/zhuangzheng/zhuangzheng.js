// pages/zhuangzheng/zhuangzheng.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handBecome:function(){
    that = this;
    app.postData("President.ashx", {
      action: "BecomeApply",
      userId: app.globalData.userid
    }).then(res => {
      if (res.Msg == '转正申请成功'){
        wx.showToast({
          title: '转正申请成功',
          duration: 2000,
          icon: "none"
        })
      }else{
        wx.showToast({
          title: res.Msg,
          duration: 2000,
          icon: "none"
        })
      }
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