/*

Добавьте элементу с классом sun класс new_sun и проверьте изменения.
Добавьте первому элементу с классом field класс new_field и проверьте изменения.
Добавьте второму элементу с классом field класс new_checkbox и проверьте изменения.
*/


const tests = [

	{
		"msg": "Добавьте элементу с классом sun класс new_sun и проверьте изменения.",
		"tag": 'div.sun',
		"class": 'new_sun',
		"id": undefined
	},
	{
		"msg": "Добавьте первому элементу с классом field класс new_field и проверьте изменения.",
		"tag": 'div.field:nth-child(1)',
		"class": 'new_field',
		"id": undefined
	},
	{
		"msg": "Добавьте второму элементу с классом field класс new_checkbox и проверьте изменения.",
		"tag": 'div.field:nth-child(2)',
		"class": 'new_checkbox',
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
