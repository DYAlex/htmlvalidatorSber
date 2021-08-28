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
Наша компания ведет историю из славного рода компаний по озеленению амазонских лесов. Да, это именно наш проект. В первую очередь, когда мы видим задачу, мы ставим себе целью определить боль клиента, как он видит самый лучший исход проекта и прилагая максимум усилий добиваемся этого. 

Мы выбрали эту сферу не просто так. GreenRobotic ставит своей целью обеспечить гармоничное и бесшовное сосуществование человека и природы. Мы пользуемся благами наших лесов, полей, почвы, однако мы должны понимать, что без должного ухода и восстановления этих ресурсов мы скоро встанем перед ситуацией, где ресурсов нам будет не хватать, а природа полностью потеряет свой первозданный вид.

Мы не можем этого допустить и наша команда помимо выполнения заказов по реализации солнечных батарей еще и ведет просветительскую деятельность в этом вопросе.

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

p{
	padding: 10px;
	margin: 10px;
	border-radius: 5px;
	background-color: #2c3e50;
	color: #95a5a6;
	font-size: 20px;
}

span{
	padding: 2px;
	border-radius: 2px;
	background-color: #c0392b;
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