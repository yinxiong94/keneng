// pages/basics/basics.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    show:false,
    key:""
  },
  
  /**
   * 获取社区基本信息
   */
  ismessage(){
    that = this
    app.postData("GetAgentInfo.ashx",{
      action:"CommunityInfo",
      userId: app.globalData.userid,
      key:that.data.key
    }).then(res=>{
      console.log(res)
      that.setData({
        list: res.Result
      })
    })
  },
  shuru:function(e){
    this.setData({ key: e.detail.value})
    },
  control(){
    that = this
    that.setData({
      show:that.data.show == false?true:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.ismessage()
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