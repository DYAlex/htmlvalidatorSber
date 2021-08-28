
const tests = [
	{
		"msg": 'Тег с классом sq_1 с правильным z-index',
		"tag": 'div.sq_1',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'z-index': '5'
		}
	},
	{
		"msg": 'Тег с классом sq_2 с правильным z-index',
		"tag": 'div.sq_2',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'z-index': '4'
		}
	},
	{
		"msg": 'Тег с классом sq_3 с правильным z-index',
		"tag": 'div.sq_3',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'z-index': '3'
		}
	},
	{
		"msg": 'Тег с классом sq_4 с правильным z-index',
		"tag": 'div.sq_4',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'z-index': '2'
		}
	},
	{
		"msg": 'Тег с классом sq_5 с правильным z-index',
		"tag": 'div.sq_5',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'z-index': '1'
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
