$( document ).ready(function(){
    console.log("Welcome");

    window.counter = 0;

    window.setInterval(tick, 1000);
    window.setInterval(frame, 10);

    $("#GetMore").click(function(){
        window.counter += 10;
    });
});

function tick(){
    window.counter++;
}

function frame(){
    $("#LogsAmount").text(window.counter);
    $("#PlanksAmount").text(window.counter);
    $("#StoneAmount").text(window.counter);
    $("#FoodAmount").text(window.counter);
}