/**
 * Created by LENOVO on 2018/6/25.
 */

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

