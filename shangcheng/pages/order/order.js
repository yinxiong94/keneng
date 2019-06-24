// pages/order/order.js
const app=getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingid:"",
    detailsdlist:[],
    sid:"",
    sum:0, //商品总金额
    off:0
  },

  handDizhi:function(){
    wx:wx.navigateTo({
      url: '../administration/administration'
    })
  },

  handZhifu:function(){
    wx: wx.navigateTo({
      url: '../payment/payment'
    })
  },

  // 购物车
    loadmore() {
      that = this
      if (that.data.shoppingid !== undefined){
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
      that.handjj()
    },
  
  

  // 立即购买
  handgm(){
    that = this
    app.postData("GetShoppingData.ashx",{
      action:"Submit",
      userid: app.globalData.userid,
      goodsid:that.data.sid
    }).then(res=>{
      that.setData({
        detailsdlist: res.Result
      })
    })
    that.handjj()
  },

  // 购物车金额计算
  handjj(){
    that = this
    // that.setData({
    //   sum: that.data.detailsdlist.detailsdlist.goodsprice * that.data.detailsdlist.detailsdlist.goodnum
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.setData({ shoppingid: options.ddd, sid:options.sid})
    that.loadmore()
    that.handgm()
    console.log(options);
    if (options.id.length == 0){
      that.setData({
        off: 0
      })
    }else{
      that.setData({
        off: 1
      })
      that.setData({
        coco: options
      })
    }
    // app.postData("GetShoppingData.ashx", {
    //   action: "AddAress",
    //   addressid: that.data.addressid
    // }).then(res => {
    //   console.log(res)
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
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