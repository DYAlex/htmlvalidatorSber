const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `
<head>
  <link rel="stylesheet" href="main.css">
</head>
<body>
  <div class="card">
    <h1>Привет, HTML!</h1>
    <p>Язык разметки веб-страниц</p>
    <span>Строчный элемент 1</span>
    <span>Строчный элемент 2</span>
    <div>Блочный элемент 1</div>
    <div>Блочный элемент 2</div>
  </div>
</body>
`;

css.value = `
body {
  font-family: sans-serif;
  background: #eceff3;
  padding: 20px;
}

div, span {
  background: rgba(255, 255, 255, 0.5);
}

h1 {
  margin-top: 0;
}

.card {
  position: relative;
  width: 500px;
  margin: auto;
  padding: 100px 50px;
  box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}

.text-gradient {
      font-weight: bold;
      background-image: linear-gradient( 
45deg
, #f16629 25%, #f90617);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
`;

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