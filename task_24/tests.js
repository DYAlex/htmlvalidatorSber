/*
В атрибут src первой картинки укажите media/dog.png
В атрибут src второй картинки укажите media/alpaca.jpeg
В атрибут src третей картинки укажите media/cat.png
В атрибут src четвертой картинки укажите media/pig.png
Всем картинкам укажите атрибут alt со значением "питомец"
*/

const tests = [
	{
		"msg": 'В атрибут src первой картинки укажите media/dog.png',
		"tag": '.row:nth-child(1) img:nth-child(1)',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'В атрибут src второй картинки укажите media/alpaca.jpeg',
		"tag": '.row:nth-child(1) img:nth-child(2)',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'В атрибут src третьей картинки укажите media/cat.png',
		"tag": '.row:nth-child(2) img:nth-child(1)',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'В атрибут src четвертой картинки укажите media/pig.png',
		"tag": '.row:nth-child(2) img:nth-child(2)',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": 'Всем картинкам укажите атрибут alt со значением "питомец"',
		"tag": 'img[alt="питомец"]',
		"class": undefined,
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
					console.log('_-_-')
					console.log(selectorElem.innerText.trim())
					console.log(elem.innerText)
					console.log('_-_-')
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
