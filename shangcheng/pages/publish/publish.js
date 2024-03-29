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
    cop:[],
    conter: '',
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
    }],
    list:"",
    goodsid:"",
    obj: [],
    info: [],
    list1:[],
    lis:[]
  },
  // 上传图片
  uploadimg:function(data){
    var that = this,
      i = data.i ? data.i : 0, //当前上传的哪张图片
      success = data.success ? data.success : 0, //上传成功的个数
      fail = data.fail ? data.fail : 0; //上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file', //这里根据自己的实际情况改
      formData: null, //这里是上传图片时一起上传的数据
      success: (resp) => {
        success++; //图片上传成功，图片上传成功的变量+1
        var list = that.data.list;
        var is = JSON.parse(resp.data)
        console.log(is)
        list += is.Result + ',';
        that.setData({
          list: list
        })
        console.log(that.data.list)
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++; //图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++; //这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) { //当图片传完时，停止调用
          that.jijiao();
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else { //若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
  // 提交
  gobtn: function () {
    // var lev = that.data.lev;
    // if (lev == 0) {
    //   wx.showToast({
    //     title: '您还未打分',
    //     icon: 'none',
    //     duration: 2000,
    
    //   })
    //   return;
    // }
    // var text = that.data.text;
    // if (text.cursor == 0) {
    //   wx.showToast({
    //     title: '评论未满8个字',
    //     icon: 'none',
    //     duration: 2000,
    //   })
    //   return;
    // }
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    var pics = that.data.images;
    that.uploadimg({
      url: app.globalData.http + 'FileUpLoad.ashx', //这里是你图片上传的接口
      path: pics //这里是选取的图片的地址数组
    });
  },
  inputedit: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.data[dataset.obj][dataset.item] = value;
    this.setData({
      obj: this.data[dataset.obj]
    });
  },
  bindinput: function(e) {
    that = this;
    that.setData({
      conter: e.detail.value
    })
    console.log(that.data.conter)
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
  // 提交信息
  jijiao: function () {
    // that.gobtn()
    app.postData('GetOrderData.ashx', {
      action: 'Evaluate',
      userid: app.globalData.userid,
      goodsid: that.data.sid,
      content: that.data.conter,
      lev: that.data.score,
      pics: that.data.list
    }).then(res => {
      console.log(res)
      wx.hideLoading();
      if (res.Result == 1) {
        wx.showToast({
          title: '评论成功',
          icon: 'none',
          duration: 2000,
          mask: true,
          success: function (res) {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 2000)
          },
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
  // 选择评价星星
  starClick: function(e) {
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
        console.log(res)
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(res.tempFilePaths),
        })
        console.log(that.data.images)
        if (that.data.images.length == 3) {
          wx.showToast({
            title: '最多只能上传3张图片',
            icon: 'none',
            duration: 2000,
            success(res){
              that.setData({
                showUpload: false
              })
            }
          })
          return;
         
        }
      }
    })
  },


  // 多张图片上传
  // uploadimg: function(data) {
  //   var that = this,
  //     i = data.i ? data.i : 0, //当前上传的哪张图片
  //     success = data.success ? data.success : 0, //上传成功的个数
  //     fail = data.fail ? data.fail : 0; //上传失败的个数
  //     var co = that.data.cop
  //   wx.uploadFile({
  //     url: data.url,
  //     filePath: data.path[i],
  //     name: 'file',
  //     formData: null,
  //     success: (resp) => {
  //       var obj = JSON.parse(resp.data);
  //       co.push(obj.Result);
  //       that.setData({
  //         cop: co
  //       })
  //       console.log(co);
  //     },
  //     fail: (res) => {
  //       fail++; //图片上传失败，图片上传失败的变量+1
  //       console.log('fail:' + i + "fail:" + fail);
  //     },
  //     complete: () => {
  //       console.log(i);
  //       i++; //这个图片执行完上传后，开始上传下一张
  //       if (i == data.path.length) { //当图片传完时，停止调用
  //         that.jijiao();
  //         console.log('执行完毕');
  //         console.log()
  //         console.log('成功：' + success + " 失败：" + fail);
  //       } else { //若图片还没有传完，则继续调用函数
  //         console.log(i);
  //         data.i = i;
  //         data.success = success;
  //         data.fail = fail;
  //         that.uploadimg(data);
  //       }
  //     }
  //   })
   
  // },
  
  // // 删除图片
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      sid: options.ccc
    })
    app.postData("GetIndexData.ashx", {
      action: "GetDetails",
      goodsid: that.data.sid
    }).then(res => {
      that.setData({
        lis: res.Result
      })
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
  passInput: function(e) {
    this.setData({
      conter: e.detail.value
    })
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