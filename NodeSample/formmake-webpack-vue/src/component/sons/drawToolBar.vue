<template>
    <div class="chart-menu fx_flow_menu" widgetname="_widget_1515469270346" style="z-index: 101">
        <div class="menu-item style-dark front-step " @click.stop="frontStep"><i class="icon-flow-menu-undo"></i></div>
        <div class="menu-item style-dark back-step " @click.stop="backStep"><i class="icon-flow-menu-redo"></i></div>
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
    import PathManager from '../../tools/pathManager.js';

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
            frontStep(e){
                PathManager.frontStep();
            },
            backStep(e){
                PathManager.backStep();
            },
            makeNode(e){
//                debugger;
                var data22 = {widgetname:"widget"+new Date().getTime(), "z-index":104, left:((e.pageX - 58)+'px'), top:((e.pageY - 20)+'px'), "text":'test' };

                /* 经过action */
                /* 发送的数据层级要对，否则组件数据不能渲染 */
                this.$store.dispatch('makeNode', data22);

                console.log('makeNode ing...', Object.prototype.toString.call(Node) )
            }
        }
    }
</script>