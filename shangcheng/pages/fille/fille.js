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
    customItem: '全部'
  },
  bindName(e) {
    console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  bindTel(e) {
    console.log(e.detail.value);
    this.setData({
      tel: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  handBtn: function() {
    that = this;
    console.log(that.data.id);
    if (that.data.id.length <0) {
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
    wx.navigateTo({
      url: '../administration/administration'
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
    if (options.id.length > 0) {
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
    console.log(options);
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