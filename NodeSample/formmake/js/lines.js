/**
 * Created by yangjie on 2018/1/11.
 */
var miniDis = 20;
var arrowDraw_Attach = function(currX, currY, type){
    var ltPathStr = '', rbPathStr = '';
    if(type == 't'){
        ltPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX-6) + ', '+ (currY-6) );
        rbPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX+6) + ', '+ (currY-6) );
    }else if(type == 'b'){
        ltPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX-6) + ', '+ (currY+6) );
        rbPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX+6) + ', '+ (currY+6) );
    }else if(type == 'l'){
        ltPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX-6) + ', '+ (currY-6) );
        rbPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX-6) + ', '+ (currY+6) );
    }else if(type == 'r'){
        ltPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX+6) + ', '+ (currY-6) );
        rbPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX+6) + ', '+ (currY+6) );
    }
    return {
        lt: ltPathStr,
        rb: rbPathStr
    }
};
var arrowDraw = function(startX, startY, currX, currY, aspect){
    var ltPathStr = '', rbPathStr = '';
    if(aspect == 'lr'){
        if(currX > startX && !arguments[5]  ){

            ltPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX-6) + ', '+ (currY-6) );
            rbPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX-6) + ', '+ (currY+6) );
        }else{
            ltPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX+6) + ', '+ (currY-6) );
            rbPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX+6) + ', '+ (currY+6) );
        }
    }else if(aspect == 'tb'){
        if(currY > startY || arguments[5]){
            ltPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX-6) + ', '+ (currY-6) );
            rbPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX+6) + ', '+ (currY-6) );
        }else{
            ltPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX-6) + ', '+ (currY+6) );
            rbPathStr = ('M'+currX + ', '+ currY ) + ('L'+ (currX+6) + ', '+ (currY+6) );
        }
    }
    return {
        lt: ltPathStr,
        rb: rbPathStr
    }
};

var moveRenderRule = function(startX, startY, currX, currY, type){
    var middlex = (currX - startX)/2 + startX;
    var middley = (currY - startY)/2 + startY;
    var pathStr = '';
    if(type =='b'){
        if( currY - startY > miniDis*2){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ middley )+
                ('L'+ currX+', '+ middley ) + ('L'+ currX+', '+ currY );
        }/*else if( currY - startY > 0 ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ middley )+
                ('L'+ currX+', '+ middley ) + ('L'+ currX+', '+ currY );
        }*/else{
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (startY+miniDis) )+
                ('L'+ middlex+', '+ (startY+miniDis) ) + ('L'+ middlex+', '+ (currY-miniDis) )+
                ('L'+ currX+', '+ (currY-miniDis) ) + ('L'+ currX+', '+ currY );
        }
    }else if(type == 't'){
        if( currY - startY > 0 ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (startY-miniDis) )+
                ('L'+ currX+', '+ (startY-miniDis) ) + ('L'+ currX+', '+ currY );
        }else /*if( currY - startY < -miniDis )*/{
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ middley )+
                ('L'+ currX+', '+ middley ) + ('L'+ currX+', '+ currY );
        }
    }else if(type == 'l'){
        if(currX - startX < -miniDis*2 ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ middlex+', '+ startY )+
                ('L'+ middlex+', '+ currY ) + ('L'+ currX+', '+ currY );
        }else{
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX - miniDis) + ', '+ startY )+
                ('L'+ (startX-miniDis)+', '+ currY ) + ('L'+ currX+', '+ currY );
        }
    }else if(type == 'r'){
        if(currX - startX > miniDis*2 ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ middlex+', '+ startY )+
                ('L'+ middlex+', '+ currY ) + ('L'+ currX+', '+ currY );
        }else{
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX+miniDis) + ', '+ startY )+
                ('L'+ (startX+miniDis)+', '+ currY ) + ('L'+ currX+', '+ currY );
        }
    }
    return pathStr;
};

/* */
var attachRenderRule = function(startX, startY, currX, currY, startType, endType){
    startX = parseFloat(startX);
    startY = parseFloat(startY);
    currX = parseFloat(currX);
    currY = parseFloat(currY);
    var middlex = (currX - startX)/2 + startX;
    var middley = (currY - startY)/2 + startY;
    var pathStr = '';
    /* endtype ------ t */
    if(startType == 'b' && endType == 't'){
        pathStr = moveRenderRule(startX, startY, currX, currY, 'b');
    }else if(startType == 't' && endType == 't'){
        if(currY > startY){
            pathStr = moveRenderRule(startX, startY, currX, currY, 't');
        }else{
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (currY-miniDis) )+
                ('L'+ currX+', '+ (currY-miniDis) ) + ('L'+ currX+', '+ currY );
        }
    } if(startType == 'r' && endType == 't'){
        if( currX > startX && currY > startY ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ currX+', '+ startY )+
                ('L'+ currX+', '+ currY );
        }else if( currX < startX && currY > startY ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX + miniDis)+', '+ startY )+
                ('L'+ (startX + miniDis)+', '+ middley ) + ('L'+ currX+', '+ middley ) + ('L'+ currX+', '+ currY );
        }else if( currX > startX && currY < startY ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ middlex+', '+ startY )+
                ('L'+ middlex+', '+ (currY-miniDis) ) + ('L'+ currX+', '+ (currY-miniDis) ) + ('L'+ currX+', '+ currY );
        }else if( currX < startX && currY < startY ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX+miniDis)+', '+ startY )+
                ('L'+ (startX+miniDis)+', '+ (currY-miniDis) ) + ('L'+ currX+', '+ (currY-miniDis) ) + ('L'+ currX+', '+ currY );
        }
    }else if(startType == 'l' && endType == 't'){
        if( currX > startX && currY > startY ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX-miniDis)+', '+ startY )+ ('L'+ (startX-miniDis)+', '+ middley )
                + ('L'+ currX +', '+ middley )+  ('L'+ currX+', '+ currY );
        }else if( currX > startX && currY < startY ) {
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX-miniDis)+', '+ startY )+ ('L'+ (startX-miniDis)+', '+ (currY - miniDis) )
                + ('L'+ currX +', '+ (currY - miniDis) )+  ('L'+ currX+', '+ currY );
        }else if( currX < startX && currY > startY ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ currX +', '+ startY ) +  ('L'+ currX+', '+ currY );
        }else if( currX < startX && currY < startY ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ middlex+', '+ startY )+ ('L'+ middlex+', '+ (currY - miniDis) )
                + ('L'+ currX +', '+ (currY - miniDis) )+  ('L'+ currX+', '+ currY );
        }
    }
    /* endtype ------ r */
    else if(endType == 'r'){
        if(startType == 'l'){
            if(currX > startX - miniDis){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX-miniDis)+', '+ startY )+ ('L'+ (startX-miniDis)+', '+ middley )
                    + ('L'+ (currX+miniDis) +', '+ middley )+ ('L'+ (currX+miniDis) +', '+ currY )+  ('L'+ currX+', '+ currY );
            }else{
                pathStr = moveRenderRule(startX, startY, currX, currY, 'l');
            }
        }else if(startType == 't'){
            if( currX > startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY-miniDis) )
                    + ('L'+ (currX + miniDis) + ', '+ (startY-miniDis) )+('L'+ (currX + miniDis)+', '+ currY )+ ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY-miniDis) ) +
                    ('L'+ middlex+', '+ (startY-miniDis) ) + ('L'+ middlex+', '+ currY ) + ('L'+ currX+', '+ currY );
            }else if( currX > startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ middley )+
                    ('L'+ (currX + miniDis)+', '+ middley ) + ('L'+ (currX + miniDis)+', '+ currY ) + ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ currY ) + ('L'+ currX+', '+ currY );
            }
        }else if(startType == 'r'){
            if(currX > startX){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (currX+miniDis) + ', '+ startY )
                    + ('L'+ (currX+miniDis) + ', '+ currY ) + ('L'+ currX+', '+ currY );
            }else{
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX+miniDis) + ', '+ startY )
                    + ('L'+ (startX+miniDis) + ', '+ currY ) + ('L'+ currX+', '+ currY );
            }
        }else if(startType == 'b'){
            if( currX > startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ middley )
                    + ('L'+ (currX + miniDis) + ', '+ middley )+('L'+ (currX + miniDis)+', '+ currY )+ ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ currY )  + ('L'+ currX+', '+ currY );
            }else if( currX > startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (startY + miniDis) )+
                    ('L'+ (currX + miniDis)+', '+ (startY + miniDis) ) + ('L'+ (currX + miniDis)+', '+ currY ) + ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (startY+miniDis) ) + ('L'+ middlex+', '+ (startY+miniDis) )
                +('L'+ middlex+', '+ currY ) + ('L'+ currX+', '+ currY );
            }
        }
    }
    /* endtype ------ b */
    else if(endType == 'b'){
        if(startType == 'l'){
            if( currX > startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX-miniDis) + ', '+ startY )
                    + ('L'+ (startX-miniDis) + ', '+ (currY + miniDis) )+('L'+ currX+', '+ (currY + miniDis) )+ ('L'+ currX+', '+ currY );
            }else if( currX > startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX-miniDis) + ', '+ startY )
                    + ('L'+ (startX-miniDis) + ', '+ middley )+('L'+ currX+', '+ middley )+ ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ middlex + ', '+ startY )
                    + ('L'+ middlex + ', '+ (currY + miniDis) )+('L'+ currX+', '+ (currY + miniDis) )+ ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ currX + ', '+ startY ) + ('L'+ currX+', '+ currY );
            }
        }else if(startType == 't'){
            if( currX > startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY-miniDis) )
                    + ('L'+ middlex + ', '+ (startY-miniDis))+('L'+ middlex+', '+ (currY + miniDis) )+ ('L'+ currX+', '+ (currY + miniDis) )+ ('L'+ currX+', '+ currY );
            }else if( currX > startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ middley )
                    + ('L'+ currX + ', '+ middley) + ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY-miniDis) )
                    + ('L'+ middlex + ', '+ (startY-miniDis))+('L'+ middlex+', '+ (currY + miniDis) )+ ('L'+ currX+', '+ (currY + miniDis) )+ ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ middley )
                    + ('L'+ currX + ', '+ middley ) + ('L'+ currX+', '+ currY );
            }
        }else if(startType == 'r'){
            if( currX > startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ middlex + ', '+ startY )
                    + ('L'+ middlex + ', '+ (currY+miniDis))+ ('L'+ currX+', '+ (currY + miniDis) )+ ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX+miniDis) + ', '+ startY ) + ('L'+ (startX+miniDis)+', '+ (currY+ miniDis) )
                    + ('L'+ currX+', '+ (currY+ miniDis) )+('L'+ currX + ', '+ currY);
            }else if( currX > startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ currX + ', '+ startY ) + ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX+miniDis) + ', '+ startY ) + ('L'+ (startX+miniDis) + ', '+ middley )
                    + ('L'+ currX+', '+ middley )+('L'+ currX + ', '+ currY);
            }
        }else if(startType == 'b'){
            if( currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (currY+miniDis) )
                    + ('L'+ currX + ', '+ (currY+miniDis))+  ('L'+ currX+', '+ currY );
            }else {
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY+miniDis) )
                    + ('L'+ currX + ', '+ (startY+miniDis))+ ('L'+ currX+', '+ currY );
            }
        }
    }
    /* endtype ------ l */
    else if(endType == 'l'){
        if(startType == 'l'){
            if(currX > startX){
                pathStr = moveRenderRule(startX, startY, currX, currY, 'l')
            }else{
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (currX-miniDis) + ', '+ startY )
                    + ('L'+ (currX-miniDis) + ', '+ currY)+ ('L'+ currX+', '+ currY );
            }
        }else if(startType == 't'){
            if( currX > startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY-miniDis) )
                    + ('L'+ middlex + ', '+ (startY-miniDis))+ ('L'+ middlex+', '+ currY )+ ('L'+ currX+', '+ currY );
            }else if( currX > startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ currY ) +('L'+ currX + ', '+ currY);
            }else if( currX < startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY-miniDis) ) + ('L'+ (currX-miniDis)+', '+ (startY-miniDis) )
                    + ('L'+ (currX-miniDis)+', '+ currY ) + ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ middley ) + ('L'+ (currX-miniDis) + ', '+ middley )
                    + ('L'+ (currX-miniDis)+', '+ currY )+('L'+ currX + ', '+ currY);
            }
        }else if(startType == 'r'){
            if(currX > startX){
                pathStr = moveRenderRule(startX, startY, currX, currY, 'r')
            }else{
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ (startX+miniDis) + ', '+ startY ) + ('L'+ (startX+miniDis) +', '+ middley )
                    + ('L'+ (currX-miniDis)+', '+ middley ) + ('L'+ (currX-miniDis)+', '+ currY )+ ('L'+ currX+', '+ currY );
            }
        }else if(startType == 'b'){
            if( currX > startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ currY ) + ('L'+ currX+', '+ currY );
            }else if( currX > startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY+miniDis) ) +('L'+ middlex + ', '+ (startY+miniDis))+
                    ('L'+ middlex + ', '+ currY) + ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY > startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ middley ) + ('L'+ (currX-miniDis)+', '+ middley )
                    + ('L'+ (currX-miniDis)+', '+ currY ) + ('L'+ currX+', '+ currY );
            }else if( currX < startX && currY < startY ){
                pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX + ', '+ (startY+miniDis) ) + ('L'+ (currX-miniDis) + ', '+ (startY+miniDis) )
                    + ('L'+ (currX-miniDis)+', '+ currY )+('L'+ currX + ', '+ currY);
            }
        }
    }
    return pathStr;
};

var nodeLine = function(startX, startY, currX, currY, type){
    var pathStr = '';
    if(type == 'bottom'){
        var middley = (currY - startY)/2 + startY;
        var middlex = (currX - startX)/2 + startX;
        if( currY - startY > 40){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ middley )+
                ('L'+ currX+', '+ middley ) + ('L'+ currX+', '+ currY );
        }else if( currY - startY > 0 ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ middley )+
                ('L'+ currX+', '+ middley ) + ('L'+ currX+', '+ currY );
        }else{
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (startY+miniDis) )+
                ('L'+ middlex+', '+ (startY+miniDis) ) + ('L'+ middlex+', '+ (currY-miniDis) )+
                ('L'+ currX+', '+ (currY-miniDis) ) + ('L'+ currX+', '+ currY )
            ;
        }
    }else if(type == 'top'){
        if( currY - startY > 0 ){
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (startY-miniDis) )+
                ('L'+ currX+', '+ (startY-miniDis) ) + ('L'+ currX+', '+ currY );
        }else {
            pathStr = ('M'+startX + ', '+ startY ) + ('L'+ startX+', '+ (currY-miniDis) )+
                ('L'+ currX+', '+ (currY-miniDis) ) + ('L'+ currX+', '+ currY );
        }
    }
    return pathStr;
};