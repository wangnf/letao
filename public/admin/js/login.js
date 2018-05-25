$(function() {

    $('#login').bootstrapValidator({
        feedbackIcons: { //根据验证结果显示的各种图标  
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: { //非空验证：提示消息
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度必须在6到18之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        //提交逻辑
        var $form = $(e.target);

        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $form.serialize(),
            dataType: 'json',
            success: function(data) {
                if (data.success == true) {
                    //跳转到首页
                    location.href = '/admin/index.html';
                }
                if (data.error == 1000) {
                    //用户名错误
                    //重置用户名表单的验证
                    $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                } else if (data.error == 1001) {
                    //密码错误
                    $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                }
            }
        })

    });

})