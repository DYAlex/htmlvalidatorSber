
const tests = [
// <li>Необходимо первому div элементу добавить атрибут id со значением links_scale</li>
// <li>Необходимо второму div элементу добавить атрибут id со значением links_round</li>

	{
		"msg": 'Необходимо первому div элементу добавить атрибут id со значением links_scale',
		"tag": 'div:first-child',
		"class": undefined,
		"id": 'links_scale'
	},
	{
		"msg": 'Необходимо второму div элементу добавить атрибут id со значением links_round',
		"tag": 'div:nth-child(2)',
		"class": undefined,
		"id": 'links_round'
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
