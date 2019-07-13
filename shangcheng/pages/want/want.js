// pages/want/want.js
var that;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputval:"",
    machineId:"",
    address:"",
    toLIst:[],
    show:false,
    hide:false
  },
  // 跳转要货计划编辑页面
  toyh:function(){
    wx.navigateTo({
      url: '/pages/plan/plan',
    })
  },
  // 获取输入框的内容
  inputval(e){
    that = this
    that.setData({
      inputval: e.detail.value
    })
    that.tolist()
  },
  // 要货计划列表
  tolist(){
    that = this
    app.postData("GetAgentInfo.ashx",{
      action:'RequireGoodsList',
      userId: app.globalData.userid,
      key: that.data.inputval,
      machineId: that.data.machineId
    }).then(res=>{
      that.setData({
        toLIst: res.Result
      })
      if (that.data.toLIst.length == 0){
        that.setData({
          show:false,
          hide:true
        })
      }else{
        that.setData({
          show:true,
          hide:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    
    
    // that.tolist()
    that.setData({
      machineId: options.machineid,
      address: options.address
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
    that.tolist()
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