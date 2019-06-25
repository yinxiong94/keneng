// pages/order/order.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingid: "",
    detailsdlist: [],
    sid: "",
    sum: 0, //商品总金额
    off: false,
    ffo:false
  },

  handDizhi: function() {
    wx: wx.navigateTo({
      url: '../administration/administration'
    })
  },


  // 获取地址
  site(){
    that = this
    app.postData("GetShoppingData.ashx",{
      action: "GetAddressList",
      userid: app.globalData.userid
    }).then(res=>{
      console.log(res)
      that.setData({
        coco:res.Result[0]
      })
      var site =  [];
      site.push(res.Result[0].city)
      site.push(res.Result[0].province)
      site.push(res.Result[0].region)
      site.push(res.Result[0].useraddress)
      site = site.join().replace(/,/g, "")
      console.log(site)
      that.setData({
        site: site
      })
      // console.log(this.data.coco.length)
      if (this.data.coco.length == 0){
        that.setData({
          off:true,
          ffo:false
        })
      }else{
        that.setData({
          off: false,
          ffo:true
        })
      }
    })
  },

  loadmore() {
    that = this
    if (that.data.id == "0") {
      console.log("goodsid")
      app.postData("GetShoppingData.ashx",{
          action: "Submit",
          userid: app.globalData.userid,
          goodsid: that.data.sid
        }).then(res => {
          that.setData({
            detailsdlist: res.Result
          })
          that.data.detailsdlist.detailsdlist.forEach(item => {
            let goodsprice = item.goodsprice
            let goodsnum = item.goodsnum
            let sum = goodsprice * goodsnum
            console.log(sum)
            that.setData({
              sum: sum
            })
          })
        })

    } else {
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


  // 提交订单
  submit(){
    that = this
    app.postData("GetShoppingData.ashx",{
      action:'Pay',
      orderid: that.data.detailsdlist.OrderId,
      username:that.data.coco.username,
      usertel: that.data.coco.usertel,
      address: that.data.site
    }).then(res=>{
      console.log(res)
      wx.navigateTo({
        url: '../payment/payment'
      })
    })
  },

  handgm(options) {
    that = this
    if (options.id == 0) {
      that.setData({
        sid: options.sid
      })
    } else {
      that.setData({
        shoppingid: options.ddd
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      id:options.id
    })
    that.handgm(options)
    that.loadmore()
    that.site()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {},

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