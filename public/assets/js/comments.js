/*
 * @Author: your name
 * @Date: 2019-12-15 09:30:28
 * @LastEditTime: 2019-12-15 11:13:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12-alibaixiu\alibaixiu\public\assets\js\comments.js
 */
// 查询评论数据,渲染页面
// $.ajax({
//     type: "get",
//     url: "/comments",
//     success: function (response) {
//         var html = template('commentsTpl', response)
//         console.log(html);
//         $('#commentsBox').html(html)
//         var page = template('pageTpl', response)
//         $('#pageBox').html(page)
//     }
// });
// 实现分页方法
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data:{
            page:page
        },
        success: function (response) {
            var html = template('commentsTpl', response)
            console.log(html);
            $('#commentsBox').html(html)
            var page = template('pageTpl', response)
            $('#pageBox').html(page)
        }
    });
}
changePage(1)  //相当于上面注释的ajax请求