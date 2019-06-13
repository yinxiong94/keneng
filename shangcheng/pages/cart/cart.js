// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    delBtnWidth: 130,
    img: "/pages/img/zheng.png",
    off:false,

  },
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      })
    }
  },
  Choice: function() {
    if (this.data.off) {
      this.data.off = false;
      this.setData({
        img: "/pages/img/zheng.png"
      })
    } else {
      this.data.off = true;
      this.setData({
        img: "/pages/img/quan1.png"
      })
    }
  },
  jian:function(){
    console.log("减少");
  },
  jia: function () {
    console.log("增加");
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