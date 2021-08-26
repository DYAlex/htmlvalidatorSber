const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `


<html>

<head>
</head>

<body>
<div class='images'>
	<div class='block'>
		<img src='media/1.jpeg'>
		<span class='number'>1</span>
	</div>
	<div class='block photo_2'>
		<img src='media/2.jpeg'>
		<span class='number'>2</span>
	</div>
	<div class='block photo_3'>
		<img src='media/3.jpeg'>
		<span class='number'>3</span>
	</div>
	<div class='block photo_4'>
		<img src='media/4.jpeg'>
		<span class='number'>4</span>
	</div>
	<div class='block'>
		<img src='media/5.jpeg'>
		<span class='number'>5</span>
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
}

.photos{
	display: grid;
	grid-template-rows: 300px 300px 300px;
	grid-template-columns: 300px 300px 300px;
}

.block{
	position: relative;
}

.number{
	position: absolute;
	left: 10px;
	top: 10px;
	font-size: 30px;
	text-shadow: 0px 0px 5px white
}

.photos img{
	width: 100%;
	height: 100%;
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
	// innerDom.querySelector('head').appendChild(styleTag);
};


html.addEventListener('input', inputHandler);
css.addEventListener('input', inputHandler);