$(function() {
    //区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    //需求分析：
    //1.同步输入框的内容与地址栏的参数一样
    var paramsUrl = lt.getParsmsByUrl();
    var keyVal = decodeURI(paramsUrl.key || '');
    var $input = $('input').val(keyVal);
    //2.根据参数，默认加载第一页数据
    //配置mui的下拉刷新参数auto:true 默认刷新调用一次下拉刷新
    // getSearchList({
    //     proName: paramsUrl.key,
    //     page: 1,
    //     pageSize: 4,
    // }, function(data) {
    //     //渲染页面
    //     $('.lt-product').html(template('productTemplate', data))
    // });
    //3.点击按钮搜索关键字重新加载页面
    $('.lt-search button').on('tap', function() {
            var key = $.trim($input.val());
            if (!key) {
                mui.toast('请输入关键字')
            }
            //传递参数渲染页面
            getSearchList({
                proName: key,
                page: 1,
                pageSize: 4,
            }, function(data) {
                //渲染页面
                $('.lt-product').html(template('productTemplate', data))
            });
        })
        //4.点击排序 
    $('.lt-order a').on('tap', function() {
            //判断当前的a有没有active
            var $this = $(this);
            if (!$this.hasClass('active')) {
                $this.addClass('active')
                    .siblings().removeClass('active')
                    .find('span').removeClass('fa-arrow-up').addClass('fa-arrow-down');
            } else {
                if ($this.find('span').hasClass('fa-arrow-down')) {
                    $this.find('span').removeClass('fa-arrow-down').addClass('fa-arrow-up');
                } else {
                    $this.find('span').removeClass('fa-arrow-up').addClass('fa-arrow-down');
                }
            }
            //获取排序参数，渲染页面
            var dataOrder = $this.data('order');
            var orderVal = $this.find('span').hasClass('fa-arrow-up') ? 1 : 2;
            var key = $.trim($input.val());
            if (!key) {
                mui.toast('请输入关键字')
            }
            var params = {
                proName: key,
                page: 1,
                pageSize: 4,
            };
            params[dataOrder] = orderVal;
            //传递参数渲染页面
            getSearchList(params, function(data) {
                //渲染页面
                $('.lt-product').html(template('productTemplate', data))
            });
        })
        //5.下拉刷新，下拉加载
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            //下拉刷新
            down: {
                auto: true,
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback: function() {
                    var that = this;
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入关键字')
                    }
                    $('.lt-order a').removeClass('active').find('span').removeClass('fa-arrow-up').addClass('fa-arrow-down');
                    setTimeout(() => {
                        getSearchList({
                            proName: key,
                            page: 1,
                            pageSize: 4,
                        }, function(data) {
                            //渲染页面
                            $('.lt-product').html(template('productTemplate', data));
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                            that.refresh(true);
                        });
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
                    window.page++;
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入关键字')
                    }

                    var dataOrder = $('.lt-order a.active').data('order');
                    var orderVal = $('.lt-order a.active').find('span').hasClass('fa-arrow-up') ? 1 : 2;
                    var params = {
                        proName: key,
                        page: window.page,
                        pageSize: 4,
                    };
                    params[dataOrder] = orderVal;

                    setTimeout(() => {
                        getSearchList(params, function(data) {
                            //渲染页面
                            $('.lt-product').append(template('productTemplate', data));
                            if (data.data.length) {
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            } else {
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            }
                        });
                    }, 1000);
                }
            }
        }
    });

})

//获取数据
function getSearchList(paramsUrl, callback) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: paramsUrl,
        dataType: 'json',
        success: function(data) {
            window.page = data.page;
            callback && callback(data);
        }
    });
}