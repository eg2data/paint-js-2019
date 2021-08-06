const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 100, 40);

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function handleColorClick(event) {
    console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    console.log(event);
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    console.log(event);
    if(filling === true) {
        filling = false;
        mode.innerText = "FIll"
    } else {
        filling = true;
        mode.innerText = "paINt"
    }
}

function handleCanvasClick(event) {
    if(filling) {
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event) {
    console.log(event);
    event.preventDefault();
}

function handleSaveClick(event) {
    const image = canvas.toDataURL();
    console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[EXPORT]";
    console.log(link);
    link.click();    
}

function onMouseMove(event) {
    console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x, y);
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors) {
    console.log(Array.from(colors));
    Array.from(colors).forEach(color => 
        color.addEventListener("click", handleColorClick)
    );
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}