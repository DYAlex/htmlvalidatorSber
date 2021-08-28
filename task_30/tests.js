


const tests = [
	{
		"msg": 'Укажите тегу button класс btn_up',
		"tag": 'button.btn_up',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Укажите тегу button позиционирование со значением fixed',
		"tag": 'button',
		"class": undefined,
		"id": undefined,
		'styleList': {
			"position": 'fixed'
		}
	},
	{
		"msg": 'Расположите тег button с отступом в 20px от нижней и правой части экрана',
		"tag": 'button',
		"class": undefined,
		"id": undefined,
		'styleList': {
			"bottom": '20px',
			"right": '20px'
		}
	},
	{
		"msg": 'Укажите тегу button цвет заднего фона со значением rgb(44,62,80), а цвет текста rgb(236,240,241)',
		"tag": 'button.btn_up',
		"class": undefined,
		"id": undefined,
		'styleList': {
			"color": 'rgb(44,62,80)',
			"background-color": 'rgb(236,240,241)'
		}
	},
	{
		"msg": 'Добавьте тегу button внутренний отступ (padding) в 10 пикселей',
		"tag": 'button.btn_up',
		"class": undefined,
		"id": undefined,
		'styleList': {
			"padding": '10px'
		}
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
					let value = selectorElem.style[style[0]];
					if (value.substring(0, 3) === 'rgb'){
						value = value.replaceAll(' ', '');
					}
					testResult &&= (value === style[1]);
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
