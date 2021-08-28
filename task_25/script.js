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
	<div class='links'>
		<a href='#'>блок 1</a>
		<a href='#'>блок 2</a>
		<a href='#'>блок 3</a>
	</div>
	<section id='block_1'></section>
	<section id='block_2'></section>
	<section id='block_3'></section>

</body>
</html>


`;

css.value = `
body {
  background-color: #6f9e80;
  margin: 0;
  font-family: sans-serif;
} 

.links{
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 10px;
	padding: 10px;
}

.links{
	background-color: #7f8c8d;
	position: sticky;
	left: 0;
	top: 0;
}

.links a{
	color: #34495e;
	text-decoration: none;
	font-weight: 900;
}

#block_1{
	background-color: #16a085;
}

#block_2{
	background-color: #2980b9;	
}

#block_3{
	background-color: #34495e;
}

section{
	height: 100vh;
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