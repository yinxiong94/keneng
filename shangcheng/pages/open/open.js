// pages/open/open.js
var that;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off:false,
    iphoneValue: '', //手机号码
    count: 60, //倒计时时间
    code: '获取验证码',
    IphoneValue:'',
    region: ['广东省', '广州市', '海珠区'],
  },
  
  // 地址三级联动 并且获取地址
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })

  },
  // 获取用户输入的姓名
  Input_name(e){
    this.setData({
      name: e.detail.value
    })
  },

  // 获取用户输入的详细地址
  Input_site(e) {
    this.setData({
      address: e.detail.value
    })
  },

 
  // 获取用户输入的手机号码
  Input_iphone(e) {
    that = this
    that.setData({
      iphoneValue: e.detail.value
    })
  },

  // 获取用户输入验证码
  Input_Iphone(e){
    that = this
    that.setData({
      IphoneValue: e.detail.value
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
        title: `验证码已发送`,
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

    app.postData("GetCode.ashx",{
      action:'GetAuth',
      Tel: that.data.iphoneValue
    })
  },

  // 开通会员卡
  handlVip(){
    wx.navigateTo({
      url: '../huika/huika'
    })
    that = this
    if (that.data.name == undefined){
      wx.showToast({
        title: '姓名不能为空哦',
        icon: "none",
        duration: 2000
      })
      return
    }
    if (!(/^1[3-9]\d{9}$/).test(that.data.iphoneValue)) {
      wx.showToast({
        title: '手机号码不正确',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.IphoneValue == undefined){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.region == undefined) {
      wx.showToast({
        title: '地区不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (that.data.address == undefined) {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    app.postData("GetGoodsData.ashx",{
      action:'BuyCard',
      userid: app.globalData.userid,
      username: that.data.name,
      mobile: that.data.iphoneValue,
      province: that.data.region[0],
      city: that.data.region[1],
      region: that.data.region[2],
      address: that.data.address,
      code: that.data.IphoneValue,
    }).then(res=>{
        console.log(res)
      if (res.Msg == "验证码错误"){
        wx.showToast({
          title: '验证码错误',
          icon: 'none',
          duration: 2000
        })
        return
      }else{
        // 发起微信支付
        wx.requestPayment({
          'timeStamp': res.timeStamp,
          'nonceStr': res.nonceStr,
          'package': res.package,
          'signType': res.signType,
          'paySign': res.paySign,
          'success': function (res) { 
            console.log(res.errMsg)
            if (res.errMsg == "requestPayment:ok"){
              wx.navigateTo({
                url: '../huika/huika'
              })
            }
          },
        })
      }

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