// pages/sort/sort.js
var app = getApp();
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTapCurrent:0,  //默认选择第1个
    list:[],
    pagenum: 1, //初始页默认值为1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that =this
    app.postData("GetGoodsData.ashx", {
      action: "GetTypeList"
    }).then(res => {
      that.setData({
        list: res.Result
      })
    })
  },
  handDetails: function (e) {
    console.log(e.currentTarget.dataset.goodsid);
    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.goodsid
    })
    console.log(e)
  },

  menuTap(e){
    that = this
    that.setData({
      menuTapCurrent: e.currentTarget.dataset.current,
      typeid: e.currentTarget.dataset.typeid
    })
    if (that.data.menuTapCurrent != 0) {
      app.postData("GetGoodsData.ashx", {
        action: "GetGoodsList",
        typeid: that.data.typeid,
        Pid: that.data.pagenum,
        pagesize:4
      }).then(res => {
        console.log(res);
        that.setData({
         ListView:res.Result,
        })
      })
    } else {
      app.postData("GetGoodsData.ashx", {
        action: "GetGoodsList",
        Pid: that.data.pagenum,
        pagesize: 4
      }).then(res => {
        console.log(res);
        that.setData({
          ListView: res.Result
        })
      })
    }
  },

  refer() {
    that = this
    if (that.data.menuTapCurrent!=0){
      app.postData("GetGoodsData.ashx", {
        action: "GetGoodsList",
        typeid: that.data.typeid,
        Pid: that.data.pagenum,
        pagesize: 4
      }).then(res => {
        that.setData({
          ListView: res.Result
        })
      })
    }else{
      app.postData("GetGoodsData.ashx", {
        action: "GetGoodsList",
        Pid: that.data.pagenum,
        pagesize: 4
      }).then(res => {
        that.setData({
          ListView: res.Result
        })
      })
    }
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
    that = this
    that.refer()
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
    var that = this;
    // //获取当前页数并+1
    if(that.data.ListView.length%4 != 0){
      var pagenum = that.data.pagenum + 1;
    }
    that.setData({
      pagenum: pagenum, //更新当前页数
    })
    that.menuTap()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})