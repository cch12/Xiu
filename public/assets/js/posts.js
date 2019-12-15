/*
 * @Author: your name
 * @Date: 2019-12-14 00:03:59
 * @LastEditTime: 2019-12-15 08:58:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12-alibaixiu\alibaixiu\public\assets\js\posts.js
 */
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            console.log(response);

            var html = template('postsTpl', response)
            $('#postsBox').html(html)
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    });
}
changePage(1) 
//向服务器发送请求,接收数据渲染文章列表页面
/* $.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        console.log(response);
        // 渲染文章列表
        var html = template('postsTpl', response)
        $('#postsBox').html(html)
        // 渲染分页
        var page = template('pageTpl', response)
        $('#page').html(page)
    }
}); */


//处理日期时间的方法
function formateDate(date) {
    //将日期时间字符串转换成日期对象
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
// 切换页面

// 文章分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', { data: response })
        $('#categoryBox').html(html)
    }
});
// 筛选
$('#filterForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            console.log(response);

            var html = template('postsTpl', response)
            $('#postsBox').html(html)
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    });

    return false
});
// 删除文章功能
$("#postsBox").on('click', '.delete', function () {
    var id = $(this).attr('data-id')
    del('/posts/', id)
});