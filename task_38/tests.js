

const tests = [

	{
		"msg": "Первый абзац",
		"tag": 'p:nth-child(1)',
		"class": undefined,
		"id": undefined,
		"innerText": 'Солнечные батареи выгодно устанавливать уже сейчас. В течение срока службы они принесут вам выгоду, примерно в 10 раз превышающую их стоимость.'
	},
	{
		"msg": "Второй абзац",
		"tag": 'p:nth-child(2)',
		"class": undefined,
		"id": undefined,
		"innerText": 'Инвестиции в солнечные батареи – разумное решение. Такие инвестиции аналогичны инвестициям в меры по энергоэффективности и по уменьшению теплопотерь вашего дома. Любой прибор, которые потребляет меньше энергии, сразу начинает приносить вам деньги за счет экономии энергии. Затраты на дополнительное утепление вашего дома начинают приносить вам сразу экономию на кондиционирование и отопление. В настоящее время многие уже знают, что инвестиции в меры энергоэффективности являются очень умной инвестицией. Мы постарались показать, что инвестиции в солнечные батареи аналогичны.'
	},
	{
		"msg": "Третий абзац",
		"tag": 'p:nth-child(3)',
		"class": undefined,
		"id": undefined,
		"innerText": 'Не забывайте также, что кроме экономии от установки солнечных батарей, вы вносите вклад в борьбу с загрязнением окружающей среды и с глобальным потеплением. Это происходит за счет того, что вы уменьшаете потребление энергии от традиционных, экологически грязных, топливных электростанций.'
	},
	{
		"msg": "Четвертый абзац",
		"tag": 'p:nth-child(4)',
		"class": undefined,
		"id": undefined,
		"innerText": 'Солнечные батареи повышают стоимость вашего дома. А в некоторых случаях повышают его привлекательность у покупателей, т.к. даже если повышение стоимости дома будет меньше ваших затрат на солнечную электростанцию на крыше вашего дома, то продать такой “продвинутый” дом будет легче.'
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
					let value = selectorElem.style[style[0]];
					if (value.substring(0, 3) === 'rgb'){
						value = value.replaceAll(' ', '');
					}
					testResult &&= (value === style[1]);
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
