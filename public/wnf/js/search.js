//记录搜索历史
var searchArr;
//定义一个search的，判断浏览器有无数据存储（搜索历史）
if (localStorage.search) {
    //如果有，转换成 数组的形式存放到searchArr的数组里（localStorage以字符串的形式存储，所以要把它转换成数组的形式）
    searchArr = localStorage.search.split(",")
} else {
    //如果没有，则定义searchArr为一个空的数组
    searchArr = [];
}
//把存储的数据显示出来作为搜索历史
MapSearchArr();
$("button").on("tap", function() {
    var val = $.trim($('input').val());
    //判断有没有关键字
    if (!val) {
        mui.toast('请输入关键字');
        return false;
    }
    //点击搜索按钮时，去重
    KillRepeat(val);
    //去重后把数组存储到浏览器localStorage
    localStorage.search = searchArr;
    //成功：跳转到搜索列表页 searchList.html
    location.href = 'searchList.html?key=' + val;
    //然后再把搜索内容显示出来
    MapSearchArr();
});
//点击搜索记录，同步输入框
$('.lt-history span').on('tap', function() {
    var span_val = $(this).html();
    var input_val = $('input').val();
    if (span_val == input_val) return false;
    $('input').prop('value', span_val);

})

function MapSearchArr() {
    var tmpHtml = "";
    for (var i = 0; i < searchArr.length; i++) {
        tmpHtml += "<span>" + searchArr[i] + "</span>&nbsp;"
    }
    $(".lt-history").html(tmpHtml);
}
//去重
function KillRepeat(val) {
    var kill = 0;
    for (var i = 0; i < searchArr.length; i++) {
        if (val === searchArr[i]) {
            kill++;
        }
    }
    if (kill < 1) {
        searchArr.push(val);
    }
}