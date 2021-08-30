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
 <form>
  <div class='field'>
   <label for='name_in'>Имя: </label>
   <input type='text' id='name_in'>
  </div>
  <div class='field'>
   <label for='name_in'>Фамилия: </label>
   <input type='text' id='name_in'>
  </div>
  <div class='btns' onsubmit='return false'>
   <button type='button' onclick='alert("Форма отправлена");return false'>Отправить</button>
   <button onclick='alert("Добрый день!");return false'>Поздороваться</button>
   <button>Очистить форму</button>
  </div>
 </form>
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
.field{
	display: flex;
	justify-content: space-between;
	width: 400px;
	margin: 10px 0;
}

.btns{
	display: flex;
	justify-content: space-between;
	width: 400px;
}

.btns button{
	border: none;
	background-color: #34495e;
	color: #ecf0f1;
	padding: 5px;
	border-radius: 5px;
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