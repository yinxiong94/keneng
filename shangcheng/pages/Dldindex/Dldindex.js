const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iSfacility:[]
  },

  // 设备列表
  iSfacility(){
    that = this
    app.postData("GetMachineInfo.ashx",{
      action:"GetMachineInfo",
      userId: app.globalData.userid
    }).then(res=>{
        that.setData({
          iSfacility: res.Result
        })
    })
  },




  handJump1: function () {
    wx.navigateTo({
      url: '/pages/Dldindex/Dldindex',
    })
  },
  handJump2: function () {
    wx.navigateTo({
      url: '/pages/member/member',
    })
  },
  handJump3: function () {
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.iSfacility()
  },

  // 跳转要货计划
  toyh:function(e){
    console.log(e.currentTarget.dataset.address)
    wx.navigateTo({
      url: '/pages/want/want?machineid=' + e.currentTarget.dataset.machineid + "&address=" + e.currentTarget.dataset.address,
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