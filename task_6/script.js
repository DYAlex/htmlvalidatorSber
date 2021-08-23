const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');

// <li>в тег div добавьте две кнопки (Sign in, Log in)</li>
// <li>присвойте div с кнопками класс <span class="code">btns</span></li>

html.value = `

<html>

  <head></head>

<body>
    <a href='/'> 
      <img class='logo' src=''>
    </a>
    <nav>
      <span>О нас</span>  
      <span>Товары</span> 
      <span>Услуги</span> 
    </nav>
    <div>
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

header{
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #95a5a6;
  color: #2c3e50;
}

nav span{
  margin-left: 20px;
}

.logo{
  width: 100px;
}

.btns button{
  border: none;
  background-color: #2c3e50;
  color: #95a5a6;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.5s ease;
}

`;

const cssHandler = (cssText, dom)=>{
	[...cssText.match(regexpStyle)].map(style=>{
		const selector = style.match(/^([^{@]+){/g)[0].replaceAll(/[\n{]/g, '');
		const styleProps = style.match(/{[^}]+}/g)[0].replaceAll(/[\n{}]/g, '');
		return [selector, styleProps]
	}).forEach(style=>{
		[...dom.querySelectorAll(style[0])].forEach(elem=>elem.style = style[1]);
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