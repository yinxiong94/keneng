import Canvas from '../../utils/canvas.js'
var app = getApp();
var that;
Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
    Reserves: '',
    MachineId:'',
    MachineState:''
  },
  tols:function(){
    that = this;
    wx.navigateTo({
      url: '/pages/flowing/flowing?MachineId=' + that.data.MachineId,
    })
  },
  tozz:function(){
    wx.navigateTo({
      url: '/pages/zhuangzheng/zhuangzheng',
    })
  },
  tosb:function(){
    wx.navigateTo({
      url: '/pages/fault/fault',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log(options);
    that.setData({
      MachineId: options.MachineId,
      MachineState: options.MachineState,
      Reserves: options.Reserves
    })
    this.draw('runCanvas', that.data.Reserves, 1000);
  },
})