// indent.js
var theWx = getApp();
var myself = "";
var jwttoken = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indent_name:"",
    indent_view:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // quan.activeperson = res.data.data.active[i].activeperson;
    // quan.unusedactive = res.data.data.active[i].unusedactive;
    myself = this; 
    jwttoken = wx.getStorageSync("jwttoken");
    var indentData = JSON.parse(options.indentData);
    console.log(indentData);
    indentData.activestime = theWx.fomatDate(indentData.activestime);
    indentData.activeetime = theWx.fomatDate(indentData.activeetime);
    var indent_view={};
    this.setData({
      indent_view: indentData  
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: "填写订单"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync("isrefresh")) {
      jwttoken = wx.getStorageSync("jwttoken");
    }
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
  pay:function(){
    wx.showLoading({
      title: '订单处理中',
    })
    /*
    var pay = "/wca/v1/preorder";
    var data={};
    data.activeid = myself.data.indent_view.activeid;
    theWx.getRequestByTokent(pay, data, jwttoken, myself.payDetil, "POST");
    */
    myself.dealPay();
  },
  dealPay: function () {
    var data = {};
    data.activeid = myself.data.indent_view.activeid;
    wx.request({
      url: theWx.domain + "/wca/v1/preorder",
      method: "POST",
      data: data,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 ", "Authorization": jwttoken },
      success: function (res) {
        console.log(res);
        if (res.data.status == "success") {
          wx.hideLoading();
          myself.payDetil(res);
        }else{
          if (res.data.msg =="token已过期。"){
              wx.showToast({
                title: '请重新登陆',
                icon: 'fail',
                duration: 20000,
                complete:function(){
                  theWx.login();
                }
              })
          }
        }
      },
      fail:function(res){
        wx.hideLoading();
        wx.showToast({
          title: '调用微信支付接口失败',
          icon: 'fail',
          duration: 20000
        })
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  payDetil:function(res){
    wx.requestPayment(
      {
        'timeStamp': res.data.data.timeStamp,
        'nonceStr': res.data.data.nonceStr,
        'package': res.data.data.package,
        'signType': 'MD5',
        'paySign': res.data.data.paySign,
        'success': function (res) {
          if (myself.data.indent_view.type==0){
            wx.redirectTo({
              url: '/pages/my/myTickets/myTickets',
            })
          }else {
            wx.redirectTo({
              url: '/pages/my/myArch/myArch',
            })
          }
        },
        'fail': function (res) {
        },
        'complete': function (res) { 
        }
      })
  }
})