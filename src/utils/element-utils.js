export function getTop(e){ 

    var offset=e.offsetTop; 

    if(e.offsetParent!=null)
        offset += getTop(e.offsetParent); 

    return offset; 
} 

//获取元素的横坐标 
export function getLeft(e){ 

    var offset=e.offsetLeft; 
    if(e.offsetParent!=null) 
        offset+=getLeft(e.offsetParent); 

    return offset; 
} 