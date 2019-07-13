// pages/plan/plan.js
var that;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    machineIdval:"",
    createTimeval:"",
    cargoNumberval:""
  },
  /**
   * 机器编码
   */
  machineId(e){
    that = this
    that.setData({
      machineIdval: e.detail.value
    })
  },
  /**
   * 要货日期
   */
  createTime(e){
    that = this
    that.setData({
      createTimeval: e.detail.value
    })
  },
  /**
   * 要货数量
   */
  cargoNumber(e){
    that = this
    that.setData({
      cargoNumberval: e.detail.value
    })
  },
  /**
   * 提交
   */
  present(){
    that = this
    if (that.data.machineIdval.length<5){
      wx.showToast({
        title: '机器编码不对',
        icon:'none'
      })
      return
    }
    if (that.data.createTimeval.length<5){
      wx.showToast({
        title: '要货日期不对',
        icon: 'none'
      })
      return
    }
    if (that.data.cargoNumberval.length < 1) {
      wx.showToast({
        title: '要数量不对',
        icon: 'none'
      })
      return
    }
    app.postData("GetAgentInfo.ashx",{
      action:'RequireGoodsAdd',
      userId: app.globalData.userid,
      machineId: that.data.machineIdval,
      cargoNumber: that.data.cargoNumberval,
      createTime: that.data.createTimeval
    }).then(res=>{
      console.log(res)
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