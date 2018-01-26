// detail.js
var shopId = "";
var addressCode = "";
var theWx = getApp();
var myself = "";
var jwttoken = "";
var uId = "";
var getAllShopId = "/sys/v1/getallshopinfo/";
var getShopPushedActives = "/sys/v1/getShopPushedActives/";
var receiveticket = "/wca/v1/receiveticket";
var pageSize=12;
var isLastPageT=false;
var pageT=1;
var isLastPageQ = false;
var pageQ = 1;
var tab=0;
var imgView=[];
var shopBg = ["/img/03_02.png","/img/sjbg.png"];
Page({
  /**.
   * 页面的初始数据
   */
  data: {
    now: 1,
    all: 1,
    img: [],
    mask: "none",
    winHeight: "500",
    detail_view: "",
    tip1: "",
    tip2:0,
    isTick: true,
    location: "",
    lng: "",
    nav_class: ["nav_item2", "nav_item", "nav_item", "nav_item"],
    item_isShow: ["show", "none", "none", "none"],
    shopNoticBg: shopBg[1],
    ticks: [],
    quans: [],
    shopInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    pageSize = 12;
    isLastPageT = false;
    pageT = 1;
    isLastPageQ = false;
    pageQ = 1;
    tab = 0;
    console.log(options);
    if (options.shoptype==4){
      this.setData({
        shopNoticBg:shopBg[0]
      })
    }
    myself = this;
    shopId = options.choose - 0;
    addressCode = options.addressCode;
    jwttoken = wx.getStorageSync("jwttoken");
    uId = wx.getStorageSync("uId");
    var data_AllShopId = { "shopid": shopId };
    var data_ShopPushedActives = { "shopid": shopId, "activetypeid": 1, "activeStatus": 1, "currentpage": 1, "pagesize": 12 };
    myself.getShop(data_AllShopId);
  },

  imgchange: function (e) {
    var now = e.detail.current - 0 + 1;
    this.setData({
      now: now
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
     
    if (wx.getStorageSync("isrefresh")) {
      jwttoken = wx.getStorageSync("jwttoken");
      uId = wx.getStorageSync("uId");
    }
    // console.log(shopId + " " + "test");
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    myself = this;
    jwttoken = wx.getStorageSync("jwttoken");
    uId = wx.getStorageSync("uId");

    this.setData({
      winHeight: winHeight,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  getShop: function (datas) {
    wx.request({
      url: theWx.domain + getAllShopId,
      method: "POST",
      data: datas,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 " },
      success: function (res) {
        if (res.data.status == "success") {
          myself.getTheShopInfo(res);
        }
      },
      complete: function (res) {
      }
    })
  },
  getTheShopInfo: function (res) {
    console.log(res);
    var data_ShopPushedActives = { "shopid": shopId, "activetypeid": 1, "activeStatus": 1, "currentpage": 1, "pagesize": 12 };
    myself.getTick(data_ShopPushedActives);
    //theWx.getRequest(getShopPushedActives, data_ShopPushedActives, myself.getTick, "POST");   
    var tip1 = res.data.data.shopname;
    var location = res.data.data.shopaddress;
    var lng = res.data.data.lng;
    var lat = res.data.data.lat;
    var detail_view = "";
    var imageSrc = res.data.data.imgurl;
    var imgs = imageSrc.split("|");
    imgView=[];
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i]) {
        imgView[imgView.length] = theWx.domain2+imgs[i];
      }
    }
    this.setData({
      img: imgView
    })
    console.log(imgView);
    var tip2 = imgView.length;
    var shopInfo = res.data.data;
    //console.log(shopInfo);
    myself.setData({
      tip1: tip1,
      location: location,
      lng: lng,
      lat: lat,
      tip2: tip2,
      detail_view: imgView[0],
      shopInfo: shopInfo,
      shopNotice: shopInfo.shopNotice,
    })
    wx.setNavigationBarTitle({
      title: tip1,
    })
  },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /*--------------------------------------------------------------------------------------------------------------------------*/
  changNav: function (e) {
    var choose = e.currentTarget.dataset.navnum;
    if (choose == 0) {
      tab=0;
      var data_ShopPushedActives = { "shopid": shopId - 0, "activetypeid": 1, "activeStatus": 1, "currentpage": pageQ, "pagesize": 12 };
      this.getTick(data_ShopPushedActives);
      //theWx.getRequest(getShopPushedActives, data_ShopPushedActives, myself.getTick, "POST");
    } else if (choose == 1) {
      tab = 1;
      var data_ShopPushedActives = { "shopid": shopId - 0, "activetypeid": 2, "activeStatus": 1, "currentpage": pageT, "pagesize": 12 };
      this.getQuan(data_ShopPushedActives);
      //theWx.getRequest(getShopPushedActives, data_ShopPushedActives, myself.getQuan, "POST");
    }
    var className = ["nav_item", "nav_item2"];
    var display = ["none", "show"];
    var navclass = this.data.nav_class;
    var itemisShow = this.data.item_isShow;
    for (var i = 0; i < navclass.length; i++) {
      navclass[i] = className[0];
    }
    for (var i = 0; i < itemisShow.length; i++) {
      itemisShow[i] = display[0];
    }
    navclass[choose] = className[1];
    itemisShow[choose] = display[1];
    this.setData({
      nav_class: navclass,
      item_isShow: itemisShow
    })
  },
  intoIntroduce: function () {
    //console.log(this.data.shopInfo);
    var shopInfo = {};
    shopInfo.id = shopId;
    shopInfo.imgView = imgView;
    shopInfo = JSON.stringify(shopInfo);
    wx.navigateTo({
      url: '../introduce/introduc?shopInfo=' + shopInfo,
    })
  },
  /*--------------------------------------------------------------------------------------------------------------------------*/
  tapTick: function (e) {
    var viewindex = e.currentTarget.dataset.viewindex;
    var types = e.currentTarget.dataset.type - 0; 
    wx.showLoading({
      title: '正在加载...',
    })
    if (wx.getStorageSync("login")) {
      switch (types) {
        case 0: {
          myself.setData({
            isTick: true,
          })
          var tick = {};
          tick.activeid = this.data.ticks[viewindex].activeid;
          tick.activeprice = this.data.ticks[viewindex].price;
          tick.logo = this.data.ticks[viewindex].src;
          tick.activename = this.data.ticks[viewindex].name;
          tick.activestime = this.data.ticks[viewindex].activestime;
          tick.activeetime = this.data.ticks[viewindex].activeetime;
          tick.activeperson = this.data.ticks[viewindex].activeperson;
          tick.unusedactive = this.data.ticks[viewindex].unusedactive;
          tick.type = 0;
          var indentData = JSON.stringify(tick);
          wx.hideLoading();
          wx.navigateTo({
            url: '../indent/indent?indentData=' + indentData,
          })
          break;
        }
        case 1: {
          //if (false) {
          myself.setData({
            isTick: false,
          })
          var data_receiveticket = { "uId": uId, "activeid": this.data.quans[viewindex].activeid };
          wx.hideLoading();
          myself.receiveticket(data_receiveticket, jwttoken);
            //theWx.getRequestByTokent(receiveticket, data_receiveticket, jwttoken, myself.successGetT, "POST");
          break;
        }
      }
    } else {
      wx.hideLoading();
      this.showUserInfo();
    }
    if (wx.getStorageSync("jwttoken") && !wx.getStorageSync("expire")) {
      wx.navigateTo({
        url: '/pages/my/member/member',
      })
    } else {
    }
  },
  /*--------------------------------------------------------------------------------------------------------------------------*/
  successGetT: function (res) {
    if (res.data.status == "success") {
      myself.setData({
        mask: "show"
      })
    } else {
      wx.showModal({
        title: '领取失败',
        content: '该票券领取失败',
        success: function (res) {
          if (res.confirm) {
          } else {
          }
        }
      })
    }
  },
  continueView: function () {
    this.setData({
      mask: "none"
    })
  },
  gotoMy: function () {
    var isTick = this.data.isTick;
    if (isTick) {
      myself.setData({
        mask: "none",
        isTick: false,
      });
      wx.navigateTo({
        url: '/pages/my/myTickets/myTickets',
      })
    } else {
      myself.setData({
        mask: "none",
        isTick: false,
      });
      wx.navigateTo({
        url: '/pages/my/myArch/myArch',
      })
    }

  },
  gotomap: function () {
    wx.navigateTo({
      url: '/pages/scene/map/map?lat=' + this.data.lat + "&lng=" + this.data.lng + "&shopName=" + this.data.tip1 + "&addressCode=" + addressCode
    })
  },
  gotopicture: function () {
    var shopimg = JSON.stringify(imgView);
    wx.navigateTo({
      url: '/pages/scene/pictrue/pictrue?shopimg=' + shopimg,
    })
  },
  gotobuydetial: function () {
    wx.navigateTo({
      url: '/pages/scene/buydetail/buydetail',
    })
  },
 
  getTick: function (datas) {
    console.log("------------sending----------------");
    console.log(datas);
    console.log("------------sending----------------");
    wx.request({
      url: theWx.domain + getShopPushedActives,
      method: "POST",
      data: datas,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 " },
      success: function (res) {
        if (res.data.status == "success") {
          var ticks = myself.data.ticks;
          if (!isLastPageT){
            for (var i = 0; i < res.data.data.active.length; i++) {
              pageT++;
              if (res.data.data.active.length < pageSize) {
                isLastPageT = true;
              }
              var tick = {};
              tick.name = res.data.data.active[i].activename;
              tick.price = res.data.data.active[i].activeprice;
              tick.src = theWx.domain2 +theWx.getImgURl(res.data.data.active[i].logo);
              //tick.src = "/img/mp1.jpg";
              tick.activeperson = res.data.data.active[i].activeperson;
              tick.unusedactive = res.data.data.active[i].unusedactive;
              tick.activeid = res.data.data.active[i].activeid;
              tick.activeinfo = res.data.data.active[i].activeinfo;
              tick.activestime = theWx.fomatDate(res.data.data.active[i].activestime);
              tick.activeetime = theWx.fomatDate(res.data.data.active[i].activeetime);
              ticks.push(tick);
            }
            myself.setData({
              ticks: ticks,
            })
          }
          
        }

      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  /*--------------------------------------------------------------------------------------------------------------------------*/
  getQuan: function (datas) {
    console.log("------------sending----------------");
    console.log(datas);
    console.log("------------sending----------------");
    wx.request({
      url: theWx.domain + getShopPushedActives,
      method: "POST",
      data: datas,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 " },
      success: function (res) {
        console.log("------------respon----------------");
        console.log(res);
        console.log("------------respon----------------");
        if (res.data.status == "success") {
          var quans = myself.data.quans;
          if(!isLastPageQ){
            for (var i = 0; i < res.data.data.active.length; i++) {
              pageQ++;
              if (res.data.data.active.length<pageSize){
                isLastPageQ=true;
              }
              var quan = {};
              quan.activestime = theWx.fomatDate(res.data.data.active[i].activestime);
              quan.activeetime = theWx.fomatDate(res.data.data.active[i].activeetime);
              quan.activeperson = res.data.data.active[i].activeperson;
              quan.unusedactive = res.data.data.active[i].unusedactive;
              quan.name = res.data.data.active[i].activename;
              quan.price = "￥" + res.data.data.active[i].activecoin;
              quan.type = res.data.data.active[i].activenotes;
              quan.activeid = res.data.data.active[i].activeid;
              quan.activeinfo = res.data.data.active[i].activeinfo;
              quan.src = theWx.domain2 + theWx.getImgURl(res.data.data.active[i].logo);
              quan.buy_type = "免费领取";
              quan.status = "已抢" + Math.round(res.data.data.active[i].unusedactive / res.data.data.active[i].activeperson * 100) + "%";
              quans.push(quan);
            }
            //console.log(self)
            myself.setData({
              quans: quans
            })
          }
        
        }

      },
      complete: function (res) {
      }
    })
  },
  
  showUserInfo() {
    wx.navigateTo({
      url: '/pages/my/get-user-info/get-user-info',
    })
  },
  onReachBottom() {
    if (tab == 0) {
      var data_ShopPushedActives = { "shopid": shopId - 0, "activetypeid": 1, "activeStatus": 1, "currentpage": pageQ, "pagesize": 12 };
      this.getTick(data_ShopPushedActives);
      console.log(isLastPageT);
      //theWx.getRequest(getShopPushedActives, data_ShopPushedActives, myself.getTick, "POST");
    } else if (tab == 1) {
      var data_ShopPushedActives = { "shopid": shopId - 0, "activetypeid": 2, "activeStatus": 1, "currentpage": pageT, "pagesize": 12 };
      this.getQuan(data_ShopPushedActives);
      //theWx.getRequest(getShopPushedActives, data_ShopPushedActives, myself.getQuan, "POST");
    }
  },
  // test: function () {
  //   console.log("your mother fucker")
  // },
/*--------------------------------------------------------------------------------------------------------------------------*/
  receiveticket: function (datas, token) {
    var self = this;
    wx.request({
      url: theWx.domain + receiveticket,
      method: "POST",
      data: datas,
      header: { "cache-control": "private", "Content-Type": "application/json; charset=utf-8 ", "Authorization": token },
      success: function (res) {
        if (res.data.status == "success") {
          myself.successGetT(res);
        }
        else if ((res.data.status - 0) == 0) {
          myself.successGetT(res);
        } else if (res.data.msg == "token已过期。") {
          wx.setStorageSync("expire", 'true');
          theWx.login();
        } else {
          wx.showModal({
            title: "领取票/券失败",
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
              } else {
              }
            }
          })
        }

      },
      complete: function (res) {
      }
    })
  },
  gotoLocation:function(){
    console.log(myself.data.shopInfo);
    wx.openLocation({
      latitude: myself.data.shopInfo.lat,
      longitude: myself.data.shopInfo.lng,
      scale: 18,
      name: myself.data.shopInfo.shopname,
      address: myself.data.shopInfo.shopaddress
    })
  }
  /*--------------------------------------------------------------------------------------------------------------------------*/
})
