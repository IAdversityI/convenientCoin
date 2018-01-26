// index.js
var theWx = getApp();
var myself = "";
var getAllShop = "/sys/v1/getallshop";
var addressCode="";
var currentShopType=0;//当前商家类型
var lat,lng;
var shoptype=0;
var distance=0;
Page({
  data: {
    typeName:"商家类型",
    distanceName:"附近",
    shopInfo: [],
    addressPick: theWx.data.city[0].name,
    addressCode:"",
    currentpage:1,
    canSlide:true,
    maskStatus:"none",
    //选择面板初始化数据
    selected: [
                { "status": false, "isSelected": "unselected", "arrow": "icon-sanjiaoxing3", "panel": "none" }, 
                { "status": false, "isSelected": "unselected", "arrow": "icon-sanjiaoxing3", "panel": "none" },
                { "status": false,"isSelected": "unselected", "arrow": "icon-sanjiaoxing3", "panel": "none"}
              ]
    //商家类型初始化数据
    ,shopTypes:[
                { "id": 0, "typeName": "全部", "isSelected": "selected","status": true},
                { "id": 1, "typeName": "吃", "isSelected": "unselected","status": false},
                { "id": 2, "typeName": "住", "isSelected": "unselected", "status": false},
                { "id": 3, "typeName": "行", "isSelected": "unselected", "status": false},
                { "id": 4, "typeName": "游", "isSelected": "unselected", "status": false},
                { "id": 5, "typeName": "购", "isSelected": "unselected", "status": false},
                { "id": 6, "typeName": "娱", "isSelected": "unselected", "status": false}
               ]
    //距离类型初始化数据
    ,distances:[
      { "id": 0,"distance":0.5,"name":"附近500米","isSelected":"selected","status":true},
      { "id": 1,"distance": 1,"name":"附近1公里", "isSelected": "unselected", "status": false },
      { "id": 2,"distance": 5, "name":"附近5公里", "isSelected": "unselected", "status": false },
      { "id": 3,"distance":10, "name":"附近10公里", "isSelected": "unselected", "status": false },
      { "id": 4,"distance":15,"name":"附近15公里", "isSelected": "unselected", "status": false },
      { "id": 5,"distance":20,"name":"附近20公里", "isSelected": "unselected", "status": false }
    ]
  },
  bindPickAddress: function (e) {
   wx.navigateTo({
     url: '../scene/address/address',
   })
  },
  getValue:function(e){
    var selectId = e.currentTarget.dataset.shopid;
    addressCode = this.data.addressCode;
    var shoptype = e.currentTarget.dataset.shoptype;
    //console.log(selectId);
    wx.navigateTo({
      url: '../scene/detail/detail?choose=' + selectId + "&addressCode=" + addressCode + "&shoptype=" + shoptype,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myself = this; 
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
    var city = wx.getStorageSync('selectCity');
     addressCode = wx.getStorageSync('selectCode');  
    if(!city){
      city = "碧江区"
      addressCode = "520602";
      lat= 27.718346;
      lng= 109.191555;
    }    
    //初始化数据
    this.setData({
      addressPick: city,
      addressCode: addressCode,
      canSlide: true,
      currentpage: 1
    }) 
   // var data = { "shoptype": 1,"cityid": addressCode, "keyword": "", "currentpage": 1, "orderby": "shopname" };
   // theWx.getRequest(getAllShop, data, myself.getallshop, "POST");   
    var temp = myself.data.shopTypes;
    for(var i=0;i<temp.length;i++){
      if(temp[i].status){
        myself.setData({
          typeName: temp[i].typeName
        })
      }
    }
    temp = myself.data.distances;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].status) {
        myself.setData({
          distance: temp[i].name
        })
      }
    }
    myself.getallshop(currentShopType,distance);
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
    if (myself.data.canSlide){
      var currentpage = myself.data.currentpage+1;
      myself.setData({
        currentpage:currentpage
      })
      myself.loadShop();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //距离选择器
  changDistance:function(e){
    var distance_tmp = e.currentTarget.dataset.distance;
    distance=e.currentTarget.dataset.selectdistance;
    var temp = myself.data.distances;
    myself.setData({
      canSlide: true,
      currentpage: 1
    })
    console.log(distance);
    myself.getallshop(shoptype, e.currentTarget.dataset.selectdistance);
    for (var i = 0; i < temp.length; i++) {
      if (distance_tmp == i) {
        temp[i].isSelected = "selected";
        temp[i].status = true;
        myself.setData({
          distanceName: temp[i].name
        })
      } else {
        temp[i].isSelected = "unSelected";
        temp[i].status = false;
      }
    }
    myself.setData({
      distances: temp,
    })
    temp = myself.data.selected;
    for (var i = 0; i < temp.length; i++) {
      temp[i].isSelected = "unSelected";
      temp[i].arrow = "icon-sanjiaoxing3";
      temp[i].panel = "none"
      temp[i].selected = false;
    }
    myself.setData({
      selected: temp,
      maskStatus: "none"
    })
  },
  //商家选择器
  changNav: function (e) {
    var choose = e.currentTarget.dataset.navnum;
    currentShopType=choose;
    shoptype = choose;
    myself.setData({
      canSlide:true,
      currentpage:1
    })
    myself.getallshop(shoptype, distance);
   // theWx.getRequest(getAllShop, data, myself.getallshop, "POST");  
    var temp = myself.data.shopTypes;
    for(var i=0;i<temp.length;i++){
      if (choose==i){
          temp[i].isSelected = "selected";
          temp[i].status=true;
          myself.setData({
            typeName: temp[i].typeName
          })
      }else{
          temp[i].isSelected = "unSelected";
          temp[i].status = false;
      }
    }
    myself.setData({
      shopTypes:temp,
      maskStatus:"none"
    })
    temp = myself.data.selected;
    for (var i = 0; i < temp.length; i++) {
        temp[i].isSelected = "unSelected";
        temp[i].arrow = "icon-sanjiaoxing3";
        temp[i].panel = "none"
        temp[i].selected = false;
    }
    myself.setData({
      selected: temp
    })
  },
  //获取商家数据
  getallshop: function (s, d){
    var shopInfo = [];
    var currentpage = myself.data.currentpage;
    myself.setData({
      shopInfo: shopInfo
    }) 
    wx.showLoading({
      title: '加载中',
    })
    var datas ={};
    if (s!=0){
      datas = { "shoptype": s-0, "cityid": addressCode, "currentpage": 1, "orderby": "shopname" };
    }else{
      datas = { "cityid": addressCode, "currentpage": 1, "orderby": "shopname"};
    }
    if (!(lat == 0 || lng == 0 || distance == 0)) {
      datas.lat = lat + "";
      datas.lng = lng + "";
      datas.distance = d + "";
    }
    console.log(datas);
    wx.request({
      url: theWx.domain + "/sys/v1/getallshop",
      method: "POST",
      data: datas,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 " },
      success: function (res) {
        var pageCount = 0;
        if (res.data.data) {
          pageCount = res.data.data.pagecount;
        }

        if (currentpage >= pageCount) {
          myself.setData({
            canSlide: false
          })
        }
        if (res.data.status == "success") {
          var shopInfo = [];
          for (var i = 0; i < res.data.data.shopinfo.length; i++) {
            var shop = {};
            shop.name = res.data.data.shopinfo[i].shopname;
            shop.img = theWx.domain2 + theWx.getImgURl(res.data.data.shopinfo[i].imgurl);
            shop.location = wx.getStorageSync('selectCity');
            shop.shopId = res.data.data.shopinfo[i].shopid;
            shop.shoptype = res.data.data.shopinfo[i].shoptype;
            shopInfo.push(shop);
          }
          myself.setData({
            shopInfo: shopInfo
          }) 
        }else{
          var shopInfo = [];
          myself.setData({
            shopInfo: shopInfo
          }) 
        }

      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  //搜索商家
  search:function()
  {
   wx.navigateTo({
     url: '/pages/scene/search/search',
   })
  },
  //选择面板
  getOption:function(e){
    var choose = e.currentTarget.dataset.option;
    var temp = myself.data.selected;
    var maskStatus="none";
    for(var i=0;i<temp.length;i++){
      if(i==choose){
        if (temp[i].selected){
          temp[i].isSelected = "unSelected";
          temp[i].arrow = "icon-sanjiaoxing3";
          temp[i].panel = "none";
          temp[i].selected = false;
          maskStatus = temp[i].panel;
        }else{
          temp[i].isSelected = "selected";
          temp[i].arrow = "icon-sanjiaoxing";
          temp[i].panel = "block";
          temp[i].selected = true;
          maskStatus = temp[i].panel;
        }
      }else{
        temp[i].isSelected = "unSelected";
        temp[i].arrow = "icon-sanjiaoxing3";
        temp[i].panel = "none" 
        temp[i].selected = false;
      }
    }
    myself.setData({
      selected: temp,
      maskStatus: maskStatus
    })
  },
  //上拉加载信息
  loadShop:function(){
    var currentpage = myself.data.currentpage;
    wx.showLoading({
      title: '加载中',
    })
    var datas = {};
    if (currentShopType != 0) {
      datas = { "shoptype": currentShopType - 0, "cityid": addressCode, "currentpage": currentpage, "orderby": "shopname" };
    } else {
      datas = { "cityid": addressCode, "currentpage": currentpage, "orderby": "shopname" };
    }
    if (!(lat==0 || lng==0 || distance==0)){
      datas.lat = lat + "";
      datas.lng = lng + "";
      datas.distance = distance + "";
    }
   
    console.log(datas);
    wx.request({
      url: theWx.domain + "/sys/v1/getallshop",
      method: "POST",
      data: datas,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 " },
      success: function (res) {
        console.log(res);
        var pageCount =0;
        if (res.data.data.pagecount){
          pageCount = res.data.data.pagecount;
        }
     
        if (currentpage >= pageCount){
          myself.setData({
            canSlide:false
          })
        }
        if (res.data.status == "success") {
          var shopInfo = myself.data.shopInfo;
          for (var i = 0; i < res.data.data.shopinfo.length; i++) {
            var shop = {};
            shop.name = res.data.data.shopinfo[i].shopname;
            shop.img = theWx.domain2 + theWx.getImgURl(res.data.data.shopinfo[i].imgurl);
            shop.location = wx.getStorageSync('selectCity');
            shop.shopId = res.data.data.shopinfo[i].shopid;
            shop.shoptype = res.data.data.shopinfo[i].shoptype;
            shopInfo.push(shop);
          }
          myself.setData({
            shopInfo: shopInfo
          })
        } else {
          myself.setData({
            canSlide: false
          })
        }

      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  hideMask:function(){
    var temp = myself.data.selected;
    var maskStatus = "none";
    for (var i = 0; i < temp.length; i++) {
        temp[i].isSelected = "unSelected";
        temp[i].arrow = "icon-sanjiaoxing3";
        temp[i].panel = "none"
        temp[i].selected = false;
    }
    myself.setData({
      selected: temp,
      maskStatus: maskStatus
    })
  }
})