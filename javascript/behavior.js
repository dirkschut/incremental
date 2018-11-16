var resources = [];
var buildings = [];
var userResource = "wood";

$( window ).on("load", function(){
    console.log("Welcome");

    resources["wood"] = new Resource("Wood");
    resources["stone"] = new Resource("Stone");
    resources["food"] = new Resource("Food");
    setUserResource("wood");

    buildings = [];
    buildings["woodcutter"] = new Building("Woodcutter");
    buildings["woodcutter"].addResourceCost("wood", 10);
    buildings["woodcutter"].addProduce("wood", 1);

    buildings["stonemason"] = new Building("Stonemason");
    buildings["stonemason"].addResourceCost("wood", 100);
    buildings["stonemason"].addResourceCost("stone", 100);
    buildings["stonemason"].addProduce("stone", 1);

    buildings["farm"] = new Building("Farm");
    buildings["farm"].addResourceCost("wood", 100);
    buildings["farm"].addResourceCost("food", 100);
    buildings["farm"].addProduce("food", 1);

    window.setInterval(tick, 1000);
    window.setInterval(frame, 10);
});

function tick(){
    for(var i = 0; i < Object.keys(buildings).length; i++){
        Object.values(buildings)[i].produce();
    }

    resources[userResource].increase(1);
}

function frame(){
    $("#WoodAmount").text(resources["wood"].getAmount());
    $("#StoneAmount").text(resources["stone"].getAmount());
    $("#FoodAmount").text(resources["food"].getAmount());

    $("#WoodcutterAmount").text(buildings["woodcutter"].getAmount());
    $("#StonemasonAmount").text(buildings["stonemason"].getAmount());
    $("#FarmAmount").text(buildings["farm"].getAmount());
}

function setUserResource(resource){
    clearManualResource();
    userResource = resource;
    switch(resource){
        case "wood":
            $("#WoodUserButton").addClass("userDoing");
            break;
        case "stone":
            $("#StoneUserButton").addClass("userDoing");
            break;
        case "food":
            $("#FoodUserButton").addClass("userDoing");
            break;
        default:
            userResource = "wood";
            console.log("UNKNOWN USER RESOURCE: " + resource);
            break;
    }
}

function clearManualResource(){
    $("#WoodUserButton").removeClass("userDoing");
    $("#StoneUserButton").removeClass("userDoing");
    $("#FoodUserButton").removeClass("userDoing");
}

function tryBuildBuilding(buildingName){
    switch(buildingName){
        case "woodcutter":
            buildings["woodcutter"].tryBuild();
            break;
        case "stonemason":
            buildings["stonemason"].tryBuild();
            break;
        case "farm":
            buildings["farm"].tryBuild();
            break;
        default:
            console.log("Unknown buildingName: " + buildingName);
            break;
    }
}