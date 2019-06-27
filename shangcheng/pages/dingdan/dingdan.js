// pages/dingdan/dingdan.js
const app = getApp()
var that
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

   // 获取用户订单信息
 
  // 选项卡
  menuTap: function(e) {
    that = this;
    if (that.data.foo > 1){
      let index = e.currentTarget.dataset.current;
      that.setData({
        status: index
      })
    }else{
      let w = that.data.foo + 1
      console.log(w)
      that.setData({
        foo: w
      })
      console.log(that.data.foo)
    }
    app.postData("GetOrderData.ashx", {
      action: "GetUserOrders",
      userid: app.globalData.userid,
      pid: that.data.pageNum,
      psize: that.data.psize,
      status: that.data.status
    }).then(res => {
      console.log(res);
      that.setData({
        list:res.Result
      })
      if (res.Result.length == 0){
        that.setData({
          off:false
        })
      }else{
        off: true
      }
    })

    that.setData({
      menuTapCurrent: e.currentTarget.dataset.current
    })
    
  },


 

  handPinjia:function(){
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
    console.log(orderid);
    wx.navigateTo({
      url: '../ddxq/ddxq?id=' + orderid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    that=this;
    that.menuTap();
    this.setData({
      menuTapCurrent: options.id,

    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    that = this
    that.setData({
      menuTapCurrent: -1,
    })

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
    var that = this;
    var pagenum = that.data.pagenum + 4; //获取当前页数并+4
    that.setData({
      psize: pagenum, //更新当前页数
    })
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})