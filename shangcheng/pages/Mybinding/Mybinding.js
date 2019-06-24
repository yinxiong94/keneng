// pages/Mybinding/Mybinding.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iphoneValue: '', //手机号码
    count: 60, //倒计时时间
    code: '获取验证码',
  },
  handYh:function(){
    console.log('选择银行');
  },
  // 获取用户输入的手机号码
  Input_iphone(e) {
    that = this
    that.setData({
      iphoneValue: e.detail.value
    })
  },

  // 点击获取验证码
  textCode() {
    that = this
    if (!(/^1[3-9]\d{9}$/).test(that.data.iphoneValue)) {
      wx.showToast({
        title: '手机号码不正确',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      wx.showToast({
        title: '验证码已发送',
        icon: 'none',
        duration: 2000
      })
    }

    if (that.data.code !== '获取验证码') {
      wx.showToast({
        title: '已发送验证码',
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
        // 终止定时器
        clearInterval(countDown)
        return
      }
      that.data.count--
        that.setData({
          count: that.data.count,
          code: that.data.count < 10 ? `请等待0${that.data.count}s` : `请等待${that.data.count}s`
        })
    }, 1000)
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