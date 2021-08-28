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
	<div class='sq_1'>1</div>
	<div class='sq_2'>2</div>
	<div class='sq_3'>3</div>
	<div class='sq_4'>4</div>
	<div class='sq_5'>5</div>
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

div{
	position: absolute;
	width: 100px;
	height: 100px;
	border-radius: 5px;
	padding: 5px;
	font-size: 20px;

}

.sq_5{
	background-color: #16a085;
	left: 10px;
	top: 10px;
}
.sq_4{
	background-color: #2980b9;
	left: 30px;
	top: 30px;
}
.sq_3{
	background-color: #8e44ad;
	left: 50px;
	top: 50px;
}
.sq_2{
	background-color: #d35400;
	left: 70px;
	top: 70px;
}

.sq_1{
	background-color: #c0392b;
	left: 90px;
	top: 90px;
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