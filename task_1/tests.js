
const tests = [
// <li>Карточка является элементом div с классом card </li>
// <li>Карточка должны быть шириной 350px, padding и margin по 20px</li>
// <li>Картинка должна быть шириной 100% относительно родительского элемента</li>
// <li>Текст должен быть элементом p.</li>
// <li>Кнопки внизу должны быть в отдельном div с классом btns</li>
// <li>Кнопки представляют собой элементы span, у кнопок должен быть padding 10px</li>


	{
		"msg": 'Карточка является элементом div с классом card ',
		"tag": 'div',
		"class": 'card',
		"id": undefined
	},
	{
		"msg": 'Карточка должны быть шириной 350px, padding и margin по 20px',
		"tag": 'div',
		"class": 'card',
		"id": undefined,
		"styleList": {
			"width": '350px',
			"padding": '20px',
			"margin": '20px'
		}
	},
	{
		"msg": 'Картинка должна быть шириной 100% относительно родительского элемента',
		"tag": 'div img',
		"class": undefined,
		"id": undefined,
		"styleList": {
			"width": '100%'
		}
	},
	{
		"msg": 'Текст должен быть элементом p.',
		"tag": 'p',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Кнопки внизу должны быть в отдельном div с классом btns',
		"tag": 'div',
		"class": 'btns',
		"id": undefined
	},
	{
		"msg": 'Кнопки представляют собой элементы span, у кнопок должен быть padding 10px',
		"tag": 'div span',
		"class": undefined,
		"id": undefined,
		"styleList": {
			"padding": '10px'
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
