/**
 * Created by LENOVO on 2018/6/26.
 */

$(function () {
  var currentPage = 1;  //当前页
  var pageSize = 5;     //每页多少条

  var currentId;
  var isDelete;

  render();
  function render () {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        var htmlStr = template("tmp", info);
        //console.log(htmlStr);
        $('tbody').html(htmlStr);

        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          //当前页
          currentPage:info.page,
          //总页数
          totalPages:Math.ceil(info.total / info.size),
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            //重新渲染
            render();
          }
        });
      }
    })
  }

  //启用禁用功能, 弹出模态框, 共用一个模态框, 可以用事件委托提高效率
  $('tbody').on("click", ".btn", function () {
    //显示模态框
    $('#userModal').modal('show');
    //点击时,将当前选中的用户id记录在全局currentId中;
    currentId = $(this).parent().data('id');
    //点击禁用按钮,让用户变成禁用状态,isDelete = 0
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  })

  //点击确定按钮, 发送ajax请求,关闭模态框,重新渲染页面
  $('#submitBtn').click(function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        if(info.success) {
          //关闭模态框
          $('#userModal').modal('hide');
          //重新渲染页面
          render();
        }
      }
    })
  })
})