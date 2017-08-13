$(document).ready(function(){
    $("input").hover(function() {
        $(this).next("p").addClass("shown");
    },
    function() {
        $(this).next("p").removeClass("shown");
    });

    $("[name=showHelp]").click(function() {
       $("input").next("p").addClass("shown");
       return false;
    })
});