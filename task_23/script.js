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
  <div>
    <h1>Почему вам необходимо преобрести солнечные батареи</h1>
  </div>

  <div>
    <ul>
      <li>Это модно. Все соседи будут завидовать и захотят как у вас.</li>
      <li>Это выгодно. Можно меньше платить за энергию.</li>
      <li>Это надежно. Даже если на даче перебои с электричеством у вас всегда есть альтернативный источник.</li>
      <li>Это экологично. Вы делаете свой вклад в спасение природы.</li>
    </ul>
  </div>

</body>
</html>


`;

css.value = `
body {
  background-color: #6f9e80;
  margin: 0;
  font-family: sans-serif;
  margin: 10px;
} 

.title h1{
	font-size: 25px;
	color: #ecf0f1;
	margin: 20px 10px;
}

.info ul{
	list-style: none;
	padding: 0;
}

.info li{
	padding: 10px;
	margin: 10px;
	box-shadow: 5px 5px 5px black;
	color: #ecf0f1;
	background-color: #8e44ad;

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