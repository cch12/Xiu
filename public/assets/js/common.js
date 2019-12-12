/*
 * @Author: your name
 * @Date: 2019-12-12 14:44:57
 * @LastEditTime: 2019-12-12 15:26:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12-alibaixiu\alibaixiu\public\assets\js\common.js
 */
$('#logout').on('click',function () {  
    var isConfirm=confirm('你真的要退出吗')
    if(isConfirm){
    $.ajax({
        type: "post",
        url: "/logout",
        success: function () {
            location.href='login.html'
        },
        error:function () {
            alert('退出失败')
        }
    });        
    }
})