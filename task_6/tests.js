
const tests = [

	{
		"msg": "необходимо обернуть теги a, nav и div в тег header",
		"tag": 'header',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "в элемент с классом лого укажите ссылку на логотип media/logo.png",
		"tag": 'img[src="media/logo.png"]',
		"class": 'logo',
		"id": undefined
	},
	{
		"msg": "в тег div добавьте кнопку с текстом Sign in",
		"tag": 'div button:nth-child(1)',
		"class": undefined,
		"id": undefined,
		'innerText': 'Sign in'
	},
	{
		"msg": "в тег div добавьте кнопку с текстом Log in",
		"tag": 'div button:nth-child(2)',
		"class": undefined,
		"id": undefined,
		'innerText': 'Log in'
	},
	{
		"msg": "присвойте div с кнопками класс btns",
		"tag": 'header>div',
		"class": 'btns',
		"id": undefined
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
