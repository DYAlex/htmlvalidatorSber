// Поменяйте атрибут type у первого тега button на значение submit
// Укажите атрибут type у второго тега button на значение button
// Укажите атрибут type у третьего тега button на значение reset


const tests = [
	{
		"msg": 'Поменяйте атрибут type у первого тега button на значение submit',
		"tag": '.btns button:nth-child(1)[type="submit"]',
		"class": undefined,
		"id": undefined,
		"innerText": 'Отправить'
	},
	{
		"msg": 'Поменяйте атрибут type у первого тега button на значение submit',
		"tag": '.btns button:nth-child(2)[type="button"]',
		"class": undefined,
		"id": undefined,
		"innerText": 'Поздороваться'
	},
	{
		"msg": 'Поменяйте атрибут type у первого тега button на значение submit',
		"tag": '.btns button:nth-child(3)[type="reset"]',
		"class": undefined,
		"id": undefined,
		"innerText": 'Очистить форму'
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
					let value = selectorElem.style[style[0]];
					if (value.substring(0, 3) === 'rgb'){
						value = value.replaceAll(' ', '');
					}
					testResult &&= (value === style[1]);
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
