// CORPUS.length == 22
const CORPUS = [
    "哈基米",
    "哦那咩鲁拖",
    "啊西嘎",
    "哈呀库",
    "那录",
    "曼波",
    "哦马磁力",
    "老吴",
    "咪",
    "哈",
    "叮咚鸡",
    "大狗叫",
    "袋鼠鸡",
    "好胖好可爱",
    "小白手套",
    "AUV",
    "离离原上咪",
    "一岁一咪咪",
    "野火哈基咪",
    "春风吹又咪",
    "哎呦我滴妈",
    "胖宝宝",
];
const base22Digits = "0123456789abcdefghijkl".split("");

function createCorpusMap() {
    const map = {};
    for (let i = 0; i < CORPUS.length; i++) {
        map[CORPUS[i]] = base22Digits[i];
    }
    return map;
}

function createReverseCorpusMap() {
    const map = {};
    for (let i = 0; i < CORPUS.length; i++) {
        map[base22Digits[i]] = CORPUS[i];
    }
    return map;
}

const corpusMap = createCorpusMap();
const reverseCorpusMap = createReverseCorpusMap();

function textToBase22List(text) {
    const base22List = [];
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        base22List.push(charCode.toString(22));
    }
    return base22List;
}

function base22ListToText(base22List) {
    let text = "";
    for (let i = 0; i < base22List.length; i++) {
        const charCode = parseInt(base22List[i], 22);
        text += String.fromCharCode(charCode);
    }
    return text;
}

function encrypt(text) {
    const base64 = btoa(encodeURIComponent(text));
    const base22List = textToBase22List(base64);

    const encryptedWords = base22List
        .join("")
        .split("")
        .map((i) => reverseCorpusMap[i]);

    return encryptedWords.join("\u200B");
}

function decrypt(cipherText) {
    const words = cipherText.split("\u200B");

    const base22List = [];
    for (let i = 0; i < words.length; i += 2) {
        base22List.push(corpusMap[words[i]] + corpusMap[words[i + 1]]);
    }

    const base64 = base22ListToText(base22List);

    try {
        return decodeURIComponent(atob(base64));
    } catch (e) {
        console.error("解密失败:", e);
        return "";
    }
}

// 添加事件监听器
document.getElementById("encryptBtn").addEventListener("click", () => {
    const inputText = document.getElementById("inputText").value;
    if (inputText.trim() === "") {
        alert("请输入要加密的文本");
        return;
    }
    const encryptedText = encrypt(inputText);
    document.getElementById("outputText").value = encryptedText;
});

document.getElementById("decryptBtn").addEventListener("click", () => {
    const inputText = document.getElementById("inputText").value;
    if (inputText.trim() === "") {
        alert("请输入要解密的文本");
        return;
    }
    try {
        const decryptedText = decrypt(inputText);
        document.getElementById("outputText").value = decryptedText;
    } catch (e) {
        alert("解密失败，请检查输入的密文是否正确");
        console.error(e);
    }
});

document.getElementById("copyBtn").addEventListener("click", () => {
    const outputText = document.getElementById("outputText");
    outputText.select();
    document.execCommand("copy");
    alert("已复制到剪贴板");
});

document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
});
