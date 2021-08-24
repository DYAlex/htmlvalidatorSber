
const tests = [

// <li>В тег с классом links добавьте ссылку на гугл с классом google </li>
// <li>Внутри этой ссылки вставьте картинку с атрибутом href media/google.png</li>
// <li>В тег с классом links добавьте ссылку на яндекс c классом yandex </li>
// <li>Внутри этой ссылки вставьте картинку с атрибутом href media/yandex.png</li>
// <li>В тег с классом links добавьте ссылку на мэил c классом mail </li>
// <li>Внутри этой ссылки вставьте картинку с атрибутом href media/mail.png</li>

	{
		"msg": "В тег с классом links добавьте ссылку на гугл с классом google (https://www.google.com)",
		"tag": '.links a.google[href="https://www.google.com"]',
		"class": 'google',
		"id": undefined
	},
	{
		"msg": "Внутри этой ссылки вставьте картинку с атрибутом href media/google.png",
		"tag": '.links a.google img[src="media/google.png"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "В тег с классом links добавьте ссылку на яндекс c классом yandex (https://yandex.ru)",
		"tag": '.links a.yandex[href="https://yandex.ru"]',
		"class": 'yandex',
		"id": undefined
	},
	{
		"msg": "Внутри этой ссылки вставьте картинку с атрибутом href media/yandex.png",
		"tag": '.links a.yandex img[src="media/yandex.png"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "В тег с классом links добавьте ссылку на гугл с классом mail (https://mail.ru)",
		"tag": '.links a.mail[href="https://mail.ru"]',
		"class": 'mail',
		"id": undefined
	},
	{
		"msg": "Внутри этой ссылки вставьте картинку с атрибутом href media/mail.png",
		"tag": '.links a.mail img[src="media/mail.png"]',
		"class": undefined,
		"id": undefined
	},
	{
		"msg": "Сделайте так, чтобы ссылки открывались в новом окне",
		"tag": '.links a[target="_blank"]',
		"class": undefined,
		"id": undefined
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
