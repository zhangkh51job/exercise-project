/**
 * Created by yangjie on 2018/1/24.
 */
//console.log( $([widgetname="widget1516776367351"]).find('.node-name').text() );
    var currDom;
var tabSelect = function(dom, type){
    $('.set-tab').removeClass('tab-active');
    $('.tab-select>div').removeClass('active');
    dom && $(dom).data('editData', $(dom).data('editData')?$(dom).data('editData'):{type:type});
    //if(dom && !$(dom))
    if(type == 'node'){
        $('.node-set').addClass('tab-active');
        $('.node-tab').addClass('active').text('节点设置');
    }else if(type == 'path'){
        $('.line-set').addClass('tab-active');
        $('.node-tab').addClass('active').text('节点线设置');
    }else if(type == 'flow'){
        $('.flow-set').addClass('tab-active');
        $('.flow-tab').addClass('active');
    };
    fillData($(dom).data('editData'));
    currDom = dom;
};
$('.node-set input, .node-set textarea').on('focusout', function(e){
    editDataHandle(this);
});
$('.line-set input, .line-set textarea').on('focusout', function(e){
    editDataHandle(this);
});
var fillData = function(data){
    $('#node_set_id input').val('');
    $('#node_set_id textarea').val('');
    for(var key in data){
        $('[name="'+ key + '"').val( data[key] );
    }
};
var editDataHandle = function(dom){
    var data = $(currDom).data('editData');
    var name = $(dom).attr('name');
    data[name] = $(dom).val();
    if( data.type == 'path' ){
        for(var key in data){
            if(data[key] && key != 'type'){
                $(currDom).parent().attr('class', 'hasCondtion');
                return;
            }
        }
        $(currDom).parent().attr('class', '');
    }else if(data.type == 'node' && name== 'approveName'){

        PathManager.addStep( $(currDom), 'textEdit', null, null, $(currDom).find('.node-name').text() );

        $(currDom).find('.node-name').text(data[name]?data[name]:'流程节点');

        PathManager.renderPath( $(currDom), parseFloat($(currDom).css('left')), parseFloat($(currDom).css('top')));
    }
};
var saveFlowMsg = function(){
    var arrowHeads = $('svg .path'),
        returnJsons = {
            "SendCode":1,"SendMessage":"节点流程","Data":[]
        };
    var arrow, startid, endid;
    var fromData, toData;
    for(var i = 0, leni = arrowHeads.length;i < leni;i++){
        arrow = arrowHeads[i];
        startid = arrow.getAttribute('attachStartId').split('_')[0];
        endid = arrow.getAttribute('attachEndId').split('_')[0];

        fromData = $("[widgetname='"+startid+"']").data('editData'),
        toData   = $("[widgetname='"+endid+"']").data('editData');

        returnJsons.Data.push(
            {
                "stepName": fromData["stepName"],
                "from": fromData["approveName"],
                "to": toData["approveName"],
                "conditionExpress":$(arrow).data('editData')?$(arrow).data('editData')["conditionExpression"]:null,
                "conditionDesc":$(arrow).data('editData')?$(arrow).data('editData')["conditionDescribe"]:null
            }
        );
    }
    var sortedArr = [], startNode;
    var sortStep = function(arr){
        if(arr.length == 0)return;
        if(sortedArr.length == 0){
            startNode = arr.pop();
            sortedArr.push(startNode);
        }
        var i = 0;
        while(i < arr.length){
            if(arr[i].to == startNode.from || arr[i].from == startNode.from){
                //sortedArr.unshift(arr[i]);
                sortedArr.splice(sortedArr.indexOf(startNode), 1, arr[i], startNode);
                startNode = arr[i];
                arr.splice(i, 1);
                continue;
            }
            if(arr[i].from == startNode.to || arr[i].to == startNode.to){
                //sortedArr.push(arr[i]);
                sortedArr.splice(sortedArr.indexOf(startNode), 1, startNode, arr[i]);
                //sortedArr.splice(i+1, 1, arr[i]);
                startNode = arr[i];
                arr.splice(i, 1);
                continue;
            }
            i++;
        }
        sortStep(arr);
    };
    //sortStep( returnJsons.Data );

    console.log( JSON.stringify( returnJsons ) );
    return JSON.stringify( returnJsons );
};
