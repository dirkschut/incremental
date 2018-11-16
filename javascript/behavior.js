var resources = [];
var buildings = [];
var userResource = "Wood";

var frameCounter = 0;
var framesBetweenKeyFrames = 1000;

$( window ).on("load", function(){
    console.log("Welcome");

    CreateResources();
    setUserResource("Wood");

    buildings = [];
    buildings["Woodcutter"] = new Building("Woodcutter");
    buildings["Woodcutter"].addResourceCost("Wood", 10);
    buildings["Woodcutter"].addProduce("Wood", 1);

    buildings["Stonemason"] = new Building("Stonemason");
    buildings["Stonemason"].addResourceCost("Wood", 100);
    buildings["Stonemason"].addResourceCost("Stone", 100);
    buildings["Stonemason"].addProduce("Stone", 1);

    buildings["Farm"] = new Building("Farm");
    buildings["Farm"].addResourceCost("Wood", 100);
    buildings["Farm"].addResourceCost("Food", 100);
    buildings["Farm"].addProduce("Food", 1);

    window.setInterval(tick, 1000);
    window.setInterval(frame, 10);
    keyFrame();
});

function tick(){
    for(var i = 0; i < Object.keys(buildings).length; i++){
        Object.values(buildings)[i].produce();
    }

    resources[userResource].increase(1);
}

function frame(){
    $("#WoodcutterAmount").text(buildings["Woodcutter"].getAmount());
    $("#StonemasonAmount").text(buildings["Stonemason"].getAmount());
    $("#FarmAmount").text(buildings["Farm"].getAmount());

    if(frameCounter >= framesBetweenKeyFrames){
        keyFrame();
        frameCounter = 0;
        return;
    }

    Object.values(resources).forEach(resource => {
        resource.updateView();
    });

    frameCounter++;
}

function keyFrame(){
    var resourcesText = "";

    Object.values(resources).forEach(element => {
        resourcesText += element.getViewString();
    });

    $("#resourcesList").html(resourcesText);
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
    switch(buildingName){
        case "Woodcutter":
            buildings["Woodcutter"].tryBuild();
            break;
        case "Stonemason":
            buildings["Stonemason"].tryBuild();
            break;
        case "Farm":
            buildings["Farm"].tryBuild();
            break;
        default:
            console.log("Unknown buildingName: " + buildingName);
            break;
    }
}