(function() {
	
	// Вставка названия активной категории в .middle_header__category_title
	var category = document.getElementById('header_menu').getElementsByClassName('active')[0];
	document.getElementById('middle_header__category_title').innerHTML = category ? category.textContent : "";
	
	// Добавление обработки клика на кнопку меню
	var menuOpen = document.getElementsByClassName('menu_open')[0];
	menuOpen.addEventListener('click', function() {
		var menu = document.getElementById('header_menu');
		if (this.classList.contains('open')) { 
			this.classList.remove('open');
			menu.style.display = "none";
		} else { 
			this.classList.add('open'); 
			menu.style.display = "block";
		}
	});
	
	// Добавление обработки нажатия на филтр тип/бренд
	Filter.addButton(document.getElementsByClassName('type_select')[0], "type");
	Filter.addButton(document.getElementsByClassName('brand_select')[0], "brand");
	
	// Создание объектов для обработки изменения цен
	var fromPrice = Filter.addCondition(document.getElementById('from_price'), "price", "more");
	var toPrice = Filter.addCondition(document.getElementById('to_price'), "price", "less");
	toPrice.value = "999999999";
	fromPrice.value = "1";
	
	// Добавление обработки изменения цен
	fromPrice.elem.addEventListener("keydown", function() {
		changeInputPrice(fromPrice);
	});
	
	toPrice.elem.addEventListener("keydown", function() {
		changeInputPrice(toPrice);
	});
	
	function changeInputPrice(elem, value) {
		setTimeout(function(e) {
			var line = e.elem.value.replace(/[^\d]/g, '');
			var value = parseInt(line);
			
			if (line == "" || isNaN(value) || value == 0) value = undefined;
			else value = parseInt(line);
		
			e.change(value);
		}, 0, elem);
	}
	
	var filter_button = document.getElementById('middle_header__filter_button');
	var filters = document.getElementById("filters").getElementsByClassName("filter");
	var modal = document.getElementById("modal_window");
	
	filter_button.addEventListener("click", function() {
		var content = document.getElementById("modal_content");
		while(filters.length > 0) {
			var elem = filters[0];
			content.appendChild(elem);
		}
		modal.style.display = "block";
	});
	
	modal.addEventListener("click", function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (target != this) return;
		var filters = document.getElementById("modal_content").getElementsByClassName("filter");
		var content = document.getElementById("filters");
		
		while(filters.length > 0) {
			var elem = filters[0];
			content.appendChild(elem);
		}
		modal.style.display = "none";
	});
	
	document.getElementById("header_search_button").addEventListener("click", function() {
		document.getElementsByClassName("header_search")[0].classList.toggle("active");
	});
})();