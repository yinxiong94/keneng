// pages/binding/binding.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off: 0,
    list:[]
  },
  handYhka:function(){
    wx.navigateTo({
      url: '../Mybinding/Mybinding',
    })
  },
  handReplacement:function(){
    that = this;
    wx.navigateTo({
      url: '../Mybinding/Mybinding?cardid=' + that.data.list.BankCardId + '&send=1' + '&cardname=' + that.data.list.BankCardName + '&cardno=' + that.data.list.BankCardNo,
    })
  },
  handObtain:function(){
    that = this;
    app.postData("GetUserData.ashx", {
      action: "GetUserCard",
      userid: app.globalData.userid
    }).then(res => {
      if (res.BankCardId == 'undefined'){
        that.setData({
          off: 0
        })
      }else{
        that.setData({
          off: 1,
          list: res.Result
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
    that = this;
    that.handObtain();
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