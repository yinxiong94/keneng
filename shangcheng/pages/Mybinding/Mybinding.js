// pages/Mybinding/Mybinding.js
const app = getApp();
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iphoneValue: "", //手机号码
    count: 60, //倒计时时间
    code: "获取验证码",
    cardno1: "请输入银行卡号",
    cardname1: "",
    cardid: 0,
    off: 0
  },

  //获取银行卡号
  handCard: function(e) {
    that = this;
    var cardno = e.detail.value;
    that.setData({
      cardno1: cardno
    });
  },
  //获取银行名称
  handYh: function(e) {
    that = this;
    var cardname = e.detail.value;
    that.setData({
      cardname1: cardname
    });
  },
  // 增加银行卡
  handAddYh: function() {
    that = this;
    if (
      /^([1-9]{1})(\d{15}|\d{18})$/.test(that.data.cardno1) &&
      /^[\u4E00-\u9FA5]{1,6}$/.test(that.data.cardname1)
    ) {
      wx.showToast({
        title: "提交成功",
        icon: "none",
        duration: 2000
      });
      if (that.data.off == 0) {
        app
          .postData("GetUserData.ashx?", {
            action: "AddBankCard",
            userid: app.globalData.userid,
            cardno: that.data.cardno,
            cardname: that.data.cardname
          })
          .then(res => {
            if (res.Result == 1) {
              wx.showToast({
                title: "绑定成功",
                icon: "none",
                duration: 2000
              });
            } else {
              wx.showToast({
                title: "绑定失败",
                icon: "none",
                duration: 2000
              });
            }
          });
      } else {
        that.handModify();
      }
    } else {
      wx.showToast({
        title: "银行卡号或银行名称填写错误不正确",
        icon: "none",
        duration: 2000
      });
      return;
    }

    if (that.data.off == 0) {
      app
        .postData("GetUserData.ashx?", {
          action: "AddBankCard",
          userid: app.globalData.userid,
          cardno: that.data.cardno1,
          cardname: that.data.cardname1
        })
        .then(res => {
          if (res.Result == 1) {
            wx.showToast({
              title: "绑定成功",
              icon: "none",
              duration: 2000
            });
          } else {
            wx.showToast({
              title: "绑定失败",
              icon: "none",
              duration: 2000
            });
          }
        });
    } else {
      that.handModify();
    }
  },

  // 修改银行卡
  handModify: function() {
    that = this;
    app
      .postData("GetUserData.ashx?", {
        action: "AddBankCard",
        userid: app.globalData.userid,
        cardno: that.data.cardno,
        cardname: that.data.cardname
      })
      .then(res => {
        if (res.Result == 1) {
          that.setData({
            cardname1: that.data.cardname,
            cardno1: that.data.cardno
          });
          wx.showToast({
            title: "修改成功",
            icon: "none",
            duration: 2000
          });
        } else {
          wx.showToast({
            title: "修改失败",
            icon: "none",
            duration: 2000
          });
        }
      });
  },

  // 获取用户输入的手机号码
  Input_iphone(e) {
    that = this;
    that.setData({
      iphoneValue: e.detail.value
    });
  },

  // 点击获取验证码
  textCode() {
    that = this;
    if (!/^1[3-9]\d{9}$/.test(that.data.iphoneValue)) {
      wx.showToast({
        title: "手机号码不正确",
        icon: "none",
        duration: 2000
      });
      return;
    } else {
      wx.showToast({
        title: "验证码已发送",
        icon: "none",
        duration: 2000
      });
    }

    if (that.data.code !== "获取验证码") {
      wx.showToast({
        title: "已发送验证码",
        icon: "none",
        duration: 2000
      });
      return;
    }

    const countDown = setInterval(() => {
      if (that.data.count <= 0) {
        that.setData({
          count: 60,
          code: "获取验证码"
        });
        // 终止定时器
        clearInterval(countDown);
        return;
      }
      that.data.count--;
      that.setData({
        count: that.data.count,
        code:
          that.data.count < 10
            ? `请等待0${that.data.count}s`
            : `请等待${that.data.count}s`
      });
    }, 1000);
    // 调用验证码接口
    app.postData("GetCode.ashx", {
      action: "GetAuth",
      Tel: that.data.iphoneValue
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    console.log(options);
    if (options.send == 1) {
      that.setData({
        off: 1,
        cardid: options.cardid,
        cardname1: options.cardname,
        cardno1: options.cardno
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    that = this;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
