/**
 * Created by LENOVO on 2018/6/25.
 */

/*
  1. 进行表单校验配置
 *    校验要求:
 *        (1) 用户名不能为空, 长度为2-6位
 *        (2) 密码不能为空, 长度为6-12位
*/

$(function () {
  $('#form').bootstrapValidator({
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',  //校验成功及图标
      invalid: 'glyphicon glyphicon-remove',  //校验失败
      validating: 'glyphicon glyphicon-refresh'  //校验中
    },
    //指定校验字段
    fields: {
      username: {
        validators: {
          //非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          //校验长度
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在2-6位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      //配置校验规则
      password: {
        validators: {
          //非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          //校验长度
          stringLength: {
            min: 2,
            max: 12,
            message: "密码长度必须在2-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  /*
   * 2. ajax提交  表单校验插件
   * */
  $('#form').on("success.form.bv", function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if(info.success) {
          location.href = "index.html"
        }
        if(info.error === 1000) {
          //console.log("用户名错误");
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error === 1001) {
          //console.log("密码错误");
          $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    })
  });

  /*
  * 3. 重置内容及校验状态
  * */

  $('[type = "reset"]').on("click", function () {
    //调用插件提供的方法
    $('form').data("bootstrapValidator").resetForm();
  })

});



