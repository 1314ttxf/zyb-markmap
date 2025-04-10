function main() {

    // 获取传递的参数

    console.log("jslog=","startmain")

    console.log("jslog=","engines 对象:", engines);

    let engine = engines.myEngine();

    console.log("jslog=","当前引擎实例:", engine);

    let execArgv=engine.execArgv

    // 若需查看引擎的 execArgv（执行参数）

    console.log("jslog=","execArgv 参数:", execArgv);



    var departure = "西安";

    var destination = "杭州"

    var date = "2025-9-24 20:01"

    if (execArgv) {

        departure = execArgv.get("departure");

        destination = execArgv.get("destination")

        date = execArgv.get("date")

        // 如果参数是 URL 编码，进行解码

        if (departure) {

            departure = decodeURIComponent(departure);

        }

        if (destination) {

            destination = decodeURIComponent(destination);

        }

    }

    var datePart = date.split(" ")[0];

    console.log("jslog=","departure22:", departure);

    console.log("jslog=","destination2:", destination);

    console.log("jslog=","date2:", date);

    launchCtripApp();

    ensureHomePage();

    enterFlightBooking();

    setFlightDetails(departure, destination, datePart);

    selectClasses(date)

    reserveClasses()

}



// 启动携程应用，并确保其成功启动

function launchCtripApp() {

    console.log("jslog=","正在启动携程旅行...");

    app.launchApp("携程旅行");



    if (!waitForAppLaunch("ctrip.android.view", 10000)) {

        console.error("jslog=","携程旅行启动失败");

        exit();

    }

    console.log("jslog=","携程旅行成功启动");

}



// 确保进入首页

function ensureHomePage() {

    console.log("jslog=","检测是否已进入首页...");

    if (text("首页").exists() && text("机票").exists()) {

        console.log("jslog=","已在首页");

        return;

    }



    console.log("jslog=","不在首页，尝试返回...");

    for (let i = 0; i < 10; i++) {

        back();

        sleep(500);

        if (text("首页").exists()) {

            console.log("jslog=","成功返回首页");

            return;

        }

    }



    throw new Error("无法返回首页");

}



// 进入机票预订页面

function enterFlightBooking() {

    console.log("jslog=","尝试进入机票预订页面...");

    let ticketButton = id("home_grid_flight_widget").findOne(5000);

    if (ticketButton) {

        ticketButton.click();

        sleep(200)

        click("单程");

        console.log("jslog=","成功进入机票页面");

    } else {

        console.error("jslog=","未找到机票入口");

        exit();

    }

}

// 设置机票出发地、目的地、出发日期

function setFlightDetails(departure, destination, date) {

    console.log("jslog=",`设置出发地：${departure}，目的地：${destination}，出发日期：${date}`);



    // 设置出发地

    let fromField = className("android.widget.TextView").desc("depart city").findOne(5000);

    if (fromField) {

        fromField.click();

        sleep(1000);

        setLocation(departure);

    } else {

        console.error("jslog=","未找到出发地输入框");

        exit();

    }



    // 设置目的地

    let toField = className("android.widget.TextView").desc("arrival city").findOne(5000);

    if (toField) {

        toField.click();

        sleep(1000);

        setLocation(destination);

    } else {

        console.error("jslog=","未找到目的地输入框");

        exit();

    }



    // 设置出发日期

    let dateField = className("android.widget.TextView").desc("depart date").findOne(5000);

    if (dateField) {

        dateField.click();

        sleep(1000);

        selectDate(date);

    } else {

        console.error("jslog=","未找到出发日期选择框");

        exit();

    }



    // 设置乘机人

    let searchField = id("a").className("android.widget.Button").findOne(5000);

    if (searchField) {

        searchField.click();

    } else {

        console.error("jslog=","未找到查询按钮");

        exit();

    }

    

    console.log("jslog=","机票信息填写完毕");

}



// 设置城市（输入并选择）

function setLocation(city) {

    let inputField = className("android.widget.EditText").findOne(5000);

    if (inputField) {

        // 先点击获取焦点

        inputField.click();

        sleep(500);

        // 设置城市文本

        inputField.setText(city);

        let cityOption = className("android.view.ViewGroup").desc("城市页第1条搜索结果").findOne(5000);

        if (cityOption) {

            console.log("jslog=","成功设置城市：" + city);

            cityOption.click();

        } else {

            console.error("jslog=","未找到匹配的城市：" + city);

            exit();

        }

    } else {

        console.error("jslog=","未找到城市输入框");

        exit();

    }

}





// 选择出发日期

function selectDate(targetDate) {

    // 输入日期字符串，格式为 "2025-03-25"

    // 解析出年、月、日

    var parts = targetDate.split("-");

    var targetYear = parseInt(parts[0]);

    var targetMonth = parseInt(parts[1]); // 数字月份，如 3 表示三月

    var targetDay = parseInt(parts[2]);

    // 目标月份Header文本（假设页面显示格式为 "2025年3月"）

    var targetHeaderText = targetYear + "年" + targetMonth + "月";

    console.log("jslog=",targetHeaderText, 'targetHeaderText')

    // 先尝试获取当前显示的月份Header（假设其文本格式符合 /^\d+年\d+月$/）

    var currentHeaderElement = textMatches(/^\d+年\d+月$/).findOne(3000);

    if (!currentHeaderElement) {

        console.log("jslog=","未能获取当前月份信息");

        exit();

    }

    var currentHeaderText = currentHeaderElement.text(); // 例如 "2025年5月"

    var currentYear = parseInt(currentHeaderText.split("年")[0]);

    var currentMonth = parseInt(currentHeaderText.split("年")[1].split("月")[0]);



    // 判断滚动方向：若目标月份在当前之前，则往下滑；若目标月份在当前之后，则往上滑；相同时无需滑动

    var swipeDirection = "none";

    if (currentYear > targetYear || (currentYear === targetYear && currentMonth > targetMonth)) {

        swipeDirection = "down";

    } else if (currentYear < targetYear || (currentYear === targetYear && currentMonth < targetMonth)) {

        swipeDirection = "up";

    } else {

        swipeDirection = "none";

    }



    console.log("jslog=","当前显示：" + currentHeaderText + "，目标：" + targetHeaderText + "，滚动方向：" + swipeDirection);



    // 如果当前月份不是目标月份，则滚动（设置最大滚动次数防止无限循环）

    var maxScrolls = 10;

    var scrollCount = 0;



    while (!textContains(targetHeaderText).exists() && scrollCount < maxScrolls) {

        if (swipeDirection == "up") {

            console.log("jslog=",swipeDirection, 'swipeDirection')

            // swipe(500, 2000, 500, 500, 500); // 向上滑动

            scrollForward();



            // 向上滚动

        } else if (swipeDirection == "down") {

            // swipe(500, 500, 500, 2000, 500); // 向下滑动

            // 向下滚动

            scrollBackward();

        }

        sleep(1000);

        scrollCount++;

    }

    if (!textContains(targetHeaderText).exists()) {

        console.log("jslog=","经过多次滚动后仍未找到目标月份：" + targetHeaderText);

        exit();

    }

    console.log("jslog=","找到了目标月份：" + targetHeaderText);

    // 获取Header元素

    var headerElem = textContains(targetHeaderText).findOne(5000);

    // 获取日期区域的边界

    var gridLeft = headerElem.bounds().left - 22;//日历区域左上角的 X 坐标。

    var gridTop = headerElem.bounds().top + 62;//日历区域左上角的 Y 坐标。

    var gridWidth = device.width - 20;;//日历区域的宽度。

    var gridHeight = 112;//日历区域中一行的高度，即每个日期单元格的高度。

    console.log("jslog=",gridLeft, gridTop, gridWidth, gridHeight, 'gridHeight', targetYear, targetMonth)



    // 获取目标月的第一天

    var firstDayOfMonth = new Date(targetYear, targetMonth - 1, 1);



    // 获取目标月第一天是星期几（0-7，1表示星期一 0 星期日）

    var startDayOfWeek = firstDayOfMonth.getDay();

    // 计算单元格的宽度

    var cellWidth = gridWidth / 7;

    // 计算目标日期的坐标

    var targetDayIndex = targetDay + startDayOfWeek;

    var targetRow = Math.floor(targetDayIndex / 7); // 行号 

    var targetCol = targetDayIndex % 7; // 列号

    if (targetCol === 0) {

        targetCol = 7;

    }

    // 计算目标日期的x, y坐标

    var targetX = gridLeft + (targetCol - 1) * cellWidth;

    var targetY = gridTop + targetRow * gridHeight;

    // 点击目标日期

    sleep(500)

    click(targetX + 50, targetY + 50);

    console.log("jslog=","目标日期 " + targetDate + " 的坐标: ", targetX, targetY);

    console.log("jslog=",firstDayOfMonth, startDayOfWeek, targetDayIndex, "目标日期 " + targetDate + " 的xx: ", cellWidth, targetRow, targetCol);

}

// 自定义等待应用启动的函数

function waitForAppLaunch(packageName, timeout) {

    const start = Date.now();

    while (Date.now() - start < timeout) {

        console.log("jslog=",currentPackage(),"包名")

        if (currentPackage() === packageName) return true;

        sleep(500);

    }

    return false;

}

//  查找第一个可点击的祖先元素

function findFirstClickableAncestor(view) {

    let currentView = view.parent();

    while (currentView) {

        if (currentView.clickable()) {

            return currentView; // 返回可点击的祖先

        }

        currentView = currentView.parent();

    }

    return null; // 未找到

}

// 选择班次方法

function selectClasses(date) {

    // 1. 提取传入时间的时分部分

    let timeParts = date.split(' ');



    let timeSegment = timeParts[1]; // 获取"20:01"部分

    let [inputHour, inputMinute] = timeSegment.split(':').map(Number);



    let inputTotalMinutes = inputHour * 60 + inputMinute;

    className("android.widget.TextView")

    .descContains("出发时间").findOne(5000); //确保页面加载成功后执行后续操作

    // 2. 查找所有符合条件的出发时间控件

    let timeViews = className("android.widget.TextView")

        .descContains("出发时间")    // 描述包含关键字的控件

        .find();



    if (timeViews.length === 0) {

        console.log("jslog=","未找到任何出发时间控件");

        toast("未找到任何出发时间控件");

        exit();

    }



    // 3. 遍历比较时间

    for (let view of timeViews) {

        try {

            // 3.1 从控件文本提取时间

            let timeText = view.text().trim();

            let timeMatch = timeText.match(/(\d{1,2}):(\d{2})/);

            

            if (!timeMatch) {

                console.log("jslog=",`跳过无法解析的时间文本：${timeText}`);

                continue;

            }



            // 3.2 转换分钟数

            let hour = parseInt(timeMatch[1]);

            let minute = parseInt(timeMatch[2]);

            let totalMinutes = hour * 60 + minute;

 

            // 3.4 比较并执行操作

            if (totalMinutes > inputTotalMinutes) {

                console.log("jslog=",`找到目标班次：${timeText}`);

                let clickableAncestor = findFirstClickableAncestor(view);

                clickableAncestor.click();

                return;

            }

        } catch (e) {

            console.error("jslog=",`处理控件时出错：${e}`);

        }

    }

    console.log("jslog=",`没有更晚的班次可选`);

    // 4. 未找到合适班次

    toast("没有更晚的班次可选");

    exit();

}

function reserveClasses(){//预定

    console.log("jslog=","尝试进入机票订单页面...");

    let ticketButton = id("btn_book_1").findOne(5000);

    if (ticketButton) {

        ticketButton.click();

        console.log("jslog=","成功进入机票订单页面");

    } else {

        console.error("jslog=","未找到机票订单入口");

        exit();

    }

}

// 运行主流程

main();

