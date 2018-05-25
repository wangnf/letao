/* 网站公用的方法 */
/* 进度条 */
//ajax开始请求时
$(window).ajaxStart(function() {
    NProgress.start();
});
$(window).ajaxComplete(function() {
    NProgress.done();
});

/* 侧边栏的显示隐藏 */
$('[data-menu]').on('click', function() {
    $('.ad_aside').toggle();
    $('.ad_section').toggleClass('menu');
});
$('.menu [href="javascript:;"]').on('click', function() {
    $(this).siblings('.child').stop().slideToggle();
});
/* 退出登录 */
var modalHtml = '    <div class="modal fade" id="logoutModal" role="dialog">' +
    '        <div class="modal-dialog" role="document">' +
    '            <div class="modal-content">' +
    '                <div class="modal-header">' +
    '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '                    <span aria-hidden="true">&times;</span>' +
    '                </button>' +
    '                    <h4 class="modal-title">温馨提示！</h4>' +
    '                </div>' +
    '                <div class="modal-body">' +
    '                    <p class="text-danger">确认退出登录吗？</p>' +
    '                </div>' +
    '                <div class="modal-footer">' +
    '                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
    '                    <button type="button" class="btn btn-primary">确定</button>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>';
$('body').append(modalHtml);
$('[data-logout]').on('click', function() {
    $('#logoutModal').modal('show').find('.btn-primary').on('click', function() {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            data: '',
            dataType: 'json',
            success: function(data) {
                if (data.success == true) {
                    location.href = '/admin/login.html';
                    $('#logoutModal').modal('hide');
                }
            }
        })
    })
})