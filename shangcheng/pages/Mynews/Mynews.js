// pages/Mynews/Mynews.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '0',
    send: 0,
    list:{},
    Result:[]
  },
  handDld:function(){
    wx.navigateTo({
      url: '/pages/Dldindex/Dldindex',
    })
  },
  handSzd: function () {
    wx.navigateTo({
      url: '/pages/szdpersonal/szdpersonal',
    })
  },
  handVip: function () {
    wx.navigateTo({
      url: '/pages/huika/huika?send=0',
    })
  },
  handSend: function () {
    wx.navigateTo({
      url: '/pages/administration/administration?send=0',
    })
  },
  handDeliverList:function(){
    wx.navigateTo({
      url: '../qqps/qqps',
    })
  },
  userlogin() {
    app.postData("GetUserData.ashx", {
      action: "GetUserInfo",
      userid: app.globalData.userid
    }).then(res => {
      that.setData({
        list:res.Result,
        UserImg: res.Result.UserImg,
        NickName: res.Result.NickName
      })
      wx.setStorage({
        key: 'UserImg',
        data: res.Result.UserImg,
      })
      wx.setStorage({
        key: 'NickName',
        data: res.Result.NickName,
      })
      wx.setStorage({
        key: 'UserTel',
        data: res.Result.UserTel,
      })
    })
  },

  // 跳转
  handOut: function () {
    wx.clearStorageSync();
    wx.showToast({
      title: '退出成功',
      duration: 2000,
      success(res) {
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 2000)
      }
    })
  },
  handTarget: function (e) {
    this.setData({
      id: e.currentTarget.dataset.current
    })
    wx.navigateTo({
      url: '../dingdan/dingdan?id=' + this.data.id,
    })
  },
  handJump: function () {
    wx.navigateTo({
      url: '../dingdan/dingdan?id=' + this.data.id + '&off=false',
    })
  },
  handTel: function () {
    if (wx.getStorageSync('UserTel')){
      wx.navigateTo({
        url: '../Myphone/Myphone',
      })
    }else{
      wx.navigateTo({
        url: '../usedMyphone/usedMyphone',
      })
    }
  },
  handTgm: function () {
    wx.navigateTo({
      url: '../spread/spread',
    })
  },
  handWdqb: function () {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  handTsjy: function () {
    wx.navigateTo({
      url: '../Complaint/Complaint',
    })
  },
  handYhka: function () {
    wx.navigateTo({
      url: '../binding/binding',
    })
  },

  handWdtg: function () {
    wx.navigateTo({
      url: '../extension/extension',
    })
  },
  initialize() {
    that = this
    app.postData("GetGoodsData.ashx", {
      action: 'GetCard',
      userid: app.globalData.userid
    }).then(res => {
      that.setData({
        Result: res.Result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    
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
    that.userlogin();
    that.initialize()
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