// pages/spread/spread.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    url:'http://m.qpic.cn/psb?/V103fdTR0PY8oM/8DlS3s.wc1YQELD8yCtgz4sP*1F.IboyS1wCO5UlJOk!/b/dLgAAAAAAAAA&bo=xwDFAMcAxQADCSw!&rf=viewer_4', //图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.setData({
          height: wx.getSystemInfoSync().windowHeight, 
        })
  },



  //长按图片保存
  saveImg(e){
    let that = this
    let url = e.currentTarget.dataset.url;
    wx.getSetting({
      success:(res)=>{
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              // 同意授权
              this.saveImage(url);
            },
            fail: (res) => {
              //用户拒绝授权
              wx.showModal({
                title: '保存图片',
                content: '保存图片需要您的授权',
                showCancel:true,
                confirmText:'确认',
                success:(res)=>{
                  if (res.confirm){
                    wx.openSetting({
                      success:(data)=>{
                        if (data.authSetting['scope.writePhotosAlbum']) {
                          that.saveImage(url);
                        } else {
                          console.log("授权失败");
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        } else {
          // 已经授权了
          this.saveImage(url);
        }
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },


  saveImage(url){
    wx.getImageInfo({
      src: url,
      success: (res) => {
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: (res) => {
            console.log(res);
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
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