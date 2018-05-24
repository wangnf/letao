$(function() {
    //区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            //下拉刷新
            down: {
                //1.页面初始化自动加载
                auto: true,
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback: function() {
                    setTimeout(() => {
                        getCartData(function(data) {
                            //初始化页面
                            $('.mui-table-view').html(template('cart', data));

                        });
                        //数据加载完，隐藏正在加载的状态
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    }, 1000);
                }
            }
        }
    });
    // 业务逻辑
    /* 点击刷新---注意点击一次，加载多次的bug--用off()解决 */
    $('#refresh').off('click').on('click', function() {
        mui('#refreshContainer').pullRefresh().pulldownLoading();
    });
    //2.左滑点击编辑，弹出编辑框，修改尺码数量，
    //3.左滑点击删除，删除商品
    //4.点击input，计算金额
})

var getCartData = function(callback) {
    //获取购物车数据
    lt.loginAjax({
        url: '/cart/queryCartPaging',
        type: 'get',
        data: {
            page: 1,
            //不产生分页
            pageSize: 100
        },
        dataType: 'json',
        success: function(data) {
            callback && callback(data);
        }
    })
}