/*
 * @Author: your name
 * @Date: 2019-12-13 14:59:58
 * @LastEditTime: 2019-12-14 16:10:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12-alibaixiu\alibaixiu\public\assets\js\category.js
 */
// 从数据库获取分类,渲染列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // 将返回的数据和模板进行拼接
        var html = template('categoryListTpl', { data: response })
        $('#categoryBox').html(html)
    }
});
// 添加文章分类
$('#addCategory').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
});
//编辑模板拼接
$('#categoryBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
            var html = template('modifyCategoryTpl', response)
            $('#formBox').html(html)
        }
    });
});
//编辑内容修改,重新加载页面
$('#formBox').on('submit', '#modifyCategory', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
});
// 单行删除按钮功能
$('#categoryBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id')
    del('/categories/',id)
});
function formateDate(date) {
    //将日期时间字符串转换成日期对象
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

