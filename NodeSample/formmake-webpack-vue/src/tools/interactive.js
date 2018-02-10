/**
 * Created by yangjie on 2018/2/8.
 */
import PathManager from './pathManager.js';
var removeAllSelect = function(e){
    $('.select').removeClass('select');

    if( $('.path_select').attr('_class') == 'hasCondtion'){
        $('.path_select').attr('class', 'hasCondtion');
    }
    $('.path_select').removeAttr('class');
    //$('.fx_flow_node .editText').trigger('focusout');
}
const registStrag = function(vm){
    var $dom = $(vm.$el );

    $dom.on('mousedown', function(e){
        debugger
        //e.stopImmediatePropagation();
        if( $(e.target).hasClass('node-anchor') )return;
        $dom.data('isDrag', true);
        $dom.css('z-index', 102);
        removeAllSelect();
        $dom.addClass('select');
        var startx = e.pageX, starty = e.pageY;
        var pos = $dom.position();

        var disX = startx - pos.left, disY = starty - pos.top;
        var movefn = function(e){
            console.log('registStrag moving')
            var b = $dom.data('isDrag');
            if(!b) return;
            $dom.css({left: e.pageX-disX, top: e.pageY-disY});

            //rendererAttachLines({currX:e.pageX, currY:e.pageY});
            PathManager.renderPath(vm, e.pageX-disX, e.pageY-disY);
        };
        $(document).on('mousemove', movefn);
        $dom.on('mouseup', function(e){
            $(document).off('mousemove', movefn);
            $dom.off('mouseup');
            $dom.css('z-index', 1);
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
                if(e.pageX != startx && e.pageY != starty){
                    PathManager.addStep($dom, $dom.data('stepType'), startx, starty);
                }
                false && tabSelect(this, 'node');
            }
        })
    });
    debugger;
    $dom.trigger('mousedown');
};

export {registStrag}