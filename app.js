const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".controls_color");
const range = document.querySelector(".controls_range");
const mode = document.querySelector(".mode");
const save = document.querySelector(".save");
const clear = document.querySelector(".clear");

const INITIAL_COLOR = "#2c2c2c"

let painting = false;
let filling = false;

canvas.width = 700;
canvas.height = 700;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y)
        ctx.stroke();
    }
}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    const lineWidth = event.target.value;
    ctx.lineWidth = lineWidth;
}
function handleModeClick(event){
    if(filling){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleClearClick(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}
function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function handleContextmenu(event){
    event.preventDefault();
}
function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextmenu)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(save){
    save.addEventListener("click", handleSaveClick)
}
if(clear){
    clear.addEventListener("click", handleClearClick);
}