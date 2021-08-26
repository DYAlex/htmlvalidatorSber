
// <li>Укажите в качестве высоты и ширины элемента с классом box_3 половину ширины экрана</li>
const tests = [

	{
		"msg": "Укажите элементу с классом box_1 высоту на половину высоты экрана",
		"tag": 'div',
		"class": 'box_1',
		"id": undefined,
		'styleList': {
			'height': '50vh'
		}
	},
	{
		"msg": "Укажите элементу с классом box_2 ширину и высоту по 400px",
		"tag": 'div',
		"class": 'box_2',
		"id": undefined,
		'styleList': {
			'height': '400px',
			'width': '400px'
		}
	},
	{
		"msg": "Укажите элементу с классом nested_2_1 ширину и высоту по 50%",
		"tag": 'div',
		"class": 'nested_2_1',
		"id": undefined,
		'styleList': {
			'height': '50%',
			'width': '50%'
		}
	},
	{
		"msg": "Укажите в качестве высоты и ширины элемента с классом box_3 половину ширины экрана",
		"tag": 'div',
		"class": 'box_3',
		"id": undefined,
		'styleList': {
			'height': '50vw',
			'width': '50vw'
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
