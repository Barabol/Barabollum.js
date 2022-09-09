// globalne zmienne

let x=[]
let y=[] 
let names=[]
let momentumX=[]
let momentumY=[]
let desiredX=[]
let desiredY=[]
let refresh_of_process=[]
let xwidth=[]
let xheight=[]
let errors=true
let paused=false
let has_collision=[]
let colliding=[]

let process_sync
let interval
let refresh=30
let initialized=0

function errors_on(){
    if(errors==false){
        errors=true
        return true
    }
    return false
}

function errors_off(){
    if(errors==true){
        errors=false
        return true
    }
    return false
}

function init(init_function=undefined,FPS=30){ //tworzenie samej w sobie sceny
    
    if (errors==true){
        if(initialized!=0)                              throw console.error("window can be initialized only once!")    //errory |
        if(FPS<=0)                                      throw console.error("desired FPS-es must be greater than zero!")      
        if(isNaN(FPS))                                  throw console.error("desired FPS-es must be specified as a number!")                                                                      //errory ^
    }
    refresh=Number(FPS)
    initialized=1  

    if(process_sync!=undefined)
    interval = setInterval(function(){if(paused==false)sync()}, (1000/refresh));
    else if(errors==true)
    throw console.error("porcesses must be defined!")

    if(init_function!=undefined)
    init_function()
    return true
}

function stop(){
    if(initialized==0 & errors==true) throw console.error("window is not initialized!")
    clearInterval(interval)
    initialized=0
    
    return true
}

function new_obj(WindowWidth,WindowHeight,WindowName,WindowX=0,WindowY=0,pozition="body"){
    if (errors==true){
        if(initialized!=1)                              throw console.error("fps must be set by using init()")
        if(WindowName==undefined)                       throw console.error("window must be named!")
        if(names.indexOf(WindowName)!=-1)               throw console.error("window name must be unique!")
        if(!isNaN(String(WindowName).charAt(0)))        throw console.error("window can not be named like this!")                                    
        if(!isNaN(pozition))                            throw console.error("positioning container(div) must not be defined as a number!")
        if(isNaN(WindowX) && isNaN(WindowY))            throw console.error("X and Y position must be defined as a number!")
        if (isNaN(WindowHeight) && isNaN(WindowWidth))  throw console.error("size must be defined as a number!")                                                                                            //errory ^
    }
    // tworzenie ekranu
    if (pozition=="body")
        document.body.innerHTML+="<div id='"+WindowName+"'></div>"
    else
        document.getElementById(pozition).innerHTML+="<div id='"+WindowName+"'></div>"

    document.getElementById(WindowName).style.backgroundColor="#000000"//test koloru chyba ??

    //marginesy
    document.getElementById(WindowName).style.marginLeft=String(WindowY)+"px"
    document.getElementById(WindowName).style.marginTop=String(WindowX)+"px"
    
    //wielkość
    document.getElementById(WindowName).style.height=String(WindowHeight)+"px"
    document.getElementById(WindowName).style.width=String(WindowWidth)+"px"

    document.getElementById(WindowName).style.transition="marginLeft "+1/refresh+"s,marginTop "+1/refresh+"s"
    document.getElementById(WindowName).style.position="absolute"

    xwidth[xwidth.length]=WindowWidth
    xheight[xheight.length]=WindowHeight
    x[x.length]=WindowX
    y[y.length]=WindowY
    names[names.length]=WindowName
    has_collision[has_collision.length]=false
    colliding[colliding.length]=false
    momentumX[momentumY.length]=0
    momentumY[momentumX.length]=0
    //console.log(1000/refresh)//wyświeltanie czasu na refresh
    return true
}

function del_obj(name){
    id=names.indexOf(name)
    x.splice(id)
    y.splice(id)
    names.splice(id)
    momentumX.splice(id)
    momentumY.splice(id)
    desiredX.splice(id)
    desiredY.splice(id)
    refresh_of_process.splice(id)
    xwidth.splice(id)
    xheight.splice(id)
    has_collision.getElementById(id).remove()
    colliding.getElementById(id).remove()

    document.getElementById(name).remove()

    return true
}

function texture(object="main",input,size_of_image=[0,0],offset=[0,0],repeat=false){//zmiana backgroundu

    if(object=="main")
        object=0
    else if(names.indexOf(object)!=-1)
        object=names.indexOf(object)
    else if (errors==true)
        throw console.error("object of this name does not exist!")

    if(Array.isArray(input) && input.length==3){//rgb
        document.getElementById(names[object]).style.backgroundColor="rgb("+input[0]+","+input[1]+","+input[2]+")"
        return}

    switch(String(input).charAt(0)){
        case"#"://hex
            if(input.length>7 & errors==true)
                throw console.error("invalid hex color!")
            document.getElementById(names[object]).style.backgroundColor=String(input)
        break
        case"!"://img
            input=input.substring(1)//wielkość textury
            if(size_of_image.length<2)
                console.error("too much arguments!")
            if(isNaN(size_of_image[0]) | isNaN(size_of_image[1]))
                console.error("size must be a number!")
            
            if(offset.length<2)//offset
                console.error("too much arguments!")
            if(isNaN(offset[0]) | isNaN(offset[1]))
                console.error("offset must be a number!")

            if (Boolean(repeat)==false)//powtarzanie textury na jednym obiekcie
            document.getElementById(names[object]).style.backgroundRepeat="no-repeat"
            else if (Boolean(repeat)==true)
            document.getElementById(names[object]).style.backgroundRepeat="repeat"
            else
            console.error("repeating myst be a boolean!")

            document.getElementById(names[object]).style.backgroundImage="url("+String(input)+")"
            if(size_of_image!=[0,0])
            document.getElementById(names[object]).style.backgroundSize=size_of_image[0]+"px "+size_of_image[1]+"px"
            if(size_of_image!=[0,0])
            document.getElementById(names[object]).style.backgroundPosition="left "+offset[0]+"px bottom "+offset[1]+"px"
        break
        default://color
            document.getElementById(names[object]).style.backgroundColor=String(input).toLowerCase
        break
    }
    return true
}

function set_size(object,width,height){
    if (errors==true){
        if (object==undefined)      throw console.error("object must be specified!")//errory
        if (width==undefined)       throw console.error("width must be specified!")
        if (height==undefined)      throw console.error("height must be specified!")
        if (!isNaN(width))          throw console.error("width must be specified as a number!")
        if (!isNaN(height))         throw console.error("height must be specified as a number!")
    }
    
    if(names.indexOf(object)!=-1) object=names.indexOf(object)
    else if (errors==true)throw console.error("object of this name does not exist!")

    document.getElementById(WindowName).style.height=String(height)+"px"
    document.getElementById(WindowName).style.width=String(width)+"px"

    return true
}

function move_by(object,destinationX,destinationY){
    if (errors==true){
        if (object==undefined)      throw console.error("object must be specified!")//errory
        if (destinationX==undefined)throw console.error("desired X must be specified!")
        if (destinationY==undefined)throw console.error("desired Y must be specified!")
        if (isNaN(destinationX))    throw console.error("desired X must be specified as number!")
        if (isNaN(destinationY))    throw console.error("desired Y must be specified as number!")
    }

    if(names.indexOf(object)!=-1) object=names.indexOf(object)
    else if (errors==true) throw console.error("object of this name does not exist!")

    document.getElementById(names[object]).style.marginLeft=String((x[object]+destinationX))+"px"
    document.getElementById(names[object]).style.marginTop=String((y[object]+destinationY))+"px"

    return true
}

function move_to(object,destinationX,destinationY){
    if (errors==true){
        if (object==undefined)      throw console.error("object must be specified!")//errory
        if (destinationX==undefined)throw console.error("desired X must be specified!")
        if (destinationY==undefined)throw console.error("desired Y must be specified!")
        if (isNaN(destinationX))    throw console.error("desired X must be specified as number!")
        if (isNaN(destinationY))    throw console.error("desired Y must be specified as number!")
    }

    
    if(names.indexOf(object)!=-1) object=names.indexOf(object)
    else if (errors==true) throw console.error("object of this name does not exist!")

    document.getElementById(names[object]).style.marginLeft=String(destinationX)+"px"
    document.getElementById(names[object]).style.marginTop=String(destinationY)+"px"

    return true
}
//ENTRANCE HIDDEN WITH USELESS CODE
//
//
//
//                              SADDAM HUSSEIN
//                                    |
//                                    |
//                                    |
//                                    |                                &&
// &&&&&&&&&&      &&&&&&&&&&&&&&&&&                                 &&&&
//##&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   &&&&&&&&&&&&&&&&&@@@@@&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//              &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// :o

function slide_by(object,destinationX,destinationY,speed){
    let z
    if (errors==true){
        if (object==undefined)      throw console.error("object must be specified!")//errory
        if (destinationX==undefined)throw console.error("desired X must be specified!")
        if (destinationY==undefined)throw console.error("desired Y must be specified!")
        if (isNaN(destinationX))    throw console.error("desired X must be specified as number!")
        if (isNaN(destinationY))    throw console.error("desired Y must be specified as number!")
        //if (destinationX<0)         throw console.error("desired X cannot be lower than 0!")
        //if (destinationY<0)         throw console.error("desired Y cannot be lower than 0!")
        if (speed==undefined)       throw console.error("speed must be specified!")
    }
    
    if(names.indexOf(object)!=-1) object=names.indexOf(object)
    else if (errors==true) throw console.error("object of this name does not exist!")

    if(refresh_of_process[object]==undefined | refresh_of_process[object]==NaN)
        refresh_of_process[object]=0

    if(x[object]==undefined | x[object]==NaN)
        x[object]=0
    
    if(y[object]==undefined | y[object]==NaN)
        y[object]=0

    if(destinationX==undefined | destinationX==NaN)
        destinationX=0

    if(destinationY==undefined | destinationY==NaN)
        destinationY=0

    if(desiredX[object]==undefined | desiredX[object]==NaN)
        desiredX[object]=0

    if(desiredY[object]==undefined | desiredY[object]==NaN)
        desiredY[object]=0

    desiredX[object]+=destinationX
    desiredY[object]+=destinationY

    if(destinationX==0 && destinationY!=0) {
        z=destinationY
        if(refresh_of_process[object]==NaN | refresh_of_process[object]==undefined | refresh_of_process[object]==0)
        refresh_of_process[object]=(z*refresh)/speed
        else
        refresh_of_process[object]+=(z*refresh)/speed
    }
    else if(destinationY==0 && destinationX!=0){
        z=destinationX
        if(refresh_of_process[object]==NaN | refresh_of_process[object]==undefined | refresh_of_process[object]==0)
        refresh_of_process[object]=(z*refresh)/speed
        else
        refresh_of_process[object]+=(z*refresh)/speed
    }
    else if(destinationY!=0 && destinationX!=0){
        z=Math.sqrt(Math.pow(destinationX, 2) + Math.pow(destinationY, 2))
        if(refresh_of_process[object]==NaN | refresh_of_process[object]==undefined | refresh_of_process[object]==0)
        refresh_of_process[object]=(z*refresh)/speed
        else
        refresh_of_process[object]+=(z*refresh)/speed
    }
    
    if(refresh_of_process[object]<0)
        refresh_of_process[object]*=-1

    if(refresh_of_process[object]==(z*refresh)/speed){
        momentumX[object]=destinationX/refresh_of_process[object]
        momentumY[object]=destinationY/refresh_of_process[object]
    }
    else if(momentumX[object]<destinationX/refresh_of_process[object]){
        momentumX[object]=destinationX/refresh_of_process[object]
    }
    else if(momentumY[object]<destinationY/refresh_of_process[object]){
        momentumY[object]=destinationY/refresh_of_process[object]
    }

    return true
}

function give_collision(name){
    if(names.indexOf(name)!=-1) name=names.indexOf(name)
    else if (errors==true) throw console.error("object of this name does not exist!")
    if(errors==true & has_collision[name]==true) throw console.error("this object alredy have collision")
    has_collision[name]=true
    return true
}
function get_collision(name){
    if(names.indexOf(name)!=-1) name=names.indexOf(name)
    else if (errors==true) throw console.error("object of this name does not exist!")
    return has_collision[name]
}
function remove_collision(name){
    if(names.indexOf(name)!=-1) name=names.indexOf(name)
    else if (errors==true) throw console.error("object of this name does not exist!")
    if(errors==true & has_collision[name]==false) throw console.error("this object alredy does not have collision")
    has_collision[name]=false
    return true
}
function set_process(process){
    if(errors==true){
        if(process==0)
            throw console.error("to set process you must init program!")
        if(process==2)
            throw console.error("process can be set only once!")
    }
    process_sync=process
    return true
}
function get_x(object){
    if(names.indexOf(object)==-1 & errors==true) throw console.error("object of this name does not exist!")
    return Number(document.getElementById(object).style.marginLeft.slice(0, -2))
}
function get_y(object){
    if(names.indexOf(object)==-1 & errors==true) throw console.error("object of this name does not exist!")
    return Number(document.getElementById(object).style.marginTop.slice(0, -2))
}
function get_width(object){
    if(names.indexOf(object)!=-1) object=names.indexOf(object)
    else if (errors==true) throw console.error("object of this name does not exist!")
    return xwidth[object]
}
function get_height(object){
    if(names.indexOf(object)!=-1) object=names.indexOf(object)
    else if (errors==true) throw console.error("object of this name does not exist!")
    return xheight[object]
}
function is_sliding(object){
    if(names.indexOf(object)!=-1) object=names.indexOf(object)
    else if (errors==true) throw console.error("object of this name does not exist!")
    if(momentumX[object]!=0 & momentumY[object]!=0 & refresh_of_process[object]!=0)
    return true
    else 
    return false
}
function get_speed_by(destinationX,destinationY,desiredTime){
    if (errors==true){
        if (destinationX==undefined)throw console.error("desired X must be specified!")
        if (destinationY==undefined)throw console.error("desired Y must be specified!")
        if (destinationX==undefined)throw console.error("desired time must be specified!")
    }
    if(destinationX==0 && destinationY!=0) 
        z=destinationY
    else if(destinationY==0 && destinationX!=0)
        z=destinationX
    else if(destinationY!=0 && destinationX!=0)
        z=Math.sqrt(Math.pow(destinationX, 2) + Math.pow(destinationY, 2))
    return(z)
}
function is_colliding(name){
    process=names.indexOf(name)
    if(has_collision[process]){
        for(i=has_collision.length-1;i>=0;i--){
            if(names[i]!=names[process] & has_collision[i]){
                if(x[process]>=x[i] & x[process]<=(x[i]+xwidth[i]) & y[process]>=y[i] & y[process]<=(y[i]+xheight[i]))
                    return true
            }
        }
        
    }
    else if(errors==true){
        console.error("this object does not have collision set to true!")
    }
    return false
}

function is_colliding_with(name,name2){
    process=names.indexOf(name)
    i=names.indexOf(name2)
    if(has_collision[process] & has_collision[i]){
        if(x[process]>=x[i] & x[process]<=(x[i]+xwidth[i]) & y[process]>=y[i] & y[process]<=(y[i]+xheight[i])){
            return true
        }   
    }
    else if(errors==true){
        console.error("this object does not have collision set to true!")
    }
    return false
}

function pause(){
    if(paused==false){
        paused=true
        return true
    }
    return false
}

function resume(){
    if(paused==true){
        paused=false
        return true
    }
    return false
}

function sync(shuld_not_be_called=true){
    let process
    process_sync()
    for(process=refresh_of_process.length-1;process>=0;process--){
        refresh_of_process[process]=Math.round(refresh_of_process[process])
        if(refresh_of_process[process]!=0 ){

            if(refresh_of_process[process]==NaN | refresh_of_process[process]==undefined){
                refresh_of_process=0
            }
            //console.log(names[process]+"--"+Math.round(refresh_of_process[process])+"--"+Math.round(x[process])+"--"+Math.round(y[process]))
            if(refresh_of_process[process]>0 & refresh_of_process[process]<1)
                refresh_of_process=1
    
            if(refresh_of_process[process]==1){
                x[process]=desiredX[process]
                y[process]=desiredY[process]
                momentumX[process]=0
                momentumY[process]=0
            }
            else{
                x[process]+=momentumX[process]
                y[process]+=momentumY[process]
            }
            document.getElementById(names[process]).style.marginLeft=String((x[process]))+"px"
            document.getElementById(names[process]).style.marginTop=String((y[process]))+"px"
            refresh_of_process[process]-=1
            
            
        }
        
    }
    
}
/*
-------------------dodać
-zmiane kolejności obiektów na podstawie HTML i ułożenia <div>
-naprawić slide_to()
-poprawić slide_by() jeśli jest nakładane kilku krotnie z różnymi odległościami
-kolizje na podstawie collision(nazwa) i wyświetla wsztystkie co kolidują+
-wymaganąfunkcje która będzie udomowiona w pętli refresh ratea+
*/
