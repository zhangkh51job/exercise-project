<template>
    <div class="chart-menu fx_flow_menu" widgetname="_widget_1515469270346" style="z-index: 101">
        <div class="menu-item style-dark front-step "><i class="icon-flow-menu-undo"></i></div>
        <div class="menu-item style-dark back-step "><i class="icon-flow-menu-redo"></i></div>
        <div class="menu-line"></div>
        <div id="nodeMake" class="menu-item menu-move" @mousedown="makeNode">
            <i class="icon-flow-edit green"></i><span>流程节点</span>
        </div>
        <div id="nodeCopy" class="menu-item menu-move">
            <i class="icon-release blue"></i><span>抄送节点</span>
        </div>
        <div class="menu-line"></div>
        <div class="menu-item">
            <i class="icon-flow-menu-vertical"></i><span>水平等距</span>
        </div>
        <div class="menu-item">
            <i class="icon-flow-menu-horizontal"></i><span>垂直等距</span>
        </div>
        <div class="menu-line"></div>
        <div class="menu-item node_delete"><i class="icon-trasho"></i></div>
        <div class="menu-line"></div>
        <div class="menu-item flow_save"><span>保存</span></div>
        <div class="menu-item for-right size-large active"><i class="icon-widget-location"></i></div>
    </div>
</template>
<script>
    import Node from './node.vue';
    import * as types from '../../store/mutation-types';

    export default {
        name: 'drawToolBar'
        ,data:function(){
            return {

            }
        }
        ,components:{
            Node
        }
        ,methods:{
            makeNode(e){
//                debugger;
                var newData = {widgetname:"widget"+new Date().getTime(), "z-index":102, left:(e.pageX - 58), top:(e.pageY - 20) };

                /* 经过action */
                this.$store.dispatch('makeNode', {newData});

                $(e.currentTarget).trigger(e);

                console.log('makeNode ing...', Object.prototype.toString.call(Node) )
            }
        }

    }
</script>