// pages/evaluation/evaluation.js
var that;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[], //图片路径
    showUpload:true
  },


  // 添加图片
  chooseImage() {
    that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(res.tempFilePaths),
        })
        if (that.data.images.length == 3) {
          that.setData({
            showUpload: false
          })
        }
      }
    })
  },

   // 删除图片
  clearImg(e) {
    that - this
    var nowList = []; //新数据
    var uploaderList = this.data.images; //原数据
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
  showImg(e) {
    var that = this;
    wx.previewImage({
      urls: that.data.images,
      current: that.data.images[e.currentTarget.dataset.index]
    })
  },
  // 切换图片
  bindImg(e){
    console.log(e)
  },
  // 派送服务评价
  ReviceDeliver(){
    app.postData("GetGoodsData.ashx",{

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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