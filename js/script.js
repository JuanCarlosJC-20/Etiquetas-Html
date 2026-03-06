const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

// suelo
ctx.strokeStyle = "#00ff99";
ctx.beginPath();
ctx.moveTo(0, 100);
ctx.lineTo(250, 100);
ctx.stroke();

// casa (cuadrado)
ctx.fillStyle = "#ff6b6b";
ctx.fillRect(100, 60, 50, 40);

// techo
ctx.fillStyle = "#ffd166";
ctx.beginPath();
ctx.moveTo(100, 60);
ctx.lineTo(125, 40);
ctx.lineTo(150, 60);
ctx.closePath();
ctx.fill();

// sol
ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(40, 30, 15, 0, Math.PI * 2);
ctx.fill();