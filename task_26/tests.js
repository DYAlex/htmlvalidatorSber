

const tests = [
	{
		"msg": 'В теге select добавьте атрибут name со значением "type"',
		"tag": 'select[name="type"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'В тег select добавьте тег option, а внутрь тега напигите "монокристалический". У него должен быть атрибут value со значением mono.',
		"tag": 'select option[value="mono"]',
		"class": undefined,
		"id": undefined,
		'innerText': "монокристалический"
	},
	{
		"msg": 'В тег select добавьте тег option, а внутрь тега напигите "поликристалический". У него должен быть атрибут value со значением poli.',
		"tag": 'select option[value="poli"]',
		"class": undefined,
		"id": undefined,
		'innerText': 'поликристалический'
	},
	{
		"msg": 'В тег select добавьте тег option, а внутрь тега напигите "кремниевые". У него должен быть атрибут value со значением silicon.',
		"tag": 'select option[value="silicon"]',
		"class": undefined,
		"id": undefined,
		'innerText': 'кремниевые'
	},
	{
		"msg": 'Для тега option со значением value=mono укажите атрибут selected.',
		"tag": 'select option[value="mono"][selected]',
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
					console.log('_-_-')
					console.log(selectorElem.innerText.trim())
					console.log(elem.innerText)
					console.log('_-_-')
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
