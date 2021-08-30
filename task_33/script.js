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
  <h1>Факты про солнечные батареи</h1>
  <div class='facts'>
  	<div class='fact_1'>Солнечная энергия — чистый и естественный метод получения энергии, она не представляет биологической или экологической опасности.</div>
  	<div class='fact_2'>В развивающихся странах газ, нефть и уголь уже стали дороже солнечной энергии.</div>
  	<div class='fact_3'>За последние три года было установлено 60% всех солнечных батарей. Страны, занимающие лидирующие позиции в  использовании энергии Солнца — Германия, Испания, Япония.</div>
  	<div class='fact_4'>50% всех солнечных систем производится в Стране восходящего солнца для работы в домах обычных японцев. Японская государственная политика стимулирует жителей пользоваться панелями и возмещает почти половину затрат на их установку.</div>
  	<div class='fact_5'>1 кВт от сжигания 77 килограмм угля равен 1 кВт, выработанной солнечной панелью.</div>
  	<div class='fact_6'>Широкое распространение и применение солнечных батарей стало реальным благодаря американским ученым и промышленникам, создавшим в 1955 году Ассоциацию Солнечной Энергетики.</div>
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
.facts div{
	padding: 10px;
	background-color: #34495e;
	color: #ecf0f1;
	border-radius: 5px;
	margin: 10px;
}

`

const cssHandler = (cssText, dom)=>{
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