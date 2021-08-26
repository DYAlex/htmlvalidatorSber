

const tests = [

	{
		"msg": "Верный класс у иконки первой кнопки",
		"tag": 'button:nth-child(1) i',
		"class": 'fas.fa-arrow-up',
		"id": undefined
	},
	{
		"msg": "Верный класс у иконки второй кнопки",
		"tag": 'button:nth-child(2) i',
		"class": 'fas.fa-arrow-right',
		"id": undefined
	},
	{
		"msg": "Верный класс у иконки третьей кнопки",
		"tag": 'button:nth-child(3) i',
		"class": 'fas.fa-arrow-down',
		"id": undefined
	},
	{
		"msg": "Верный класс у иконки четвертой кнопки",
		"tag": 'button:nth-child(4) i',
		"class": 'fas.fa-arrow-left',
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


		answer.innerText = elem.msg;
		document.querySelector('#testResult').appendChild(answer);
	})
}

btn.addEventListener('click', testHandler);
