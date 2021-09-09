/*

.photo_4{
	grid-column: 1 / 3;
}


*/


const tests = [
	{
		"msg": "Сразу после каждого тега img добавьте тег span с порядковым номером картинки (от 1 до 5)",
		"tag": 'img+span',
		"class": 'number',
		"id": undefined,
	},

	{
		"msg": "Поменяйте в div с классом images название класса на photos",
		"tag": 'body>div',
		"class": 'photos',
		"id": undefined
	},
	{
		"msg": "Сформируйте первый ряд из фото 1 и 2, где второе фото в два раза шире первого",
		"tag": 'div',
		"class": 'photo_2',
		"id": undefined,
		'styleList':{
			'grid-column': '2 / 4'
		}
	},
	{
		"msg": "Расположите третье фото на 2 строке на всю ширину",
		"tag": 'div',
		"class": 'photo_3',
		"id": undefined,
		'styleList':{
			'grid-column': '1 / 4'
		}
	},
	{
		"msg": "Третья строка должна состоять из 4 и 5 фото, где 4 на всю ширину",
		"tag": 'div',
		"class": 'photo_4',
		"id": undefined,
		'styleList':{
			'grid-column': '1 / 3'
		}
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
