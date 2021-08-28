/*
Оберните описание компании в теги p. Каждый абзац в отдельный тег.
Найдите в тексте название компании GreenRobotic и оберните в тег span.
*/

const tests = [

	{
		"msg": 'Оберните описание компании в теги p. Первый абзац.',
		"tag": 'p:nth-child(1)',
		"class": undefined,
		"id": undefined,
		'innerText': `Наша компания ведет историю из славного рода компаний по озеленению амазонских лесов. Да, это именно наш проект. В первую очередь, когда мы видим задачу, мы ставим себе целью определить боль клиента, как он видит самый лучший исход проекта и прилагая максимум усилий добиваемся этого.`
	},
	{
		"msg": 'Оберните описание компании в теги p. Второй абзац.',
		"tag": 'p:nth-child(2)',
		"class": undefined,
		"id": undefined,
		'innerText': `Мы выбрали эту сферу не просто так. GreenRobotic ставит своей целью обеспечить гармоничное и бесшовное сосуществование человека и природы. Мы пользуемся благами наших лесов, полей, почвы, однако мы должны понимать, что без должного ухода и восстановления этих ресурсов мы скоро встанем перед ситуацией, где ресурсов нам будет не хватать, а природа полностью потеряет свой первозданный вид.`
	},
	{
		"msg": 'Оберните описание компании в теги p. Третий абзац.',
		"tag": 'p:nth-child(3)',
		"class": undefined,
		"id": undefined,
		'innerText': `Мы не можем этого допустить и наша команда помимо выполнения заказов по реализации солнечных батарей еще и ведет просветительскую деятельность в этом вопросе.`
	},
	{
		"msg": 'Найдите в тексте название компании GreenRobotic и оберните в тег span.',
		"tag": 'span',
		"class": undefined,
		"id": undefined,
		'innerText': 'GreenRobotic'
	}
,
	{
		"msg": 'Акцентируйте внимание на последнем абзаце, сделав его жирным. Для этого оберните содержимое последнего абзаца в тег b',
		"tag": 'b',
		"class": undefined,
		"id": undefined,
		'innerText': `Мы не можем этого допустить и наша команда помимо выполнения заказов по реализации солнечных батарей еще и ведет просветительскую деятельность в этом вопросе.`
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
