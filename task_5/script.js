const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `
<html>

<head>
  <link rel="stylesheet" href="main.css">
</head>

<body>
  <div class="card">
    <div class="card__left">
      <img src="https://i.pinimg.com/564x/36/a1/91/36a19108f3088af7315231dc919b166a.jpg" height="495" width="495">
    </div>
    <div class="card__right">
      <h1>Солнечные панели <br> Green Robotic</h1>
      <h3>от 20 000₽</h3>
      <h4>Особенности:</h4>
      <p>24/7 Мониторинг электроэнергии</p>
      <p class="accent-text">Автоматическое включение и отключение</p>
      <button type="link" href="#" class="card__order-button">Заказать</button>
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

.card {
  background-color: #fff;
  width: 900px;
  height: 495px;
  margin: auto;
  margin-top: 50px;

  border-radius: 8px;
  box-shadow: 0px 0px 29px rgba(25, 78, 44, 0.5);

  display: flex;
}

.card img {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.card__left {
  display: flex;
  align-items: center;
}

.card__right {
  padding: 15px;
}

h1 {
  color: #0c421f;
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 1.98px;
}

h3,
h4 {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 16px;
  color: #0c421f;
  letter-spacing: 1px;
  padding-bottom: 5px;
  margin-top: 50px;
}

p {
  font-weight: 400;
  font-size: 14px;
  color: #0c421f;
  letter-spacing: 1px;
}

button {
  text-align: center;
  padding: 10px 15px;
  border-radius: 25px;
  font-size: 18px;
  color: white;
  background-color: #ef7b18;
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 10px rgb(239 123 24 / 36%);
  margin-top: 20px;
}

.accent-text {
  color: #ef7b18;
  font-weight: bold;
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