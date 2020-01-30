class Fue {
  constructor({ el = "#app", data = {}, methods = {} }) {
    this.el = document.querySelector(el)
      ? document.querySelector(el)
      : console.error(`Can not find the element ${el}`);
    this.data = data;
    this.methods = methods;

    (window.onLoad = this.mapBindText()), this.mapBindAttrs();
  }

  mapBindText($el = [], _data = {}) {
    console.log(_data);
    const textToBind = $el !== [] ? [...this.el.querySelectorAll("*")] : [$el];
    textToBind.map(element => {
      const _element = element.innerHTML;
      const data = _data !== {} ? this.data : _data;
      const text = _element.split(/(\{\{[^}]+\}\})/g).filter(x => x !== "");
      text.map(_textValue =>
        _textValue.match(/^\{\{[^}]+\}\}$/) ? binding(_textValue) : _textValue
      );
      function binding(textToBind) {
        const _textToBind = textToBind
          .replace(/^\{\{([^}]+)\}\}$/, "$1")
          .trim();
        return (element.innerHTML = element.innerHTML.replace(
          textToBind,
          data[_textToBind] ? data[_textToBind] : textToBind
        ));
      }
    });
  }

  mapBindAttrs($el, _data) {
    const elements = $el !== [] ? [...this.el.querySelectorAll("*")] : [$el];
    const data = _data !== {} ? this.data : _data;
    elements.map(element => {
      const attrs = element.attributes;
      for (const v of Object.values(attrs)) {
        if (v.name[0] === "@" || v.name[1] === "-") {
          return this.mapDirectives(element, v.name, v.value);
        }

        const nameAttr = v.name;
        const attrToBind = v.value
          .split(/(\{\{[^}]+\}\})/g)
          .filter(x => x !== "");
        attrToBind.map(_attrToBind =>
          _attrToBind.match(/^\{\{[^}]+\}\}$/)
            ? bindingAttr(nameAttr, _attrToBind)
            : _attrToBind
        );
      }
      function bindingAttr(name, value) {
        const _value = value.replace(/^\{\{([^}]+)\}\}$/, "$1").trim();
        return element.setAttribute(name, data[_value] ? data[_value] : value);
      }
    });
  }

  mapDirectives(el, type, value) {
    const hasModificator = type.includes(".");
    let _type = type;
    let modificator = "";
    if (hasModificator) {
      _type = type.split(".")[0];
      modificator = type.split(".")[1];
    }

    const typeDirective = {
      "@click": () => this.onClick(el, value),
      "v-model": () => this.vModel(el, value, modificator),
      "v-for": () => this.vFor(el, value),
      default: () => console.error("unknown directive")
    };
    return (typeDirective[_type] || typeDirective["default"])();
  }

  onClick(el, method) {
    el.addEventListener("click", this.methods[method]);
  }

  vModel(el, data, modificator = "") {
    const typeEvent = modificator === "lazy" ? "change" : "input";
    if (modificator === "number") {
      return el.addEventListener(typeEvent, () => {
        this.data[data] = parseFloat(el.value);
      });
    }
    if (
      modificator === "" ||
      modificator === "trim" ||
      modificator === "lazy"
    ) {
      return el.addEventListener(typeEvent, () => {
        this.data[data] = modificator === "trim" ? el.value.trim() : el.value;
      });
    }
    return console.error("modificator does not exists");
  }

  vFor(el, data) {
    console.log(el);
    const falseData = data.split(" ");
    let value = falseData[0];
    const arrayMap = falseData[2];
    const _data = this.data[arrayMap];
    const $el = [...this.el.querySelectorAll("*")];
    if (_data === undefined) return;
    for (value of _data) {
      $el.map(element => {
        const _element = element.innerHTML;
        const text = _element.split(/(\{\{[^}]+\}\})/g).filter(x => x !== "");
        text.map(_textValue =>
          _textValue.match(/^\{\{[^}]+\}\}$/) ? binding(_textValue) : _textValue
        );
        function binding(textToBind) {
          const _textToBind = textToBind
            .replace(/^\{\{([^}]+)\}\}$/, "$1")
            .trim();
          const arrTextToBind = _textToBind.split(".");

          return (element.innerHTML = element.innerHTML.replace(
            textToBind,
            data[_textToBind] ? data[_textToBind] : value[arrTextToBind[1]]
          ));
        }
      });
    }
  }
}

Fue.newComponent = function({
  el = "#app",
  name = "",
  html = `<p>Component ${name} <span>works!</span></p>`,
  data = {},
  methods = {}
}) {
  const $el = document.querySelector(el);
  $el.insertAdjacentHTML("beforeend", html);
  new Fue({ el, data, methods });
};

export { Fue };
