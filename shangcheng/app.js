//app.js
App({
  // onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  postData: function (url, data) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: getApp().globalData.http + url,
        data: data,
        method: "Get",
        header: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        success: function (res) {
          resolve(res.data);
        },
        fail: function (res) {
          reject(res);
        },
      })
    });
  },

  
  getuser: function () {
    var data = new Object;
    data.action = 'GetUserInfo';
    data.userid = app.globalData.userid;
    app.postData('GetUserData.ashx', data).then(res => {
      app.globalData.userInfo = res.Result;
    })
  },
  globalData: {
    userInfo: null,
    http: "https://mfapi.hncoon.com/API/",
    userid: "",
    code: "",
    shoppingid:"",
    tel:"",
    address:""
  }
})