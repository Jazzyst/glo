'use strict';

const DomElement = function (options) {
  this.selector = options.selector;
  this.height = options.height;
  this.width = options.width;
  this.bg = options.bg;
  this.fontSize = options.fontSize;
  this.content = options.content;
}

DomElement.prototype.createEl = function () {
  let elem;
  console.log(this.selector.substr(0,1))
  if(this.selector.substr(0,1) === '.'){
    elem =  document.createElement('div');
    elem.classList.add(`.${this.selector.substr(1)}`);
    elem.textContent = this.content;
    elem.style.cssText = `
      height: ${this.height}px;
      width: ${this.width}px;
      background-color: #${this.bg};
      font-size: ${this.fontSize}px;
    `;
    document.body.append(elem);
    console.log(elem);
  }else if(this.selector.substr(0,1) === '#'){
    elem = document.createElement('div');
    elem.setAttribute('id',`${this.selector.substr(1)}`);
    elem.textContent = this.content;
    elem.style.cssText = `
      height: ${this.height}px;
      width: ${this.width}px;
      background-color: #${this.bg};
      font-size: ${this.fontSize}px;
    `;
    document.body.append(elem);
    console.log(elem);
  }

}

const domElement = new DomElement({
  selector:'#test',
  height: 100,
  width: 200,
  bg: 'ff0000',
  fontSize: 30,
  content: 'test text'
})

const domElement2 = new DomElement({
  selector:'.test',
  height: 500,
  width: 200,
  bg: 'ff7000',
  fontSize: 15,
  content: 'test text2'
})

domElement.createEl();
domElement2.createEl();