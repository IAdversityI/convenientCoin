// map.js
var lng, lat, shopName, addressCode;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winheight:"",
    markers: [],
    lng:"",
    lat:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
      lat=options.lat;
      lng=options.lng;
      shopName = options.shopName;
      addressCode = options.addressCode;
      this.setData({
        winheight: winHeight,
        lat: lat,
        lng: lng
      })
      var self=this;
      /*
      var markers = [{
        iconPath: "/img/scene/point.png",
        id: 0,
        latitude: lat,
        longitude: lng,
        width: 20,
        height: 20,
        title: shopName,
        display: 'ALWAYS'
      }];
      */
      wx.request({
        url: app.domain+'/sys/v1/getshopmap',
        method: 'POST',
        header: { "cache-control": "private", "content-type": "application/json; charset=utf-8 " },
        data:{
          "cityid": addressCode,
          "lng": lng,
          "lat": lat,
          shops:[]
        },
        success:function(res){
          var markers=[];
          var shops=[];
          if (res.data.status == "success") {
            for(var i=0;i<res.data.data.length;i++){
              var maker={};
              var callout={};
              shops[i] = res.data.data[i];
              callout.display ="ALWAYS";
              callout.content = res.data.data[i].shopname;
              callout.bgColor="#FFFFFF";
              callout.color="#333333";
              callout.padding="10px";
              maker.iconPath ="/img/scene/point.png";
              maker.id=i;
              maker.latitude = res.data.data[i].lat;
              maker.longitude = res.data.data[i].lng;
              maker.title = res.data.data[i].shopname;
              maker.width=30;
              maker.height=30;
              maker.callout = callout;
              markers.push(maker);
            }
            self.setData({
              markers: markers,
              shops: shops
            })
          }
        }
      })
      
      
     
      /*
      this.setData({
        polyline: polyline,
        markers: markers
      })*/
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
  markertap(e){
    var selectId = this.data.shops[e.markerId].shopid;
    console.log(this.data.shops[e.markerId]);
    addressCode = addressCode;
    wx.navigateTo({
      url: '/pages/scene/detail/detail?choose=' + selectId + "&addressCode=" + addressCode,
    })
  },
})