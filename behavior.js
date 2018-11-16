$( document ).ready(function()
{
    console.log("Welcome");

    window.counter = 0;

    window.setInterval(function(){
        window.counter++;
        $("#counter").text(window.counter);
    }, 1000);

    $("#GetMore").click(function(){
        window.counter += 10;
        $("#counter").text(window.counter);
    });
});