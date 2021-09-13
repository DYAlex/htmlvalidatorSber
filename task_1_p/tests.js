
const tests = [
        {
            "msg": 'Добавьте заголовок первого уровня c текстом <span class="code">Экономия на электричестве</span>',
            "tag": 'h1',
            "class": undefined,
            "id": undefined,
            "innerText": "Экономия на электричестве"
        },
        {
            "msg": 'После заголовка добавьте абзац c текстом <span class="code">Используйте чистую солнечную энергию для питания своего дома: уменьшите зависимость от электросети и счета за электричество.</span>',
            "tag": 'p',
            "class": undefined,
            "id": undefined,
            "innerText": "Используйте чистую солнечную энергию для питания своего дома: уменьшите зависимость от электросети и счета за электричество."
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
    