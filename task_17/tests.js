

const tests = [

	{
		"msg": "Укажите для тега img имя анимации",
		"tag": 'img',
		"class": undefined,
		"id": undefined,
		'styleList':{
			'animation-name': 'example'
		}
	},
	{
		"msg": "Укажите для тега img имя продолжительность анимации в 10 секунд",
		"tag": 'img',
		"class": undefined,
		"id": undefined,
		'styleList':{
			'animation-duration': '10s'
		}
	},
	{
		"msg": "Укажите для тега img количество повторений анимации 1 раза",
		"tag": 'img',
		"class": undefined,
		"id": undefined,
		'styleList':{
			'animation-iteration-count': '1'
		}
	},
	{
		"msg": "Укажите для тега img, что тот должен применяться до и после анимации тот стиль, который соответствует концу анимации",
		"tag": 'img',
		"class": undefined,
		"id": undefined,
		'styleList':{
			'animation-fill-mode': 'forwards'
		}
	},
	{
		"msg": "Укажите для тега img класс pause. Он позволит остановить поезд при наведении на него курсора",
		"tag": 'img',
		"class": 'pause',
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
