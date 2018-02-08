/**
 * Created by yangjie on 2018/1/8.
 */
var stage = new Hilo.Stage({
    renderType:'canvas',
//        container: ,
    width: 980,
    height: 400
}).addTo( document.querySelector('#app-ct') );

var ticker = new Hilo.Ticker(60);
ticker.addTick(stage);
ticker.start();

stage.enableDOMEvent([Hilo.event.POINTER_START, Hilo.event.POINTER_MOVE, Hilo.event.POINTER_END])

var toolbarCt = new Hilo.Container({
    width: stage.width,
    height: 40,
    background: '#f4f6fc'
}).addTo(stage);

/**/
var nodeCreater = new Hilo.DOMElement({
    id: 'creater',
    element: Hilo.createElement('div', {
        innerHTML: '流程节点',
        style: {
            backgroundColor: '#ff0000',
            position: 'relative',
            fontSize: 12,
            lineHeight:1.2,
            textAlign:'center',
            cursor: 'pointer'
        }
    }),
    width: 80,
    height: 30,
    x: 10,
    y: 5
}).addTo(toolbarCt);

var nodeClone = new Hilo.DOMElement({
    id: 'creater',
    element: Hilo.createElement('div', {
        innerHTML: '抄送节点',
        style: {
            backgroundColor: '#00ff00',
            position: 'relative',
            fontSize: 12,
            lineHeight:1.2,
            textAlign:'center'
        }
    }),
    width: 80,
    height: 30,
    x: 110,
    y: -25
}).addTo(toolbarCt);

nodeCreater.on('Hilo.event.POINTER_START', function(e){

});

