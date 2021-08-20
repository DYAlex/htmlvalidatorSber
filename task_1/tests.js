
const tests = [
// <li>Карточка является элементом div с классом card </li>
// <li>Карточка должны быть шириной 350px, padding и margin по 20px</li>
// <li>У карточки должна быть картинка, ссылка на картинку https://i.pinimg.com/564x/36/a1/91/36a19108f3088af7315231dc919b166a.jpg</li>
// <li>Картинка должна быть шириной 100% относительно родительского элемента</li>
// <li>Текст должен быть элементом p.</li>
// <li>Кнопки внизу должны быть в отдельном div с классом btns</li>
// <li>Кнопки представляют собой элементы span, у кнопок должен быть padding 10px</li>


	{
		"msg": 'Карточка является элементом <span class="code">div</span>',
		"tag": 'div',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Карточка должна быть шириной 350px, padding и margin по 20px, а фон белый, выставить используя стиль background: white;',
		"tag": 'div',
		"class": undefined,
		"id": undefined,
		"styleList": {
			"width": '350px',
			"padding": '20px',
			"margin": '20px',
			"background": "white"
		}
	},
	{
		"msg": 'У карточки должна быть картинка, ссылка на картинку https://i.pinimg.com/564x/36/a1/91/36a19108f3088af7315231dc919b166a.jpg',
		"tag": 'div img[src="https://i.pinimg.com/564x/36/a1/91/36a19108f3088af7315231dc919b166a.jpg"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'У картинки должна быть ширина 100% относительно родительского элемента, выставить используя стиль <span class="code">width: 100%</span>',
		"tag": 'div img',
		"class": undefined,
		"id": undefined,
		"styleList": {
			"width": '100%'
		}
	},
	{
		"msg": 'Должен быть заголовок h3 с текстом <span class="code">Солнечные панели Green Robotic</span>',
		"tag": 'div h3',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'После заголовка должен быть элемент p с текстом <span class="code">24/7 Мониторинг электроэнергии</span>',
		"tag": 'div p',
		"class": undefined,
		"id": undefined
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


		answer.innerHTML = elem.msg;
		document.querySelector('#testResult').appendChild(answer);
	})
}

btn.addEventListener('click', testHandler);
