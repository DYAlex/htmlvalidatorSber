/*

*/ 


const tests = [
	{
		"msg": 'Используя grid-template-rows сформируйте 3 равных столбца шириной в 300px',
		"tag": 'div',
		"class": 'facts',
		"id": undefined,
		"styleList": {
			"grid-template-columns": "300px 300px 300px"
		}
	},
	{
		"msg": 'Для элемента с классом .fact_4 указано верное значение grid-column',
		"tag": 'div.facts .fact_4',
		"class": undefined,
		"id": undefined,
		"styleList":{
			'grid-column': '1 / 4'
		}
	},
	{
		"msg": 'Для элемента с классом .fact_6 указано верное значение grid-column',
		"tag": 'div.facts .fact_6',
		"class": undefined,
		"id": undefined,
		"styleList":{
			'grid-column': '2 / 4'
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
