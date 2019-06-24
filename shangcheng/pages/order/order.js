// pages/order/order.js
const app = getApp();
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
    id:"0",
    goodsprice:[]
  },

  handDizhi: function () {
    wx: wx.navigateTo({
      url: '../administration/administration'
    })
  },

  handZhifu: function () {
    wx: wx.navigateTo({
      url: '../payment/payment'
    })
  },

  // 购物车
  loadmore() {
    that = this
      if(that.data.id == "0"){
        console.log("goodsid")
        app.postData("GetShoppingData.ashx", {
          action: "Submit",
          userid: app.globalData.userid,
          goodsid: that.data.sid
        }).then(res => {
        
          that.setData({
            detailsdlist: res.Result
          })
          // console.log(that.data.detailsdlist.detailsdlist)
          that.data.detailsdlist.detailsdlist.forEach(item=>{
            // console.log(item)
            let goodsprice = item.goodsprice
            let goodsnum = item.goodsnum
            let sum = goodsprice * goodsnum
            console.log(sum)
            that.setData({
              sum:sum
            })
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
            
           var list = that.data.detailsdlist.detailsdlist
          //  console.log(list)
            list.forEach(item=>{
              console.log(item.goodsprice)
              console.log(item.goodsnum + item.goodsnum)
              // var  sum = item.goodsprice * item.goodsnum
              // that.setData({
              //   sum:sum ,
              //   goodsprice: item.goodsprice,
              // })
            })
            // console.log(that.data.goodsprice)
          })
      }
  
  },

  handgm(options){
    that = this
    if(options.id == 0){
        that.setData({
          sid: options.sid
        })
    }else{
      that.setData({
        shoppingid:options.ddd
      })
    }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({ id:options.id })
    that.handgm(options)
    that.loadmore()
    // console.log(options);
    if (options.id.length == 0) {
      that.setData({
        off: 0
      })
    } else {
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