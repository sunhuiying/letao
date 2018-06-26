/**
 * Created by LENOVO on 2018/6/26.
 */

$(function () {
  //获取一级分类,渲染到页面
  //一进入页面,渲染当前页

  var currentPage = 1;
  var pageSize = 2;
  render();
 function render() {
   $.ajax({
     type: 'get',
     url: '/category/queryTopCategoryPaging',
     data: {
       page: currentPage,
       pageSize: pageSize
     },
     dataType: 'json',
     success: function (info) {
       //console.log(info);
       var htmlStr = template( "tpl", info );
       $('tbody').html( htmlStr );

       //分页功能
       $('#paginator').bootstrapPaginator({
         bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
         currentPage: info.page,//当前页
         totalPages:Math.ceil(info.total / info.size),//总页数

         onPageClicked:function(event, originalEvent, type,page){
           //为按钮绑定点击事件 page:当前点击的按钮值
           currentPage = page;
           render();
         }
       });

     }
   })
 }

  //功能实现

  //显示模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');
  });

  //添加校验功能
  $('#form').bootstrapValidator({
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类名称不能为空"
          }
        }
      }
    }
  });

  //阻止默认提交
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();
    //使用ajax提交
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        if(info.success) {
          //关闭模态框
          $('#addModal').modal('hide');
          //重新渲染第一页
          currentPage = 1;
          render();
          //重置表单样式
          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})