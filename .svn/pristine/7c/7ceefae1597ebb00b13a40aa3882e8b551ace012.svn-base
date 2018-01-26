// adventRemind.js
var jwttoken = "";
var theWx = getApp();
var myself = "";
var uId = "";
var getmytickets = "/wca/v1/getmytickets";   
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_class: ["nav_item2", "nav_item"],
    item_isShow: ["show", "none"],
    data0:[],
    data1:[]
  },
  changNav: function (e) {
    var choose = e.currentTarget.dataset.navnum;
    if(choose==0){
      var data_getmytickets0 = { "uid": uId, "status": "0", "currentpage": 1, "type": 1, "isRemind": 1 };
      myself.getRequestByTokent(getmytickets, data_getmytickets0, jwttoken, myself.getMyTic0, "POST");
    }else{
      var data_getmytickets1 = { "uid": uId, "status": "0", "currentpage": 1, "type": 2, "isRemind": 1 };
      myself.getRequestByTokent(getmytickets, data_getmytickets1, jwttoken, myself.getMyTic1, "POST");
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myself = this;
    jwttoken = wx.getStorageSync("jwttoken");
    uId = wx.getStorageSync("uId");
    var data_getmytickets0 = { "uid": uId, "status": "0", "currentpage": 1, "type": 1, "isRemind": 1 };
    myself.getRequestByTokent(getmytickets, data_getmytickets0, jwttoken, myself.getMyTic0, "POST");
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
      theWx.refresh(this);
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
  getMyTic0(res){
    var data0 = [];
    if (res.data.status == "success") {
      for (let i = 0; i < res.data.data.length; i++) {
        let row = {};
        row.activeid = res.data.data[i].activeid;
        row.number = res.data.data[i].number;
        row.xytname = res.data.data[i].xytname;
        row.activenotes = res.data.data[i].activenotes;
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
        row.activenotes = res.data.data[i].activenotes;
        row.activestime = theWx.fomatDate(res.data.data[i].activestime);
        row.xytname = res.data.data[i].xytname;
        row.xytprice = res.data.data[i].xytprice;
        row.xytqyxq = theWx.fomatDate(res.data.data[i].xytqyxq);
       // row.logo = theWx.domain + res.data.data[i].logo;
        row.logo = theWx.domain2 + theWx.getImgURl(res.data.data[i].logo);
        data1.push(row);
      }
    }
    myself.setData({
      data1: data1
    })
  },
  gotoDetail: function (e) {
    var viewindex = e.currentTarget.dataset.viewindex;
    var types = e.currentTarget.dataset.type - 0;
    var activeDeail = {};
    switch (types) {
      case 0: activeDeail = myself.data.data0[viewindex]; activeDeail.type = 0;break;
      case 1: activeDeail = myself.data.data1[viewindex]; activeDeail.type = 1;break;
    }
    activeDeail = JSON.stringify(activeDeail);
    wx.navigateTo({
      url: '/pages/my/ticketDetial/ticketDetail?activeDeail=' + activeDeail,
    })
  }
})



