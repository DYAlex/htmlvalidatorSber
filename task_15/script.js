const regexpStyle = /^[^{@]+{[^}]+}/gm;
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
		<input id='checkbox'>
		<label for='checkbox'></label>
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
}
@keyframes example {
    0% {transform: scale(1);}
    33% {transform: scale(1.1);}
    66% {transform: scale(0.9);}
    100% {transform: scale(1);}
}

.field input{
	width: 0;
	height: 0;
}

.field input+label{
	display: inline-block;
	width: 25px;
	height: 25px;
	border: 2px solid black;
}


input:checked+label{
  animation-name: example;
  animation-duration: 1s;
  animation-iteration-count: 2;
  background-color: #27ae60;
}

name:checked+label{
	animation-name: example;
}
duration:checked+label{
	animation-duration: 1s;
}
iteration-count:checked+label{
	animation-iteration-count: 2;
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
	innerDom.querySelector('head').appendChild(styleTag);
};


html.addEventListener('input', inputHandler);
css.addEventListener('input', inputHandler);