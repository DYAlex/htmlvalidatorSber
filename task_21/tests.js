/*
В тег body добавьте заголовок h1 с текстом "Статья о солнечных батареях"
Ниже добавьте заголовок h2 с текстом "Устройство солнечных батарей"
Ниже добавьте заголовок h2 с текстом "Польза окружающей среде"
*/

const tests = [

	{
		"msg": 'В тег body добавьте заголовок h1 с текстом "Статья о солнечных батареях"',
		"tag": 'h1',
		"class": undefined,
		"id": undefined,
		'innerText': 'Статья о солнечных батареях'
	},
	{
		"msg": 'Ниже добавьте заголовок h2 с текстом "Устройство солнечных батарей"',
		"tag": 'h2:nth-child(2)',
		"class": undefined,
		"id": undefined,
		'innerText': 'Устройство солнечных батарей'
	},
	{
		"msg": 'Ниже добавьте заголовок h2 с текстом "Польза окружающей среде"',
		"tag": 'h2:nth-child(3)',
		"class": undefined,
		"id": undefined,
		'innerText': 'Польза окружающей среде'
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
