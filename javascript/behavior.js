$( window ).on("load", function(){
    console.log("Welcome");

    window.counter = 0;
    window.resources = [];
    window.resources["wood"] = new Resource("Wood");
    window.resources["stone"] = new Resource("Stone");
    window.resources["food"] = new Resource("Food");
    setUserResource("wood");

    window.setInterval(tick, 1000);
    window.setInterval(frame, 10);

    $("#GetMore").click(function(){
        window.counter += 10;
    });
});

function tick(){
    window.resources[window.userResource].increase();
}

function frame(){
    $("#WoodAmount").text(window.resources["wood"].getAmount());
    $("#StoneAmount").text(window.resources["stone"].getAmount());
    $("#FoodAmount").text(window.resources["food"].getAmount());
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