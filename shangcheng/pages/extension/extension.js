// pages/extension/extension.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  handTdxj: function(e) {
    that = this;
    var coco = that.data.list;
    var index = e.currentTarget.dataset.index;
    var off = coco[index].off;
    coco[index].off = !off;
    that.setData({
      list:coco
    })
  },
  handExtension: function() {
    that = this;
    app.postData("President.ashx", {
      action: "ExtensionList",
      userId: app.globalData.userid
    }).then(res => {
      for (let i = 0; i < res.Result.length; i++) {
        res.Result[i].off = false;
      }
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
    that.handExtension();
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