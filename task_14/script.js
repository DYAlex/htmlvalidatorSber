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
	  <link rel="stylesheet" 
   href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" 
   integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" 
   crossorigin="anonymous"/>
	  <title>Document</title>
	</head>
	<body>
	  <button><i class=""></i></button>
	  <button><i class=""></i></button>
	  <button><i class=""></i></button>
	  <button><i class=""></i></button>
	<script src="https://use.fontawesome.com/f44131bfd0.js"></script>
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
button{
	border: none;
	color: white;
	background-color: #2c3e50;
	padding: 10px;
	cursor: pointer;
	transition: box-shadow 0.5s ease;
}

button+button{
	margin-left: 10px;
}

button:hover{
	box-shadow: 10px 10px 10px black;
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