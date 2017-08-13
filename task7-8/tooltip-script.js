'use sctrict'
;(function() {
	let inputs = document.querySelectorAll(".tab-inputs label");
	for(let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("mouseenter", () => {
			inputs[i].querySelector(".input-tooltip").classList.add("shown");
		})
		inputs[i].addEventListener("mouseleave", () => {
			inputs[i].querySelector(".input-tooltip").classList.remove("shown");
		})
	}
	let helpButton = document.querySelector("[name=showHelp]");
	helpButton.addEventListener('click', evt => {
		evt.preventDefault();
		for(let i = 0; i < inputs.length; i++) {
			inputs[i].querySelector(".input-tooltip").classList.add("shown");
		}
	})
})();