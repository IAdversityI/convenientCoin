// pictrue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    now:1,
    all:1,
    img: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var shopimg = JSON.parse(options.shopimg);
    var shopimg = JSON.parse(options.shopimg);
    console.log(options.shopimg);
    var img=[];
    img = shopimg;
    this.setData({
      img: img
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
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var all = this.data.img.length;
    console.log(all);
    this.setData({
      winHeight: winHeight,
      all:all
    });
    wx.setNavigationBarTitle({
      title:"查看图片",
    })
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
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  imgchange:function(e){
    var now = e.detail.current-0+1;
    this.setData({
      now:now
    })
    console.log(e.detail.current)
  }
})