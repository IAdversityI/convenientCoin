var theWx=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurls:"../../img/my/boult.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("imrefreshing!");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync("isrefresh")){
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
  goTomember:function(){
    if (wx.getStorageSync("jwttoken")) {
      wx.navigateTo({
        url: '/pages/my/member/memberDetail/memberDetail',
        //url:'/pages/my/member/member',
      })
    } else {
      console.log("getUserInfo");
      this.showUserInfo();
    }
    if (wx.getStorageSync("jwttoken") && !wx.getStorageSync("expire")) {
      wx.navigateTo({
        url: '/pages/my/member/member',
      })
    }else{
     
    }
  
  }, 
  goChangPass: function () {
    if (wx.getStorageSync("jwttoken")) {
      wx.navigateTo({
        url: '/pages/my/changePassword/changePassword',
        //url:'/pages/my/member/member',
      })
    } else {
      console.log("getUserInfo");
      this.showUserInfo();
    }
    if (wx.getStorageSync("jwttoken") && !wx.getStorageSync("expire")) {
      wx.navigateTo({
        url: '/pages/my/member/member',
      })
    } else {
     
    }
   
  }, 
  goMyTick: function () {
    if (wx.getStorageSync("jwttoken")) {
      wx.navigateTo({
        url: '/pages/my/myTickets/myTickets',
        //url:'/pages/my/member/member',
      })
    } else {
      console.log("getUserInfo");
      this.showUserInfo();
    }
    if (wx.getStorageSync("jwttoken") && !wx.getStorageSync("expire")) {
      wx.navigateTo({
        url: '/pages/my/member/member',
      })
    } else {
      
    }
    
  }, 
  goQuan: function () {
    if (wx.getStorageSync("jwttoken")) {
      wx.navigateTo({
        url: '/pages/my/myArch/myArch',
        //url:'/pages/my/member/member',
      })
    } else {
      console.log("getUserInfo");
      this.showUserInfo();
    }
    if (wx.getStorageSync("jwttoken") && !wx.getStorageSync("expire")) {
      wx.navigateTo({
        url: '/pages/my/member/member',
      })
    } else {
      
    }
   
  }, 
  golq: function () {
    if (wx.getStorageSync("jwttoken")) {
      wx.navigateTo({
        url: '/pages/my/adventRemind/adventRemind',
        //url:'/pages/my/member/member',
      })
    } else {
      console.log("getUserInfo");
      this.showUserInfo();
    }
    if (wx.getStorageSync("jwttoken") && !wx.getStorageSync("expire")) {
      wx.navigateTo({
        url: '/pages/my/member/member',
      })
    } else {
     
    }
   
  }, 
  goblk: function () {
    if (wx.getStorageSync("jwttoken")) {
      wx.navigateTo({
        url: '/pages/my/changeBlk/changeBlk',
        //url:'/pages/my/member/member',
      })
    } else {
      console.log("getUserInfo");
      this.showUserInfo();
    }
    if (wx.getStorageSync("jwttoken") && !wx.getStorageSync("expire")) {
      wx.navigateTo({
        url: '/pages/my/member/member',
      })
    } else {

    }

  }, 
  showUserInfo:function (){
    wx.navigateTo({
      url: '/pages/my/get-user-info/get-user-info',
    })
  },
  callTheService:function(){
    wx.makePhoneCall({
      phoneNumber: '10086' //仅为示例，并非真实的电话号码
    })
  }

})