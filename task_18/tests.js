/*
			<li>Внутрь первой карточки добавьте div с классом sticker и тектом sale</li>
			<li>Добавьте первой карточке класс sale</li>
			<li>Для карточки с классом sale укажите относительное позиционирование</li>
			<li>Для элемента с классом sticker укажите абсолютное позиционирование и прижмите его к верхнему правому углу карточки</li>

*/

const tests = [
	{
		"msg": "Добавьте всем тегам div класс card",
		"tag": 'div.card:nth-child(3)',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "Внутрь первой карточки добавьте div с классом sticker и тектом sale",
		"tag": 'body>div:nth-child(1) div',
		"class": 'sticker',
		"id": undefined,
		'innerText': 'sale'
	},
	{
		"msg": "Добавьте первой карточке класс sale",
		"tag": 'body>div:nth-child(1)',
		"class": 'sale',
		"id": undefined
	},
	{
		"msg": "Для карточки с классом sale укажите относительное позиционирование",
		"tag": 'div',
		"class": 'sale',
		"id": undefined,
		'styleList': {
			"position": 'relative'
		}
	},
	{
		"msg": "Для элемента с классом sticker укажите абсолютное позиционирование и прижмите его к верхнему правому углу карточки",
		"tag": 'div',
		"class": 'sticker',
		"id": undefined,
		'styleList': {
			"position": 'absolute',
			'top': '0px',
			'right': '0px'
		}
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
