var app = getApp();
var that;
Page({

  /**
  * 页面的初始数据
  */
  data: {
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userData = e.detail;
      that.login();
      wx.switchTab({
        url: '/pages/mall/mall',
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  login: function () {
    var data = new Object;
    data.action = 'WxLogin';
    data.code = app.globalData.code;
    data.iv = app.globalData.userData.iv;
    data.encryptedData = app.globalData.userData.encryptedData;
    data.rawData = app.globalData.userData.rawData;
    data.signature = app.globalData.userData.signature;
    app.postData('GetUserData.ashx', data).then(res => {
      app.globalData.userid = res.Result;
      wx.setStorage({
        key: 'login',
        data: res
      })
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    that = this;
    wx.login({
      success: res => {
        app.globalData.code = res.code
        wx.getStorage({
          key: 'login',
          success: function(res) {
            wx.getUserInfo({
                success: res => {
                  app.globalData.userData = res;
                  that.login();
                  wx.navigateTo({
                    url: '/pages/mall/mall',
                  })
                }
              })
          },
        })
      }
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