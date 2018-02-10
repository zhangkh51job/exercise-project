/**
 * Created by yangjie on 2018/1/16.
 */

var PathManager = {
    node2paths: {},
    paths: [],
    nodes: [],
    frontStepCt:[],
    backStepCt: [],
    /*frontStepCt obj */
    /*{postion:x, position:y, type:'remove'||'move'||'add'||'textEdit', node:[node]} */
    addStep: function($node, type, x, y, text){
        if($node.length == 0) return;
        if($node.length == 1){
            this.frontStepCt.push( {left:x, top:y, type:type, node:[$node], text:text} );
        }else{
            this.frontStepCt.push( {left:null, top:null, type:type, node: $node, text:text} );
        }
    },
    backStep: function(){
        if( this.backStepCt.length == 0 ) return;
        var step = this.backStepCt.pop();
        if(step.type == 'add'){
            if( step['node'].length == 0) return;

            var removeCt = [];
            this.frontStepCt.push( {left: null, top: null, type:'remove', node: removeCt} );
            var $node;
            if( step['node'].length == 1){
                if( Array.isArray( step['node'] ) ){
                    $node = $(step['node'][0]).detach();
                }else{
                    $node = $(step['node']).detach();
                }
                removeCt.push( $node );
            }else{
                for(var i = 0, leni = step['node'].length;i < leni;i++){
                    $node = $(step['node'][i] ).detach();
                    removeCt.push( $node );
                }
            }
        }else if(step.type == 'move'){

            this.frontStepCt.push( {left: $(step['node'][0]).css('left'), top:$(step['node'][0]).css('top'), type:'move', node: [step['node'][0]]} );
            this.renderPath( step['node'][0], step.left, step.top);
            $(step['node'][0]).css({left:step.left, top:step.top });

        }else if(step.type == 'remove'){
            if( step['node'].length == 0) return;
            this.frontStepCt.push( {left: null, top: null, type:'add', node: Array.isArray( step['node'] )?step['node']:[step['node'][0]]} );
            if( step['node'].length == 1){
                if( Array.isArray( step['node'] ) ){
                    if( step['node'][0][0] instanceof HTMLElement || step['node'][0][0][0] instanceof HTMLElement ){
                        $('.operate_area').append( step['node'][0] );
                    }else{
                        $('#svg').append( step['node'][0] );
                    }
                }else{
                    if( step['node'].get(0) instanceof HTMLElement ){
                        $('.operate_area').append( step['node'] );
                    }else{
                        $('#svg').append( step['node'] );
                    }
                }
            }else{
                for(var i = 0, leni = step['node'].length;i < leni;i++){
                    if( step['node'][i].get(0) instanceof HTMLElement ){
                        $('.operate_area').append( step['node'][i] );
                    }else{
                        $('#svg').append( step['node'][i] );
                    }
                }
            }
        }else if( step.type == 'textEdit' ){
            this.frontStepCt.push( {left: null, top: null, type:'textEdit', node: [step['node'][0]], text:step['node'][0].text()} );
            $(step['node'][0]).find('.node-name').text( step.text )
            this.renderPath( step['node'][0], $(step['node'][0]).css('left'), $(step['node'][0]).css('top'));
        }
    },
    frontStep: function(){
        if( this.frontStepCt.length == 0 ) return;
        var step = this.frontStepCt.pop();
        if(step.type == 'add'){
            this.backStepCt.push( {left:null, top:null, type:'remove', node:[step['node'][0].detach()]} );
        }else if(step.type == 'move'){
            //移动要重绘线
            this.backStepCt.push( {left: $(step['node'][0]).css('left'), top: $(step['node'][0]).css('top'), type:'move', node: [step['node'][0]]} );
            this.renderPath( step['node'][0], step.left, step.top);
            $(step['node'][0]).css({left:step.left, top:step.top });
        }else if(step.type == 'remove'){
            if( step['node'].length == 0) return;

            this.backStepCt.push( {left: null, top: null, type:'add', node: Array.isArray( step['node'] )?step['node']:[step['node'][0]]} );

            if( step['node'].length == 1){
                if( Array.isArray( step['node'] ) ){
                    if( step['node'][0][0] instanceof HTMLElement || step['node'][0][0][0] instanceof HTMLElement ){
                        $('.operate_area').append( step['node'][0] );
                    }else{
                        $('#svg').append( step['node'][0] );
                    }
                }else{
                    if( step['node'].get(0) instanceof HTMLElement ){
                        $('.operate_area').append( step['node'] );
                    }else{
                        $('#svg').append( step['node'] );
                    }
                }
            }else{
                for(var i = 0, leni = step['node'].length;i < leni;i++){
                    if( step['node'][i].get(0) instanceof HTMLElement ){
                        $('.operate_area').append( step['node'][i] );
                    }else{
                        $('#svg').append( step['node'][i] );
                    }
                }
            }
        }else if( step.type == 'textEdit' ){
            this.backStepCt.push( {left: null, top: null, type:'textEdit', node: [step['node'][0]], text:step['node'][0].text()} );
            $(step['node'][0]).find('.node-name').text( step.text )
            this.renderPath( step['node'][0], $(step['node'][0]).css('left'), $(step['node'][0]).css('top'));
        }
    },
    removeNodes: function($node){
        var nodeWidget = $node.attr('widgetname');
        var pathArr = this.node2paths[nodeWidget];

        var removeCt = [];
        removeCt.push( $node.detach() );

        if(pathArr){
            for(var i = 0, leni = pathArr.length;i < leni;i++){
                removeCt.push( $(pathArr[i]).parent().detach() )
            }
        }
        return removeCt;
    },
    clearNode: function($node){
        if($node.length == 0)return;
        var nodeWidget = $node.attr('widgetname');
        if( this.node2paths[nodeWidget] ){
            while( this.node2paths[nodeWidget].length ){
                $( this.node2paths[nodeWidget][0] ).off();
                $( this.node2paths[nodeWidget][0] ).parent().remove();
                this.node2paths[nodeWidget].splice(0, 1);
            }
        }
        $node.remove();
    },
    renderPath:function(node, x, y){
        var nodeWidget = $(node).attr('widgetname');
        var pathArr = this.node2paths[nodeWidget];
        if( !pathArr || pathArr.length == 0) return;
        var path, startX, startY, endX, endY;
        var anchor_start, anchor_end, arrowPathO, pathStr;
        var nodeW = $(node).width(), nodeH = $(node).height(), unitL, unitT;
        x = parseFloat(x);y = parseFloat(y);


        for(var i = 0, leni = pathArr.length;i < leni;i++){
            path = pathArr[i];
            var attachStartId = path.getAttribute('attachStartId'),
                attachEndId   = path.getAttribute('attachEndId');
            if( (attachStartId && attachStartId.indexOf(nodeWidget)!= -1) && (attachEndId && attachEndId.indexOf(nodeWidget)!= -1) ){
                anchor_start = $(node).find('.node-anchor-'+path.getAttribute('start-anchor'));
                unitL = anchor_start.css('left');
                unitT = anchor_start.css('top');
                //startX = x + unitL.indexOf('%')!= -1?parseFloat( anchor_start.css('left') )/100 * nodeW:parseFloat( anchor_start.css('left') );

                startX = x + parseFloat( unitL )*( unitL.indexOf('%')!= -1 ? 1/100 * nodeW:1);
                startY = y + parseFloat( unitT )*( unitT.indexOf('%')!= -1 ? 1/100 * nodeH:1);
                //startY = y + parseFloat(anchor_start.css('top'))/100 * nodeH;
                anchor_end = $(node).find('.node-anchor-'+path.getAttribute('end-anchor'));
                unitL = anchor_end.css('left');
                unitT = anchor_end.css('top');
                endX   = x + parseFloat( unitL )*( unitL.indexOf('%')!= -1 ? 1/100 * nodeW:1);
                endY   = y + parseFloat( unitT )*( unitT.indexOf('%')!= -1 ? 1/100 * nodeH:1);
                /*endX   = x + parseFloat(anchor_end.css('left'))/100 * nodeW;
                endY   = y + parseFloat(anchor_end.css('top'))/100 *nodeH;*/
                pathStr = attachRenderRule(startX, startY, endX, endY, path.getAttribute('start-anchor'), path.getAttribute('end-anchor'));
                path.setAttribute('d', pathStr );
                path.setAttribute('startX', startX);
                path.setAttribute('startY', startY);
                path.setAttribute('endX', endX);
                path.setAttribute('endY', endY);

                arrowPathO = arrowDraw_Attach(endX, endY, (path.getAttribute('end-anchor') ));

                if(arrowPathO){
                    $(path).parent().find('.lt').get(0).setAttribute('d', arrowPathO.lt);
                    $(path).parent().find('.rb').get(0).setAttribute('d', arrowPathO.rb);
                }
            }else if( (attachStartId && attachStartId.indexOf(nodeWidget)!= -1) ){
                anchor_start = $(node).find('.node-anchor-'+path.getAttribute('start-anchor'));
                unitL = anchor_start.css('left');
                unitT = anchor_start.css('top');
                startX = x + parseFloat( unitL )*( unitL.indexOf('%')!= -1 ? 1/100 * nodeW:1);
                startY = y + parseFloat( unitT )*( unitT.indexOf('%')!= -1 ? 1/100 * nodeH:1);
                /*startX = x + parseFloat(anchor_start.css('left'))/100 * nodeW;
                startY = y + parseFloat(anchor_start.css('top'))/100 * nodeH;*/
                endX   = path.getAttribute('endX');
                endY   = path.getAttribute('endY');
                pathStr = attachRenderRule(startX, startY, endX, endY, path.getAttribute('start-anchor'), path.getAttribute('end-anchor'));
                path.setAttribute('d', pathStr );
                path.setAttribute('startX', startX);
                path.setAttribute('startY', startY);
               /* path.setAttribute('endX', endX);
                path.setAttribute('endY', endY);*/

            }else if( (attachEndId && attachEndId.indexOf(nodeWidget)!= -1) ){
                anchor_end = $(node).find('.node-anchor-'+path.getAttribute('end-anchor'));
                unitL = anchor_end.css('left');
                unitT = anchor_end.css('top');
                endX   = x + parseFloat( unitL )*( unitL.indexOf('%')!= -1 ? 1/100 * nodeW:1);
                endY   = y + parseFloat( unitT )*( unitT.indexOf('%')!= -1 ? 1/100 * nodeH:1);
                startX = path.getAttribute('startX');
                startY = path.getAttribute('startY');
                /*endX   = x + parseFloat(anchor_end.css('left'))/100 * nodeW;
                endY   = y + parseFloat(anchor_end.css('top'))/100 * nodeH;*/
                pathStr = attachRenderRule(startX, startY, endX, endY, path.getAttribute('start-anchor'), path.getAttribute('end-anchor'));
                path.setAttribute('d', pathStr );
                /*path.setAttribute('startX', startX);
                 path.setAttribute('startX', startY);*/
                path.setAttribute('endX', endX);
                path.setAttribute('endY', endY);

                arrowPathO = arrowDraw_Attach(endX, endY, (path.getAttribute('end-anchor') ));

                if(arrowPathO){
                    $(path).parent().find('.lt').get(0).setAttribute('d', arrowPathO.lt);
                    $(path).parent().find('.rb').get(0).setAttribute('d', arrowPathO.rb);
                }
            }
        }
    }
};
