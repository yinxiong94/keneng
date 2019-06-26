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
    // 修改为默认地址
    app.postData("GetShoppingData.ashx", {
      action: "UpdateDefault",
      addressid: that.data.list[e.currentTarget.dataset.index].addressid,
      userid: app.globalData.userid
    }).then(res => {
      console.log(res)
    })
    that.scrl()
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      addressid : that.data.list[e.currentTarget.dataset.index].addressid,
      city : that.data.list[e.currentTarget.dataset.index].city,
      username : that.data.list[e.currentTarget.dataset.index].username,
      usertel : that.data.list[e.currentTarget.dataset.index].usertel,
      region : that.data.list[e.currentTarget.dataset.index].region,
      useraddress : that.data.list[e.currentTarget.dataset.index].useraddress,
      province : that.data.list[e.currentTarget.dataset.index].province
    });
    wx.navigateBack({
      delta: 1
    })
    

  },

  // 获取地址
  scrl(){
    that = this;
    app.postData("GetShoppingData.ashx", {
      action: "GetAddressList",
      userid: app.globalData.userid
    }).then(res => {
      console.log(res.Result)
      that.setData({
        list: res.Result,
        num: res.Result.length
      })

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      send: options.send
    })
    that.scrl()
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
    this.scrl()
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