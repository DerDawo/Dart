function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    console.log(x,y)

    x-=500
    y-=500
    var coords = "X coords: " + x + ", Y coords: " + y;
    if(cartesian2Polar(x,y).distance<17){
        console.log("BULLS EYE")
        console.log(50)
    }else if(cartesian2Polar(x,y).distance<37 && cartesian2Polar(x,y).distance>=17){
        console.log("SINGE BULL")
        console.log(25)
    }else if((cartesian2Polar(x,y).distance>=37 && cartesian2Polar(x,y).distance<222)||(cartesian2Polar(x,y).distance>=241 && cartesian2Polar(x,y).distance<362)){
        console.log("NORMAL")
        points(cartesian2Polar(x,y).degrees,1)
    }else if(cartesian2Polar(x,y).distance>=222 && cartesian2Polar(x,y).distance<241){
        console.log("TRIPLE")
        points(cartesian2Polar(x,y).degrees,3)
    }else if(cartesian2Polar(x,y).distance>=362 && cartesian2Polar(x,y).distance<381){
        console.log("DOUBLE")
        points(cartesian2Polar(x,y).degrees,2)
    }else{
        console.log("OUT OF BOUNDS")
        console.log(0)
    }

}

function cartesian2Polar(x, y){
    distance = Math.sqrt(x*x + y*y)
    radians = Math.atan2(y,x) //This takes y first
    degrees = radians * (180/Math.PI)
    polarCoor = { distance:distance, degrees:degrees }
    return polarCoor
}

function points(degrees,multi){
    if(degrees<9 && degrees>=-9){
        console.log(6*multi)
    }else if(degrees>=9 && degrees<27){
        console.log(10*multi)
    }else if(degrees>=27 && degrees<45){
        console.log(15*multi)
    }else if(degrees>=45 && degrees<63){
        console.log(2*multi)
    }else if(degrees>=63 && degrees<81){
        console.log(17*multi)
    }else if(degrees>=81 && degrees<99){
        console.log(3*multi)
    }else if(degrees>=99 && degrees<117){
        console.log(19*multi)
    }else if(degrees>=117 && degrees<135){
        console.log(7*multi)
    }else if(degrees>=135 && degrees<153){
        console.log(16*multi)
    }else if(degrees>=153 && degrees<171){
        console.log(8*multi)
    }else if(degrees<-9 && degrees>=-27){
        console.log(13*multi)
    }else if(degrees<-27 && degrees>=-45){
        console.log(4*multi)
    }else if(degrees<-45 && degrees>=-63){
        console.log(18*multi)
    }else if(degrees<-63 && degrees>=-81){
        console.log(1*multi)
    }else if(degrees<-81 && degrees>=-99){
        console.log(20*multi)
    }else if(degrees<-99 && degrees>=-117){
        console.log(5*multi)
    }else if(degrees<-117 && degrees>=-135){
        console.log(12*multi)
    }else if(degrees<-135 && degrees>=-153){
        console.log(9*multi)
    }else if(degrees<-153 && degrees>=-171){
        console.log(14*multi)
    }else if(degrees<-171 || degrees>=171){
        console.log(11*multi)
    }
}