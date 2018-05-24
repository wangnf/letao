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
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback: function() {
                    setTimeout(() => {
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    }, 1000);
                }
            },
            //上拉加载
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback: function() {
                    setTimeout(() => {
                        mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                    }, 1000);
                }
            }
        }
    });
})