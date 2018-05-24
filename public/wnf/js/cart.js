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
    $('.mui-table-view').on('tap', '.mui-btn-blue', function() {
            var id = $(this).parent().data('id');
            var itemData = lt.getItemById(window.cartData.data, id);
            var html = template('edit', itemData);
            mui.confirm(html.replace(/\n/g, ''), '商品编辑', ['确定', '取消'], function(e) {
                if (e.index == 0) {
                    var size = $('.btn_size.now').html();
                    var num = $('.p_number input').val();
                    lt.loginAjax({
                        url: '/cart/updateCart',
                        type: 'post',
                        data: {
                            id: id,
                            size: size,
                            num: num
                        },
                        dataType: 'json',
                        success: function(data) {
                            if (data.success == true) {
                                itemData.size = size;
                                itemData.num = num;
                                //初始化页面
                                $('.mui-table-view').html(template('cart', window.cartData));
                            }
                        }
                    })
                } else {
                    //TODO
                }
            })
        })
        //选择尺码，数量
    $('body').on('tap', '.btn_size', function() {
        $(this).addClass('now').siblings().removeClass('now');
    });
    $('body').on('tap', '.p_number span', function() {
        var $input = $(this).siblings('input');
        var curNum = $input.val();
        //注意这个值是否为数字
        var maxNum = $input.data('max');
        if ($(this).hasClass('jian')) {
            if (curNum == 0) {
                return false;
            }
            curNum--;
        } else {
            if (curNum >= maxNum) {
                setTimeout(() => {
                    mui.toast('库存不足');
                }, 100);

                return false;
            }
            curNum++;
        }
        $input.val(curNum);
    })

    //3.左滑点击删除，删除商品
    $('.mui-table-view').on('tap', '.mui-btn-red', function() {
        var $this = $(this);
        var id = $this.parent().data('id');
        mui.confirm('确定删除该商品吗？', '删除商品', ['确定', '取消'], function(e) {
            if (e.index == 0) {

                lt.loginAjax({
                    url: '/cart/deleteCart',
                    type: 'get',
                    data: {
                        id: id
                    },
                    success: function(data) {
                        if (data.success == true) {
                            $this.parents('li').remove();
                        }
                    }
                })

            } else {
                //TODO
            }
        })
    });
    //4.点击input，计算金额
    $('.mui-table-view').on('change', '[type=checkbox]', function() {
        getamount();
    })
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
            window.cartData = data;
            callback && callback(data);
        }
    })
}

var getamount = function() {
    var allMount = 0;
    $('[type=checkbox]:checked').each(function(i, item) {
        var id = $(this).data('id');
        var data = lt.getItemById(window.cartData.data, id);
        var price = data.price;
        var num = data.num;
        var mount = num * price;
        allMount += mount;
    })
    if (Math.floor(allMount * 100) % 10) {
        allMount = Math.floor(allMount * 100) / 100;
    } else {
        allMount = Math.floor(allMount * 100) / 100;
        allMount = allMount.toString() + '0';
    }
    $('#cartAmount').html(allMount);
}