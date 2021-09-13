
const tests = [
        {
            "msg": 'Перед заголовком добавьте изображение с путём <span class="code">media/solar-panel.jpg</span>',
            "tag": 'img[src="media/solar-panel.jpg"]',
            "class": undefined,
            "id": undefined,
        },
        {
            "msg": 'У изображения должна быть ширина, равная 690',
            "tag": 'img[width="690"]',
            "class": undefined,
            "id": undefined,
        },
    ]
    
    const testHandler = ()=>{
        const dom = document.querySelector('iframe').contentDocument;
        document.querySelector('#testResult').innerText = '';
    
        tests.forEach(elem=>{
            const answer = document.createElement('li');
    
            let selector = ''
            if (elem.tag) selector	 += elem.tag;
            if (elem.id) selector	 += `#${elem.id}`;
            if (elem.class) selector += `.${elem.class}`;
            let testResult = true;
            if (dom.querySelectorAll(selector).length === 0){
                testResult = false;	
            }else{
                dom.querySelectorAll(selector).forEach(selectorElem=>{
                    if (elem.innerText){
                        testResult &&= (selectorElem.innerText.trim() === elem.innerText);
                    }
                    try{
                        Object.entries(elem.styleList).forEach(style=>{
                        testResult &&= (selectorElem.style[style[0]] === style[1]);
                    })} catch{};
                })
            }
            if (testResult){
                answer.classList.add('pos');
            }else{
                answer.classList.add('neg');
            }
    
    
            answer.innerHTML = elem.msg;
            document.querySelector('#testResult').appendChild(answer);
        })
    }
    
    btn.addEventListener('click', testHandler);
    