/*
 * @Author: your name
 * @Date: 2019-12-13 22:50:17
 * @LastEditTime: 2019-12-15 11:01:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12-alibaixiu\alibaixiu\public\assets\js\post-add.js
 */
// 想服务器发送请求,获取文章数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', { data: response })
        $('#category').html(html)
    }
});
//图片上传功能 建议用事件委托
// $('#feature').on('change', function () {
$('#parentBox').on('change','#feature', function () {                                          
    // 获取到选择的文件
    var file = this.files[0]
    var formData = new FormData()
    // 把选择的文件追加到formData中
    formData.append('cover', file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response); //[{…}]  打印出的数组

            // 把图片上传的地址保存在隐藏域中
            $('#thumbnail').val(response[0].cover)
            // 图片预览
            $('#preview').attr('src',response[0].cover).show()

        }
    });
});
//添加文章上传功能
$('#addForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            // console.log(1);
            
            location.href = '/admin/posts.html'
        }
    });

    return false
});


// 文章修改页面功能
// 获取参数的方法
function getUrlParams(name) {
    // 操作地址字符串 例 ?id=263478621784623745862187&age=20 -> ["id=215752525","age=20"]
    var paramsAry = location.search.substr(1).split('&')
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')  //["id","3728473297"]  ["age","20"]
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}
var id = getUrlParams('id')  //获取浏览器地址栏的id参数
// 判断参数里有没有id 有的话就是修改,没有的话就是添加
if (id != -1) {
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function (response) {
            // 获取分类的请求
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    response.categories = categories
                    console.log(1);

                    var html = template('modifyTpl', response)
                    $('#parentBox').html(html)
                }
            });
        }
    });
}
//修改功能
$('#parentBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize()
    //获取的这个id 与 上面获取浏览器参数id值是一样的
    // var id=$(this).attr('data-id')  
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html'
        }
    });
    return false
});


