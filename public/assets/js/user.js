/*
 * @Author: your name
 * @Date: 2019-12-12 15:03:15
 * @LastEditTime: 2019-12-12 20:11:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12-alibaixiu\alibaixiu\public\assets\js\user.js
 */
// 获取数据展示用户列表
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        console.log(response);
        var html = template('userTpl', { data: response });
        $('#userBox').html(html)
    }
});

//添加用户
$('#userForm').on('submit', function () {
    // 获取表单 输入的数据,并转换成参数字符串
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function () {
            location.reload()
        },
        error: function (err) {
            var res = JSON.parse(err.responseText)
            alert(res.message)
        }
    });
    return false
});

//图片
$('#avatar').on('change', function () {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        //告诉$.ajax不要解析请求参数
        processData: false,
        //告诉$.ajax不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)

        }
    });
});

// 编辑展示信息功能
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: '/users/' + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl', response)
            $('#modifyBox').html(html)
        }
    });
});

//为修改表单添加提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function (response) {
            //修改用户信息,重新加载页面
            location.reload()
        }
    });
    return false
})

