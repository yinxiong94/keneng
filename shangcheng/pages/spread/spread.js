// pages/spread/spread.js
var app = getApp();
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    url:'', //图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that=this;
        this.setData({
          height: wx.getSystemInfoSync().windowHeight, 
        })
  },

<<<<<<< HEAD


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


=======
  // 获取会员信息
  userlogin() {
    app.postData("GetUserData.ashx", {
      action: "GetUserInfo",
      userid: app.globalData.userid
    }).then(res => {
      that.setData({ url: res.Result.UserQrCode})
    })
  },
  // 长按图片保存
  // saveImg(e){
  //   let that = this
  //   let url = e.currentTarget.dataset.url;
  //   wx.getSetting({
  //     success:(res)=>{
  //       if (!res.authSetting['scope.writePhotosAlbum']) {
  //         wx.authorize({
  //           scope: 'scope.writePhotosAlbum',
  //           success: () => {
  //             // 同意授权
  //             this.saveImage(url);
  //           },
  //           fail: (res) => {
  //             //用户拒绝授权
  //             wx.showModal({
  //               title: '保存图片',
  //               content: '保存图片需要您的授权',
  //               showCancel:true,
  //               confirmText:'确认',
  //               success:(res)=>{
  //                 if (res.confirm){
  //                   wx.openSetting({
  //                     success:(data)=>{
  //                       if (data.authSetting['scope.writePhotosAlbum']) {
  //                         that.saveImage(url);
  //                       } else {
  //                         console.log("授权失败");
  //                       }
  //                     }
  //                   })
  //                 }
  //               }
  //             })
  //           }
  //         })
  //       } else {
  //         // 已经授权了
  //         this.saveImage(url);
  //       }
  //     },
  //     fail: (res) => {
  //       console.log(res);
  //     }
  //   })
  // },
  
>>>>>>> 895a1cba28dfb58122187a1685ec8dddeba08633
  saveImage(url){
    wx.getImageInfo({
      src: url,
      success: (res) => {
        console.log(res)
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
    this.userlogin()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: "邀请你加入组队",
      path: 'pages/index/index?suserid=' + app.globalData.userid,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})