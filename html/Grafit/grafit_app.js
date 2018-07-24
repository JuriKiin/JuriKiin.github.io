var settings = {};

//Modal
var dataModal = document.getElementById('dataModal');
var dataInfo = document.getElementById('dataInfo');
var dataInfoHeader = document.getElementById('dataInfoHeader');

//Form
var title = document.getElementById('graphTitle');
var titleInput = document.getElementById('graphTitleInput');
var headerType = document.getElementById('headerType');
var inputType = document.getElementById('inputType');

var labelX = document.getElementById('labelX');
var labelY = document.getElementById('labelY');

var colorPicker = document.getElementById('colorPicker');


var dataInput = document.getElementById('dataInput');
var headerInput = document.getElementById('headerInput');
var clearData = document.getElementById('clear');

var canvas = document.getElementById('graphCanvas');
var c = canvas.getContext('2d');

var dataArr = sampleData.data;
title.innerHTML = sampleData.title;

window.onload = function(){
    init();
};

var init = function(){
    setUpGraph();
    headerType.value = sampleData.headerX;
    labelX.innerHTML = sampleData.headerX;
    inputType.value = sampleData.headerY;
    labelY.innerHTML = sampleData.headerY;
};

var setUpGraph = function(){
    //Establish bounds
    canvas.width = window.innerWidth - (window.innerWidth*.25);
    canvas.height = window.innerHeight/2;
    //Init settings
    dataInput.value = '';
    settings.barCount = 5; //Change depending on data
    settings.barBuffer = 10; //Space in between bars
    settings.barWidth = (canvas.width/ dataArr.length) - 3*settings.barBuffer;
    settings.barWidthBuffer = 2;
    settings.graphMax = 0; //Change based on data
    settings.heightBuffer = 0;
    settings.isMouseUp = true;

    //Loop through and calculate the max y bound.
    for(var i=0;i<dataArr.length;i++){
        if(dataArr[i].data >= settings.graphMax){
            settings.graphMax = Math.ceil((dataArr[i].data+1) / 10) * 10;
        }
    }
    setGraphDisplay();
    createDataPoints();
};

document.addEventListener('mousemove', function(e) {    //When the mouse moves
    //Get mouse position
    var rect = canvas.getBoundingClientRect();
    var mouse = {};
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    var hoverDataObj = checkForDataHover(e, mouse, dataArr); //Try and set the data we're hovering over

    if (settings.isMouseUp && hoverDataObj){ //If our mouse is up and we are hovering over something

        $('body').css({
            cursor:'pointer'
        });

        $('#dataModal').css({   //Move the modal to the *mouse position*
            left: mouse.x,
            top: mouse.y + 150
        });
        //Set the modal Info
        dataInfoHeader.innerHTML = headerType.value + ": " + hoverDataObj.title;
        dataInfo.innerHTML = inputType.value + ": " + hoverDataObj.data;
    }
    else{   //Otherwise move the modal offscreen
        $('#dataModal').css({
            left: -500,
            top: -500 
        });
        $('body').css({
            cursor:'default'
        });
    }
}, true);

canvas.addEventListener('mousedown', function(e) {  //When the mouse is down
    settings.isMouseUp = false;
}, true);

canvas.addEventListener('mouseup', function(e) {    //When the mouse click is released
    settings.isMouseUp = true;
}, true);

var checkForDataHover = function(e, mouse, data){ //Bounding Box Calculation with the graph data.
    for(var i=0;i<data.length;i++){
        if((mouse.x > data[i].xPos && mouse.x < data[i].xPos + data[i].width) && (mouse.y < data[i].yPos && mouse.y > data[i].yPos + data[i].height)){
            return data[i];
        }
    }
    return null;
};

//THIS WILL HAVE TO CHANGE WHEN OFFER LINE AND PIE GRAPHS

var createDataPoints = function(){  //Create rects to act as data points
    for(var i=0;i<dataArr.length;i++){
        if(i===0){  //If this is the first one, hard code some padding-left
            dataArr[i].xPos = (i*settings.barWidth) + 2*settings.barBuffer;
        }else{ //Otherwise just set the position as normal
            dataArr[i].xPos = (i*settings.barWidth) + (i*settings.barBuffer*3);
        }
        dataArr[i].yPos = canvas.height;
        dataArr[i].width = settings.barWidth / settings.barWidthBuffer;
        dataArr[i].height = -canvas.height * (dataArr[i].data / settings.graphMax) + settings.heightBuffer;
        
        c.beginPath();  //begin path to effect the rect we are currently on.
        c.fillStyle = "#" + dataArr[i].color;
        c.rect(dataArr[i].xPos, dataArr[i].yPos, dataArr[i].width, dataArr[i].height);
        c.fill();

        c.font="10pt Lato";
        c.fillStyle = 'black';

        //Bar label
        if(dataArr[i].data != 0){
            c.fillText(dataArr[i].data,dataArr[i].xPos,canvas.height+dataArr[i].height - 5);
        }
        
        if(dataArr.length <= 10){
            //Lower label
            c.font = '8pt Lato';
            c.fillText(dataArr[i].title,dataArr[i].xPos,dataArr[i].yPos - 5);
        }
    }
};

var setGraphDisplay = function(){
    c.font="7pt Lato";
    c.fillStyle = 'black';

    var intervals = parseInt(settings.graphMax/10)+1;

    for(var i=0;i<10;i++){
        c.fillText((settings.graphMax/10*i).toString(),0,canvas.height - ((canvas.height/10)*i) - 5);
    }


}

//Clears all data from the graph (GRAPH ONLY. [] will still be populated)
var clearData = function(){
    c.clearRect(0,0,canvas.width,canvas.height);    //Clear canvas every time we draw the data.
};

//Wipes all data from arrays. Clears the graph, and resets some important values.
var wipeData = function(){
    clearData();
    dataArr = [];
    settings.graphMax = 0;
}

//Add data to the array
var addData = function(){
    if(dataInput.value){
        dataArr.push(   //REQUIRED FOR GRAPH: title, data, color
            {
                title:headerInput.value,
                data:parseInt(dataInput.value),
                color: colorPicker.value
            }
        );
        labelX.innerHTML = headerType.value;
        labelY.innerHTML = inputType.value;
        setUpGraph();   //Setup to draw the new graph
    }
};
//Change the title of the graph
var changeTitle = function(){
    title.innerHTML = titleInput.value;
};

//Console logs the data (For testing purposes only.)
var printData = function(){
    for(var i=0;i<dataArr.length;i++){
        console.log(dataArr[i]);
    }
}