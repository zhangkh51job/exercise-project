<template>
    <!-- style绑定方式 --><!-- @mousedown="dragHandle" -->
    <div class="fx_flow_node flow-selector menu"  :widgetname="data.widgetname" :style="{left: data.left, top: data.top}" >
        <i class="node-icon icon-flow-edit green"></i>
        <div class="node-name">{{data.text}}</div>
        <i class="node-menu icon-flow-other"></i>
        <div class="node-anchor node-anchor-t"></div>
        <div class="node-anchor node-anchor-r" ></div>
        <div class="node-anchor node-anchor-b"></div>
        <div class="node-anchor node-anchor-l" ></div>
    </div>
</template>
<script>
    import {registStrag} from '../../tools/interactive.js';
    import PathManager from '../../tools/pathManager.js';
    export default {
        name: 'node',
        /*data: {
         isDrag:false,
         "z-index":1
         },*/
        props: {
            /* 组件的属性类型为object时，需要指定声明 */
            data: Object,
            active: Boolean
        },
        created: function(){
          console.log( 'create', this.data );
        },
        mounted: function () {
//            debugger;
            console.log( 'mounted', this.data );
            registStrag( this );
        },
        methods: {

        }
    }

</script>