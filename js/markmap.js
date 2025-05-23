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
title: "dou bao周会"
---
                                                                                                    
## dou bao周会
- 2025-03-21 15:16:21
#### 内容概括
- 会议主要讨论了软件版本更新、硬件功能验证、产品开发测试协调、技术问题解决方案、网络功能测试和绩效考核。软件方面，讨论了版本测试计划、功能改版和性能稳定性问题。硬件方面，涉及功能验证、生产计划和固件更新。产品开发测试协调中，讨论了产品模式测试、需求变更和绑定发货流程。技术问题讨论包括音量逻辑、音频处理和安全问题。网络功能测试验证了刷ip功能和数据流切分。绩效考核讨论了KPI占比调整和表格提交。
#### 主要内容
1. #### 软件版本更新与硬件问题处理
    1. 版本2.2.3、2.2.4和2.3.0的测试计划和进度已确定，将解决手写延迟和密码合并问题。
    2. 硬件功能验证完成，生产计划已制定，内存优化问题得到解决，以满足客户需求。
2. #### 产品开发与测试协调会议
    1. 说话人9和说话人1达成共识，需要进一步讨论钉钉音量控制问题，以解决用户手动调整音量时可能出现的不准确问题。
    2. 说话人2提到设备注册信息将同步到国补或京东平台，但具体操作细节和责任归属仍需明确，以避免销售状态同步错误。
    3. #### 技术问题讨论与解决方案探索
        1. 倾向于使用uil导入方式来支持办公本上的待办事项导入到手机或电脑。
        2. 服务安全问题需要在2.3版本上线后进行审查，并考虑云端和本地端的加密措施。
    4. #### 网络功能测试与绩效考核讨论
        1. 说话人3验证了刷ip功能基本无问题，但存在环境依赖性和数据流切分问题。
        2. 说话人1要求大家提交绩效表格，并调整KPI占比，重点考核工作输出、工作态度和协作能力。
#### 发言总结
- <b>说话人2：</b>讨论了办公本设备注册与功能优化。他提到设备注册将与国补和京东平台同步，计划周二三完成开发，下周一上线。将同步s号、imei号等信息，仅上报未售状态。二点三功能本周提测，发现音频乱码问题，已反馈给豆包团队。版本优化了崩溃上报功能，活跃度统计加入日活、月活、周活数据。二点四版本调研待办功能，支持uil方式导入，但华为鸿蒙系统不支持。音频问题包括声音偏小和灰白现象，确认mp3编码丢失数据导致，计划获取原始音频对比分析。客户端oggpass问题，考虑求助建凯处理oppopass封装问题。卖会计需求增加AI助手，客户反馈满意，准备合入正式版本。会议总结模型切换kimi后发现功能缺失，考虑隐藏缺失功能。WPS编辑器已接入，但与签到客户端cfview结合存在问题。AGC自动增益算法开发，高可用性改动较小，基于端口发送数据，需变更端口通知。RPA技术调研，飞龙使用第三方百链平台，演示不顺利，错误率高，考虑autojs方案完成携程订票demo。
- <b>说话人4：</b>讨论了版本更新和性能稳定性问题。2.2.3版本已发布，存在手写延迟问题，计划下周对比测试。2.2.4版本提测中，增加了新需求，改善显示效果。2.3.0版本因打包问题延迟提测。2.4.0版本主要涉及代办卡改版和笔记类查找功能。2.2.1版本存在内存泄露问题，2.2.2版本上线后仍存在，每天约有两个oom问题报告。AI问题导致卡顿，每天约四到五个问题，主要是myscript卡住和主线程卡顿。考虑在线抓取内存分析文件难度大，计划研究解决方案；考虑提供内存异常时的重启方案。
- <b>说话人9：</b>总结了项目进展，已完成硬件功能验证和spi屏发版，计划三月底至四月初工厂生产。他提到固件和上位机下周只能完成铲车部件，人进需自行烧录。针对客户esp三二片内sram内存不足问题，通过优化预唤醒功能和buffer解决。集成过程中发现问题多，需下周持续分析。他还提到了数据堆积问题、烧录崩溃问题、明源需求处理、端对云连接问题以及安庆项目需求变更等，计划下周一与客户对需求。
- <b>说话人1：</b>在会议中深入讨论了技术问题和管理工作，包括副文本与max的偶合问题、后台app清理、系统进程与线程的关系等技术细节，以及服务单处理、客户需求响应等管理工作。他提出绩效考核标准应包括70%的工作输出、15%的写作能力和15%的工作态度，并强调KPI中应体现工作态度和协作能力。还提到需要与旭东沟通确认细节，并在填表时考虑KPI分解。
- <b>说话人3：</b>针对技术问题进行了深入讨论，涉及dango和mvr绑定问题、现场混乱应对、固件烧录时间、超时设置、负载测试、GPU测试、自动录音功能实现、刷IP功能验证以及版本修复和功能点问题。特别强调了两小时内负载拉起测试的重要性，GPU测试需虎鲸协助，自动录音功能需保证音频完整性，刷IP功能验证显示设备间通信顺畅。`
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
      needScale:false,
      fontSize1:'14px',//一级标题字体大小
      fontSize2:'12px',//二级标题字体大小
      fontSize3:'12px',//内容字体大小
      color:["rgba(0,106,248,0.5)"],
    },isExport=false) {
      data=h
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
      if (isExport) {
        if (window.mm2) window.mm2.destroy()
          window.mm2 = g.Markmap.create("svg#mindmap2", (g.deriveOptions)(u), root)
      }else{
        if (window.mm) window.mm.destroy()
          window.mm = g.Markmap.create("svg#mindmap", (g.deriveOptions)(u), root)
      }
    
    }
    window.reDraw=function reDraw(){
      draw(data, {
        colorFreezeLevel: 2,
        // initialExpandLevel: 3,
        spacingHorizontal: 30,
        spacingVertical: 8,
        nodeMinHeight:14,
        maxWidth:800,
        // needScale:true,
        fontSize1:'14px',//一级标题字体大小
        fontSize2:'12px',//二级标题字体大小
        fontSize3:'12px',//内容字体大小
        color:["rgba(0,106,248,0.5)"],
      },true)
    }
    
    