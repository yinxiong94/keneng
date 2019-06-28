// pages/tuikuan/tuikuan.js
const app = getApp()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: "",
    images: [],
    ContentValue:"",
    showUpload:true
  },
  // 点击申请退款
  handTui: function() {
    that = this
    console.log(this.data.ContentValue)
    app.postData("GetOrderData.ashx",{
      action:"Refund",
      orderid: that.data.orderid,
      reason: that.data.ContentValue,
      pics: that.data.images
    }).then(res=>{
      console.log(res)
    })
  },

  // 获取用户地址
  address() {
    that = this
    app.postData("GetOrderData.ashx", {
      action: "GetOrderDetails",
      orderid: that.data.orderid
    }).then(res => {
      console.log(res)
      that.setData({
        address: res.Result.detailsdlist
      })
    })
  },

  // 添加图片
  chooseImage() {
    that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        that.setData({
          images: that.data.images.concat(res.tempFilePaths)
        })
        console.log(that.data.images)
        if (that.data.images.length==3){
          that.setData({
            showUpload:false
          })
        }
      }
    })
  },

  // // 删除图片
  clearImg(e){
    that - this
    var nowList = [];//新数据
    var uploaderList = this.data.images;//原数据
    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    that.setData({
      images: nowList,
      showUpload: true
    })
  },

  // 展示图片
  showImg(e){
    var that = this;
    wx.previewImage({
      urls: that.data.images,
      current: that.data.images[e.currentTarget.dataset.index]
    })
  },

  // 获取用户输入退款内容
  content(e){
    console.log(e.detail.value)
    that = this
    that.setData({
      ContentValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      orderid: options.orderid
    })

    that.address()
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