// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  // 选择评价星星
  starClick: function(e) {
    var that = this;
    let off = that.data.off;
    off = !off;
    that.setData({
      off:off
    })
    console.log(off);
    for (let i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    if (index == '0') {
      if(off){
        for (let i = 0; i < that.data.stars.length; i++) {
          var allItem = 'stars[' + i + '].flag';
          that.setData({
            [allItem]: 2
          })
        }
        that.setData({
          score: index,

        })
      }else{
        var allItem = 'stars[' + 0 + '].flag';
        let coco = index + 1;
        that.setData({
          [allItem]: 1,
          score:1
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

    console.log(that.data.stars);
    console.log(that.data.score);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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