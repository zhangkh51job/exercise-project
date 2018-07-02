/**
 * Created by yangjie on 2018/5/22.
 */
var months = ['2018年5月', '2018年4月', '2018年3月', '2018年2月', '2018年1月', '2017年12月', '2017年11月', '2017年10月'];
var dateSelect = function(dom,title,values){
    $(dom).picker({
        toolbarTemplate: '<header class="bar bar-nav">\
                          <button class="button button-link pull-left">取消</button>\
                          <button class="button button-link pull-right close-picker">确定</button>\
                          <h1 class="title">'+title+'</h1>\
                          </header>',
        cols: [
            {
                textAlign: 'center',
                values: months
            }
        ]
    });
};
dateSelect('.year-month', '', months);