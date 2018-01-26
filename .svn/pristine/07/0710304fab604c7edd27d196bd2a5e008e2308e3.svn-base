// search.js
var searchKey="";
var theWx = getApp();
var myself = "";
var getAllShop = "/sys/v1/getallshop";
var addressCode="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    addressCode = wx.getStorageSync('selectCode');
    myself=this;
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
  search:function(){
    var shopInfo = [];
    myself.setData({
      shopInfo: shopInfo
    })
    var data = { "cityid": addressCode, "keyword": searchKey, "currentpage": 1, "orderby": "shopname" };
    theWx.getRequest(getAllShop, data, myself.getallshop, "POST");   
  },
  setKey:function(e){
    searchKey=e.detail.value;
  },
  getallshop: function (res) {
    var shopInfo = [];
    for (var i = 0; i < res.data.data.shopinfo.length; i++) {
      var shop = {};
      shop.name = res.data.data.shopinfo[i].shopname;
      //shop.img = theWx.domain + res.data.data.shopinfo[i].imgurl;
      shop.img = theWx.domain2 + theWx.getImgURl(res.data.data.shopinfo[i].imgurl);
      shop.location = wx.getStorageSync('selectCity');
      shop.shopId = res.data.data.shopinfo[i].shopid;
      shopInfo.push(shop);
    }
    myself.setData({
      shopInfo: shopInfo
    })
  },
  getValue: function (e) {
    var selectId = e.currentTarget.dataset.shopid;
    addressCode = this.data.addressCode;
    //console.log(selectId);
    wx.navigateTo({
      url: '/pages/scene/detail/detail?choose=' + selectId + "&addressCode=" + addressCode,
    })
  }
})