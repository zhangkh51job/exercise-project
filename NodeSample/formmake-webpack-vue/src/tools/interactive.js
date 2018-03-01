/**
 * Created by yangjie on 2018/2/8.
 */
import PathManager from './pathManager.js';
import {arrowDraw_Attach, arrowDraw, moveRenderRule, attachRenderRule, nodeLine} from './lines.js';
import {tabSelect} from './protrudeData.js';

var removeAllSelect = function(e){
    //$('.select').removeClass('select');
    document.querySelector('.select') && document.querySelector('.select').classList.remove('select');

    if( $('.path_select').attr('_class') == 'hasCondtion'){
        $('.path_select').attr('class', 'hasCondtion');
    }
    $('.path_select').removeAttr('class');
    //$('.fx_flow_node .editText').trigger('focusout');
};
var getProp = function(dom, prop){
    return parseFloat( window.getComputedStyle(dom, null)[prop] );
};
const registStrag = function(vm){
    //var $dom = $(vm.$el );
    var $dom = vm.$el;

    //$dom.on('mousedown', function(e){
    $dom.addEventListener('mousedown', function(e){
        //debugger;
        //e.stopImmediatePropagation();
        //if( $(e.target).hasClass('node-anchor') ) return;
        if( e.target.classList.contains('node-anchor') ) return;

        //$dom.data('isDrag', true);
        $dom["isDrag"] = true;

        //$dom.css('z-index', 102);
        $dom.style['z-index'] = 102;

        removeAllSelect();
        //$dom.addClass('select');
        $dom.classList.add('select');

        var pos = /*$dom.position()*/{left: $dom.offsetLeft, top: $dom.offsetTop};
        //var startx = e.pageX || ($dom.position().left+$dom.width()/2),  starty = e.pageY || ($dom.position().top + $dom.height()/2);
        var startx = e.pageX || (pos.left + getProp($dom, 'width')/2 ),  starty = e.pageY || ( pos.top + getProp($dom, 'height')/2);

        var disX = startx - pos.left, disY = starty - pos.top;
        var movefn = function(e){
            //var b = $dom.data('isDrag');
            var b = $dom['isDrag'];
            if(!b) return;
            //$($dom).css({left: e.pageX-disX, top: e.pageY-disY});
            $dom.style.left = (e.pageX-disX)+'px';
            $dom.style.top = (e.pageY-disY)+'px';

            //rendererAttachLines({currX:e.pageX, currY:e.pageY});
            PathManager.renderPath( vm, e.pageX-disX, e.pageY-disY );
        };
        document.addEventListener('mousemove', movefn);
        //$(document).on('mousemove', movefn);
        $dom.addEventListener('mouseup', function(e){
            //$dom.on('mouseup', function(e){
            //    $(document).off('mousemove', movefn);
            $dom.removeEventListener('mouseup', movefn);
            //$dom.removeEventListener('mouseup', arguments.callee);
            //$dom.off('mouseup');

            $dom.style["z-index"] = 1;
            //$dom.css('z-index', 1);
            $dom["isDrag"] = false;
            //$dom.data('isDrag', false);
            //$('.chart-menu').css('pointer-events', 'auto');
            document.querySelector(".chart-menu").style['pointer-events'] = 'auto';

            //if( parseFloat($dom.css('top')) < 20 ){
            if( getProp($dom, 'top') < 20){
                /*$($dom).off();
                 $($dom).remove();*/
                $dom.parentNode.removeChild($dom);
            }else{
                e.stopPropagation();
                /*if( !$dom.data('stepType') ){
                 $dom.data('stepType', 'add');
                 }else{
                 $dom.data('stepType', 'move');
                 }
                 if(e.pageX != startx && e.pageY != starty){
                 PathManager.addStep($dom, $dom.data('stepType'), startx, starty);
                 }*/
                if( !$dom['stepType'] ){
                    $dom['stepType'] = 'add';
                }else{
                    $dom['stepType'] = 'move';
                }
                /*if(e.pageX != startx && e.pageY != starty){
                 PathManager.addStep($dom, $dom.data('stepType'), startx, starty);
                 }*/
                tabSelect(this, 'node');
            }
        })
    });
    $dom.addEventListener('mouseout', function(e){
        if( !e.target.classList || !e.target.classList.contains('node-anchor') ) return;
        attachDraw = false;
        if(currPath){
            currPath.removeAttribute('attachEndId');
            currPath.removeAttribute('endX');
            currPath.removeAttribute('endY');
        };
    });

    //$dom.trigger('mousedown');
    $dom.dispatchEvent( new MouseEvent('mousedown') );
};
//$(document).on('mousedown', '.node-anchor', function(e){
document.addEventListener('mousedown', function(e){
    if( !e.target.classList.contains('node-anchor') ) return;
    e.stopImmediatePropagation();
    e.stopPropagation();


    var ct = createArrow();
    /*var newPath = $(ct).find('.path').get(0),
     ltPath = $(ct).find('.lt').get(0),
     rbPath = $(ct).find('.rb').get(0);*/
    var newPath = ct.querySelector('.path'),
        ltPath = ct.querySelector('.lt'),
        rbPath = ct.querySelector('.rb');

    //var startX = e.clientX, startY = e.clientY;
    /*var startX = $(this).offset().left + $(this).width()/2,
     startY = $(this).offset().top + $(this).height()/2;*/
    var startX = e.target.parentNode.offsetLeft + e.target.offsetLeft + /*$(this).width()/2*/getProp(e.target, 'width')/2,
        startY = e.target.parentNode.offsetTop + e.target.offsetTop + getProp(e.target, 'height')/2;

    var _this = /*this*/e.target;
    var attachStartId = /*$(this).parent().attr('widgetname')*/e.target.parentNode.getAttribute('widgetname');
    attachStartId += '_' + _this.className.split('node-anchor-')[1];

    currPath = newPath;

    document.addEventListener('mousemove', function(e){
        //$(document).on('mousemove', function(e){
        //if(isLining == false) return;
        if(attachDraw == true || !newPath ) return;

        var currX = e.pageX -6, currY = e.pageY-6;

        var pathStr = '';

        // x两根半折线， y一根线
        var middlex = (currX - startX)/2 + startX - 3;
        pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (startY + miniDis - 3) ) +
            ('A3 3 0 0 0 3 3') + ('L'+ middlex+', '+ (startY + miniDis - 3) )  ;

        //pathStr = nodeLine(startX, startY, currX, currY, 'bottom');
        var middley = (currY - startY)/2 + startY;
        var middlex = (currX - startX)/2 + startX;
        var arrowPathO;
        //cond 1
        //if( $(_this).hasClass('node-anchor-b') ){
        if( _this.classList.contains('node-anchor-b') ) {
            pathStr = moveRenderRule(startX, startY, currX, currY, 'b');
            newPath.setAttribute('start-anchor', 'b');
            arrowPathO = arrowDraw(startX, startY, currX, currY, 'tb', 'b');
            //}else if( $(_this).hasClass('node-anchor-t') ){
        }else if( _this.classList.contains('node-anchor-t') ) {
            pathStr = moveRenderRule(startX, startY, currX, currY, 't');
            newPath.setAttribute('start-anchor', 't');
            arrowPathO = arrowDraw(startX, startY, currX, currY, 'tb');
            //}else if( $(_this).hasClass('node-anchor-r') ){
        }else if( _this.classList.contains('node-anchor-r') ){
            pathStr = moveRenderRule(startX, startY, currX, currY, 'r');
            newPath.setAttribute('start-anchor', 'r');
            arrowPathO = arrowDraw(startX, startY, currX, currY, 'lr');
        //}else if( $(_this).hasClass('node-anchor-l') ){
        }else if( _this.classList.contains('node-anchor-l') ){
            pathStr = moveRenderRule(startX, startY, currX, currY, 'l');
            newPath.setAttribute('start-anchor', 'l');
            arrowPathO = arrowDraw(startX, startY, currX, currY, 'lr');
        }

        //pathArr.push('L'+ e.pageX, '  ' + (e.pageY-50))
        newPath.setAttribute('d', pathStr);
        newPath.setAttribute('startX', startX);
        newPath.setAttribute('startY', startY);
        newPath.setAttribute('attachStartId', attachStartId);

        ltPath.setAttribute('d', arrowPathO.lt);
        rbPath.setAttribute('d', arrowPathO.rb);

        isLining = true;
    });

    var attachLine = function(e){
        isLining = false;
        if(newPath && !newPath.getAttribute('attachEndId')){
            $(newPath).parent().remove();
        }else if(newPath){
            var mark = newPath.getAttribute('attachEndId');
            mark = mark.split('_')[0];
            PathManager.node2paths[mark] = PathManager.node2paths[mark] || [];
            PathManager.node2paths[mark].push( newPath );
            mark = newPath.getAttribute('attachStartId');
            mark = mark.split('_')[0];
            PathManager.node2paths[mark] = PathManager.node2paths[mark] || [];
            PathManager.node2paths[mark].push( newPath );

            PathManager.addStep($(newPath).parent(), 'add');
        }
        currPath = newPath = null;
        //pathArr && (pathArr.length = 0);

        $(document).off('mousemove');
        $(document).off('mouseup', attachLine);
    };
    $(document).on('mouseup', attachLine);
});


$(document).on('mouseleave', '.node-anchor', function(e){
//document.addEventListener('mouseleave', function(e){
    if( !e.target.classList || !e.target.classList.contains('node-anchor') ) return;
    attachDraw = false;
    if(currPath){
        currPath.removeAttribute('attachEndId');
        currPath.removeAttribute('endX');
        currPath.removeAttribute('endY');
    };
});
$(document).on('mouseenter', '.node-anchor', function(e){
//document.addEventListener('mouseenter',  function(e){
    if( !e.target.classList || !e.target.classList.contains('node-anchor') ) return;
    if( isLining == false) return;
    attachDraw = true;
    var _this = /*this*/e.target;

    var startX = parseFloat(currPath.getAttribute('startX')),
        startY = parseFloat(currPath.getAttribute('startY'));

    /*var ltPath = $(currPath).parent().find('.lt').get(0),
        rbPath = $(currPath).parent().find('.rb').get(0);*/
    var ltPath = currPath.parentNode.querySelector('.lt'),
        rbPath = currPath.parentNode.querySelector('.rb');

    /*var currX = $(this).offset().left + $(this).width()/2,
        currY = $(this).offset().top + $(this).height()/2;*/
    var currX = e.target.offsetLeft + getProp(e.target, 'width')/2,
        currY = e.target.offsetTop + getProp(e.target, 'height')/2;

    //var attachEndId = $(this).parent().attr('widgetname');
    var attachEndId = this.parentNode.getAttribute('widgetname');
    attachEndId += '_' + this.className.split('node-anchor-')[1];

    var middlex = (currX - startX)/2 + startX;
    var middley = (currY - startY)/2 + startY;

    var pathStr = '', arrowPathO;

    //if( $(_this).hasClass('node-anchor-b') ){
    if( _this.classList.contains('node-anchor-b') ) {
        pathStr = attachRenderRule(startX, startY, currX, currY, currPath.getAttribute('start-anchor'), 'b')
        currPath.setAttribute('end-anchor', 'b');
        //}else if( $(_this).hasClass('node-anchor-t') ){
    }else if( _this.classList.contains('node-anchor-t') ){
        pathStr = attachRenderRule(startX, startY, currX, currY, currPath.getAttribute('start-anchor'), 't')
        currPath.setAttribute('end-anchor', 't');
    //}else if( $(_this).hasClass('node-anchor-r') ){
    }else if( _this.classList.contains('node-anchor-r') ) {
        pathStr = attachRenderRule(startX, startY, currX, currY, currPath.getAttribute('start-anchor'), 'r')
        currPath.setAttribute('end-anchor', 'r');
        //}else if( $(_this).hasClass('node-anchor-l') ){
    }else if( _this.classList.contains('node-anchor-l')){
        pathStr = attachRenderRule(startX, startY, currX, currY, currPath.getAttribute('start-anchor'), 'l')
        currPath.setAttribute('end-anchor', 'l');
    }
    arrowPathO = arrowDraw_Attach(currX, currY, currPath.getAttribute('end-anchor'));

    currPath.setAttribute('d', pathStr);
    currPath.setAttribute('attachEndId', attachEndId);
    currPath.setAttribute('endX', currX);
    currPath.setAttribute('endY', currY);

    ltPath.setAttribute('d', arrowPathO.lt);
    rbPath.setAttribute('d', arrowPathO.rb);
    /* */
});
//$(document).on('mouseup',  function(){
document.addEventListener('mouseup', function(){
    removeAllSelect();
    tabSelect(null, 'flow');
});
$(document).on('mouseup', '#node_set_id', function(e){e.stopImmediatePropagation();e.stopPropagation()})
/*document.addEventListener('mouseup', function(e){
    e.stopImmediatePropagation();e.stopPropagation();
});*/

/* 结束画线 条件一 */
var currPath; var miniDis = 20;
var attachDraw =false;
var isLining = false;

var createArrow = function(){
    var ct = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //path.setAttribute("style", "fill-opacity:0;stroke:#0db3a6;stroke-width:2");
    path.setAttribute('class', 'path');

    /* 左上箭头 */
    var ltArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //ltArrow.setAttribute("style", "fill-opacity:0;stroke:#0db3a6;stroke-width:2");
    ltArrow.setAttribute('class', 'lt');

    /* 右下箭头 */
    var rbArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //rbArrow.setAttribute("style", "fill-opacity:0;stroke:#0db3a6;stroke-width:2");
    rbArrow.setAttribute('class', 'rb');

    //箭头以后在做
    ct.appendChild(path);
    ct.appendChild(ltArrow);
    ct.appendChild(rbArrow);

    $('svg').append(ct);
    return ct;
};

export {registStrag}