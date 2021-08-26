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
   <div class="media">
    <a href="">
      <img src="media/vk.png" alt="">
    </a>
    <a href="">
      <img src="media/fb.png" alt="">
    </a>
    <a href="">
      <img src="media/inst.png" alt="">
    </a>
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

.box{
  height: 50px;
  display: inline-block;
}

.media{
  width: 150px;
  height: 50px;
  background-color: #ecf0f1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.media::after{
  content: '';
  position: absolute;
  left: 100%;
  width: 50px;
  height: 50px;
  background-color: #ecf0f1; 
  border-radius: 0 50% 50% 0;
}


.slide{
  position: absolute;
}

.slide:hover{
  left: 160px;
}

a{
  width: 40px;
  height: 40px;
}

img{
  width: 100%;
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