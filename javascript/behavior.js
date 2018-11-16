$( document ).ready(function(){
    console.log("Welcome");

    window.counter = 0;
    window.resources = [];
    window.resources["logs"] = 0;
    window.resources["planks"] = 0;
    window.resources["stone"] = 0;
    window.resources["food"] = 0;
    setUserResource("logs");

    window.setInterval(tick, 1000);
    window.setInterval(frame, 10);

    $("#GetMore").click(function(){
        window.counter += 10;
    });
});

function tick(){
    window.resources[window.userResource]++;
}

function frame(){
    $("#LogsAmount").text(window.resources["logs"]);
    $("#PlanksAmount").text(window.resources["planks"]);
    $("#StoneAmount").text(window.resources["stone"]);
    $("#FoodAmount").text(window.resources["food"]);
}

function setUserResource(resource){
    console.log(resource);
    clearManualResource();
    window.userResource = resource;
    switch(resource){
        case "logs":
            $("#LogsUserButton").addClass("userDoing");
            break;
        case "planks":
            $("#PlanksUserButton").addClass("userDoing");
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
    $("#LogsUserButton").removeClass("userDoing");
    $("#PlanksUserButton").removeClass("userDoing");
    $("#StoneUserButton").removeClass("userDoing");
    $("#FoodUserButton").removeClass("userDoing");
}