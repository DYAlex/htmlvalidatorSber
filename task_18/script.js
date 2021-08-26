const regexpStyle = /^[^{@]+{[^}]+}/gm;
const clearRegexp = /^\@[a-z {}\n0-9%:\-\;]+}\n}$/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class='card'>
    Очень дешевые и надежные солнечные батареи! Очень рекомендуем, сами используем. Покупайте наши батареи, вы будете рады, мы будем рады, все будут рады.
  </div>
  <div class='card'>
    Обслуживание солнечных батарей! Очень важно, очень нужно. Без них батареи будут плохо работать, а нам нужно, чтобы они работали хорошо.
  </div>
  <div class='card'>
    Дополнительные панели для солнечных батарей. Сделайте свою батарею более эффективной и мозщной!
  </div>
</body>
</html>
`;

css.value = `

body {
  background-color: #6f9e80;
  margin: 0;
  font-family: sans-serif;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

}
.card{
  padding: 10px;
  margin: 10px;
  width: 300px;
  background-color: darkblue;
  color: white;
  
}

.sticker{
  width: 50px;
  height: 50px;
  background-color: #c0392b;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translate(50%, -50%) rotate(30deg);
}
`

const cssHandler = (cssText, dom)=>{
	console.log(cssText.replace(clearRegexp, ''));
	[...cssText.replace(clearRegexp, '').match(regexpStyle)].map(style=>{
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
	innerDom.querySelector('head').appendChild(styleTag);
};


html.addEventListener('input', inputHandler);
css.addEventListener('input', inputHandler);