function loadScript(src) {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

async function loadScriptsInOrder() {
  try {
    await loadScript('./js/markmap-lib.js');
    await loadScript('./js/d3.min.js');
    await loadScript('./js/markmap-view.js');
    // await loadScript('./js/markmap-toolbar.js');
    console.log('All scripts loaded successfully');
    setupWebFontConfig();
    // draw(data)
  } catch (error) {
    console.error('Error loading scripts:', error);
  }
}

function setupWebFontConfig() {
  console.info(window.markmap, "window.markmap2");
  window.WebFontConfig = {
    custom: {
      families: [
        "KaTeX_AMS",
        "KaTeX_Caligraphic:n4,n7",
        "KaTeX_Fraktur:n4,n7",
        "KaTeX_Main:n4,n7,i4,i7",
        "KaTeX_Math:i4,i7",
        "KaTeX_Script",
        "KaTeX_SansSerif:n4,n7,i4",
        "KaTeX_Size1",
        "KaTeX_Size2",
        "KaTeX_Size3",
        "KaTeX_Size4",
        "KaTeX_Typewriter",
      ],
    },
    active: () => {
      window.markmap().refreshHook.call();
    },
  };
}


  var data = `---
title: 标题是否是标题是标题是否是标题是标题是否是标题是
---

#### 比试前的准备
- 王浩和许灵茵来到院子准备比试。王浩和许灵茵。
- 王夫人和其他家人在屋檐下围观。
- 比试前先测试双方的力气。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 比试前的准备
- 王浩和许灵茵来到院子准备比试。王浩和许灵茵。
- 王夫人和其他家人在屋檐下围观。
- 比试前先测试双方的力气。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 比试前的准备
- 王浩和许灵茵来到院子准备比试。王浩和许灵茵。
- 王夫人和其他家人在屋檐下围观。
- 比试前先测试双方的力气。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 比试前的准备
- 王浩和许灵茵来到院子准备比试。王浩和许灵茵。
- 王夫人和其他家人在屋檐下围观。
- 比试前先测试双方的力气。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 比试前的准备
- 王浩和许灵茵来到院子准备比试。王浩和许灵茵。
- 王夫人和其他家人在屋檐下围观。
- 比试前先测试双方的力气。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 比试前的准备
- 王浩和许灵茵来到院子准备比试。王浩和许灵茵。
- 王夫人和其他家人在屋檐下围观。
- 比试前先测试双方的力气。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 比试前的准备
- 王浩和许灵茵来到院子准备比试。王浩和许灵茵。
- 王夫人和其他家人在屋檐下围观。
- 比试前先测试双方的力气。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。

#### 王浩的力气测试
- 王浩抱起石凳，走了十步力竭。
- 王夫人在旁边提醒小心。
- 两位嫂嫂对王浩的表现表示赞赏。
`
loadScriptsInOrder();

    const colorLoopArr=["#006AF8","#F76526","#00A85F","#894FE5"]
    const colorArr=["#000000"]
    for (let index = 0; index < 100; index++) {
      colorArr.push(...colorLoopArr)
    }
    window.addEventListener('message', (event) => {
      // if (event.origin !== 'http://localhost:8011') return; // 验证来源
    
      const { type, payload } = event.data;
      if (type === 'draw') {
        window.draw(payload);
      }
      if (type === 'export') {
        window.exportToPNG();
      }
    });
    window.draw=function draw(h, u = {
      colorFreezeLevel: 2,
      initialExpandLevel: 3,
      spacingHorizontal: 30,
      spacingVertical: 20,
      nodeMinHeight:14,
      maxWidth:240,
      fontSize1:'14px',//一级标题字体大小
      fontSize2:'12px',//二级标题字体大小
      fontSize3:'12px',//内容字体大小
      color:["rgba(0,106,248,0.5)"],
    }) {
      const g = window.markmap;
      const {
        Transformer
      } = window.markmap;
      const transformer = new Transformer();

      const {
        root,
        features
      } = transformer.transform(h)
      console.info(root, features, 'root, features',(g.deriveOptions)(u))
      if (window.mm) window.mm.destroy()
      window.mm = g.Markmap.create("svg#mindmap", (g.deriveOptions)(u), root)
    
    }
    
    