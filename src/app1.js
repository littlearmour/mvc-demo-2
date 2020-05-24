import "./app1.css";
import $ from "jquery";
import Model from "./base/Model";

const eventBus = $(window);
// console.log(eventBus.on);
// console.log(eventBus.trigger);
//数据相关放到m
const m= new Model({data:{
  n: parseInt(localStorage.getItem("n"))
  },
  update:function (data) {
    Object.assign(m.data, data); //data的所有属性赋值给update
    eventBus.trigger("m:updated");
    localStorage.setItem('n', m.data.n);
  }
})
// console.dir(m)
// m.create()
// 其他为c
const view = {
  el: null,
  //第一次渲染html
  html: `
      <div>
        <div class="output">
          <span id="number">{{n}}</span>
        </div>
        <div class="actions">
          <button id="add1">+1</button>
          <button id="subtract1">-1</button>
          <button id="multiply1">*2</button>
          <button id="divide1">÷2</button>
        </div>
      </div>`,

  init(container) {
    view.el=$(container)
    view.render(m.data.n); //view=render(data)  视图等于渲染数据
    //寻找重要的元素
    view.autoBindEvents();
    eventBus.on("m:updated", () => {
      view.render(m.data.n);
    });
  },
  render(n) {
    if (view.el.children.length !== 0) view.el.empty();
    console.log(n)
    $(view.html.replace("{{n}}", n)).appendTo(view.el);
  },
  events: {
    "click #add1": "add",
    "click #subtract1": "subtract",
    "click #multiply1": "multiply",
    "click #divide1": "divide",
  },
  add() {
    m.update({ n: m.data.n + 1 });
  },
  subtract() {
    console.log("here");
    m.update({ n: m.data.n - 1 });
  },
  multiply() {
    console.log("here");
    m.update({ n: m.data.n * 2 });
  },
  divide() {
    m.update({ n: m.data.n / 2 });
  },

  autoBindEvents() {
    for (let key in view.events) {
      const value = view[view.events[key]];
      const spaceIndex = key.indexOf(" ");
      const part1 = key.slice(0, spaceIndex);
      const part2 = key.slice(spaceIndex + 1);
      view.el.on(part1, part2, value);
    }
  },
};
export default view;
