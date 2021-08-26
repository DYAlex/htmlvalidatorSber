/*
Добавьте в тег с классом image тег div с классом protect
Тегу с классом image добавьте относительное позиционирование
Тегу с классом protect добавьте абсолютное позиционирование и растените его на всю ширину и высоту родительского элемента
Переместите тег в верхний левый угол родительского элемента

*/

const tests = [

	{
		"msg": "Добавьте в тег с классом image тег div с классом protect",
		"tag": 'div.image div',
		"class": 'protect',
		"id": undefined
	},
	{
		"msg": "Тегу с классом image добавьте относительное позиционирование",
		"tag": 'div.image',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'position': 'relative'
		}
	},
	{
		"msg": "Тегу с классом protect добавьте абсолютное позиционирование и растените его на всю ширину и высоту родительского элемента",
		"tag": 'div',
		"class": 'protect',
		"id": undefined,
		'styleList': {
			'position': 'absolute',
			'width': '100%',
			'height': '100%'
		}
	},
	{
		"msg": "Переместите элемент с классом protect в верхний левый угол родительского элемента",
		"tag": 'div',
		"class": 'protect',
		"id": undefined,
		'styleList': {
			'left': '0px',
			'top': '0px'
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
