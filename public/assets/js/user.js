/*
 * @Author: your name
 * @Date: 2019-12-12 15:03:15
 * @LastEditTime: 2019-12-13 14:08:00
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
// 删除功能
$('#userBox').on('click', '.delete', function () {
    // confirm('你真的要删除该用户吗')  返回的是布尔值
    if (confirm('你真的要删除该用户吗')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }
})
// 获取全选按钮状态
var selectAll = $('#selectAll')
//获取批量删除按钮
var deleteMany = $('#deleteMany')

selectAll.on('change', function () {
    var status = selectAll.prop('checked')
    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
    //获取所有的input框,并设置checked属性
    $('#userBox').find('input').prop('checked', status)

})
$('#userBox').on('change', '.userStatus', function () {
    var inputs = $('#userBox').find('input')
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)
    }

    if (inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})
deleteMany.on('click', function () {
    var ids = []
    var checkUser = $('#userBox').find('input').filter(':checked')
    checkUser.each(function (index, element) {
        ids.push($(element).attr('data-id'))
    })
    if (confirm('你确定要删除吗')) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function (response) {
                location.reload()
            }
        });
    }

})