/*
Укажите в атрибуте src первого тега a ссылку на первый блок #block_1 
Укажите в атрибуте src второго тега a ссылку на второй блок #block_2 
Укажите в атрибуте src третьего тега a ссылку на третий блок #block_3 
*/

const tests = [
	{
		"msg": 'Укажите в атрибуте href первого тега a ссылку на первый блок #block_1',
		"tag": 'a[href="#block_1"]',
		"class": undefined,
		"id": undefined,
		'innerText': 'блок 1'
	},
	{
		"msg": 'Укажите в атрибуте href второго тега a ссылку на второй блок #block_2',
		"tag": 'a[href="#block_2"]',
		"class": undefined,
		"id": undefined,
		'innerText': 'блок 2'
	},
	{
		"msg": 'Укажите в атрибуте href третьего тега a ссылку на третий блок #block_3',
		"tag": 'a[href="#block_3"]',
		"class": undefined,
		"id": undefined,
		'innerText': 'блок 3'
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
					console.log('_-_-')
					console.log(selectorElem.innerText.trim())
					console.log(elem.innerText)
					console.log('_-_-')
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
