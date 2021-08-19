
const tests = [
// <li>Добавить класс accent-text для тега <p>Автоматическое включение и отключение</p></li>
// <li>Сделать элементы с классом accent-text жирными "bold"</li>
// <li>Указать цвет текста "rgb(239, 123, 24)"</li>


	{
		"msg": 'Добавить класс accent-text для тега <p>Автоматическое включение и отключение</p>',
		"tag": 'p',
		"class": 'accent-text',
		"id": undefined,
		'innerText': 'Автоматическое включение и отключение'
	},
	{
		"msg": 'Сделать элементы с классом accent-text жирными "bold"',
		"tag": 'p',
		"class": 'accent-text',
		"id": undefined,
		"styleList": {
			"font-weight": 'bold'
		}
	},
	{
		"msg": 'Указать цвет текста "rgb(239, 123, 24)"',
		"tag": 'p',
		"class": 'accent-text',
		"id": undefined,
		"styleList": {
			"color": 'rgb(239, 123, 24)'
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
