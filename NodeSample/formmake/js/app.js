/**
 * Created by yangjie on 2018/1/11.
 */

Vue.component('linePath', {
        props: ['startX', 'startY', 'attachStartId', 'attachEndId'],
        template: '#line-path',
        computed: {
            // a computed property for the polygon's points
            points: function () {

            }
        }
    }
)

Vue.component({
    template: '<div class="fx_flow_node flow-selector menu select" widgetname="_widget_1515637589689" style="left: 116px; top: 160px;">' +
    '<i class="node-icon icon-flow-edit green"></i>' +
    '<div class="node-name">流程节点</div>' +
    '<i class="node-menu icon-flow-other"></i>' +
    '<div class="node-anchor node-anchor-t" style="left: 80px; top: 0px;"></div>' +
    '<div class="node-anchor node-anchor-r" style="left: 160px; top: 20px;"></div>' +
    '<div class="node-anchor node-anchor-b" style="left: 80px; top: 40px;"></div>' +
    '<div class="node-anchor node-anchor-l" style="left: 0px; top: 20px;"></div>' +
    '</div>'
})




var app = new Vue({
    el: '#app',
    data:{

    }
})