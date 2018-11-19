var resources = [];
var buildings = [];
var buildQueue = [];
var userResource = "Wood";

var buildTicksRemain = 0;
var frameCounter = 0;
var framesBetweenKeyFrames = 1000;

$( window ).on("load", function(){
    console.log("Welcome");

    CreateResources();
    setUserResource("Wood");

    CreateBuildings();

    window.setInterval(tick, 1000);
    window.setInterval(frame, 10);
    keyFrame();
});

function tick(){
    for(var i = 0; i < Object.keys(buildings).length; i++){
        Object.values(buildings)[i].produce();
    }

    if(buildQueue.length > 0){
        if(buildTicksRemain != 0){
            buildTicksRemain--;
        }else{
            var building = buildQueue.shift();
            buildings[building].dequeueBuilding();
            if(buildQueue.length > 0){
                buildTicksRemain = buildings[buildQueue[0].getName()].buildTime();
            }
        }
    }

    resources[userResource].increase(1);
}

function frame(){
    if(frameCounter >= framesBetweenKeyFrames){
        keyFrame();
        frameCounter = 0;
        return;
    }

    Object.values(resources).forEach(resource => {
        resource.updateView();
    });

    Object.values(buildings).forEach(building => {
        building.updateView();
    });

    frameCounter++;
}

function keyFrame(){
    var baseString = "<li><h3>Basic</h3></li>";
    var intermediateString = "<li><h3>Intermediate</h3></li>";
    var toolsString = "<li><h3>Tools</h3></li>";
    var popString = "<li><h3>Population</h3></li>";

    Object.values(resources).forEach(element => {
        switch(element.getCategory()){
            case "intermediate":
                intermediateString += element.getViewString();
                break;
            case "tools":
                toolsString += element.getViewString();
                break;
            case "pop":
                popString += element.getViewString();
                break;
            default:
                baseString += element.getViewString();
                break;
        }
    });
    $("#resourcesList").html(baseString + intermediateString + toolsString + popString);

    var buildingsText = "";
    Object.values(buildings).forEach(element => {
        buildingsText += element.getViewString();
    });
    $("#buildingListList").html(buildingsText);
}

function setUserResource(resource){
    clearManualResource();
    userResource = resource;
    
    var foundIt = false;

    Object.values(resources).forEach(tempResource => {
        if(tempResource.getName() == resource){
            $("#" + resource).children(".UserCanDo").addClass("userDoing");
            foundIt = true;
        }
    });

    if(!foundIt){
        userResource = "Wood";
        console.log("UNKNOWN USER RESOURCE: " + resource);
    }

}

function clearManualResource(){
    Object.values(resources).forEach(resource => {
        $("#" + resource.getName()).children(".UserCanDo").removeClass("userDoing");
    });
}

function tryBuildBuilding(buildingName){
    if(buildings[buildingName] == null){
        console.log("Unknown buildingName: " + buildingName);
        return;
    }else{
        if(buildings[buildingName].canBuild()){
            buildQueue.push(buildingName);
            buildings[buildingName].enqueueBuilding();
            buildTicksRemain = buildings[buildingName].getBuildTime();
        }
    }
}