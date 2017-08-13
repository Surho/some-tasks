$(document).ready(function() {
    let currentTab = $(".tabs-list .active");
    let currentPage = $(".tabs-pages .active");

    $(".tabs-list a").click(function() {
        $(currentTab).removeClass("active");
        $(currentPage).removeClass("active");

        currentTab = $(this).parents("li");
        currentPage = $("." + $(this).attr("data-tab"));

        $(currentTab).addClass("active");
        $(currentPage).addClass("active");        
    })
})