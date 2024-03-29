// pages/Complaint/Complaint.js
const app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInput:0,
    textConter:''
  },
  bindWordLimit(e){
    // console.log(e.detail.value.length);
    this.setData({
      userInput: e.detail.value.length,
      textConter: e.detail.value
    })
  },
  handFeedback:function(){
    that = this;
    app.postData("GetUserData.ashx", {
      action: "FeedBack",
      userid: app.globalData.userid,
      content: that.data.textConter
    }).then(res => {
      console.log(res.Result);
      if (res.Result == 1){
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000,
          success:res=>{
            setTimeout(()=>{
              wx.switchTab({
                url: '/pages/Mynews/Mynews',
              })
            },2000)           
          }
        })
      }
    })
  },
  bindtaphang(){
    that = this;
    if(this.data.userInput>0){
      that.handFeedback();
    }else{
      wx.showToast({
        title: '不能为空',
        icon:'none'
      })
    }
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