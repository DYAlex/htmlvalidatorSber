
const tests = [
	{
		"msg": "Укажите элементу с идентификатором checkbox атрибут type со значением checkbox",
		"tag": 'input#checkbox[type="checkbox"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "Укажите элементу div класс field",
		"tag": 'div',
		"class": 'field',
		"id": undefined
	},
	{
		"msg": "Укажите элементу input класс name, где указывается имя анимации",
		"tag": 'input',
		"class": 'name',
		"id": undefined
	},
	{
		"msg": "Добавьте элементу input класс duration, где указывается продолжительность анимации",
		"tag": 'input',
		"class": 'duration',
		"id": undefined
	},
	{
		"msg": "Добавьте элементу input класс iteration-count, где указывается количество повторений анимации",
		"tag": 'input',
		"class": 'iteration-count',
		"id": undefined
	}
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
