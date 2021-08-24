const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `

<html>

<head>
</head>

<body>
  <div class='map map_1'>
    <img class='mario' src='media/mario.png'>
    <img class='mario' src='media/mario.png'>
    <img class='mario' src='media/mario.png'>
  </div>
  <div class='map map_2'>
    <img class='mario' src='media/mario.png'>
    <img class='mario' src='media/mario.png'>
    <img class='mario' src='media/mario.png'>
  </div>
  <div class='map map_3'>
    <img class='mario' src='media/mario.png'>
    <img class='mario' src='media/mario.png'>
    <img class='mario' src='media/mario.png'>
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

.map{
  height: 200px;
  padding: 20px;
  background-image: url('media/map.jpeg');
  background-position: bottom;
  background-size: 20% 100%;
  margin-bottom: 100px;
}

.mario{
  width: 50px;
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