var app = getApp();
Page({
  data: {
    hasUserInfo: false
  },
  onShow: function () {
    wx.setStorageSync("jwttoken", null)
    if (wx.getStorageSync("jwttoken")) {

    } else {
      this.getUserInfo();
    }
  },
  getUserInfo: function () {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          that.update()
        }
      })
    }
  },
  login: function () {
    wx.showLoading({
      title: '登陆中...',
    })
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          //发起网络请求
          wx.request({
            url: app.domain+'/sys/v1/login/wechatapp/' + code,
            method: 'GET',
            success: function (res) {
              console.log(res);
              wx.setStorageSync("jwttoken", res.data.data.jwttoken);
              wx.setStorageSync("expire", true);
              if (res.data.data.userstate==1){
                wx.hideLoading();
                wx.setStorageSync("isrefresh", true);
                wx.setStorageSync("login", true);
                wx.setStorageSync("uId", res.data.data.user.uId);
                wx.navigateBack({
                })
              }else{
                console.log("mother fucker");
                wx.hideLoading();
                wx.removeStorageSync("login");
                wx.showModal({
                  title: '用户未激活',
                  content: '检测到用户还未激活，是否前往激活？',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '/pages/my/member/member',
                      })
                    } else if (res.cancel) {

                    }
                  }
                })
              }
             
              
            },
            fail: function (res) {
              console.log(res);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log(res);
        console.log("++++++++++++");
      }
    })
  },
  getxytUserInfo:function(){

  }
})
