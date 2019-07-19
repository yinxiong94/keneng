// pages/fill/fill.js
const app = getApp();
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    multiIndex: [0, 0, 0],
    region: ['广东省', '广州市', '海珠区'],
    // customItem: '全部'
  },

  // 收货人
  bindName(e) {
    this.setData({
      name: e.detail.value
    })
    
  },

  // 手机号码
  bindTel(e) {
    this.setData({
      tel: e.detail.value
    })
   

  },

  
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
   
  },
  



  handBtn: function() {
    that = this;
    if (that.data.name == undefined) {
      wx.showToast({
        title: '小主姓名不能为空哦~',
        icon: "none",
        duration: 2000
      })
      return
    }
    if (!(/^1[3-9]\d{9}$/).test(that.data.tel)) {
      wx.showToast({
        title: '小主手机号码不正确哦~',
        icon: "none",
        duration: 2000
      })
      return
    }
    if (that.data.region == undefined) {
      wx.showToast({
        title: '小主所在不能为空哦~',
        icon: "none",
        duration: 2000
      })
      return
    }
    if (that.data.address == undefined) {
      wx.showToast({
        title: '小主收货地址不能为空哦~',
        icon: "none",
        duration: 2000
      })
      return
    }
    // console.log(that.data.name )
    // console.log(that.data.id);
    if (that.data.id == 'undefined') {
      app.postData("GetShoppingData.ashx", {
        action: "AddAress",
        userid: app.globalData.userid,
        username: that.data.name,
        usertel: that.data.tel,
        address: that.data.address,
        province: that.data.region[0],
        city: that.data.region[1],
        region: that.data.region[2],
        isdefault: 0
      }).then(res => {
        console.log(res);
      })
    }else{
      if (that.data.name == undefined) {
        wx.showToast({
          title: '小主姓名不能为空哦~',
          icon: "none",
          duration: 2000
        })
        return
      }
      if (!(/^1[3-9]\d{9}$/).test(that.data.tel)) {
        wx.showToast({
          title: '小主手机号码不正确哦~',
          icon: "none",
          duration: 2000
        })
        return
      }
      if (that.data.region == undefined) {
        wx.showToast({
          title: '小主所在不能为空哦~',
          icon: "none",
          duration: 2000
        })
        return
      }
      if (that.data.address == undefined) {
        wx.showToast({
          title: '小主收货地址不能为空哦~',
          icon: "none",
          duration: 2000
        })
        return
      }
      app.postData("GetShoppingData.ashx", {
        action: "AddAress",
        userid: app.globalData.userid,
        addressid: that.data.id,
        username: that.data.name,
        usertel: that.data.tel,
        address: that.data.address,
        province: that.data.region[0],
        city: that.data.region[1],
        region: that.data.region[2],
        isdefault: 0
      }).then(res => {
        console.log(res);
      })
    }

    wx.navigateBack({
      delta: 1
    })
  },


  bindInput(e) {
    this.setData({
      address: e.detail.value
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    let item = [];
    console.log(options);
    if (options.id === 'undefined') {
      return
    }else{
      console.log(1);
      item.push(options.province);
      item.push(options.city);
      item.push(options.region);
      that.setData({
        region: item,
        name: options.username,
        tel: options.usertel,
        coco: options.useraddress,
        address: options.address,
        id: options.id
      })
    }
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