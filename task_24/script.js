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
  <div class='box'>
  	<div class='row'>
  		<img src='' alt=''>
  		<img src='' alt=''>
  	</div>
  	<div class='row'>
  		<img src='' alt=''>
  		<img src='' alt=''>
  	</div>
  </div>

</body>
</html>


`;

css.value = `
body {
  background-color: #6f9e80;
  margin: 0;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
} 

.box{
	width: 500px;
	height: 400px;
	background-color: #34495e;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.row{
	display: flex;
	justify-content: space-around;
}

img{
	width: 100px;
	height: 100px;
	border: 2px solid black;
	position: relative;
}

.row:nth-child(1) img[src='']:nth-child(1)::after{
	content: '1';
	font-size: 70px;
	left: 50%;
	top: 50%;
	color: white;
	transform: translate(-50%, -50%);
	position: absolute;
}

.row:nth-child(1) img[src='']:nth-child(2)::after{
	content: '2';
	font-size: 70px;
	left: 50%;
	top: 50%;
	color: white;
	transform: translate(-50%, -50%);
	position: absolute;
}

.row:nth-child(2) img[src='']:nth-child(1)::after{
	content: '3';
	font-size: 70px;
	left: 50%;
	top: 50%;
	color: white;
	transform: translate(-50%, -50%);
	position: absolute;
}

.row:nth-child(2) img[src='']:nth-child(2)::after{
	content: '4';
	font-size: 70px;
	left: 50%;
	top: 50%;
	color: white;
	transform: translate(-50%, -50%);
	position: absolute;
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