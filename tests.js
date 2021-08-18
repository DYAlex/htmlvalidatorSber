
const tests = [
	{
		"msg": 'div с классом active и содержимым "велосипед"',
		"tag": 'div',
		"class": 'active',
		"id": undefined,
		"innerText": "велосипед",
		"styleList": {
			"backgroundColor": "rgb(35, 83, 35)",
			"width": '340px'
		}
	},

	{
		"msg": 'p с содержимым "Я памятник воздвиг себе нерукотворный"',
		"tag": 'p',
		"class": undefined,
		"id": undefined,
		"innerText": "Я памятник воздвиг себе нерукотворный"
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
				testResult &&= (selectorElem.innerText.trim() === elem.innerText);
				Object.entries(elem.styleList).forEach(style=>{
					testResult &&= (selectorElem.style[style[0]] === style[1]);
				})
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
