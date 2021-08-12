
const tests = [
	{
		"msg": 'div с классом active и содержимым "велосипед"',
		"tag": 'div',
		"class": 'active',
		"id": undefined,
		"innerText": "велосипед"
	},

	{
		"msg": 'p с содержимым "Я памятник воздвиг себе нерукотворный"',
		"tag": 'p',
		"class": undefined,
		"id": undefined,
		"innerText": "Я памятник воздвиг себе нерукотворный"
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
		console.log(selector);
		console.log(dom.querySelector(selector));
		console.log('_-_-');
		if (dom.querySelector(selector) != null){
			answer.classList.add('pos');
		}else{
			answer.classList.add('neg');
		}
		answer.innerText = elem.msg;
		document.querySelector('#testResult').appendChild(answer);
	})
}

btn.addEventListener('click', testHandler);
