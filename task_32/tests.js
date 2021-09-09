// Укажите внешнему div элементу класс facts
// Для элемента с классом facts укажите display: grid;
// С помощью стиля grid-template-columns сформируйте 3 столбца, где столбец по середине в 2 раза больше боковых. Используйте единицы измерения fr.


const tests = [
	{
		"msg": 'Укажите внешнему div элементу класс facts',
		"tag": 'body>div',
		"class": 'facts',
		"id": undefined
	},
	{
		"msg": 'Для элемента с классом facts укажите display: grid;',
		"tag": 'div.facts',
		"class": undefined,
		"id": undefined,
		"styleList":{
			'display': 'grid'
		}
	},
	{
		"msg": 'С помощью стиля grid-template-columns сформируйте 3 столбца, где столбец посередине в 2 раза больше боковых. Используйте единицы измерения fr.',
		"tag": 'div.facts',
		"class": undefined,
		"id": undefined,
		"styleList":{
			'grid-template-columns': '1fr 2fr 1fr'
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
