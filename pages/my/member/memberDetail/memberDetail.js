// memberDetail.js
var jwttoken = "";
var theWx = getApp();
var myself = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    memberId:"",
    phone:"",
    idCard:"",
    blkid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myself = this;
    jwttoken = wx.getStorageSync("jwttoken");
    var xytInfo ="/wca/v1/getuserinfo"
    myself.getRequestByTokent(xytInfo, "", jwttoken, myself.getxytUserInfo, "POST");
  },
  getRequestByTokent: function (api, datas, token, callback, menthod) {
    var self = this;
    wx.showLoading({
      title: '加载中',
    })
    //  console.log("--------------------------sending------------------------------------")
    //  console.log(datas)
    //  console.log("--------------------------sending------------------------------------")
    wx.request({
      url: theWx.domain + api,
      method: menthod,
      data: datas,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 ", "Authorization": token },
      success: function (res) {
        console.log(res);
        if (res.data.status == "success") {
          callback(res);
          return;
        }
        else if ((res.data.status - 0) == 0) {
          callback(res);
        } else if (res.data.msg == "token已过期。") {
          wx.setStorageSync("expire", 'true');
          theWx.login();
        }
      },
      complete: function (res) {
        wx.hideLoading();
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
  
  },
  getxytUserInfo(res){
    myself.setData({      
      username:res.data.data.realName,
      memberId:res.data.data.id,
      phone:res.data.data.mobile,
      idCard:res.data.data.idCard,
      blkid:res.data.data.blkid
    })
  }
})