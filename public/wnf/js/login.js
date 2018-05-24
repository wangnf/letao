$(function() {
    $('#submit').on('tap', function() {
        //获取表单序列化数据
        var formData = $('form').serialize();
        var dataObject = lt.serialize2object(formData);
        //校验数据
        if (!dataObject.username) {
            mui.toast('请输入用户名');
            return false;
        }
        if (!dataObject.password) {
            mui.toast('请输入密码');
            return false;
        }
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: dataObject,
            dataType: 'json',
            success: function(data) {

                if (data.success == true) {
                    var returnUrl = location.search.replace('?returnUrl=', '');
                    if (returnUrl) {
                        location.href = returnUrl;
                    } else {
                        location.href = lt.userUrl;
                    }
                } else {
                    mui.toast(data.message);
                }
            }
        })


    })
})