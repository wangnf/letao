$(function() {
    var id = lt.getParsmsByUrl().productId;
    productDetail(id, function(data) {
        // 数据加载完，清除loading
        $('.loading').remove();
        $('#detail').html(template('products', data));
        // 初始化轮播
        mui('.mui-slider').slider({
            interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
        //区域滚动
        mui('.mui-scroll-wrapper').scroll({
            indicators: false
        });
        //1.尺码选择
        $('.btn_size').on('tap', function() {
                $(this).addClass('now').siblings().removeClass('now');
            })
            //2.数量选择
        $('.p_number span').on('tap', function() {
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
            //3.加入购物车
        $('.btn_addCart').on('tap', function() {
            //验证尺码
            var $changeBtn = $('.btn_size.now');
            if (!$changeBtn.length) {
                mui.toast('请选择尺码');
                return false;
            }
            var size = $changeBtn.html();
            //验证数量
            var num = $('.p_number input').val();
            if (num <= 0) {
                mui.toast('请选择数量');
                return false;
            }
            lt.loginAjax({
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: id,
                    num: num,
                    size: size
                },
                datatype: 'json',
                success: function(data) {
                    if (data.success == true) {
                        mui.confirm('添加成功，是否跳转到购物车？', '温馨提示！', ['是', '否'], function(e) {
                            if (e.index == 0) {
                                location.href = lt.cartUrl;
                            } else {
                                //TODO
                            }
                        })
                    }
                }
            })
        })
    })

})

function productDetail(productId, callback) {

    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: productId
        },
        type: 'get',
        datatype: 'json',
        success: function(data) {
            setTimeout(() => {
                callback && callback(data);
            }, 1000);
        }
    })

}