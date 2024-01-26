if (document.querySelector(".wrapper") && window.innerWidth > 768) {
	const observer: IntersectionObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Если блок попал в область видимости, добавляем ему класс wrapper-mounted
				entry.target.classList.add("wrapper-mounted");
			} else {
				// Если блок перестал быть видимым, удаляем класс wrapper-mounted
				entry.target.classList.remove("wrapper-mounted");
			}
		});
	});
	// Получаем все блоки с классом .wrapper
	const wrapperBlocks = document.querySelectorAll(".wrapper");
	// Для каждого блока добавляем его в список отслеживаемых элементов IntersectionObserver
	wrapperBlocks.forEach((block) => {
		observer.observe(block);
	});
}
