/*
 * @Author: your name
 * @Date: 2019-12-13 14:20:38
 * @LastEditTime: 2019-12-13 14:47:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12-alibaixiu\alibaixiu\public\assets\js\password-reset.js
 */
$('#modifyBox').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function (response) {
            location.href='/admin/login.html'
        }
    });
    return false;
});