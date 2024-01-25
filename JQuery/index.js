$("h1").addClass("big-title margin-51");

var has = $("h1").hasClass("margin-51");
console.log(has);

$("h1").removeClass("margin-51");

has = $("h1").hasClass("margin-51");
console.log(has);

$("h1").text("New Text");
$(".button").html("<em>Dont click me brada</em>");

$("a").attr("href", "https://youtube.com");

var selectedColors = [];

$(".color-changer").click(() => {
    var color = ["red", "green", "blue", "yellow", "purple"]; 
    var random = Math.ceil(Math.random() * 5)-1;
    $("h1").css("color", color[random]);

    selectedColors.push(color[random]);
    console.log(selectedColors);
})

$(document).keydown((e) => {
    $("h1").text(e.key);
});

$("h1").on("mouseover", () => {
    $("h1").text("Mouse is here")
});

$("h1").on("mouseout", () => {
    $("h1").text("Mouse is gone")
});

$(".removing-class").on("click", () => {
    $(".removing-class").remove();
});