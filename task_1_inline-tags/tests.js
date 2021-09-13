
const tests = [
        {
            "msg": 'Выделите текст <span class="code">HTML!</span>, обернув его в тег <span class="code">&lt;span class=&quot;text-gradient&quot;&gt;&lt;/span&gt;</span>',
            "tag": 'h1 span.text-gradient',
            "class": undefined,
            "id": undefined,
            "innerText": "HTML!"
        }
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
    