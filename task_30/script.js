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
<section>
<p>
Вопрос создания альтернативных источников энергии активно обсуждается мировым сообществом довольно давно. Это связано с постоянным ростом цен на традиционные энергоносители и стремительным сокращением энергетических ресурсов планеты. Вот и встал вопрос: почему бы не использовать неиссякаемые природные ресурсы, которые, к тому же, не требуют особых затрат на их добычу, такие как солнце, ветер, вода.
</p>
<p>
Первоначальная установка электростанций, работающих от солнца или ветра – мероприятие довольно дорогостоящее. Однако, в определенных ситуациях эти источники энергии не имеют альтернативы и тогда окупают себя очень быстро.
</p>
<p>
Солнечные батареи представляют собой панели фотоэлементов, способные максимально улавливать солнечные лучи и превращать полученную солнечную энергию в постоянный электрический ток. В настоящее время наиболее распространены кремниевые солнечные батареи. Разделяют монокристаллические и поликристаллические солнечные панели. С точки зрения потребительских свойств (срок службы, способ монтажа, выдача тока) они аналогичны.
</p>
</section>
<button'>▲</button>
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

section{
	height: 130vh;
}

p{
	padding: 10px;
	margin: 10px;
	font-size: 20px;
}

.btn_up{
	border: none;
	border-radius: 50%;
	font-size: 30px;
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