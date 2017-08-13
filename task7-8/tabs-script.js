'use strict';
;(function() {
    let tabs = document.querySelector(".tabs-list");
    let activeTab = document.querySelector(".tabs-list .active");
    let activePage = document.querySelector(".tabs-pages > .active");

    function activateTab() {
        activeTab.classList.add('active');
        activePage.classList.add('active');
    }

    tabs.addEventListener('click', evt => {
        evt.preventDefault();
        let target = evt.target;
        if(target.dataset.tab) {
            activeTab.classList.remove("active");
            activePage.classList.remove("active");
            activeTab = target.parentNode;
            activePage = document.querySelector(`.${target.dataset.tab}`);
            activateTab();
        };
    })
})();