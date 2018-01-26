// pages/my/changePassword/changePassword.js
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
  changPasswd:function(e){
    var status = 0;
    console.log(e.detail.value);
    var regPhone = /^1[3|4|5|8][0-9]\d{4,8}$/;
    var regPassWd = /^.{6,12}$/;
    var changPwd = "/wca/v1/setpassword";
    var msg = ["俩次密码不一致", "手机号格式错误", "密码过短"]
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
    if (e.detail.value.password != e.detail.value.confirmPassword) {
      status = 1;
    }
    if (!regPhone.test(e.detail.value.moblie)) {
      status = 2;
    }
    if (!regPassWd.test(e.detail.value.password)) {
      status = 3;
    }
    var data = {};
    data.mobile = e.detail.value.moblie;
    data.password = e.detail.value.password;
    data.verifycode = e.detail.value.verifycode;
    console.log(status);
    if (status == 0) {
      theWx.getRequestByTokent(changPwd, data, jwttoken, myself.setPasswd, "POST");
    } else {
      wx.showModal({
        title: '修改密码失败',
        content: "",
        success: function (res) {
          if (res.confirm) {
          } else {
          }
        }
      })
    }

  },
  setPasswd:function(){
      
  },
  getVerifycode: function (e) {
    var regPhone = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (canGetverifycode) {
      if (regPhone.test(mobile)) {
        var getVerifycode = "/wca/v1/getphonecode";
        var data_getVerifycode = { "mobile": mobile, "range": 1 };
        console.log(mobile);
        theWx.getRequestByTokent(getVerifycode, data_getVerifycode, jwttoken, myself.blank, "POST");
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
  },
  blank:function(){
    
  }
})