class Fue{

    constructor({el='#app', data={}, methods={}}){
        this.el = document.querySelector(el) ? document.querySelector(el) : console.log(`Can not find the element ${el}`)
        this.data = data;
        this.methods = methods;
        
        window.onLoad = this.mapBindText(), this.mapBindAttrs()
    }

    mapBindText(){
        const textToBind = [...this.el.querySelectorAll('*')]
        textToBind.map(element =>{
            const _element = element.innerHTML
            const data = this.data
            const text = _element.split(/(\{\{[^}]+\}\})/g).filter(x => x !== '')
            text.map((_textValue) => _textValue.match(/^\{\{[^}]+\}\}$/) ? binding(_textValue) : _textValue)
            function binding(textToBind){
                const _textToBind = textToBind.replace(/^\{\{([^}]+)\}\}$/, '$1').trim()
                return element.innerHTML = element.innerHTML.replace(textToBind, data[_textToBind] ? data[_textToBind] : textToBind)
            }       
        })
    }

    mapBindAttrs(){
        const elements = [...this.el.querySelectorAll('*')]
        const data = this.data
        elements.map(element => {
            const attrs = element.attributes
            for(const v of Object.values(attrs)){
                if (v.name[0] === '@' || v.name[1] === '-') {
                    return this.mapDirectives(element, v.name, v.value)
                }

                const nameAttr = v.name
                const attrToBind = v.value.split(/(\{\{[^}]+\}\})/g).filter(x => x !== '')
                attrToBind.map((_attrToBind) => _attrToBind.match(/^\{\{[^}]+\}\}$/) ? bindingAttr(nameAttr, _attrToBind) : _attrToBind)
            }
            function bindingAttr(name, value){
                const _value = value.replace(/^\{\{([^}]+)\}\}$/, '$1').trim()
                return element.setAttribute(name, data[_value] ? data[_value] : value)
            }
        })
    }

    mapDirectives(el, type, value){
        const typeDirective = {
            '@click': () => this.onClick(el, value),
            'v-model': () => this.vModel(el, value),
            'default': () => console.log("unknown directive")
        }
        return (typeDirective[type] || typeDirective['default'])()
    }

    onClick(el, method){
        el.addEventListener('click', this.methods[method])
    }

    vModel(el, data){
        el.addEventListener('input', ()=>{
            this.data[data] = el.value
        })
    }

}

Fue.newComponent = function({el='#app', name='app', html=`<p>Component ${name} <span>works!</span></p>`, data={}, methods={}}) {
    const $el = document.querySelector(el)
    console.log(html)
    $el.insertAdjacentHTML('beforeend', html)
}

export { Fue }