$( window ).on("load", function(){
    console.log("Welcome");

    window.counter = 0;
    window.resources = [];
    window.resources["wood"] = new Resource("Wood");
    window.resources["stone"] = new Resource("Stone");
    window.resources["food"] = new Resource("Food");
    setUserResource("wood");

    window.buildings = [];
    window.buildings["woodcutter"] = new Building("Woodcutter");
    window.buildings["woodcutter"].addResourceCost("wood", 10);
    window.buildings["woodcutter"].addProduce("wood", 1);

    window.buildings["stonemason"] = new Building("Stonemason");
    window.buildings["stonemason"].addResourceCost("wood", 100);
    window.buildings["stonemason"].addResourceCost("stone", 100);

    window.buildings["farm"] = new Building("Farm");
    window.buildings["farm"].addResourceCost("wood", 100);
    window.buildings["farm"].addResourceCost("food", 100);

    window.setInterval(tick, 1000);
    window.setInterval(frame, 10);

    $("#GetMore").click(function(){
        window.counter += 10;
    });
});

function tick(){
    console.log(window.resources.length);
    for(var i = 0; i < window.buildings.length; i++){
        window.buildings[i].produce();
    }

    window.resources[window.userResource].increase();
}

function frame(){
    $("#WoodAmount").text(window.resources["wood"].getAmount());
    $("#StoneAmount").text(window.resources["stone"].getAmount());
    $("#FoodAmount").text(window.resources["food"].getAmount());

    $("#WoodcutterAmount").text(window.buildings["woodcutter"].getAmount());
    $("#StonemasonAmount").text(window.buildings["stonemason"].getAmount());
    $("#FarmAmount").text(window.buildings["farm"].getAmount());
}

function setUserResource(resource){
    console.log(resource);
    clearManualResource();
    window.userResource = resource;
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
            window.userResource = "logs";
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
            window.buildings["woodcutter"].tryBuild();
            break;
        case "stonemason":
            window.buildings["stonemason"].tryBuild();
            break;
        case "farm":
            window.buildings["farm"].tryBuild();
            break;
        default:
            console.log("Unknown buildingName: " + buildingName);
            break;
    }
}