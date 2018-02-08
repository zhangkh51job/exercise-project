<template>
    <!-- style绑定方式 -->
    <div class="fx_flow_node flow-selector menu"  :widgetname="data.widgetname" :style="{left: data.left, top: data.top}" @mousedown="dragHandle($event)">
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
    import registStrag from '../../tools/interactive.js';

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
        methods: {
            dragHandle(e){
                console.log('draghandle...')
                var $dom = $(e.currentTarget);
                if( $(e.target).hasClass('node-anchor') ) return;
                $dom.data('isDrag', true);
                $dom.css('z-index', 102);
//                removeAllSelect();
                $dom.addClass('select');
                var startx = e.pageX, starty = e.pageY;
                var pos = /*$dom.position()*/{left: e.currentTarget.offsetLeft, top:e.currentTarget.offsetTop};

                var disX = startx - pos.left, disY = starty - pos.top;
                var movefn = function(e){
                    console.log('registStrag moving')
                    var b = $dom.data('isDrag');
                    if(!b) return;
                    $dom.css({left: e.pageX-disX, top: e.pageY-disY});

//                    rendererAttachLines({currX:e.pageX, currY:e.pageY});
                    PathManager.renderPath($dom, e.pageX-disX, e.pageY-disY);
                };
                $(document).on('mousemove', movefn);
                $dom.on('mouseup', function(e){
                    $(document).off('mousemove', movefn);
                    $dom.off('mouseup');
                    $dom.css('z-index', 1)
                    $dom.data('isDrag', false);
                    $('.chart-menu').css('pointer-events', 'auto');
                    if( parseFloat($dom.css('top')) < 20 ){
                        $dom.off();
                        $dom.remove();
                    }else{
                        e.stopPropagation();
                        if( !$dom.data('stepType') ){
                            $dom.data('stepType', 'add');
                        }else{
                            $dom.data('stepType', 'move');
                        }
                        if(false && e.pageX != startx && e.pageY != starty){
                            PathManager.addStep($dom, $dom.data('stepType'), startx, starty);
                        }
//                        tabSelect(this, 'node');
                    }
                })
            }
        }
    }

</script>