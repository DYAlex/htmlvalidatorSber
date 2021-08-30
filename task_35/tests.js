

const tests = [

	{
		"msg": "Укажите для тега div абсолютное позиционирование",
		"tag": 'div',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'position': 'absolute'
		}
	},
	{
		"msg": "Элемент с классом block_1 расположите в левом верхнем углу с отступом в 100px",
		"tag": '.block_1',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'left': '100px',
			'top': '100px'
		}
	},
	{
		"msg": "Элемент с классом block_2 расположите в левом нижнем углу с отступом в 100px",
		"tag": '.block_2',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'left': '100px',
			'bottom': '100px'
		}
	},
	{
		"msg": "Элемент с классом block_3 расположите в правом верхнем углу с отступом в 100px",
		"tag": '.block_3',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'right': '100px',
			'top': '100px'
		}
	},
	{
		"msg": "Элемент с классом block_4 расположите в правом нижнем углу с отступом в 100px",
		"tag": '.block_4',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'right': '100px',
			'bottom': '100px'
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
