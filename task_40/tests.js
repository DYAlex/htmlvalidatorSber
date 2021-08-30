/*
Укажите для тега body задний фон media/background.jpeg
Укажите для тега body размер заднего фона со значением cover
Укажите для тега body позицию заднего фона по центру
*/ 

const tests = [

	{
		"msg": "Укажите для тега body задний фон media/background.jpeg",
		"tag": 'body',
		"class": undefined,
		"id": undefined,
		"styleList":{
			'background-image': 'url("media/background.jpeg")'
		}
	},
	{
		"msg": "Укажите для тега body размер заднего фона со значением cover",
		"tag": 'body',
		"class": undefined,
		"id": undefined,
		"styleList":{
			'background-size': 'cover'
		}
	},
	{
		"msg": "Укажите для тега body задний фон media/background.jpeg",
		"tag": 'body',
		"class": undefined,
		"id": undefined,
		"styleList":{
			'background-position': 'center center'
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
