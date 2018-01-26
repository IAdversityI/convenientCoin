// introduc.js
var getAllShopId = "/sys/v1/getallshopinfo/";
var myself="";
var theWx=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:{},
    title:"",
    title2:"",
    shopintroduction:"",
    shopimg:"",
    img: ['/img/scene/test29.png', '/img/scene/test29.png', '/img/scene/test29.png', '/img/scene/test29.png'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myself=this;
    var shopInfo = JSON.parse(options.shopInfo);
    this.setData({
      shopInfo: shopInfo,
    });
    myself.getShop();
  
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
  imgchange: function (e) {
    var now = e.detail.current - 0 + 1;
    this.setData({
      now: now
    })
    console.log(e.detail.current)
  },
  getShop: function () {
    var datas = { "shopid": myself.data.shopInfo.id}
    wx.request({
      url: theWx.domain + getAllShopId,
      method: "POST",
      data: datas,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 " },
      success: function (res) {
        if (res.data.status == "success") {
          var shopInfo = res.data.data;
          shopInfo.imgView = myself.data.shopInfo.imgView
          myself.setData({
            shopInfo: shopInfo
          })
          myself.setData({
            title: shopInfo.shopname,
            shopintroduction: shopInfo.shopintroduction,
            shopNotice: shopInfo.shopNotice,
            arriveAt: shopInfo.arriveAt,
            shopphone: shopInfo.shopphone,
            pjpersons: shopInfo.pjpersons,
            shopcrowd: shopInfo.shopcrowd,
            img: shopInfo.imgView
          })
          wx.setNavigationBarTitle({
            title: shopInfo.shopname,
          })
        }

      },
      complete: function (res) {
      }
    })
  },
})