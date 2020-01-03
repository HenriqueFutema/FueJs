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
            for(const [k, v] of Object.entries(attrs)){
                const nameAttr = v.name
                const attrToBind = v.value.split(/(\{\{[^}]+\}\})/g).filter(x => x !== '')
                attrToBind.map((_attrToBind) => _attrToBind.match(/^\{\{[^}]+\}\}$/) ? bindingAttr(nameAttr, _attrToBind) : _attrToBind)
            }
            function bindingAttr(name, value){
                const _value = value.replace(/^\{\{([^}]+)\}\}$/, '$1').trim()
                return element.setAttribute(name, data[_value])
            }
        })
    }

    mapBindMethods(){

    }

}

export { Fue }