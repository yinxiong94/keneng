// pages/evaluation/evaluation.js
var that;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [], //图片路径
    showUpload: true,
    data_img: 0,
    imagesq: [],
    content: {
      cursor: 0,
      value: ""
    },
    deliverid:""

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
  bindImg(e) {
    that = this;
    that.setData({
      data_img: e.currentTarget.dataset.img1,
    })
    if (that.data.data_img == 0) {
      that.setData({
        data_img1: 0,
      })
    }
  },


  //多张图片上传
  uploadimg: function (data) {
    that = this;
    if (that.data.images.length != 0) {
      var i = data.i ? data.i : 0, //当前上传的哪张图片
        success = data.success ? data.success : 0, //上传成功的个数
        fail = data.fail ? data.fail : 0; //上传失败的个数
      var list = that.data.imagesq;
      wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        name: 'file', //这里根据自己的实际情况改
        formData: null, //这里是上传图片时一起上传的数据
        success: (resp) => {
          success++; //图片上传成功，图片上传成功的变量+1+
          console.log(resp)
          var obj = JSON.parse(resp.data)
          list.push(obj.Result);
          console.log(list)
          that.setData({
            imagesq: list
          })

          //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
        },
        fail: (res) => {
          console.log(res)
          fail++; //图片上传失败，图片上传失败的变量+1
          console.log('fail:' + i + "fail:" + fail);
        },
        complete: () => {
          console.log(i);
          i++; //这个图片执行完上传后，开始上传下一张
          if (i == data.path.length) { //当图片传完时，停止调用
            that.jijiao();
            // console.log('执行完毕');
            // console.log('成功：' + success + " 失败：" + fail);
          } else { //若图片还没有传完，则继续调用函数
            console.log(i);
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.uploadimg(data);
          }
        }
      });
    } else {
      if (that.data.data_img == 0) {
        wx.showToast({
          title: '您还未打分',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      if (that.data.content.cursor < 8) {
        wx.showToast({
          title: '评论未满8个字',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      that.jijiao()
    }
  },

  /**
   * 提交
   */
  gobtn: function () {
    that = this;
    if (that.data.data_img == 0) {
      wx.showToast({
        title: '您还未打分',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (that.data.content.cursor < 8) {
      wx.showToast({
        title: '评论未满8个字',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    var pics = that.data.images;
    that.uploadimg({
      url: app.globalData.http + "FileUpLoad.ashx", //这里是你图片上传的接口
      path: pics //这里是选取的图片的地址数组
    });
  },
  /**
   * 获取用户输入评价内容
   */
  golev(e) {
    that = this;
    that.setData({
      content: e.detail
    })
  },
  /**
   * 调用方法
   */
  jijiao() {
    that = this;
    var list1 = "";
    list1 = that.data.imagesq.join(",")
    console.log(list1)
    app.postData("GetGoodsData.ashx", {
      action: "ReviceDeliver",
      deliverid: that.data.deliverid,
      lev: that.data.data_img,
      content: that.data.content.value,
      pics: list1
    }).then(res => {
      wx.hideLoading();
      if (res.Result == 1) {
        wx.showToast({
          title: '评论成功',
          icon: 'none',
          duration: 2000,
          mask: true,
          success() {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 2000)
          }
        })
      } else {
        wx.showToast({
          title: '评论失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
      deliverid: options.deliverid
    })
    console.log()
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