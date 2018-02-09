/**
 * Created by yangjie on 2018/1/9.
 */
var isLining = false, newPath, pathArr;
/*$('.operate_area').on('mousedown', function(e){
 if(e.target != this)return;
 isLining = true;
 //        newPath = $('<path style="fill:#eee;stroke:red;stroke-width:2"></path>');
 newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
 newPath.setAttribute("style", "fill-opacity:0;stroke:#0db3a6;stroke-width:2");

 pathArr = [];
 pathArr.push('M'+ e.pageX, ' '+ (e.pageY-50) )
 if(pathArr.length > 1){
 $('svg').append(newPath)
 }
 });
 $('.operate_area').on('mousemove', function(e){
 if(isLining == false) return;

 pathArr.push('L'+ e.pageX, '  ' + (e.pageY-50))

 //        $(newPath).attr('d', pathArr.join(''));
 newPath.setAttribute('d', pathArr.join(''))
 //        newPath.d = pathArr.join('');
 });
 $('.operate_area').on('mouseup', function(e){
 isLining = false;
 newPath = null;
 pathArr && (pathArr.length = 0);
 })*/
var registStrag = function($dom){
    $dom.on('mousedown', function(e){
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
                if(e.pageX != startx && e.pageY != starty){
                    PathManager.addStep($dom, $dom.data('stepType'), startx, starty);
                }
                tabSelect(this, 'node');
            }
        })
    });
};
//registStrag( $('.flow-selector') );

var makeNode = function(){
    var node = [
        '<div class="fx_flow_node flow-selector menu">',
        '<i class="node-icon icon-flow-edit green"></i>',
        '<div class="node-name">流程节点</div>',
        '<i class="node-menu icon-flow-other"></i>',
        '<div class="node-anchor node-anchor-t"></div>',
        '<div class="node-anchor node-anchor-r" ></div>',
        '<div class="node-anchor node-anchor-b"></div>',
        '<div class="node-anchor node-anchor-l" ></div>',
        '</div>'
    ];
    var $node = $(node.join('')).attr('widgetname', "widget"+new Date().getTime());
    $('.operate_area').append($node);
    return $node;
}

$('.front-step').on('click', function(e){
    e.stopPropagation();
    PathManager.frontStep();
});
$('.back-step').on('click', function(e){
    e.stopPropagation();
    PathManager.backStep();
});
var removeAllSelect = function(e){
    $('.select').removeClass('select');

    if( $('.path_select').attr('_class') == 'hasCondtion'){
        $('.path_select').attr('class', 'hasCondtion');
    }
    $('.path_select').removeAttr('class');
    //$('.fx_flow_node .editText').trigger('focusout');
}
$(document).on('mouseup',  function(){
    removeAllSelect();
    tabSelect(null, 'flow');
});
$(document).on('mouseup', '#svg path', function(e){
    e.stopPropagation();
    removeAllSelect();
    if($(this).parent().attr('class') == 'hasCondtion'){
        $(this).parent().attr('_class', 'hasCondtion');
    }
    $(this).parent().attr('class', 'path_select');
    tabSelect(this, 'path')
});
$('.node_delete').on('mousedown', function(e){
    e.stopImmediatePropagation();
    e.stopPropagation();
    if( $('g[class="path_select"]').length ){
        PathManager.addStep( $('g[class="path_select"]').detach(), 'remove' );
    }else{
        PathManager.addStep( PathManager.removeNodes($('.select')), 'remove' );
    }
    /*$('g[class="path_select"]').remove();
     removeNode($('.select'))*/
});
$('#nodeMake').on('mousedown', function(e){
    var $node = makeNode();
    $('.chart-menu').css('pointer-events', 'none');
    registStrag($node);

    var x = e.pageX - $node.width()/2, y = e.pageY - $node.height()/2;

    $node.css({left:x, top:y});

    //确定位置之后，再分发当前事件
    $node.trigger(e);
});

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

/* 结束画线 条件一 */
var currPath; var miniDis = 20;
var attachDraw =false;
$(document).on('mouseleave', '.node-anchor', function(e){
    attachDraw = false;
    if(currPath){
        currPath.removeAttribute('attachEndId');
        currPath.removeAttribute('endX');
        currPath.removeAttribute('endY');
    };
});
$(document).on('mouseenter', '.node-anchor', function(e){
    if( isLining == false) return;
    attachDraw = true;
    var _this = this;

    var startX = parseFloat(currPath.getAttribute('startX')),
        startY = parseFloat(currPath.getAttribute('startY'));

    var ltPath = $(currPath).parent().find('.lt').get(0),
        rbPath = $(currPath).parent().find('.rb').get(0);

    var currX = $(this).offset().left + $(this).width()/2,
        currY = $(this).offset().top + $(this).height()/2;

    var attachEndId = $(this).parent().attr('widgetname');
    attachEndId += '_' + this.className.split('node-anchor-')[1];

    var middlex = (currX - startX)/2 + startX;
    var middley = (currY - startY)/2 + startY;

    var pathStr = '', arrowPathO;

    if( $(_this).hasClass('node-anchor-b') ){
        pathStr = attachRenderRule(startX, startY, currX, currY, currPath.getAttribute('start-anchor'), 'b')
        currPath.setAttribute('end-anchor', 'b');
    }else if( $(_this).hasClass('node-anchor-t') ){
        pathStr = attachRenderRule(startX, startY, currX, currY, currPath.getAttribute('start-anchor'), 't')
        currPath.setAttribute('end-anchor', 't');
    }else if( $(_this).hasClass('node-anchor-r') ){
        pathStr = attachRenderRule(startX, startY, currX, currY, currPath.getAttribute('start-anchor'), 'r')
        currPath.setAttribute('end-anchor', 'r');
    }else if( $(_this).hasClass('node-anchor-l') ){
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

/* 拖动画线 */
$(document).on('mousedown', '.node-anchor', function(e){
    e.stopImmediatePropagation();
    e.stopPropagation();

    var ct = createArrow();
    var newPath = $(ct).find('.path').get(0),
        ltPath = $(ct).find('.lt').get(0),
        rbPath = $(ct).find('.rb').get(0);

    //var startX = e.clientX, startY = e.clientY;
    var startX = $(this).offset().left + $(this).width()/2,
        startY = $(this).offset().top + $(this).height()/2;
    var _this = this;
    var attachStartId = $(this).parent().attr('widgetname');
    attachStartId += '_' + this.className.split('node-anchor-')[1];

    currPath = newPath;

    $(document).on('mousemove', function(e){
        //if(isLining == false) return;
        if(attachDraw == true) return;

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
        if( $(_this).hasClass('node-anchor-b') ){
            pathStr = moveRenderRule(startX, startY, currX, currY, 'b')
            newPath.setAttribute('start-anchor', 'b');
            arrowPathO = arrowDraw(startX, startY, currX, currY, 'tb', 'b');
        }else if( $(_this).hasClass('node-anchor-t') ){
            pathStr = moveRenderRule(startX, startY, currX, currY, 't')
            newPath.setAttribute('start-anchor', 't');
            arrowPathO = arrowDraw(startX, startY, currX, currY, 'tb');
        }else if( $(_this).hasClass('node-anchor-r') ){
            pathStr = moveRenderRule(startX, startY, currX, currY, 'r')
            newPath.setAttribute('start-anchor', 'r');
            arrowPathO = arrowDraw(startX, startY, currX, currY, 'lr');
        }else if( $(_this).hasClass('node-anchor-l') ){
            pathStr = moveRenderRule(startX, startY, currX, currY, 'l')
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
    }
    $(document).on('mouseup', attachLine);
});
$(document).on('dblclick', '.fx_flow_node .icon-flow-edit', function(e){
    console.log('double click!');
    var $text = $('<textarea class="editText"></textarea>');
    $text.val($(this).parent().find('.node-name').text());
    var $editNode = $(this).parent();
    $text.css({'left':0, 'top':0, 'height':$editNode.height(), 'width':$editNode.width()});
    $(this).parent().append($text);
    $text.focus();
});
$(document).on('focusout', '.fx_flow_node .editText', function(e){
    var $parent = $(this).parent();

    PathManager.addStep( $parent, 'textEdit', null, null, $parent.find('.node-name').text() );
    $parent.find('.node-name').text(  $(this).val()?$(this).val():'流程节点' );

    $(this).remove();

    PathManager.renderPath( $parent, parseFloat($parent.css('left')), parseFloat($parent.css('top')));
});
$(document).on('click', '.fx_flow_menu .flow_save', function(e){
    saveFlowMsg();
});
$(document).on('mouseup', '#node_set_id', function(e){e.stopImmediatePropagation();e.stopPropagation()});

$(document).on('mouseenter', '.fx_flow_node', function(e){
    $(this).find('.node-anchor').css('display', 'block');
});
$(document).on('mouseleave', '.fx_flow_node', function(e){
    $(this).find('.node-anchor').css('display', 'none');
});

