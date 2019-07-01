// pages/publish/publish.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: '',
    images: [],
    conter:'',
    ContentValue: "",
    showUpload: true,
    score: 5,
    off: true,
    stars: [{
      lightImg: '../img/xing11.png',
      blackImg: '../img/kxing.png',
      flag: 1,
    }, {
      lightImg: '../img/xing11.png',
      blackImg: '../img/kxing.png',
      flag: 1,
    }, {
      lightImg: '../img/xing11.png',
      blackImg: '../img/kxing.png',
      flag: 1,
    }, {
      lightImg: '../img/xing11.png',
      blackImg: '../img/kxing.png',
      flag: 1,
    }, {
      lightImg: '../img/xing11.png',
      blackImg: '../img/kxing.png',
      flag: 1,
    }]
  },
  bindinput:function(e){
    that = this;
    that.setData({
      conter: e.detail.value
    })
  },
  handBtn:function(){
    that = this;
    var b = that.data.images;
    b = b.join(',');
    app.postData("GetOrderData.ashx", {
      action: "Evaluate",
      goodsid:that.data.sid,
      userid: app.globalData.userid,
      content: that.data.conter,
      lev: that.data.score,
      pics: b
    }).then(res => {
      if(res.Result == 1){
        wx.showToast({
          title: '发表成功',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '发表失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 获取用户地址
  address() {
    that = this
    app.postData("GetOrderData.ashx", {
      action: "GetOrderDetails",
      orderid: that.data.orderid
    }).then(res => {
      that.setData({
        address: res.Result.detailsdlist
      })
    })
  },
  // 选择评价星星
  starClick: function (e) {
    var that = this;
    let off = that.data.off;
    off = !off;
    that.setData({
      off: off
    })
    for (let i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    if (index == '0') {
      if (off) {
        for (let i = 0; i < that.data.stars.length; i++) {
          var allItem = 'stars[' + i + '].flag';
          that.setData({
            [allItem]: 2
          })
        }
        that.setData({
          score: index,

        })
      } else {
        var allItem = 'stars[' + 0 + '].flag';
        let coco = index + 1;
        that.setData({
          [allItem]: 1,
          score: 1
        })
      }

    } else {
      for (let i = 0; i <= index; i++) {
        var item = 'stars[' + i + '].flag';
        that.setData({
          [item]: 1
        })
      }
      let coco = index + 1;
      that.setData({
        score: coco
      })
    }

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

  // // 删除图片
  clearImg(e) {
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
  showImg(e) {
    var that = this;
    wx.previewImage({
      urls: that.data.images,
      current: that.data.images[e.currentTarget.dataset.index]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
      sid: options.ccc
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
  passInput:function(e){
    this.setData({
      conter: e.detail.value
    })
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
