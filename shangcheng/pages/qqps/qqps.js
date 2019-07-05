// pages/qqps/qqps.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    show: true
  },
  handReceiving: function(e) {
    that = this;
    let deliverid = e.currentTarget.dataset.index;
    let index = e.currentTarget.dataset.coco;
    let list = that.data.list
    app.postData("GetGoodsData.ashx", {
      action: "ReviceDeliver",
      deliverid: deliverid
    }).then(res => {
      if (res.Result == 1) {
        list[index].isShow = false;
        that.setData({
          list: list
        })
      }
    })
  },
  handDeliverList: function() {
    that = this;
    let coco = [];
    app.postData("GetGoodsData.ashx", {
      action: "DeliverList",
      userid: app.globalData.userid
    }).then(res => {
      console.log(res);
      res.Result.map(element => element['isShow'] = true);
      if (res.Result.length >= 1) {
        that.setData({
          list: res.Result,
          show: false
        })
      } else {
        that.setData({
          show: true
        })
      }
    })
  },
  handlPin: function() {
    wx.navigateTo({
      url: '../evaluation/evaluation'
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
    // that.handDeliverList();
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