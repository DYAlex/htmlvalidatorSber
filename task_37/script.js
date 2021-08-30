const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `
<html>
<head>
</head>
<body>
<p>
Солнечные батареи выгодно устанавливать уже сейчас. В течение срока службы они принесут вам выгоду, примерно в 10 раз превышающую их стоимость.
</p>
<p>
Инвестиции в солнечные батареи – разумное решение. Такие инвестиции аналогичны инвестициям в меры по энергоэффективности и по уменьшению теплопотерь вашего дома. Любой прибор, которые потребляет меньше энергии, сразу начинает приносить вам деньги за счет экономии энергии. Затраты на дополнительное утепление вашего дома начинают приносить вам сразу экономию на кондиционирование и отопление. В настоящее время многие уже знают, что инвестиции в меры энергоэффективности являются очень умной инвестицией. Мы постарались показать, что инвестиции в солнечные батареи аналогичны.
</p>
<p>
Не забывайте также, что кроме экономии от установки солнечных батарей, вы вносите вклад в борьбу с загрязнением окружающей среды и с глобальным потеплением. Это происходит за счет того, что вы уменьшаете потребление энергии от традиционных, экологически грязных, топливных электростанций.
</p>
<p>
Солнечные батареи повышают стоимость вашего дома. А в некоторых случаях повышают его привлекательность у покупателей, т.к. даже если повышение стоимости дома будет меньше ваших затрат на солнечную электростанцию на крыше вашего дома, то продать такой “продвинутый” дом будет легче.
</p>
</body>
</html>
`;

css.value = `
body {
  background-color: #6f9e80;
  margin: 0;
  font-family: sans-serif;
}

p{
  background-color: #34495e;
  color: #ecf0f1;
  padding: 10px;
  margin: 10px;
}
`

const cssHandler = (cssText, dom)=>{
	[...cssText.match(regexpStyle)].map(style=>{
		const selector = style.match(/^([^{@]+){/g)[0].replaceAll(/[\n{]/g, '');
		const styleProps = style.match(/{[^}]+}/g)[0].replaceAll(/[\n{}]/g, '');
		return [selector, styleProps]
	}).forEach(style=>{
		[...dom.querySelectorAll(style[0])].forEach(elem=>elem.style = elem.style.cssText+style[1]);
	})

}

const inputHandler = ()=>{
	const result = document.createElement('iframe');
	document.querySelector('#forResult').innerText = '';
	document.querySelector('#forResult').appendChild(result);
	const innerDom = result.contentDocument;

	const htmlValue = html.value;
	const cssValue = css.value;
	const styleTag = document.createElement('style');

	styleTag.type = 'text/css';
	if (styleTag.styleSheet){
	  styleTag.styleSheet.cssText = cssValue;
	} else {
	  styleTag.appendChild(document.createTextNode(cssValue));
	}
	innerDom.write('');
	innerDom.write(htmlValue);
	try{
		cssHandler(css.value, innerDom);
	}catch{}
	// innerDom.querySelector('head').appendChild(styleTag);
};


html.addEventListener('input', inputHandler);
css.addEventListener('input', inputHandler);