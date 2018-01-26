var jwttoken = "";
var mobile = "";
var theWx = getApp();
var myself = "";
var verifycode = "";
var canGetverifycode = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "verify": "获取动态码"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myself = this;
    jwttoken = wx.getStorageSync("jwttoken");
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
    myself = this;
    jwttoken = wx.getStorageSync("jwttoken");
    //console.log(jwttoken);
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

  },
  activate: function (e) {
    var status = 0;
    console.log(e.detail.value);
    var regCad = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var regPhone = /^1[3|4|5|8][0-9]\d{4,8}$/;
    var regPassWd = /^.{6,12}$/;
    var rebindblk = "/wca/v1/rebindblk";
    var msg = ["俩次密码不一致", "身份证格式错误", "手机号格式错误", "密码过短"]
    /*
    if (e.detail.value.verifycode != verifycode){
      wx.showModal({
        title: '激活失败',
        content: '验证码不正确',
        success: function (res) {
          if (res.confirm) {
          } else {
          }
        }
      })
    }*/
    if (!regPhone.test(e.detail.value.mobile)) {
      status = 3;
    }
    if (!regPassWd.test(e.detail.value.password)) {
      status = 4;
    }
    var data = {};
    data.BLKId = e.detail.value.blkid;
    data.mobile = e.detail.value.mobile;
    data.pwd = e.detail.value.password;
    data.mobilevcode = e.detail.value.verifycode;
    console.log(status);
    if (status == 0) {
      theWx.getRequestByTokent(rebindblk, data, jwttoken, myself.activateSuccess, "POST");
    } else {
      wx.showModal({
        title: '绑定失败',
        content: msg[status - 1],
        success: function (res) {
          if (res.confirm) {
          } else {
          }
        }
      })
    }

  },
  activateSuccess: function (res) {
    wx.showModal({
      title: "绑定成功",
      content: "绑定成功",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("isrefresh", true);
          wx.setStorageSync("expire", true);
          wx.navigateBack({
            delta: 2
          })
        } else {
        }
      }
    })

    console.log("success");
    console.log(res);
  },
  onTouch: function (event) {
    // console.log(event);
    console.log(event.currentTarget.id);
    wx.navigateTo({
      url: 'memberDetail/memberDetail',
    })
  },
  scan: function () {
    console.log("scan success");
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })

    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  },
  getVerifycode: function (e) {
    var regPhone = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (canGetverifycode) {
      if (regPhone.test(mobile)) {
        var getVerifycode = "/wca/v1/getphonecode";
        var data_getVerifycode = { "mobile": mobile, "range": 1 };
        console.log(mobile);
        theWx.getRequestByTokent(getVerifycode, data_getVerifycode, jwttoken, myself.setVerifycode, "POST");
        canGetverifycode = false;
        myself.blockVerifycode(60);
      } else {
        wx.showModal({
          title: '获取验证码失败',
          content: "手机号不正确",
          success: function (res) {
            if (res.confirm) {
            } else {
            }
          }
        })
      }

    } else {

    }
  },
  setVerifycode: function (res) {


  },
  blockVerifycode: function (timer) {
    var time = timer
    if (time >= 0) {
      setTimeout(function () {
        console.log(time)
        myself.blockVerifycode((time - 1));
        if (time != 0) {
          var str = time;
          myself.setData({
            verify: str
          })
        } else {
          var str = "获取动态码";
          myself.setData({
            verify: str
          })
        }

      },
        1000)
    }
    else {
      canGetverifycode = true;
    }
  },
  getMobile: function (e) {
    mobile = e.detail.value;
  }
})