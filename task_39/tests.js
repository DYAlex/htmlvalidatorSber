// Укажите всем четным элементам div класс even
// Укажите всем нечетным элементам div класс odd

const tests = [

	{
		"msg": "Укажите всем четным элементам div класс even",
		"tag": 'div:nth-child(2n).even',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "Второй абзац",
		"tag": 'div:nth-child(2n+1).odd',
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
