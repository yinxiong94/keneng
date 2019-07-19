// pages/flowing/flowing.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    btn: -1,
    beginTime: '',
    endTime: '',
    machineId: '',
    list:[]
  },
  // bindDateChange: function (e) {
  //   console.log(e.detail.value);
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
  handBtn: function(e) {
    let index = e.currentTarget.dataset.index;
    that = this;
    that.setData({
      btn: index
    })
    that.handPipelining();
  },
  // 根据选择发送对应的ajax请求
  handPipelining: function() {
    that = this;
    let Nowdate = new Date();
    let myDate = that.handDate();
    let beginTime = '';
    let endTime = '';
    if (that.data.btn == 0) {
      beginTime = myDate;
      endTime = myDate;
      that.setData({
        beginTime: beginTime,
        endTime: endTime
      });
      that.handMachineOrderList();
    } else if (that.data.btn == 1) {
      var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
      var M = Number(WeekFirstDay.getMonth()) + 1;
      var WeekFirstDay1 = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
      var WeekLastDay1 = new Date((WeekFirstDay1 / 1000 + 6 * 86400) * 1000);
      var M1 = Number(WeekLastDay1.getMonth()) + 1
      var send = Nowdate.getFullYear() + "-" + M1 + "-" + WeekLastDay1.getDate();
      var D = Nowdate.getFullYear() + "-" + M + "-" + WeekFirstDay.getDate();
      that.setData({
        beginTime: D,
        endTime: send
      })
      that.handMachineOrderList();
    } else if (that.data.btn == 2){
      var MonthFirstDay = new Date(Nowdate.getYear(), Nowdate.getMonth(), 1);
      var M = Number(MonthFirstDay.getMonth()) + 1
      var Y = Nowdate.getFullYear() + "-" + M + "-" + MonthFirstDay.getDate();

      var MonthNextFirstDay = new Date(Nowdate.getYear(), Nowdate.getMonth() + 1, 1);
      var MonthLastDay = new Date(MonthNextFirstDay - 86400000);
      var M = Number(MonthLastDay.getMonth()) + 1
      var Y1 = Nowdate.getFullYear() + "-" + M + "-" + MonthLastDay.getDate();
      that.setData({
        beginTime: Y,
        endTime: Y1
      })
      that.handMachineOrderList();
    }else{
      that.handMachineOrderList();
    }
  },
  // 设备销售记录
  handMachineOrderList: function() {
    that = this;
    app.postData("President.ashx", {
      action: "MachineOrderListById",
      userId: app.globalData.userid,
      beginTime: that.data.beginTime,
      endTime: that.data.endTime,
      machineId: that.data.machineId
    }).then(res => {
      that.setData({
        list:res.Result
      })
      console.log(res);
    })
  },
  // 获取日期函数
  handDate: function() {
    let myDate = new Date();
    var year = myDate.getFullYear();
    var month = (myDate.getMonth() + 1).toString();
    var day = (myDate.getDate()).toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    var dateTime = year + "-" + month + "-" + day;
    return dateTime
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      machineId: options.MachineId
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
  onShow: function() {
    that = this;
    that.handPipelining();
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