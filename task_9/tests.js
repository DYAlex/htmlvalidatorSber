
const tests = [

	{
		"msg": "У элемента с классом sq_1 добавьте отступ margin с права 20px",
		"tag": 'div',
		"class": 'sq_1',
		"id": undefined,
		'styleList': {
			'margin-right': '20px'
		}
	},
	{
		"msg": "У элемента с классом sq_2 добавьте отступ margin по горизонтали 20px, а по вертикали 40px",
		"tag": 'div',
		"class": 'sq_2',
		"id": undefined,
		'styleList': {
			'margin': '40px 20px'
		}
	},
	{
		"msg": "У элемента с классом sq_3 добавьте отступ margin со всех сторон 10px",
		"tag": 'div',
		"class": 'sq_3',
		"id": undefined,
		'styleList': {
			'margin': '10px'
		}
	},
	{
		"msg": "У элемента с классом sq_4 добавьте отступы margin: сверху 10px, c права 20px, снизу 30px, слева 40px.",
		"tag": 'div',
		"class": 'sq_4',
		"id": undefined,
		'styleList': {
			'margin': '10px 20px 30px 40px'
		}
	},
	{
		"msg": "У всех элементов div с квадратами должен быть внутренний отступ padding 10px со всех сторон",
		"tag": '.squares div',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'padding': '10px'
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
