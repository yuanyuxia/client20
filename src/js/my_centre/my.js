$(function () {
    //查看全部跳转
    $('.get-all-data').on('click',function(){
      window.location.href = '/mission/my_mission.html?status=-1&operateClassification=-1&type=-1'
    })
    userInfo();
    var userId = JSON.parse(storage.get('userInfo')).id;
    console.log(userId);
    getUserStatus();
    $('#share').on('click', function () {
    window.location.href = '/my_centre/share.html?id=' + userId;
  });
})
function userInfo() {
    ajax_get("/auth/user/info", {}, function (res) {
        console.log(res);
        storage.set('userInfo',res.data)
        if(res.code!== 200){
          layer.msg(res.msg);
        }else{
          const userInfo = res.data;
        //用户名字
        $(".messageT .fl h5").text(userInfo.nickName);
        //用户ID
        $(".messageT .fl p").text("ID:"+userInfo.id);
        //用户头像
        // $(".messageT .fr img").attr("src",res.)
          $('.remain_rebate').text(userInfo.amount)
          var checkStatus = userInfo.checkStatus;
          // checkStatus:0-未审核  1-通过  -1表示拒绝
          switch(checkStatus){
            case 0:
              $('.complete').html('<span>请完善个人信息后，才可以接去订单哦～</span>\n' +
                '                <a href="/my_centre/personal.html">去完善</a>')
              break;
            case 1:
              $('.complete').html('')
              break;
            case -1:
              $('.complete').html('<span>'+ userInfo.checkResult +',' + '身份被拒绝</span>\n' +
                '                <a href="/my_centre/personal.html">继续完善</a>')
              break;
          }
        }

    })
}

//完善信息模块 已完善就隐藏  未完善就显示 
function getUserStatus(){
  ajax_get('/auth/user/binding/detail/search',{},function (res){
    if(res.data.checkStatus){
      $('.complete').hide()
    }
  })
}