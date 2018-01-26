var jwttoken="";
var mobile="";
var theWx = getApp();
var myself = "";
var verifycode="";
var canGetverifycode=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "verify":"获取动态码"
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
  activate:function(e){
    var status=0;
    console.log( e.detail.value);
    var regCad = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    var regPhone = /^1[3|4|5|8][0-9]\d{4,8}$/; 
    var regPassWd =/^.{6,12}$/;
    var regmember = "/wca/v1/regmember";
    var msg=["俩次密码不一致","身份证格式错误","手机号格式错误","密码过短"]
    if (e.detail.value.password!=e.detail.value.confirmPassword){
      status=1;
    } 
    if (!this.cheakIDCard(e.detail.value.idCard)){
      status=2;
    } 
    if (!regPhone.test(e.detail.value.mobile)){
      status=3;
    }
    if (!regPassWd.test(e.detail.value.password)) {
      status=4;
    }
    var datas={};
    datas.blkid = e.detail.value.blkid;
    datas.realName = e.detail.value.realName;
    datas.idType = e.detail.value.idType;
    datas.idCard = e.detail.value.idCard;
    datas.mobile = e.detail.value.mobile;
    datas.password = e.detail.value.password;
    datas.verifycode = e.detail.value.verifycode;
    console.log(status);
    if(status==0){
      // theWx.getRequestByTokent(regmember,data,jwttoken, myself.activateSuccess, "POST");
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: theWx.domain + regmember,
        method: 'POST',
        data: datas,
        header: { "cache-control":"private", "Content-Type": "application/json; charset=utf-8 ", "Authorization": jwttoken },
        success: function (res) {
          if (res.data.status == "success") {
            myself.activateSuccess(res);
          }else{
            wx.showModal({
              title: '激活失败',
              content: res.msg,
              success: function (res) {
                if (res.confirm) {
                } else {
                }
              }
            })
          }
        },
        complete: function (res) {
          wx.hideLoading();
        }
      })
    }else{
      wx.showModal({
        title: '激活失败',
        content: msg[status-1],
        success: function (res) {
          if (res.confirm) {
          } else {
          }
        }
      })
    }
   
  },
  activateSuccess:function(res){
    wx.showModal({
      title: "激活成功",
      content: "激活成功",
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
  onTouch:function(event){
    // console.log(event);
    console.log(event.currentTarget.id);
    wx.navigateTo({
      url: 'memberDetail/memberDetail',
    })
  },
  scan:function(){
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
  getVerifycode: function(e){
    var regPhone = /^1[3|4|5|8][0-9]\d{4,8}$/; 
    if (canGetverifycode) {
      if (regPhone.test(mobile)){
        var getVerifycode = "/wca/v1/getphonecode";
        var data_getVerifycode = { "mobile": mobile, "range": 1 };
        console.log(mobile);
        //theWx.getRequestByTokent(getVerifycode, data_getVerifycode, jwttoken, myself.setVerifycode, "POST");
        wx.request({
          url: theWx.domain + getVerifycode ,
          method: 'POST',
          data: data_getVerifycode,
          header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 ", "Authorization": jwttoken },
          success: function (res) {
            
          },
          complete: function (res) {
          }
        })
        canGetverifycode = false;
        myself.blockVerifycode(60);
      }else{
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
  setVerifycode:function(res){
    
  
  },
  blockVerifycode:function(timer){
    var time = timer
    if (time>=0){
      setTimeout(function () {
        console.log(time)
        myself.blockVerifycode((time-1));
        if (time!=0){
          var str = time;
          myself.setData({
            verify: str
          })
        }else{
          var str = "获取动态码";
          myself.setData({
            verify: str
          })
        }
       
      },
        1000)
    }
    else{
      canGetverifycode = true;
    }
  },
  getMobile:function(e){
   mobile=e.detail.value;
  },
  cheakIDCard: function (idCard){
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
      if (idCard.length == 18) {
        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
        for (var i = 0; i < 17; i++) {
          idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
        }

        var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
        var idCardLast = idCard.substring(17);//得到最后一位身份证号码

        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (idCardMod == 2) {
          if (idCardLast == "X" || idCardLast == "x") {
            return true;
          } else {
            return false;
          }
        } else {
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (idCardLast == idCardY[idCardMod]) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      return false;
    }
  }
})