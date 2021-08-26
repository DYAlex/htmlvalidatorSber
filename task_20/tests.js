/*
Добавьте тегу с классом box тег slide_box
В css для класса slide_box добавьте относительное позиционирование, отступ сверху (top) 20px, а с лева (left) -160px 
Тегу с классом media добавьте класс slide

*/

const tests = [

	{
		"msg": "Добавьте тегу с классом box тег slide_box",
		"tag": 'div.box',
		"class": 'slide_box',
		"id": undefined
	},
	{
		"msg": "В css для класса slide_box добавьте относительное позиционирование, отступ сверху (top) 20px, а с лева (left) -160px ",
		"tag": 'div.slide_box',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'position': 'relative',
			'top': '20px',
			'left': '-160px'
		}
	},
	{
		"msg": "Тегу с классом media добавьте класс slide",
		"tag": 'div.media',
		"class": 'slide',
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
