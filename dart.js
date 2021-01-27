var side

function containerAsize(){
    let wwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let wheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    side = Math.min(wwidth*0.8,wheight*0.8)-20

    document.getElementById("svg").style.width = side+20
    document.getElementById("svg").style.height = side+20
}

function build(){
    //Radius
    var radius = side/2

    //Dartboard Breiten der felder
    var oob = radius*50/220
    var triple = radius*8/220
    var normbig = radius*55/220
    var double = radius*8/220
    var normsma = radius*83.1/220
    var singbull = radius*9.55/220
    var bullseye = radius*6.35/220

    //Mittel-Position der Dartfelder vom Zentrum
    var pos_oob = (oob+triple+normbig+double+normsma+singbull+bullseye+triple+normbig+double+normsma+singbull+bullseye)/2
    var pos_trip = (triple+normbig+double+normsma+singbull+bullseye+normbig+double+normsma+singbull+bullseye)/2
    var pos_doub =  (double+normsma+singbull+bullseye+normsma+singbull+bullseye)/2

    //End-Position der Dartfelder vom Zentrum
    var end_oob = oob+triple+normbig+double+normsma+singbull+bullseye
    var end_trip = triple+normbig+double+normsma+singbull+bullseye
    var end_doub = double+normsma+singbull+bullseye
    var end_sinb = singbull+bullseye
    var end_bull = bullseye
    
    //Punkte in einer Lister
    const pointlist = [6,10,15,2,17,3,19,7,16,8,11,14,9,12,5,20,1,18,4,13]

    const svgns = "http://www.w3.org/2000/svg";

    var tripsndubsred = document.getElementById("tripsndubsred");
    tripsndubsred.setAttribute("stroke-width",triple)
    var tripsndubsgreen = document.getElementById("tripsndubsgreen");
    tripsndubsgreen.setAttribute("stroke-width",double)

    //Erstelle Triple und Double Ring
    var i;
    for (i = 0; i < 20; i++) {
        let path = document.createElementNS(svgns,"path")
        d="M "+(pole2cartesian(pos_trip,9+i*18,radius).x)+" "+(pole2cartesian(pos_trip,9+i*18,radius).y)+" A "+(radius)+" "+(radius)+" 0 0 0 "+(pole2cartesian(pos_trip,-9+i*18,radius).x)+" "+(pole2cartesian(pos_trip,-9+i*18,radius).y)
        path.setAttribute("d",d)
        path.setAttribute("data-points",pointlist[i]*2)
        path.id = "double"+String(pointlist[i])
        if(i%2==0){
            tripsndubsgreen.appendChild(path)
        }else if(i%2==1){
            tripsndubsred.appendChild(path)
        }
        document.getElementById(path.id).addEventListener("mouseover",multiphover)
        document.getElementById(path.id).addEventListener("mouseout",multipout)
        document.getElementById(path.id).addEventListener("click",gamelogic)
    } 
    for (i = 0; i < 20; i++) {
        let path = document.createElementNS(svgns,"path")
        d="M "+(pole2cartesian(pos_doub,9+i*18,radius).x)+" "+(pole2cartesian(pos_doub,9+i*18,radius).y)+" A "+(radius)+" "+(radius)+" 0 0 0 "+(pole2cartesian(pos_doub,-9+i*18,radius).x)+" "+(pole2cartesian(pos_doub,-9+i*18,radius).y)
        path.setAttribute("d",d)
        path.setAttribute("data-points",pointlist[i]*3)
        path.id = "triple"+String(pointlist[i])
        if(i%2==0){
            tripsndubsgreen.appendChild(path)
        }else if(i%2==1){
            tripsndubsred.appendChild(path)
        }
        document.getElementById(path.id).addEventListener("mouseover",multiphover)
        document.getElementById(path.id).addEventListener("mouseout",multipout)
        document.getElementById(path.id).addEventListener("click",gamelogic)
    } 

    //Verändere die Größe der Ringe, wenn sie gehovert werden
    function multiphover(){
        document.getElementById(this.id).setAttribute("stroke-width",triple*3)
    }
    function multipout(){
        document.getElementById(this.id).setAttribute("stroke-width",triple)
    }

    //Erstelle Normal Big
    var normalbigbeige = document.getElementById("normalbigbeige");
    var normalbigblack = document.getElementById("normalbigblack");
    for (i = 0; i < 20; i++) {
        let triangle = document.createElementNS(svgns,"polygon")
        points=(pole2cartesian(end_trip,9+i*18,radius).x)+","+(pole2cartesian(end_trip,9+i*18,radius).y)+" "+(pole2cartesian(end_trip,-9+i*18,radius).x)+","+(pole2cartesian(end_trip,-9+i*18,radius).y)+" "+(pole2cartesian(end_doub,-9+i*18,radius).x)+","+(pole2cartesian(end_doub,-9+i*18,radius).y)+" "+(pole2cartesian(end_doub,9+i*18,radius).x)+","+(pole2cartesian(end_doub,9+i*18,radius).y)
        triangle.setAttribute("points",points)
        triangle.setAttribute("data-points",pointlist[i])
        triangle.id = "normalbig"+String(pointlist[i])
        if(i%2==0){
            normalbigbeige.appendChild(triangle)
            document.getElementById(triangle.id).addEventListener("mouseover",normbehover)
            document.getElementById(triangle.id).addEventListener("mouseout",normbeout)
        }else if(i%2==1){
            normalbigblack.appendChild(triangle)
            document.getElementById(triangle.id).addEventListener("mouseover",normblhover)
            document.getElementById(triangle.id).addEventListener("mouseout",normblout)
        }
        document.getElementById(triangle.id).addEventListener("click",gamelogic)
    } 

    //Erstelle Normal Small
    var normalsmallbeige = document.getElementById("normalsmallbeige");
    var normalsmallblack = document.getElementById("normalsmallblack");

    for (i = 0; i < 20; i++) {
        let triangle = document.createElementNS(svgns,"polygon")
        points=(pole2cartesian(end_doub,9+i*18,radius).x)+","+(pole2cartesian(end_doub,9+i*18,radius).y)+" "+(pole2cartesian(end_doub,-9+i*18,radius).x)+","+(pole2cartesian(end_doub,-9+i*18,radius).y)+" "+(pole2cartesian(end_sinb,-9+i*18,radius).x)+","+(pole2cartesian(end_sinb,-9+i*18,radius).y)+" "+(pole2cartesian(end_sinb,9+i*18,radius).x)+","+(pole2cartesian(end_sinb,9+i*18,radius).y)
        triangle.setAttribute("points",points)
        triangle.setAttribute("data-points",pointlist[i])
        triangle.id = "normalsmall"+String(pointlist[i])
        if(i%2==0){
            normalsmallblack.appendChild(triangle)
            document.getElementById(triangle.id).addEventListener("mouseover",normbehover)
            document.getElementById(triangle.id).addEventListener("mouseout",normbeout)
        }else if(i%2==1){
            normalsmallbeige.appendChild(triangle)
            document.getElementById(triangle.id).addEventListener("mouseover",normblhover)
            document.getElementById(triangle.id).addEventListener("mouseout",normblout)
        }
        document.getElementById(triangle.id).addEventListener("click",gamelogic)
    } 

    //Verändere die Farbe der Black normals, wenn sie gehovert werden
    function normblhover(){
        radiusold=this.getAttribute("fill")
        document.getElementById(this.id).setAttribute("fill","#2c3347")
    }
    function normblout(){
        radiusnew=this.getAttribute("fill")
        document.getElementById(this.id).setAttribute("fill","black")
    }

    //Verändere die Farbe der Black normals, wenn sie gehovert werden
    function normbehover(){
        radiusold=this.getAttribute("fill")
        document.getElementById(this.id).setAttribute("fill","#fcfca9")
    }
    function normbeout(){
        radiusnew=this.getAttribute("fill")
        document.getElementById(this.id).setAttribute("fill","beige")
    }

    /*Erstelle Drahtnetz
    var circlemesh = document.getElementById("circlemesh")
    var ends = [end_oob,end_trip,end_nomb,end_doub,end_noms,end_sinb,end_bull]
    for (i in ends) {
        let circle = document.createElementNS(svgns,"circle")
        circle.setAttribute("cx",radius)
        circle.setAttribute("cy",radius)
        circle.setAttribute("r",ends[i])
        circlemesh.appendChild(circle)
    }*/

    //Erstelle Kreise
    var sbull = document.createElementNS(svgns,"circle")
    sbull.setAttribute("cx",radius)
    sbull.setAttribute("cy",radius)
    sbull.setAttribute("r",end_sinb)
    sbull.setAttribute("data-points",25)
    sbull.id = "sbull"
    document.getElementById("singlebull").appendChild(sbull)
    document.getElementById("sbull").addEventListener("mouseover",circlehover)
    document.getElementById("sbull").addEventListener("mouseout",circleout)
    document.getElementById("sbull").addEventListener("click",gamelogic)


    var bull = document.createElementNS(svgns,"circle")
    bull.setAttribute("cx",radius)
    bull.setAttribute("cy",radius)
    bull.setAttribute("r",end_bull)
    bull.setAttribute("data-points",50)
    bull.id="bull"
    document.getElementById("bullseye").appendChild(bull)
    document.getElementById("bull").addEventListener("mouseover",circlehover)
    document.getElementById("bull").addEventListener("mouseout",circleout)
    document.getElementById("bull").addEventListener("click",gamelogic)

    //Verändere die Größe der Kreise, wenn sie gehovert werden
    function circlehover(){
        radiusold=this.getAttribute("r")
        document.getElementById(this.id).setAttribute("r",radiusold*2)
    }
    function circleout(){
        radiusnew=this.getAttribute("r")
        document.getElementById(this.id).setAttribute("r",radiusnew/2)
    }

    //OOB Fläche
    var oobarea = document.createElementNS(svgns,"circle")
    oobarea.setAttribute("cx",radius)
    oobarea.setAttribute("cy",radius)
    oobarea.setAttribute("r",end_oob)
    oobarea.setAttribute("data-points",0)
    document.getElementById("oob").appendChild(oobarea)
    document.getElementById("oob").addEventListener("click",gamelogic)
    document.getElementById("oob").addEventListener("mouseover",normblhover)
    document.getElementById("oob").addEventListener("mouseout",normblout)

    //Schreibe Punkte auf OOB
    var pointsonboard = document.getElementById("points")
    pointsonboard.setAttribute("font-size",oob/2)
    for (i = 0; i < 20; i++) {
        let text = document.createElementNS(svgns,"text")
        text.innerHTML = pointlist[i]
        pointsonboard.appendChild(text)
        text.setAttribute("x",pole2cartesian(pos_oob,i*18,radius).x-(text.getBBox().width/2))
        text.setAttribute("y",pole2cartesian(pos_oob,i*18,radius).y+(text.getBBox().height/4))
    } 

    //Überführe Polarkoordinaten zu Kartesischen
    function pole2cartesian(distance,degrees,radius){
        x = distance*Math.cos(degrees*(Math.PI/180))+radius
        y = distance*Math.sin(degrees*(Math.PI/180))+radius
        cartesianCoor = { x:x, y:y }
        return cartesianCoor
    }
}

function firstbuild(){
    containerAsize()
    build()
}

function rebuild(){
    removeAllChildNodes(document.getElementById("oob"));
    removeAllChildNodes(document.getElementById("normalbigblack"));
    removeAllChildNodes(document.getElementById("normalbigbeige"));
    removeAllChildNodes(document.getElementById("normalsmallblack"));
    removeAllChildNodes(document.getElementById("normalsmallbeige"));
    removeAllChildNodes(document.getElementById("tripsndubsred"));
    removeAllChildNodes(document.getElementById("tripsndubsgreen"));
    removeAllChildNodes(document.getElementById("singlebull"));
    removeAllChildNodes(document.getElementById("bullseye"));
    removeAllChildNodes(document.getElementById("circlemesh"));
    removeAllChildNodes(document.getElementById("points"));
    containerAsize()
    build()
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var gamestanding
var leg

function confirmOptions(){
    //Generiere Spieltabelle
    removeAllChildNodes(document.getElementById("tableGame"))
    ammountPlayer = document.getElementById("ammountPlayer").value
    for(i=0;i<ammountPlayer;i++){
        playertr = document.createElement("tr")
        playertr.id = "Player"+i
        document.getElementById("tableGame").appendChild(playertr)
        nametd = document.createElement("td")
        settd = document.createElement("td")
        legtd = document.createElement("td")
        pointstd = document.createElement("td")
        turntd = document.createElement("td")
        nametd.className = "nametd"
        nametd.id = "name"+String(i)
        settd.className = "settd"
        settd.id = String(i)+String(0)
        legtd.className = "legtd"
        legtd.id = String(i)+String(1)
        pointstd.className = "pointstd"
        pointstd.id = String(i)+String(2)
        turntd.className = "turntd"
        playertr.appendChild(nametd)
        playertr.appendChild(settd)
        playertr.appendChild(legtd)
        playertr.appendChild(pointstd)
        playertr.appendChild(turntd)
        nameInput = document.createElement("input")
        nameInput.id = "nameinput"+String(i)
        nameInput.setAttribute("type","text")
        nametd.appendChild(nameInput)
    }

    leg = Number(document.getElementById("Legsize").value)

    //Spielstand
    gamestanding = []
    startstanding = [0,0,leg]
    for(k=0;k<ammountPlayer;k++){
        gamestanding.push(startstanding)  
    }

    for(k=0;k<ammountPlayer;k++){
        for(j=0;j<3;j++){
            document.getElementById(String(k)+String(j)).innerHTML = gamestanding[k][j]
        }
    }

    gamest = []
    for(k=0;k<ammountPlayer;k++){
        gamest.push(0)
        gamest.push(0)
        gamest.push(leg) 
        for(j=0;j<3;j++){
            document.getElementById(String(k)+String(j)).innerHTML = gamest[k*3+j]
        }
    }

}

var lasttry = []
var counter = 0
var turn = 0
var pos = 0
var setp = 0
var legp = 0

function gamelogic(){
    ammountPlayer = document.getElementById("ammountPlayer").value
    leg = Number(document.getElementById("Legsize").value)

    fieldp = this.getAttribute("data-points") 

    lasttry.push(gamest[turn+2])

    gamest[turn+2] -=fieldp

    //Leg auf 0 runterspielen
    if(gamest[turn+2]==0){
        gamest[turn+1] +=1
        document.getElementById(String(pos)+"1").innerHTML = gamest[turn+1]
        for(i=0;i<ammountPlayer;i++){
            gamest[i*3+2]=leg
            document.getElementById(String(i)+"2").innerHTML = gamest[i*3+2]
        }

        //Anzahl der maximalen Legs pro Set erreicht
        if(gamest[turn+1]==document.getElementById("legpset").value){
            gamest[turn] += 1
            document.getElementById(String(pos)+"0").innerHTML = gamest[turn]
            for(i=0;i<ammountPlayer;i++){
                gamest[i*3+1]=0
                document.getElementById(String(i)+"1").innerHTML = gamest[i*3+1]
            }
        }
        counter = 0
        pos +=1
        turn +=3
        if(turn==ammountPlayer*3){
            pos = 0
            turn = 0
        }
    //Leg wird negativ
    }else if(gamest[turn+2]<0){
        gamest[turn+2]=lasttry[0]
        document.getElementById(String(pos)+"2").innerHTML = lasttry[0]
        lasttry = []
        counter = 0
        turn +=3
        if(turn==ammountPlayer*3){
            turn = 0
        }
    //Standard Fall
    }else if(gamest[turn+2]>0){

        document.getElementById(String(pos)+"2").innerHTML = gamest[turn+2]
        tunrlogic()
    }

    if(lasttry.length==3){
        lasttry = []
    }

    //Sieg
    for(k=0;k<ammountPlayer;k++){
        if(document.getElementById(String(k)+"0").innerHTML == document.getElementById("sets").value){
            alert(String(document.getElementById("nameinput"+String(k)).value)+" hat gewonnen!")
        }
    }
}

function tunrlogic(){
    counter += 1
    if(counter == 3){
        counter = 0
        pos +=1
        turn +=3
        if(turn==ammountPlayer*3){
            turn = 0
            pos=0
        }
    }
}

document.getElementById("confirmOptions").addEventListener("click",confirmOptions)
window.addEventListener("load",firstbuild)
window.addEventListener("resize",rebuild)


