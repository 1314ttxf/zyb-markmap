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
    window.mm.fit(2, true)
    await sleep(1000)
    // 获取包含 SVG 的容器
    const element = document.getElementById("body");

    html2canvas(element, {
        // 使用更高的 scale 提升清晰度
        scale: 3,
        logging: true, // 开启日志排查问题
        // 允许跨域内容（如果 SVG 包含外部资源）
        useCORS: true,
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