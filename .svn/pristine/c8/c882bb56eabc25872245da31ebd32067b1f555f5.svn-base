var jwttoken = "";
var theWx = getApp();
var myself = "";
var uId = "";
var getmytickets = "/wca/v1/getmytickets";
Page({
  data: {
    nav_class: ["nav_item2", "nav_item", "nav_item"],
    item_isShow: ["show", "none", "none"],
    showtab: 0,  //顶部选项卡索引
    showtabtype: '', //选中类型
    tabnav: {},  //顶部选项卡数据
    testdataall: [],  //所有数据
    data0: [], //数据列表
    data1: [], //数据列表
    data2: [], //数据列表
    marginleft: 0,  //滑动距离
  },
  onLoad: function () {
    myself = this;
    jwttoken = wx.getStorageSync("jwttoken");
    uId = wx.getStorageSync("uId");
    var data_getmytickets0 = { "uid": uId, "status": 0, "currentpage": 1, "type": 1, "isRemind": 0 };
    myself.getRequestByTokent(getmytickets, data_getmytickets0, jwttoken, myself.getMyTic0, "POST");
  },
  onShow: function () {
    if (wx.getStorageSync("isrefresh")) {
      theWx.refresh(this);
    }
  },
  changNav: function (e) {
    var choose = e.currentTarget.dataset.navnum;
    switch (choose - 0) {
      case 0: {
        var data_getmytickets0 = { "uid": uId, "status": 0, "currentpage": 1, "type": 1, "isRemind": 0 };
        myself.getRequestByTokent(getmytickets, data_getmytickets0, jwttoken, myself.getMyTic0, "POST");
        break;
      }
      case 1: {
        var data_getmytickets1 = { "uid": uId, "status": 1, "currentpage": 1, "type": 1, "isRemind": 0 };
        myself.getRequestByTokent(getmytickets, data_getmytickets1, jwttoken, myself.getMyTic1, "POST");
        break;
      }
      case 2: {
        var data_getmytickets2 = { "uid": uId, "status": 2, "currentpage": 1, "type": 1, "isRemind": 0 };
        myself.getRequestByTokent(getmytickets, data_getmytickets2, jwttoken, myself.getMyTic2, "POST");
        break;
      }
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

  setTab: function (e) { //设置选项卡选中索引
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: Number(edata.tabindex),
      showtabtype: edata.type
    })
    this.fetchTabData(edata.tabindex);
  },
  getMyTic0: function (res) {
    var data0 = [];
    if (res.data.status == "success") {
      for (let i = 0; i < res.data.data.length; i++) {
        let row = {};
        row.activeid = res.data.data[i].activeid;
        row.number = res.data.data[i].number;
        row.xytname = res.data.data[i].xytname;
        row.activestime = theWx.fomatDate(res.data.data[i].activestime);
        row.xytprice = res.data.data[i].xytprice;
        row.xytqyxq = theWx.fomatDate(res.data.data[i].xytqyxq);
        row.logo = theWx.domain2 + theWx.getImgURl(res.data.data[i].logo);
        data0.push(row);
      }
    }
    myself.setData({
      data0: data0
    })
  },
  getMyTic1: function (res) {
    var data1 = [];
    if (res.data.status == "success") {
      for (let i = 0; i < res.data.data.length; i++) {
        let row = {};
        row.activeid = res.data.data[i].activeid;
        row.number = res.data.data[i].number;
        row.xytname = res.data.data[i].xytname;
        row.activestime = theWx.fomatDate(res.data.data[i].activestime);
        row.xytprice = res.data.data[i].xytprice;
        row.xytqyxq = theWx.fomatDate(res.data.data[i].xytqyxq);
        row.logo = theWx.domain2 + theWx.getImgURl(res.data.data[i].logo);
        data1.push(row);
      }
    }
    myself.setData({
      data1: data1
    })
  },
  getMyTic2: function (res) {
    var data2 = [];
    if (res.data.status == "success") {
      for (let i = 0; i < res.data.data.length; i++) {
        let row = {};
        row.activeid = res.data.data[i].activeid;
        row.number = res.data.data[i].number;
        row.xytname = res.data.data[i].xytname;
        row.activestime = theWx.fomatDate(res.data.data[i].activestime);
        row.xytprice = res.data.data[i].xytprice;
        row.xytqyxq = theWx.fomatDate(res.data.data[i].xytqyxq);
        row.logo = theWx.domain2 + theWx.getImgURl(res.data.data[i].logo);
      
        data2.push(row);
      }
    }
    myself.setData({
      data2: data2
    })
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
      //  console.log(res);
      //  console.log("--------------------------respoing------------------------------------")
       // console.log(res.data.msg);
       // console.log(res.data.status);
      //  console.log("--------------------------respoing------------------------------------")
        if (res.data.status == "success") {
          callback(res);
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
  gotoDetail:function(e){
    var viewindex = e.currentTarget.dataset.viewindex;
    var types = e.currentTarget.dataset.type - 0;
    var activeDeail = {};
    switch (types){
      case 0: activeDeail = myself.data.data0[viewindex];break;
      case 1: activeDeail = myself.data.data1[viewindex];break;
      case 2: activeDeail = myself.data.data2[viewindex];break;
    } 
    activeDeail.type=0; 
    activeDeail = JSON.stringify(activeDeail);
    wx.navigateTo({
      url: '/pages/my/ticketDetial/ticketDetail?activeDeail=' + activeDeail,
    })
  }
})
