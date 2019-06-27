// pages/dingdan/dingdan.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off: false,
    menuTapCurrent: -1, //默认选择第1个
    pageNum: 1,
    psize: 4,
    status: -1,
    list:[],
    foo:1

  },
  // 选项卡
  menuTap: function(e) {
    that = this;
    if (that.data.foo > 1){
      let index = e.currentTarget.dataset.current;
      that.setData({
        status: index,
        menuTapCurrent: index
      })
    }else{
      let w = that.data.foo + 1
      that.setData({
        foo: w,
      })
    }
    app.postData("GetOrderData.ashx", {
      action: "GetUserOrders",
      userid: app.globalData.userid,
      pid: that.data.pageNum,
      psize: that.data.psize,
      status: that.data.status
    }).then(res => {
      that.setData({
        list:res.Result
      })
    })
  },
  handPinjia: function() {
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  payment: function() {
    wx.navigateTo({
      url: '../tuikuan/tuikuan',
    })
  },
  handCheng: function() {
    wx.navigateTo({
      url: '../After/After',
    })
  },
  cancel: function() {
    wx.navigateTo({
      url: '../logistics/logistics',
    })
  },
  handwait: function(e) {
    that= this;
    let index = e.currentTarget.dataset.index;
    let orderid = that.data.list[index].OrderId;
    wx.navigateTo({
      url: '../ddxq/ddxq?id=' + orderid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that=this;
    console.log(options);
    if (options.off == 'false'){
      that.menuTap();
    }else{
      that.setData({
        menuTapCurrent: options.id,
        status: options.id
      })
      that.menuTap();
    }
    
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
    that = this;

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