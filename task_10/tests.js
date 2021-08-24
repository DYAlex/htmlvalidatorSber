
const tests = [

// <li>Свяжите поле ввода для имени с соответствующим тегом label с помощью атрибута for</li>
// <li>Добавьте для поля ввода телефона placeholder со значением 8-999-999-99-99</li>
// <li>Для поля ввода возраста укажите тип "число" и минимальное значение 0, а максимальное 150</li>

	{
		"msg": "Свяжите поле ввода для имени с соответствующим тегом label с помощью атрибута for",
		"tag": '.field:nth-child(1) label[for="name__input"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "Добавьте для поля ввода телефона placeholder со значением 8-999-999-99-99",
		"tag": '.field:nth-child(4) input[placeholder="8-999-999-99-99"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "Для поля ввода возраста укажите тип 'число'' и минимальное значение 0, а максимальное 150",
		"tag": '.field:nth-child(3) input[type="number"][min="0"][max="150"]',
		"class": undefined,
		"id": undefined
	},

]

const testHandler = ()=>{
	const dom = document.querySelector('iframe').contentDocument;
	document.querySelector('#testResult').innerText = '';

	tests.forEach(elem=>{
		const answer = document.createElement('li');

		let selector = ''
		if (elem.tag) selector	 += elem.tag;
		if (elem.id) selector	 += `#${elem.id}`;
		if (elem.class) selector += `.${elem.class}`;
		let testResult = true;
		if (dom.querySelectorAll(selector).length === 0){
			testResult = false;	
		}else{
			dom.querySelectorAll(selector).forEach(selectorElem=>{
				if (elem.innerText){
					testResult &&= (selectorElem.innerText.trim() === elem.innerText);
				}
				try{
					Object.entries(elem.styleList).forEach(style=>{
					testResult &&= (selectorElem.style[style[0]] === style[1]);
				})} catch{};
			})
		}
		if (testResult){
			answer.classList.add('pos');
		}else{
			answer.classList.add('neg');
		}


		answer.innerText = elem.msg;
		document.querySelector('#testResult').appendChild(answer);
	})
}

btn.addEventListener('click', testHandler);
