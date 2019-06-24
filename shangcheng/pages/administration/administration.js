// pages/administration/administration.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    list: []
  },
  handResult: function() {
    wx.navigateTo({
      url: '../fille/fille?id=' + 'undefined'
    })
  },
  handAdd:function(e){
    wx.navigateTo({
      url: '../fille/fille?id=' + 'undefined'
    })
  },
  edit: function(e) {
    let addressid = that.data.list[e.currentTarget.dataset.edit].addressid;
    let city = that.data.list[e.currentTarget.dataset.edit].city;
    let username = that.data.list[e.currentTarget.dataset.edit].username;
    let usertel = that.data.list[e.currentTarget.dataset.edit].usertel;
    let region = that.data.list[e.currentTarget.dataset.edit].region;
    let useraddress = that.data.list[e.currentTarget.dataset.edit].useraddress;
    let province = that.data.list[e.currentTarget.dataset.edit].province;
    wx.navigateTo({
      url: '../fille/fille?id=' + addressid + '&city=' + city + '&username=' + username + '&usertel=' + usertel + '&region=' + region + '&useraddress=' + useraddress + '&province=' + province,
    })
  },
  // 删除
  del: function(e) {
    that = this;
    app.postData("GetShoppingData.ashx", {
      action: "DelAddress",
      addressid: that.data.list[e.currentTarget.dataset.del].addressid
    }).then(res => {
      // console.log(res);
    })
    let s = that.data.list;
    s.splice(e.currentTarget.dataset.del, 1);
    that.setData({
      list: s
    })
    if(that.data.list.length == '0'){
      that.setData({
        num: 0
      })
    }
    // console.log(that.data.list);
  },
  handDefault: function(e) {
    that = this;
    let addressid = that.data.list[e.currentTarget.dataset.index].addressid;
    let city = that.data.list[e.currentTarget.dataset.index].city;
    let username = that.data.list[e.currentTarget.dataset.index].username;
    let usertel = that.data.list[e.currentTarget.dataset.index].usertel;
    let region = that.data.list[e.currentTarget.dataset.index].region;
    let useraddress = that.data.list[e.currentTarget.dataset.index].useraddress;
    let province = that.data.list[e.currentTarget.dataset.index].province;
    if(that.data.send == '0'){
      return
    }
    wx.navigateTo({
      url: '../order/order?id=' + addressid + '&city=' + city + '&username=' + username + '&usertel=' + usertel + '&region=' + region + '&useraddress=' + useraddress + '&province=' + province,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.send);
    that = this;
    that.setData({
      send: options.send
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    that = this;
    app.postData("GetShoppingData.ashx", {
      action: "GetAddressList",
      userid: app.globalData.userid
    }).then(res => {
      this.setData({
        num: res.Result.length
      })
      this.setData({
        list: res.Result
      })
    })
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