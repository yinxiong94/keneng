const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  // properties: {
  //   pid: {
  //     type: Number,
  //     value: 0,
  //     observer(newVal) {
  //       if(newVal) {
  //         this.setData({
  //             animate: true
  //         }, () => {
  //             this.setData({
  //                 translateX: 0
  //             })
  //         })
  //       }
  //     }
  //   }
  // },
  properties: {                       // 组件的属性列表
    title: {
      type: String,
      value: '学记'
    },
    bgColor: {
      type: String,
      value: '#fff'
    },
    color: String,
    backShow: {
      type: Boolean,
      value: true
    },
    paramAtoB: String,
    machineId: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    translateX: 0,
    animate: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 处理touchstart事件
     */
    handleTouchStart(e) {
      // touch事件初始时，组件禁掉transition动画
      this.setData({
        animate: false
      }, () => {
        this.touchStartX = e.touches[0].pageX
        this.touchStartY = e.touches[0].pageY
        this.startX = this.data.translateX      // 组件初始位置
        this.direction = null                   // 记录手指滑动方向 X:左右滑动； Y:上下滑动
      })
    },

    /**
     * 处理touchmove事件
     */
    handleTouchMove: function (e) {
      this.touchMoveX = e.touches[0].pageX
      this.touchMoveY = e.touches[0].pageY
      this.moveX = this.touchMoveX - this.touchStartX

      // 竖直移动距离超过了左右移动距离
      if(Math.abs(this.touchMoveY - this.touchStartY) > Math.abs(this.moveX)) {
        this.direction = 'Y'
        return
      }
      this.direction = 'X'

      // 以下两种情况不进行移动：1. 在最右边时向右滑动; 2. 在最左边时向左滑动
      if((this.startX === 0 && this.moveX > 0) || (this.startX === -this.actionWidth && this.moveX < 0)) {
        return
      } else if(Math.abs(this.moveX) >= this.actionWidth) {
        // 移动超出删除按钮的宽度时取按钮宽度作为移动距离
        this.moveX = this.moveX < 0 ? -this.actionWidth : this.actionWidth
        this.setData({
          translateX: this.moveX
        })
      } else {  // 其他情况：手指滑动多少就位移多少
        this.setData({
          translateX: this.touchMoveX - this.touchStartX + this.startX
        })
      }
    },

    /**
     * 处理touchend事件
     */
    handleTouchEnd: function (e) {
      // 非左右滑动时不进行任何操作
      if(this.direction !== 'X') {
        return
      }
      let translateX = 0
      // 移动超出右滑最大位移
      if(this.moveX + this.startX >= 0) {
        translateX = 0
      } else if(this.moveX + this.startX <= -this.actionWidth) {
        // 移动超出左滑最大位移
        translateX = -this.actionWidth
      } else if((this.startX === 0 && Math.abs(this.moveX) < this.actionWidth / 2) || (this.startX === -this.actionWidth && Math.abs(this.moveX) > this.actionWidth / 2)) {
        // 以下两种情况都滑动到右边起点（即删除按钮隐藏的状态）：
        // 1. 从右边起点左滑但未超过最大位移的一半，回退到右边起点
        // 2. 从左边起点右滑且超过最大位移的一半，继续滑到到右边起点
        translateX = 0
      } else {
        translateX = -this.actionWidth
      }
      this.setData({
          animate: true
      }, () => {
          this.setData({
              translateX
          })
      })
    },



    /**
     * 获取要货计划
     */
    tolist(machiid) {
     var that = this
      app.postData("GetAgentInfo.ashx", {
        action: 'RequireGoodsList',
        userId: app.globalData.userid,
        // key: that.data.inputval,
        machineId: machiid
      }).then(res => {
        that.setData({
          toLIst: res.Result
        })
        if (that.data.toLIst.length == 0) {
          that.setData({
            show: false,
            hide: true
          })
        } else {
          that.setData({
            show: true,
            hide: false
          })
        }
      })
    },
    /**
     * 组件操作事件（此示例只有删除事件，可根据需要增加其他事件）
    //  */
     
    handleAction(e) {
      var that = this
      var machiid = e.currentTarget.dataset.machiid;
      // console.log(shoppingid, app.globalData.userid)
      app.postData("GetAgentInfo.ashx", {
        action: "RequireGoodsDel", 
        eeId: machiid,
        userId: app.globalData.userid
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '删除成功',
          duration: 2000,
          success(res) {
            setTimeout(function () {
              // wx.redirectTo({
              //   // url: '/pages/want/want',
              // })
              that.tolist(machiid)
            }, 2000)
          }
        })
      })
    },
  },

  

  ready() {
    this.actionWidth = 60
  }
})