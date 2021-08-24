
const tests = [

	{
		"msg": "В div с классом map_1 расположите всех марио по вертикали по центру, а по горизонтали так, чтобы все свободное пространство было равномерно распределено между элементами",
		"tag": '.map_1',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'display': 'flex',
			'justify-content': 'space-between',
			'align-items': 'center'
		}
	},
	{
		"msg": "В div с классом map_2 растяните всех марио по вертикали, а по горизонтали сместите вправо",
		"tag": '.map_2',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'display': 'flex',
			'justify-content': 'space-between'
		}
	},
	{
		"msg": "В div с классом map_2 растяните всех марио по вертикали, а по горизонтали сместите вправо",
		"tag": '.map_3',
		"class": undefined,
		"id": undefined,
		'styleList': {
			'display': 'flex',
			'flex-direction': 'column',
			'align-items': 'center'
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
