const sleep = (delay) => new Promise((resolve, _) => setTimeout(resolve, delay))
window.sendAppMessage = (data) => {
    window.flutter_inappwebview &&
      window.flutter_inappwebview.callHandler(
        "onMessage",
        JSON.stringify(data)
      );
    window.onMessage && window.onMessage.postMessage(JSON.stringify(data));
};
window.exportToPNG = async function exportToPNG() {
    window.reDraw()
    // window.mm.fit(2, true)
    await sleep(1000)
    const mindmapElement = document.getElementById("mindmap2");
    const g = mindmapElement.querySelector("g");
    const bbox = g.getBBox();
    const height=bbox.height+100
    const width=bbox.width+100
    mindmapElement.style.width=width+'px'
    mindmapElement.style.height=height+'px'
    window.reDraw()
    await sleep(1000)
    // 获取包含 SVG 的容器
    const element = document.getElementById("export");

    html2canvas(element, {
        // 使用更高的 scale 提升清晰度
        scale: 2,
        logging: true, // 开启日志排查问题
        // 允许跨域内容（如果 SVG 包含外部资源）
        useCORS: true,
        onclone: function(clonedDoc) {
          // 获取克隆文档中的所有 <h4> 元素
          const h4Elements = clonedDoc.querySelectorAll("h4");
  
          // 遍历所有 <h4> 元素
          h4Elements.forEach(h4 => {
              // 创建一个新的 <div> 元素
              const div = clonedDoc.createElement("div");
  
              // 将 <h4> 元素的样式和内容复制到 <div> 元素
              div.style.cssText = h4.style.cssText;
               // 设置字体加粗
              div.style.fontWeight = "bold";
              div.innerHTML = h4.innerHTML;
  
              // 替换 <h4> 元素为 <div> 元素
              h4.parentNode.replaceChild(div, h4);
          });
      }
    }).then(canvas => {
        // 创建下载链接
        const link = document.createElement("a");
        link.download = "export.png";
        const data=canvas.toDataURL("image/png");
        window.sendAppMessage({event:'export',data})
        // link.href = data
        // link.click();
    });
}