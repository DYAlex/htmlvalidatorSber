
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
const btn  = document.querySelector('#submit');


html.value = `
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

</body>
</html>
`;

const inputHandler = ()=>{
	const result = document.createElement('iframe');
	document.querySelector('#forResult').innerText = '';
	document.querySelector('#forResult').appendChild(result);
	const htmlValue = html.value;
	const cssValue = css.value;
	const styleTag = document.createElement('style');
	const innerDom = result.contentDocument;

	styleTag.type = 'text/css';
	if (styleTag.styleSheet){
	  // This is required for IE8 and below.
	  styleTag.styleSheet.cssText = cssValue;
	} else {
	  styleTag.appendChild(document.createTextNode(cssValue));
	}
	innerDom.write('');
	innerDom.write(htmlValue);
	innerDom.querySelector('head').appendChild(styleTag);
};


html.addEventListener('input', inputHandler);
css.addEventListener('input', inputHandler);