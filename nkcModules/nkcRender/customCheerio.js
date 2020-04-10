const cheerio = require("cheerio");


/**
 * 按顺序遍历文本节点,需传入handle
 * @param {Object} node - cheerio dom节点
 * @param {Function} handle - 处理器
 */
function eachTextNode(node, handle) {
  if(!handle) return;
  if(node.type === "text") {
    handle(node.data, node);
  }else if(node.children.length) {
    for(let child of node.children) {
      eachTextNode(child, handle)
    }
  }
}


// 修改load方法
(() => {
  let oldLoad = cheerio.load;
  function newLoad(html, option) {
    let $ = oldLoad.call(cheerio, html, {
      decodeEntities: false,
      ...option
    })
    $("pre").each((index, el) => {
      let newCode = $(el).html().replace(/\<|\>/g, source => {
        if(source === "<") return "&lt;";
        if(source === ">") return "&gt;";
      })
      $(el).text(newCode);
    });
    return $;
  }
  cheerio.load = newLoad;
})();

// 输出html时,将文本节点中的 < 和 > 转成 &lt; 和 &gt;
(() => {
  let oldLoad = cheerio.load;
  function newLoad(html, option) {
    let $ = oldLoad.call(cheerio, html, option);
    function new$() {
      let selector = $.apply(null, arguments);        // $ 函数this指向global
      if(!selector.length) return selector;           // 如果selector不是数组或者没有选中任何元素,那就不处理
      if(!selector.html) return selector;             // 我们需要代理的方法必须存在才能去代理
      let oldHtml = selector.html;
      // 输出字符转义后的html
      selector.html = function(p) {
        if(p) oldHtml.apply(selector, arguments);
        eachTextNode(selector[0], (text, node) => {
          if(!text) return;
          node.data = text.replace(/\<|\>|\&/g, source => {
            if(source === "<") return "&lt;";
            if(source === ">") return "&gt;";
            if(source === "&") return "&amp;";
          })
        })
        let output = oldHtml.apply(selector, arguments);
        return output;
      }
      // 输出原始html
      selector.originHtml = function() {
        return oldHtml.apply(selector, arguments);
      }
      return selector;
    }
    new$.__proto__ = $;                             // 继承 $ 下的其它方法
    return new$;
  }

  cheerio.load = newLoad;
})();



module.exports = cheerio;