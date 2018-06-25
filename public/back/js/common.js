/**
 * Created by LENOVO on 2018/6/25.
 */

//5. 拦截登录页面
//访问后台,如果登录过,地址栏会有login.html
if(location.href.indexOf('login.html') === -1) {
  //通过ajax拦截
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      if(info.error === 400) {
        location.href = 'login.html'
      }
      
      if(info.success) {
        console.log('用户登陆过');
      }
    }
  })
}


//注册ajax全局事件,实现所有页面的进度条
//第一个ajax发送时,就开启进度条
$(document).ajaxStart(function () {
  NProgress.start();
});

//所有的ajax请求结束,设置延迟,关闭进度条
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  },500)
})

//公共功能
$(function () {
  //1. 左侧二级菜单显示与隐藏
    $('.lt_aside .category').click(function () {
      $('.lt_aside .child').stop().slideToggle();
    });

  //2. 侧边栏隐藏
    $('.icon-menu').click(function () {
      $('.lt_main').toggleClass('hidemenu');
      $('.lt_aside').toggleClass('hidemenu');
      $('.lt_topbar').toggleClass('hidemenu');
    });


  //3. 点击退出按钮,设置退出或显示模态框
    $('.icon-logout').click(function () {
      $('#logoutModal').modal("show");
    })

  //4. 点击模态框中的退出按钮,退出到首页(ajax)
    $('#logoutBtn').click(function () {
      $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        dataType: 'json',
        success: function (info) {
          console.log(info);
          if(info.success) {
            location.href = "login.html"
          }
        }
      })
    })
})

