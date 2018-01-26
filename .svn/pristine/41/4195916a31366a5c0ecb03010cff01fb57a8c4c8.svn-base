// login.js
var app = getApp();
var myself="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // "username": "string",
    // "password": "string"
    userInfo: {},
    userName: '',
    userPassword: '',
    post: [],
    coment: [],
    responseData: '',
    boo: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

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
  logIn: function () {
    var that = this;
    console.log(that.data.userName + " " + that.data.userPassword);
    var data_login = {username: myself.data.userName, password: myself.data.userPassword};
    var login = "/sys/v1/login/";
    app.getRequest(login, data_login, myself.loged, "POST");
  },  
     

    /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {

    },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  boo: function () {
    this.setData({
      boo: !this.data.boo
    });
  },
  loged:function(res){
    if(res.data.status=="success"){
      console.log("successLogdin!");
    }
  }
})