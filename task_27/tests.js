 

const tests = [
	{
		"msg": 'Всем input элементам укажите атрибут type со значением range',
		"tag": 'input[type="range"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Всем input элементам укажите атрибут min со значением 0',
		"tag": 'input[min="0"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Всем input элементам укажите атрибут step со значением 10',
		"tag": 'input[step="10"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Всем input элементам укажите атрибут max со значением 100',
		"tag": 'input[max="100"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Чтобы выравнить элементы укажите тегам div класс field',
		"tag": 'div.field',
		"class": undefined,
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
