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
        elements.map(element => {
            console.log(element)
        })
    }

    mapBindMethods(){

    }

}

export { Fue }