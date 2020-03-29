var version = "20w03a18";
// console.info("Version " + version);
// var backend = "https://maorx.cn/a/";
var backend =  "http://localhost:8080/"
var lastModified0 = "";
var currentEditingNote = "";
var currentNotes = "";
var maximumNoteNumber = "";
var currentNoteIsNew = true;
var pinnedNoteNum = "";
var currentTime = "";
var username = "";
var birthday = "";
var thePopUp;
var popUpClosing = false;
var currentEditingNav;
var cusNavIconErrCount = 0;
var cusNavSubmitCount = 0;
var currentDeletingNav;
// var currentSearchEngine = localStorage.getItem("searchEngPref");
var currentSearchEngine = 'baidu';
var bgPreference = localStorage.getItem("bgPreference");
var cusWallpaper = localStorage.getItem("cusWallpaper");
var reduceMotion = localStorage.getItem("reduceMotion") == "on";
//var snowEf = localStorage.getItem("snowEf");
var pushClass;
var pushTitle;
var pushContent;
var pushStartTime;
var pushStopTime;
var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
var isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
var isMobile = isIphone || isAndroid;
var bingWallpaper;
//禁用右键
window.oncontextmenu = () => {
    return false; };
//键盘有输入是聚焦输入框
window.onkeydown = e => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode == 83) {
        return false;
    } else if (input0.style.opacity != "0") {
        input0.focus();
    }
};
// console.log("window.onload之前")
window.onload = () => {
    // console.log("!!!!!!!!!!!!!!");
    fetch("/bing").then(response => {
        // console.log("!!");
        // console.log(response);
        if (response.ok) {
            return response.json();
        }
    })
        .then(data => {
            if (data) {
                // console.log("?");
                // console.log(data.bing.url);

                bgbox.src=bingWallpaper=data.bing.url;

                bgPreBoxInBing.style.backgroundImage = "url(" + bingWallpaper + ")";
            }
        });

    // bgbox.src="https://cdn.jsdelivr.net/gh/MobiusBeta/assets/images/BG_A_Default_1.jpg";
    //判断有没有？连接，没有就在body最后添加这个js
    // const codeSrc = atob("aHR0cHM6Ly9hcGkucnRoc29mdHdhcmUuY24vYmFja2VuZC9jb2RlP2FwcG5hbWU9") + "Mobius%20Start";
    //     // console.log(codeSrc);
    //     // const statUrl = "https://maorx.cn/stat/";
    //     // //获取文档中 id=？ 的元素：
    //     // if (!document.querySelector("script[src='" + codeSrc + "']")) {
    //     //     loadJs(codeSrc, () => typeof codeLoad == "function" && codeLoad());
    //     // }
    //流量统计
    // const statUrl = "http://localhost:63342/a.xinhe.cn/js/";
    // window._paq = window._paq || [];
    // _paq.push(["trackPageView"]);
    // _paq.push(["enableLinkTracking"]);
    // _paq.push(["setTrackerUrl", statUrl + "matomo"]);
    // _paq.push(["setSiteId", "1"]);
    // console.log(statUrl + "matomo.js");
    // loadJs(statUrl + "matomo.js", null, () => {
    //     const imgStat = new Image();
    //     imgStat.src = statUrl + "matomo?idsite=1&rec=1";
    //     imgStat.style.display = "none";
    //     console.log(imgStat);
    //     document.body.appendChild(imgStat);
    // });
    //天气的js
    loadJs("https://cdn.sencdn.com/widget/static/js/widget-cc5d550.js");
    if (topNotificationBar.style.top != "0px") {
        processTopNotification();
    }
}
function processTopNotification() {
    pushClass = localStorage.getItem("pushClass");
    pushTitle = localStorage.getItem("pushTitle");
    pushContent = localStorage.getItem("pushContent");
    pushStartTime = localStorage.getItem("pushStartTime");
    pushStopTime = localStorage.getItem("pushStopTime");
    if (pushStopTime) {
        nowTime = new Date();
        pushStartTime = new Date(pushStartTime);
        pushStopTime = new Date(pushStopTime);
        if (nowTime.getTime() > pushStartTime.getTime() && nowTime.getTime() < pushStopTime.getTime()) {
            switch (pushClass) {
                case '0':
                    topNotificationBar.classList.add("class0");
                    break;
                case '1':
                    topNotificationBar.classList.add("class1");
                    break;
                case '2':
                    topNotificationBar.classList.add("class2");
                    break;
            }
            marqueeTitle.innerText = pushTitle;
            marqueeText.innerText = pushContent;
            showTopNbar();
        }
    }
}
function loadJs(src, load, error) {
    const newScript = document.createElement("script");
    newScript.src = src;
    newScript.onload = load;
    newScript.onerror = error;
    document.body.appendChild(newScript);
    // console.log("添加的js是："+ newScript);
    // console.log("loadJs执行完毕");
}

// console.log("window.onload之后");
function Input_Focus() {
    quotebox.style.opacity = "1";
    searchOptBox.style.display = "block";
    input0.classList.add("focus");
    setTimeout(() => {
        searchOptBox.style.opacity = "1";
        searchOptBox.style.top = innerWidth > 600 ? "270px" : "155px";
    }, 100);
    if (innerWidth <= 600) {
        title.style.top = "30px";
    }
    if (bgPreference == "Live") {
        if (reduceMotion === false) {
            liveBgBox.style.transform = "scale(1.1)";
        }
        liveBgBox.style.filter = "blur(10px)";
    } else {
        if (reduceMotion === false) {
            bgbox.style.transform = "scale(1.1)";
        }
        bgbox.style.filter = "blur(10px)";
    }
}
function Input_KeyDown(event) {
    if (event.keyCode == 13) {
        var str = input0.value;
        var finalStr = str.replace("翻译：", "");
        if (/^[a-z]+:\/\/[a-z0-9_\-\/.#?=%]+$/i.test(str)) {
            open(str);
            Input_Blur();
            return false;
        } else if (str.indexOf("翻译：") != -1) {
            form0.action = "https://fanyi.baidu.com/#en/zh/" + finalStr;
            input0.name = "";
        } else {
            switch (currentSearchEngine) {
                case 'baidu':
                    form0.action = "https://www.baidu.com/s";
                    input0.name = "word";
                    break;
                case 'bing':
                    form0.action = "https://www.bing.com/search";
                    input0.name = "q";
                    break;
                case 'google':
                    form0.action = "https://www.google.com/search";
                    input0.name = "q";
                    break;
            }
        }
        setTimeout(() => Input_Blur(), 50);
    }
}
function showSearchMenu(e, obj) {
    menuSearch.style.left = e.clientX + 3 + "px";
    menuSearch.style.top = e.clientY + 3 + "px";
    selectedText = window.getSelection().toString();
    if (selectedText != "") {
        searchMenuCut.classList.remove("disabled");
        searchMenuCopy.classList.remove("disabled");
    } else {
        searchMenuCut.classList.add("disabled");
        searchMenuCopy.classList.add("disabled");
    }
    showMenu(menuSearch);
}
function showMenu(theMenu) {
    theMenu.style.display = "block";
    setTimeout(() => {
        theMenu.style.opacity = "1";
        theMenu.style.transform = "scale(1.05)";
    }, 50);
    setTimeout(() => theMenu.style.transform = "scale(1)", 300);
}

//右键搜索框功能
function searchCut() {
    window.getSelection().toString();
    document.execCommand("cut");
    input0.focus();
}
function searchCopy() {
    window.getSelection().toString();
    document.execCommand("copy");
    input0.focus();
}
function searchPaste(e, obj) {
    try {
        navigator.clipboard.readText().then(clipText => input0.value = input0.value + clipText);
    } catch (err) {
        tipBoxCopyPaste.style.left = e.clientX + 3 + "px";
        tipBoxCopyPaste.style.top = e.clientY + 3 + "px";
        showMenu(tipBoxCopyPaste);
    }
    input0.focus();
}

//百度必应谷歌切换
function switchSearchEng(searchEng) {
    switch (searchEng) {
        case 'baidu':
            localStorage.setItem("searchEngPref", "baidu");
            currentSearchEngine = "baidu";
            searchOpt1.classList.add("selected");
            searchOpt2.classList.remove("selected");
            searchOpt3.classList.remove("selected");
            break;
        case 'bing':
            localStorage.setItem("searchEngPref", "bing");
            currentSearchEngine = "bing";
            searchOpt2.classList.add("selected");
            searchOpt1.classList.remove("selected");
            searchOpt3.classList.remove("selected");
            break;
        case 'google':
            localStorage.setItem("searchEngPref", "google");
            currentSearchEngine = "google";
            searchOpt3.classList.add("selected");
            searchOpt1.classList.remove("selected");
            searchOpt2.classList.remove("selected");
            break;
    }
    input0.focus();
}

//点击空白处
function Input_Blur() {
    input0.value = "";
    quotebox.style.opacity = "0";
    quotebox.style.animation = "none";
    searchOptBox.style.opacity = "0";
    searchOptBox.style.top = "";
    input0.classList.remove("focus");
    setTimeout(() => {
        searchOptBox.style.display = "none";
        searchOptBox.style.top = "";
    }, 250);
    if (innerWidth <= 600) {
        title.style.top = "100px";
        input0.style.top = "";
    }
    if (bgPreference == "Live") {
        if (reduceMotion === false) {
            liveBgBox.style.transform = "";
        }
        liveBgBox.style.filter = "";
    } else {
        if (reduceMotion === false) {
            bgbox.style.transform = "";
        }
        bgbox.style.filter = "";
    }
    hideKeyword();
}
function hideKeyword() {
    keyword.style.height = "0px";
    keyword.style.opacity = "0";
    setTimeout(() => {
        keyword.style.display = "none";
        keyword.innerHTML = "";
        keyword.style.height = "auto";
        keyword.style.opacity = "1";
    }, 250);
}
//keyword.Keyword_Click
function Keyword_Click() {
    setTimeout(() => Input_Blur(), 50);
}

//时间
function Title_Click(event) {
    if (navbox.style.display != "block") {
        input0.style.opacity = "0";
        Input_Blur();
        quotebox.style.opacity = "0";
        quotebox.style.animation = "none";
        if (bgPreference == "Live") {
            if (reduceMotion === false) {
                liveBgBox.style.transform = "scale(1.1)";
            }
            liveBgBox.style.filter = "blur(10px)";
        } else {
            if (reduceMotion === false) {
                bgbox.style.transform = "scale(1.1)";
            }
            bgbox.style.filter = "blur(10px)";
        }
        navbox.style.display = "block";
        btnUser.style.display = "block";
        btnSettings.style.display = "block";
        if (bgPreference == "Bing") {
            btnLike.style.display = "block";
        }
        document.getElementById("tp-weather-widget").style.opacity = "0.5";
        document.getElementById("tp-weather-widget").style.pointerEvents = "auto";
    } else {
        Navbox_Click(event)
    }
}
function Navbox_Click(event) {
    var obj = event.srcElement;
    if (obj.classList.contains("shouldNotFade") == false) {
        input0.style.opacity = "1";
        if (bgPreference == "Live") {
            if (reduceMotion === false) {
                liveBgBox.style.transform = "";
            }
            liveBgBox.style.filter = "";
        } else {
            if (reduceMotion === false) {
                bgbox.style.transform = "";
            }
            bgbox.style.filter = "";
        }
        navbox.style.opacity = "0";
        btnUser.style.opacity = "0";
        btnSettings.style.opacity = "0";
        btnLike.style.opacity = "0";
        setTimeout(() => {
            navbox.style.display = "none";
            btnUser.style.display = "none";
            btnSettings.style.display = "none";
            btnLike.style.display = "none";
            navbox.style.opacity = "";
            btnUser.style.opacity = "";
            btnSettings.style.opacity = "";
            btnLike.style.opacity = "";
        }, 250);
        document.getElementById("tp-weather-widget").style.opacity = "0";
        document.getElementById("tp-weather-widget").style.pointerEvents = "none";
        if (frmSetCustomNav.style.opacity = "1") {
            closeFrmCusNav();
        }
    }
    //alert(obj.id);
}
function titleHover() {
    title.style.transform = "scale(1.15)";
    setTimeout(() => title.style.transform = "scale(1.1)", 250);
}
function titleHover2() {
    title.style.transform = "scale(0.95)";
    setTimeout(() => title.style.transform = "scale(1)", 250);
}

//检测点击
window.onclick = () => {
    if (menuUser.style.opacity === "1") {
        hideMenu(menuUser);
    }
    if (menuSettings.style.opacity === "1") {
        hideMenu(menuSettings);
    }
    if (menuCusNav.style.opacity === "1") {
        hideMenu(menuCusNav);
    }
    if (menuSearch.style.opacity === "1") {
        hideMenu(menuSearch);
    }
    if (tipBoxCopyPaste.style.opacity === "1") {
        hideMenu(tipBoxCopyPaste);
    }
}
function hideMenu(theMenu) {
    theMenu.style.transform = "scale(0.5)";
    theMenu.style.opacity = "0";
    setTimeout(() => theMenu.style.display = "none", 250);
}

//网站快捷相关
function nbSwitch1_Click() {
    if (navbox1.style.left != "0px") {
        //nbSwitch0_0.classList.remove("current");
        nbSwitch2_0.classList.remove("current");
        nbSwitch1_0.classList.add("current");
        navboxScale0()
        setTimeout(() => {
            //navboxCus.style.left="-100%";
            navbox1.style.left = "0px";
            navbox2.style.left = "100%";
        }, 250);
        setTimeout(() => navboxScale1(), 500);
    }
}
function nbSwitch2_Click() {
    if (navbox2.style.left != "0px") {
        //nbSwitch0_0.classList.remove("current");
        nbSwitch1_0.classList.remove("current");
        nbSwitch2_0.classList.add("current");
        navboxScale0()
        setTimeout(() => {
            //navboxCus.style.left="-100%";
            navbox1.style.left = "-100%";
            navbox2.style.left = "0px";
        }, 250);
        setTimeout(() => navboxScale1(), 500);
    }
}
function navboxScale0() {
    //navboxCus.style.MozTransform="scale(0.9)";
    //navboxCus.style.WebkitTransform="scale(0.9)";
    navbox1.style.transform = "scale(0.9)";
    navbox2.style.transform = "scale(0.9)";
}
function navboxScale1() {
    //navboxCus.style.MozTransform="scale(1)";
    //navboxCus.style.WebkitTransform="scale(1)";
    navbox1.style.transform = "scale(1)";
    navbox2.style.transform = "scale(1)";
}

//时间计数器
function Time() {
    //var vWeek,vWeek_s,vDay;
    //vWeek = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    var date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    //seconds = date.getSeconds();
    //vWeek_s = date.getDay();
    //titleText.innerText = year + "年" + month + "月" + day + "日" + "\t" + hours + ":" + minutes +":" + seconds + "\t" + vWeek[vWeek_s] ;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    titleText.innerText = hours + ":" + minutes;
    currentTime = year + "年" + month + "月" + day + "日 " + hours + ":" + minutes;
}
setInterval(Time, 1000);


//Note
loadNotes();
function loadNotes() {
    if (currentNotes != "0") {
        textNote.style.left = "200px";
        textNote.style.width = "420px";
        noteListWrap.style.left = "0px";
        for (var i = 1; i < Number(maximumNoteNumber) + 1; i++) {
            currentNoteTitle = localStorage.getItem("note" + i);
            currentNoteTime = localStorage.getItem("noteTime" + i);
            if (currentNoteTitle != undefined) {
                var newNoteDiv = document.createElement("div");
                newNoteDiv.className = "noteItem";
                newNoteDiv.classList.add("shouldNotFade");
                newNoteDiv.id = "noteItem" + i;
                newNoteDiv.onclick = function () {
                    openNote(this);
                }
                var newNoteSpan1 = document.createElement("span");
                newNoteSpan1.className = "noteTitle";
                newNoteSpan1.classList.add("shouldNotFade");
                newNoteSpan1.id = "noteTitle" + i;
                var newNoteSpan2 = document.createElement("span");
                newNoteSpan2.className = "noteTime";
                newNoteSpan2.classList.add("shouldNotFade");
                newNoteSpan2.id = "noteTime" + i;
                newNoteDiv.appendChild(newNoteSpan1);
                newNoteDiv.appendChild(newNoteSpan2);
                noteList.appendChild(newNoteDiv);
                document.getElementById("noteTitle" + i).innerText = localStorage.getItem("note" + i);
                document.getElementById("noteTime" + i).innerText = localStorage.getItem("noteTime" + i);
            }
        }
    }
    textNote.value = "";
    pinnedNoteNum = localStorage.getItem("pinnedNoteNum");
    if (pinnedNoteNum != undefined && pinnedNoteNum != "") {
        pinnedNoteContent.innerText = localStorage.getItem("note" + pinnedNoteNum);
        pinnedNoteTime.innerText = localStorage.getItem("noteTime" + pinnedNoteNum);
        showPinnedNote();
    }
}
function newNote() {
    noteToolBar.style.display = "none";
    if (document.getElementById("noteItem" + currentEditingNote) != undefined) {
        document.getElementById("noteItem" + currentEditingNote).classList.remove("current");
    }
    currentNotes = Number(currentNotes) + 1;
    currentEditingNote = Number(noteList.lastElementChild.id.replace("noteItem", "")) + 1;
    currentNoteIsNew = true;
    textNote.value = "";
    textNote.focus();
    currentNotes = Number(currentNotes) - 1;
    currentEditingNote = Number(noteList.lastElementChild.id.replace("noteItem", "")) - 1;
}
function noteChanged() {
    if (textNote.value != "" && noteListWrap.style.left != "0px") {
        textNote.style.left = "200px";
        textNote.style.width = "420px";
        noteListWrap.style.left = "0px";
        noteToolBar.style.display = "block";
    }
    if (textNote.value != "" && currentNoteIsNew == true) {
        currentNotes = Number(currentNotes) + 1;
        currentEditingNote = Number(noteList.lastElementChild.id.replace("noteItem", "")) + 1;
        var newNoteDiv = document.createElement("div");
        newNoteDiv.className = "noteItem";
        newNoteDiv.classList.add("shouldNotFade");
        newNoteDiv.classList.add("current");
        newNoteDiv.id = "noteItem" + currentEditingNote;
        newNoteDiv.onclick = function () {
            openNote(this);
        }
        var newNoteSpan1 = document.createElement("span");
        newNoteSpan1.className = "noteTitle";
        newNoteSpan1.classList.add("shouldNotFade");
        newNoteSpan1.id = "noteTitle" + currentEditingNote;
        var newNoteSpan2 = document.createElement("span");
        newNoteSpan2.className = "noteTime";
        newNoteSpan2.classList.add("shouldNotFade");
        newNoteSpan2.id = "noteTime" + currentEditingNote;
        newNoteDiv.appendChild(newNoteSpan1);
        newNoteDiv.appendChild(newNoteSpan2);
        noteList.appendChild(newNoteDiv);
        noteList.scrollTop = noteList.clientHeight;
        localStorage.setItem("currentNotes", currentNotes);
        localStorage.setItem("maximumNoteNumber", currentEditingNote);
        noteToolBar.style.display = "block";
        currentNoteIsNew = false;
    }
    if (textNote.value == "" && currentNotes == "1" && noteListWrap.style.left == "0px") {
        textNote.style.left = "0px";
        textNote.style.width = "620px";
        noteListWrap.style.left = "-200px";
        noteToolBar.style.display = "none";
    }
    if (textNote.value == "") {
        noteList.removeChild(document.getElementById("noteItem" + currentEditingNote));
        currentNotes = Number(currentNotes) - 1;
        currentNoteIsNew = true;
        localStorage.setItem("currentNotes", currentNotes);
        localStorage.setItem("maximumNoteNumber", Number(noteList.lastElementChild.id.replace("noteItem", "")));
        noteToolBar.style.display = "none";
    }
    if (document.getElementById("noteTitle" + currentEditingNote) != undefined) {
        document.getElementById("noteTitle" + currentEditingNote).innerText = textNote.value;
        document.getElementById("noteTime" + currentEditingNote).innerText = currentTime;
    }
    if (currentEditingNote == pinnedNoteNum) {
        pinnedNoteContent.innerText = textNote.value;
        pinnedNoteTime.innerText = currentTime;
    }
    if (currentEditingNote == pinnedNoteNum && textNote.value == "") {
        unpinNote();
    }
}
function openNote(obj) {
    if (document.getElementById("noteItem" + currentEditingNote) != undefined) {
        document.getElementById("noteItem" + currentEditingNote).classList.remove("current");
    }
    currentNoteIsNew = false;
    currentEditingNote = obj.id.replace("noteItem", "");
    textNote.value = localStorage.getItem("note" + currentEditingNote);
    noteToolBar.style.display = "block";
    document.getElementById("noteItem" + currentEditingNote).classList.add("current");
}
function saveNote() {
    noteChanged();
    if (textNote.value != "") {
        localStorage.setItem("note" + currentEditingNote, textNote.value);
        localStorage.setItem("noteTime" + currentEditingNote, currentTime);
    } else {
        localStorage.removeItem("note" + currentEditingNote);
        localStorage.removeItem("noteTime" + currentEditingNote);
    }
}
function delNote() {
    if (confirm("删除这条便笺？")) {
        textNote.value = "";
        saveNote();
    }
}
function pinNote() {
    pinnedNoteContent.innerText = textNote.value;
    pinnedNoteTime.innerText = document.getElementById("noteTime" + currentEditingNote).innerText;
    pinnedNoteNum = currentEditingNote;
    localStorage.setItem("pinnedNoteNum", currentEditingNote);
    showPinnedNote();
}
function showPinnedNote() {
    pinnedBox.style.display = "block";
    setTimeout(() => {
        pinnedBox.style.opacity = "1";
        pinnedBox.style.transform = "scale(1.05)";
    }, 100);
    setTimeout(() => pinnedBox.style.transform = "scale(1)", 350);
}
function unpinNote() {
    pinnedNoteNum = "";
    localStorage.setItem("pinnedNoteNum", "");
    pinnedBox.style.transform = "scale(1.05)";
    setTimeout(() => {
        pinnedBox.style.transform = "scale(0.5)";
        pinnedBox.style.opacity = "0";
    }, 250);
    setTimeout(() => pinnedBox.style.display = "none", 500);
}
function pinnedNoteClick() {
    pinnedNoteNum = localStorage.getItem("pinnedNoteNum");
    openNote(document.getElementById("noteItem" + pinnedNoteNum));
    if (navbox.style.display != "block") {
        Title_Click();
    }
    nbSwitch2_Click();
}
function pinnedNoteHover(ev, obj) {
    if (topNotificationBar.style.top != "0px") {
        m_clientX = ev.clientX - obj.offsetLeft;
        m_clientY = ev.clientY - obj.offsetTop;
        pinnedNoteW = window.getComputedStyle(obj).width.replace("px", "");
        pinnedNoteH = window.getComputedStyle(obj).height.replace("px", "");
        if (m_clientX < pinnedNoteW * 0.3 && m_clientY < pinnedNoteH * 0.3) {
            obj.style.transform = "rotateX(10deg) rotateY(-5deg)";
        }
        if (m_clientX > pinnedNoteW * 0.3 && m_clientX < pinnedNoteW * 0.7 && m_clientY < pinnedNoteH * 0.3) {
            obj.style.transform = "rotateX(10deg)";
        }
        if (m_clientX > pinnedNoteW * 0.7 && m_clientY < pinnedNoteH * 0.3) {
            obj.style.transform = "rotateX(10deg) rotateY(5deg)";
        }
        if (m_clientX < pinnedNoteW * 0.3 && m_clientY > pinnedNoteH * 0.3 && m_clientY < pinnedNoteH * 0.7) {
            obj.style.transform = "rotateY(-5deg)";
        }
        if (m_clientX > pinnedNoteW * 0.3 && m_clientX < pinnedNoteW * 0.7 && m_clientY > pinnedNoteH * 0.3 && m_clientY < pinnedNoteH * 0.7) {
            obj.style.transform = "rotate3d(0,0,0,0deg)";
        }
        if (m_clientX > pinnedNoteW * 0.7 && m_clientY > pinnedNoteH * 0.3 && m_clientY < pinnedNoteH * 0.7) {
            obj.style.transform = "rotateY(5deg)";
        }
        if (m_clientX < pinnedNoteW * 0.3 && m_clientY > pinnedNoteH * 0.7) {
            obj.style.transform = "rotateX(-10deg) rotateY(-5deg)";
        }
        if (m_clientX > pinnedNoteW * 0.3 && m_clientX < pinnedNoteW * 0.7 && m_clientY > pinnedNoteH * 0.7) {
            obj.style.transform = "rotateX(-10deg)";
        }
        if (m_clientX > pinnedNoteW * 0.7 && m_clientY > pinnedNoteH * 0.7) {
            obj.style.transform = "rotateX(-10deg) rotateY(5deg)";
        }
    }
    btnUnpin.style.opacity = "1";
}
function pinnedNoteHover2(obj) {
    obj.style.transform = "rotate3d(0,0,0,0deg)";
    btnUnpin.style.opacity = "0";
}

//用户和设置

function btnUserClick() {
    if (isLoggedIn()) {
        if (menuUser.style.opacity === "1") {
            hideMenu(menuUser);
        } else {
            showMenu(menuUser);
        }
    }
}
function btnSettingsClick() {
    if (menuSettings.style.opacity === "1") {
        hideMenu(menuSettings);
    } else {
        showMenu(menuSettings);
    }
}
function showPop(thePopUp) {
    cover1.style.display = "block";
    thePopUp.style.display = "block";
    if (reduceMotion === false) {
        setTimeout(() => {
            cover1.style.opacity = "1";
            thePopUp.style.opacity = "1";
            thePopUp.classList.add("showPop");
            setTimeout(() => {
                thePopUp.style.transform = "rotate3d(0,0,0,0deg)";
                thePopUp.classList.remove("showPop");
            }, 350);
        }, 100);
    } else {
        cover1.style.opacity = "1";
        thePopUp.style.transition = "all 0s";
        thePopUp.style.transform = "rotate3d(0,0,0,0deg)";
        thePopUp.style.transition = "all 0.25s";
        setTimeout(() => thePopUp.style.opacity = "1", 25);
    }
}
//设置,关闭
function btnCloseHover(obj) {
    if (reduceMotion === false) {
        thePopUp = obj.parentNode;
        thePopUp.style.transform = "rotate3d(1,1,0,5deg)";
    }
}
function btnCloseHover2() {
    if (reduceMotion === false) {
        if (popUpClosing == false) {
            thePopUp.style.transform = "rotate3d(0,0,0,0deg)";
        }
    }
}
function closePop(obj) {
    popUpClosing = true;
    //obj.style.display="none";
    //thePopUp=obj.parentNode;
    cover1.style.opacity = "0";
    obj.style.opacity = "0";
    if (reduceMotion === false) {
        obj.style.transform = "rotate3d(1,1,0,20deg)";
    }
    setTimeout(() => {
        cover1.style.display = "none";
        obj.style.display = "none";
        if (reduceMotion === false) {
            obj.style.transform = "rotate3d(1,1,0,90deg)";
        }
        popUpClosing = false;
    }, 350);
}

//常规设置，增强
function setReduceMotion() {
    if (chkReduceMotion.checked == true) {
        reduceMotion = false;
        localStorage.setItem("reduceMotion", "off");
    } else {
        reduceMotion = true;
        localStorage.setItem("reduceMotion", "on");
    }
}

//背景设置
function changeWp(obj) {
    switch (obj.id) {   //(obj.value)
        case 'bgPreBoxCus':
            if (cusWallpaper) {
                liveBgBox.style.display = "none";
                liveBgBox.pause();
                bgbox.src = cusWallpaper;
                bgbox.style.opacity = "1";
                bgPreBoxInCus.classList.add("selected");
                bgPreBoxIn1.classList.remove("selected");
                bgPreBoxIn2.classList.remove("selected");
                bgPreBoxIn3.classList.remove("selected");
                bgPreBoxInBing.classList.remove("selected");
                bgPreBoxInLive.classList.remove("selected");
                localStorage.setItem("bgPreference", "Custom");
                bgPreference = "Custom";
            }
            break;
        case 'bgPreBoxD1':
            //document.body.style.backgroundImage = "url(images/BG_A_Default_1.jpg)";
            liveBgBox.style.display = "none";
            liveBgBox.pause();
            bgbox.src = "https://cdn.jsdelivr.net/gh/MobiusBeta/assets/images/BG_A_Default_1.jpg";
            bgbox.style.opacity = "1";
            bgPreBoxInCus.classList.remove("selected");
            bgPreBoxIn1.classList.add("selected");
            bgPreBoxIn2.classList.remove("selected");
            bgPreBoxIn3.classList.remove("selected");
            bgPreBoxInBing.classList.remove("selected");
            bgPreBoxInLive.classList.remove("selected");
            localStorage.setItem("bgPreference", "Default");
            bgPreference = "Default";
            break;
        case 'bgPreBoxD2':
            liveBgBox.style.display = "none";
            liveBgBox.pause();
            bgbox.src = "https://cdn.jsdelivr.net/gh/MobiusBeta/assets/images/BG_A_Default_2.jpg";
            bgbox.style.opacity = "1";
            bgPreBoxInCus.classList.remove("selected");
            bgPreBoxIn2.classList.add("selected");
            bgPreBoxIn1.classList.remove("selected");
            bgPreBoxIn3.classList.remove("selected");
            bgPreBoxInBing.classList.remove("selected");
            bgPreBoxInLive.classList.remove("selected");
            localStorage.setItem("bgPreference", "Default2");
            bgPreference = "Default2";
            break;
        case 'bgPreBoxD3':
            liveBgBox.style.display = "none";
            liveBgBox.pause();
            bgbox.src = "https://cdn.jsdelivr.net/gh/MobiusBeta/assets/images/BG_A_Default_3.jpg";
            bgbox.style.opacity = "1";
            bgPreBoxInCus.classList.remove("selected");
            bgPreBoxIn3.classList.add("selected");
            bgPreBoxIn1.classList.remove("selected");
            bgPreBoxIn2.classList.remove("selected");
            bgPreBoxInBing.classList.remove("selected");
            bgPreBoxInLive.classList.remove("selected");
            localStorage.setItem("bgPreference", "Default3");
            bgPreference = "Default3";
            break;
        case 'bgPreBoxBing':
            liveBgBox.style.display = "none";
            liveBgBox.pause();
            bgbox.src = bingWallpaper;
            bgbox.style.opacity = "1";
            bgPreBoxInCus.classList.remove("selected");
            bgPreBoxIn1.classList.remove("selected");
            bgPreBoxIn2.classList.remove("selected");
            bgPreBoxIn3.classList.remove("selected");
            bgPreBoxInBing.classList.add("selected");
            bgPreBoxInLive.classList.remove("selected");
            localStorage.setItem("bgPreference", "Bing");
            bgPreference = "Bing";
            break;
        case 'bgPreBoxLive':
            liveBgBox.src = "https://cdn.jsdelivr.net/gh/MobiusBeta/assets/videos/Live_Wallpaper_1.mp4";
            liveBgBox.style.display = "block";
            liveBgBox.play();
            setTimeout(() => liveBgBox.style.opacity = "1", 50);
            bgbox.style.opacity = "0";
            bgPreBoxInCus.classList.remove("selected");
            bgPreBoxIn1.classList.remove("selected");
            bgPreBoxIn2.classList.remove("selected");
            bgPreBoxIn3.classList.remove("selected");
            bgPreBoxInBing.classList.remove("selected");
            bgPreBoxInLive.classList.add("selected");
            localStorage.setItem("bgPreference", "Live");
            bgPreference = "Live";
            break;
    }
}



//添加快捷网站
function addCusNav() {
    // if (isLoggedIn()) {
    if (inputCustomUrl.value) {
        window.cusNavIconUrl = inputCustomUrl.value;
        if (!cusNavIconUrl.startsWith("http")) {
            cusNavIconUrl = "https://" + cusNavIconUrl;
        }
        cusNavIconUrl = new URL(cusNavIconUrl);
        cusNavIconUrl = cusNavIconUrl.protocol + "//" + cusNavIconUrl.host + "/favicon.ico";
        currentEditingNav.innerHTML = `
        <img class="cusNavIcon shouldNotFade" src="`+ cusNavIconUrl + `" onerror="addCusNav2(this)" onload="addCusNav3(this);submitCusNav();"/>
        <div class="cusNavTitle shouldNotFade">`+ inputCustomTitle.value + `</div>`;
        currentEditingNav.classList.add("added");
        closeFrmCusNav();
    }
    // }
}
function addCusNav2(obj) {
    cusNavIconErrCount = cusNavIconErrCount + 1;
    if (cusNavIconErrCount == 1) {
        cusNavIconUrl = new URL(cusNavIconUrl).host;
        cusNavIconUrl = "https://statics.dnspod.cn/proxy_favicon/_/favicon?domain=" + cusNavIconUrl;
        obj.src = cusNavIconUrl;
    } else {
        addCusNav3(obj);
    }
}
function addCusNav3(obj) {
    if (obj.naturalWidth < 17) {
        cusUrlInitial = new URL(cusNavIconUrl).searchParams.get("domain");
        if(cusUrlInitial != undefined){
            cusUrlInitial = cusUrlInitial.substring(0, 1).toUpperCase();
        }else{
            cusUrlInitial = new URL(cusNavIconUrl).host;
            if(cusUrlInitial.indexOf("www.")==0){
                cusUrlInitial = cusUrlInitial.substring(4);
            }
            cusUrlInitial = cusUrlInitial.substring(0, 1).toUpperCase();
        }
        cusNavIconUrl = "https://iph.href.lu/128x128?bg=333&fg=70BF00&text=" + cusUrlInitial;
        obj.src = cusNavIconUrl;
        obj.classList.add("round");
        cusNavIconErrCount = 0;
    }
    //submitCusNav();
}
function cusNavClick(event, obj) {
    if (currentEditingNav != obj) {
        currentEditingNav = obj;
        frmSetCustomNav.style.left = event.clientX - 150 + "px";
        frmSetCustomNav.style.top = event.clientY - 180 + "px";
        frmSetCustomNav.style.display = "block";
        setTimeout(() => {
            frmSetCustomNav.style.opacity = "1";
            frmSetCustomNav.style.transform = "scale(1.05)";
        }, 50);
        setTimeout(() => frmSetCustomNav.style.transform = "scale(1)", 300);
    } else {
        closeFrmCusNav();
        currentEditingNav = "";
    }
}
function iptCusNavKeyDown(event) {
    if (event.keyCode == 13) {
        addCusNav();
    }
}
function closeFrmCusNav() {
    frmSetCustomNav.style.transform = "scale(1.05)";
    setTimeout(() => frmSetCustomNav.style.opacity = "0", 150);
    setTimeout(() => frmSetCustomNav.style.transform = "scale(0.5)", 200);
    setTimeout(() => frmSetCustomNav.style.display = "none", 400);
}
function delCusNav() {
    fetch(backend + "cusNav", getPostData({
        action: "delCusNav",
        rthUsername: login.username,
        delIndex: currentDeletingNav
    })).then(response => {
        if (response.ok) {
            getCusNav();
        }
    });
}

if (isMobile) {
    form0.action = "https://m.baidu.com/s";
    bgbox.style.backgroundSize = "auto 100%";
    bgbox.style.backgroundPosition = "center";
}
//图片加载
bgbox.onload = () => {
    bgbox.style.display = "block";
    setTimeout(() => bgbox.style.opacity = "1", 50);
}


//
// function loadCusNavSlots() {
//     fetch(backend + "cusNav", getPostData({
//         action: "loadCusNavSlots"
//     })).then(response => {
//         if (response.ok) {
//             return response.text();
//         }
//     }).then(data => {
//         if (data) {
//             navboxCustom.innerHTML = data;
//         }
//     });
// }
// loadCusNavSlots();
// function getPostData(data) {
//     const formData = new FormData();
//     for (const key in data) {
//         data[key] && formData.append(key, data[key]);
//     }
//     return {
//         body: formData,
//         method: "POST"
//     };
// }

//天气
window["ThinkPageWeatherWidgetObject"] = "tpwidget";
window["tpwidget"] || (window["tpwidget"] = function () { (window["tpwidget"].q = window["tpwidget"].q || []).push(arguments) });
window["tpwidget"].l = +new Date();
tpwidget("init", JSON.parse(atob("eyJmbGF2b3IiOiJzbGltIiwibG9jYXRpb24iOiJXUzdHUUJSTlI2VjgiLCJnZW9sb2NhdGlvbiI6ImVuYWJsZWQiLCJsYW5ndWFnZSI6ImF1dG8iLCJ1bml0IjoiYyIsInRoZW1lIjoiY2hhbWVsZW9uIiwiY29udGFpbmVyIjoidHAtd2VhdGhlci13aWRnZXQiLCJidWJibGUiOiJlbmFibGVkIiwiYWxhcm1UeXBlIjoiYmFkZ2UiLCJjb2xvciI6IiNGRkZGRkYiLCJ1aWQiOiJVRTE3RDRDOTkxIiwiaGFzaCI6IjEwNWJmNmE3ZjYxZjQ3NDk1ZjNiYjU2OTNlYmUzNmRlIn0=")));
tpwidget("show");
