// pages/order/order.js
const app=getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingid:"",
    detailsdlist:{},
    sid:"",
    sum:0, //商品总金额
    id:"0"
  },

  handDizhi:function(){
    wx:wx.navigateTo({
      url: '../address/address'
    })
  },

  handZhifu:function(){
    wx: wx.navigateTo({
      url: '../payment/payment'
    })
  },

  // 判断是在购物车提交还是立即提交
  loadmemo(){   
    that = this
      if(that.data.id == "0"){
        console.log("goodsid")
        app.postData("GetShoppingData.ashx", {
          action: "Submit",
          userid: app.globalData.userid,
          goodsid: that.data.sid
        }).then(res => {
          // console.log(res.Result.detailsdlist)
          that.setData({
            detailsdlist: res.Result
          })
        })
       
      }else{
        console.log("shopppingid")
          app.postData("GetShoppingData.ashx", {
            action: "Submit",
            userid: app.globalData.userid,
            shopppingid: that.data.shoppingid
          }).then(res => {
            that.setData({
              detailsdlist: res.Result
            })
          })
      }
  },

  loadmore(options) {
    if (that.data.id == 0) {
      that.setData({
        sid: options.sid,
      })
    } else {
      that.setData({
        shoppingid: options.ddd,
      })
    }
         
},
  

  handgm(){
    console.log(this.data.detailsdlist)
    
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.setData({
      id: options.id,
    })
    that.loadmore(options)
    // that.handgm()
    that.loadmemo()
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
    that.handgm()
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