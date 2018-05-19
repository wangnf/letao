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