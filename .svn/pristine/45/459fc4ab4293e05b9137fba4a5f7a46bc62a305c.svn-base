// indent.js
var theWx = getApp();
var myself = "";
var jwttoken = "";
var QR = require("../../../utils/qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indent_name: "",
    indent_view: {},
    qrCodeImg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myself = this;
    jwttoken = wx.getStorageSync("jwttoken");
    var activeDeail = JSON.parse(options.activeDeail);
    activeDeail.deadLine = theWx.getDateStr(activeDeail.xytqyxq, activeDeail.activestime);
    this.setData({
      indent_view: activeDeail
    })
    myself.getQr();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: "票券详情"
    })
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
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  getQr:function(){
    var datas={};
    datas.number = myself.data.indent_view.number;
   // console.log(myself.data.indent_view.number);
    var api = "/wca/v1/getqrcode"
    console.log(api);
    wx.request({
      url: theWx.domain + api,
      data: datas,
      method: 'POST',
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 ", "Authorization": jwttoken },
      success: function (res) {
        if(res.data.status==0){
          var size = myself.setCanvasSize();//动态设置画布大小
          var qrCode = res.data.qrcode;
          myself.createQrCode(qrCode, "mycanvas",150, 150);
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'fail',
            duration: 2000
          })
        }
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  //二维码生成
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url, canvasId, cavW, cavH);
    //二维码生成之后调用canvasToTempImage();延迟3s，否则获取图片路径为空
    var st = setTimeout(function () {
      myself.canvasToTempImage();
      clearTimeout(st);
    }, 3000);
  },
  canvasToTempImage: function () {
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        myself.setData({
          qrCodeImg: tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  getQrImg:function(){
    var code = myself.data.indent_view.number;
    var st = setTimeout(function () {
      var size = myself.setCanvasSize();
      //绘制二维码
      myself.createQrCode(code, "mycanvas", 200, 200);
      myself.setData({
        maskHidden: true
      });
      clearTimeout(st);
    }, 2000)
  }
})