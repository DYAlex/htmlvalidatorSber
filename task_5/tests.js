
const tests = [

	{
		"msg": "Добавить тег link, который подгружает шрифт (ссылка https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap)",
		"tag": 'head link[href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "Добавить для body стиль font-family: 'Raleway'",
		"tag": 'body',
		"class": undefined,
		"id": undefined,
		'styleList': {
			"font-family": "Raleway"
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
