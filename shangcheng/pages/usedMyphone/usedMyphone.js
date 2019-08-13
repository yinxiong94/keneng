// pages/usedMyphone/usedMyphone.js
var  that;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iphoneValue: '', //手机号码
    count: 60,  //倒计时时间
    code: '获取验证码',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取用户输入的手机号码
  Input_iphone(e){
    let that = this;
    that.setData({
      iphoneValue: e.detail.value
    })
    
  },
  // 点击获取验证码
  textCode(){
    let that = this;
    // 验证手机号码
    if (!(/^1[3-9]\d{9}$/).test(that.data.iphoneValue)) {
      wx.showToast({
        title: "手机号码输入有误",
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      wx.showToast({
        title: "验证码已发送请查收",
        icon: 'none',
        duration: 2000
      })  
    }
    if (that.data.code !=="获取验证码"){
      wx.showToast({
        title: "已发送验证码",
        icon: 'none',
        duration: 2000
      })
      return
    }
    const countDown = setInterval(() => {
      if (that.data.count <= 0) {
        that.setData({
          count: 60,
          code: '获取验证码'
        })
        // 终止计时器
        clearInterval(countDown)
        return
      }
      that.data.count--
      that.setData({
        // count: that.data.count,
        code: that.data.count < 10 ? `请等待0${that.data.count}s` : `请等待${that.data.count}s`
      })
    }, 1000);

    // 调用验证码接口
    app.postData("GetCode.ashx", {
      action: 'GetAuth',
      Tel: that.data.iphoneValue
    })
  },

  // 获取用户输入的验证码
  verifycode(e) {
    that = this
    that.setData({
      Usercode: e.detail.value
    })
  },

  // 点击验证
  verify() {
    that = this
    app.postData("GetCode.ashx?", {
      action: 'ExistAuth',
      Tel: that.data.iphoneValue,
      Code: that.data.Usercode
    }).then(res => {
      if (res.Result == false) {
        wx.showToast({
          title: '验证码错误',
          icon: "none",
          duration: 2000
        })
        return
      } else {
        app.postData("GetUserData.ashx",{
          action:'SetUserInfo',
          userid: app.globalData.userid,
          usertel: that.data.iphoneValue
        }).then(res=>{
          if (res.Result){
            wx.showToast({
              title: '修改成功',
              icon: "none",
              duration: 2000,
              success:res=>{
                wx.switchTab({
                  url: '/pages/Mynews/Mynews',
                })
              }
            })
          }else{
            wx.showToast({
              title: '修改失败',
              icon: "none",
              duration: 2000
            })
          }
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