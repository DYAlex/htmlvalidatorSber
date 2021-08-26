const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `
<html>
<head>
</head>
<body>
<div class='sun'>
	<img src='media/sun.png' >
</div>
<form>
	<div class='field'>
		<label>Укажите имя: </label>
		<input type='text'>
	</div>
	<div class='field'>
		<input id='chb' type='checkbox'>
		<label for='chb'></label>
	<div>
</form>
</body>
</html>
`;

css.value = `



body {
  background-color: #6f9e80;
  margin: 0;
  font-family: sans-serif;
}

.sun{
	display: inline-block;
}

.sun img{
	width: 300px;
	height: 300px;
	transition: transform 2s ease;
	padding: 30px;
}

.new_sun img:hover{
	transform: rotate(360deg); 
}

form{
	padding: 20px;
}

.field{
	display: flex;
	flex-direction: column;
	width: 300px;
}

.new_field input{
	padding: 10px;
	border: none;
}

.new_field input:focus-visible{
	outline: none;
	box-shadow: 10px 10px 10px black;
}

.new_field input:focus-visible{
	outline: none;
	box-shadow: 10px 10px 10px black;
}

.new_checkbox input{
	width: 0;
	height: 0;
}

.new_checkbox label{
	display: inline-block;
	width: 10px;
	height: 10px;
	border: 2px solid black;
}

.new_checkbox input:checked+label{
	background-color: #2ecc71;
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