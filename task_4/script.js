const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
</head>
<body>
<section class='page' id='pullover'> </section>
<section class='page' id='bike'> </section>
<section class='page' id='photo'> </section>  
</body>
</html>

`;

css.value = `
*{
  margin: 0;
  padding: 0;
}

.page{
  height: 700px;
}


#pullover{
  background-image: url('https://img4.cliparto.com/pic/xl/247008/4945121-knit-woolen-seamless-ethnic-ornament-texture-fabri.jpg');
}

#bike{
  background-color: darkgreen;
  background-image: url('https://www.publicdomainpictures.net/pictures/290000/nahled/penny-farthing-bicycle.png');
}

#photo{
   background-image: url('https://d.newsweek.com/en/full/1829968/rick-morty-peace-season-5.webp');
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