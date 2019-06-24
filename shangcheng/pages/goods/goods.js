// pages/goods/goods.js
var app = getApp();
const WxParse = require('../../wxParse/wxParse.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off:false,
    sid:"",
    list:[],
    length: '',
    current:1,
    count:1,
    shoplist:[]
  },
  aaa:function(e){
    that.setData({ current: e.detail.current+=1})
   
  },


  // 加入购物车
  handCart:function(){
    that = this
    app.postData("GetShoppingData.ashx",{
      action:"AddShopping",
      goodsid: that.data.sid,
      userid: app.globalData.userid,
      shoppingnum:1
    }).then(res =>{
      console.log(res);
      if (res.Result==1){
      wx.showToast({
        title: '加入购物车成功',
        icon:'none',
        duration:2000
      })
      }else{
        wx.showToast({
          title: '加入购物车失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 立即购买
  handgm(){
   wx.navigateTo({
     url: '/pages/order/order?sid=' + that.data.sid+"&id="+"0",
   })
  },
  handTxdd:function(){
    wx:wx.navigateTo({
      url: '../order/order'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options) 
    that = this
    that.setData({
      sid: options.id
    })
    app.postData("GetIndexData.ashx", {
      action: "GetDetails",
      goodsid: that.data.sid
    }).then(res => {
      that.setData({
        list: res.Result,
        urlLength:res.Result.piclist.length
      })
      let article = that.data.list.desc;
      WxParse.wxParse('article', 'html', article, that, 5);
      that.setData({
        length: that.data.list.piclist.length
      })
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