
const tests = [

	{
		"msg": "Для элемента с классом map укажите display: flex;",
		"tag": 'div.map',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'display': 'flex'
		}
	},
	{
		"msg": "Расположите все элементы с Марио по горизонтали по центру через стиль justify-content",
		"tag": 'div.map',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'justify-content': 'center'
		}
	},
	{
		"msg": "Расположите второй элемент с Марио по вертикали по центру.",
		"tag": 'img',
		"class": 'mario_2',
		"id": undefined,
		'styleList': {
			'align-self': 'center'
		}
	},
	{
		"msg": "Расположите третий элемент с Марио по вертикали внизу. Используйте значение flex-end",
		"tag": 'img',
		"class": 'mario_3',
		"id": undefined,
		'styleList': {
			'align-self': 'flex-end'
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
