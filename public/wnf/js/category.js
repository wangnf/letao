$(function() {
    //区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    // -一级分类
    // --调用接口获取数据
    getFirstCategoryData(function(data) {
            //模板的使用 1.要数据 2.定义模板 3.调用模板 4.返回html
            $('.category_l').html(template('firstTemplate', data));
            var $category_id = $('.category_l li:first-child').find('a').data('id');
            showDetail();
            // -二级分类
            // --默认加载第一个二级分类
            render($category_id);

        })
        //点击一级分类 显示相应的二级分类内容
    function showDetail() {
        $('.category_l a').on('tap', function() {
            if ($(this).hasClass('active')) return false;
            $('.category_l a').removeClass('active');
            $(this).addClass('active');
            render($(this).data('id'));
        })
    }
    // $('.category_l').on('tap', 'a', function(e) {
    //     var $a_id = $(this).data('id');
    //     getSecondCategoryData({ id: $a_id }, function(data) {
    //         $('.category_r').html(template('secondTemplate'), data);
    //     })
    // })

});

//业务跟代码拿数据代码分开
//一级分类数据
function getFirstCategoryData(callback) {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function(data) {
            callback && callback(data);
        }
    })
}
//二级分类数据
function getSecondCategoryData(params, callback) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function(data) {
            callback && callback(data);
        }
    })
}
//渲染页面
function render(category_id) {
    getSecondCategoryData({ id: category_id }, function(data) {
        $('.category_r').html(template('secondTemplate', data));
    })
}