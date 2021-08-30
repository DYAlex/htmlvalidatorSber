

const tests = [
	{
		"msg": 'Добавьте в тег div с классом fields два тега input с атрибутом name = "city"',
		"tag": 'div input[name="city"]:nth-child(2)',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Укажите тегам input атрибут type со значением radio',
		"tag": 'input[type="radio"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Добавьте тег p со значением "Москва" перед первым тегом input',
		"tag": 'p:nth-child(1)',
		"class": undefined,
		"id": undefined,
		'innerText': 'Москва'
	},
	{
		"msg": 'Добавьте тег p со значением "Питер" перед вторым тегом input',
		"tag": 'input+p',
		"class": undefined,
		"id": undefined,
		"innerText": "Питер"
	},
	{
		"msg": 'Укажите первому тегу input атрибут value со значением msc, а так же атрибут checked',
		"tag": 'input:nth-child(2)[value="msc"][checked]',
		"class": undefined,
		"id": undefined
	},
		{
		"msg": 'Укажите второму тегу input атрибут value со значением spb',
		"tag": 'input:nth-child(4)[value="spb"]',
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


		answer.innerText = elem.msg;
		document.querySelector('#testResult').appendChild(answer);
	})
}

btn.addEventListener('click', testHandler);
