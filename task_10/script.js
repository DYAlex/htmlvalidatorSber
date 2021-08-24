const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `
<html>
<head>
</head>

<body>
	<form>
		<div class='field'>
			<label>Укажите ваше имя: </label>
			<input id='name__input' type='text'>
		</div>
		<div class='field'>
			<label for='lastname__input'>Укажите вашу фамилию: </label>
			<input id='lastname__input' type='text'>
		</div>
		<div class='field'>
			<label for='age_input'>Укажите ваш возраст: </label>
			<input id='age_input' type='text'>
		</div>
		<div class='field'>
			<label for='phone__input'>Укажите ваш телефон: </label>
			<input id='phone__input' type='text'>
		</div>
	<button>Отправить	</button>
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

label{
	margin-bottom: 5px;
}

input{
	padding: 5px;
	border-radius: 10px;
	border: none;
}

input:focus-visible{
	outline: 0;
}

button:focus-visible{
	outline: 0;
}

input:focus-visible{
	box-shadow: 2px 2px 10px black;
}

button:focus-visible{
	box-shadow: 2px 2px 10px black;
}

form{
	padding: 20px;
	display: flex;
	width: 250px;
	flex-direction: column;
	align-items: stretch;
	background-color: #2980b9;
	color: #ecf0f1;
}

.field{
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
}

button{
	padding: 5px;
	border-radius: 10px;
	border: none;	
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