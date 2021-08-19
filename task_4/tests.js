
const tests = [
// <li>Необходимо в div с id pullover задать повторяющаюся часть текстуры, 
// которая повторениями закрывает область по горизонтали. </li>

// <li>Необходимо в div с id bike реализовать темнозеленый фон (darkgreen) и вставить картинку велосипеда в нижний левый угол.</li>

// <li>Необходимо в div с id photo вставить фото по центру и масштабировать его максимально, но чтобы картинка не сплющивалась, а обрезалась (значение cover).</li>



	{
		"msg": 'Необходимо в section с id pullover задать повторяющаюся часть текстуры, которая повторениями закрывает область по горизонтали. ',
		"tag": 'section',
		"class": undefined,
		"id": 'pullover',
		'styleList': {
			'background-size': 'auto 100%'
		}
	},
	{
		"msg": 'Необходимо в section с id bike реализовать темнозеленый фон (darkgreen) и вставить картинку велосипеда в нижний левый угол.',
		"tag": 'section',
		"class": undefined,
		"id": 'bike',
		'styleList': {
			'background-color': 'darkgreen',
			'background-size': '100px',
			'background-repeat': 'no-repeat',
			'background-position': 'left bottom'
		}
	},
	{
		"msg": 'Необходимо в section с id photo вставить фото по центру и масштабировать его максимально, но чтобы картинка не сплющивалась, а обрезалась (значение cover).',
		"tag": 'section',
		"class": undefined,
		"id": 'photo',
		'styleList': {
		  'background-size': 'cover',
		  'background-position': 'center center'
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
