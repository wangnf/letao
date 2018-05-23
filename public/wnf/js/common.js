var lt = {};
//获取地址栏传递的参数
lt.getParsmsByUrl = function() {
    var params = {};
    var search = location.search;
    if (search) {
        search = search.replace('?', '');
        var searchArr = search.split('&');
        searchArr.forEach(function(item, i) {
            var itemArr = item.split('=');
            params[itemArr[0]] = itemArr[1];
        });
    }
    return params;
};
//关于登录的ajax
lt.loginUrl = '/wnf/user/login.html';
lt.cartUrl = '/wnf/user/cart.html';
lt.loginAjax = function(params) {
    $.ajax({
        url: params.url || '#',
        type: params.type || 'get',
        datatype: params.datatype || 'json',
        data: params.data || {},
        success: function(data) {
            if (data.error == 400) {
                location.href = lt.loginUrl + '?returnUrl=' + location.href;
                return false;
            } else {
                params.success && params.success(data);
            }
        },
        error: function() {
            mui.toast('服务器繁忙');
        }
    })
}