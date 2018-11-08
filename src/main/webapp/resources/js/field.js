const width = 270;
const hight = 270;
const r = 45;
const extraValue = 90;

function canvasSubmit(event) {
    formSubmit({
        "param-x": $("#param-x").val(),
        "param-y": $("#param-y").val(),
        "param-r": $("#param-r").val()
    });
    document.getElementById("form").submit();
}

function drawPoints() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width + extraValue, hight + extraValue);

    ctx.fillStyle = "#03899C";
    ctx.beginPath();
    ctx.moveTo(width / 2, hight / 2);
    ctx.lineTo(width / 2, hight / 2 + r / 2);
    ctx.arc(width / 2, hight / 2, r / 2, Math.PI / 2, Math.PI, false);
    ctx.lineTo(width / 2 - r / 2, hight / 2 - r);
    ctx.lineTo(width / 2, hight / 2 - r);
    ctx.lineTo(width / 2, hight / 2 - r / 2);
    ctx.lineTo(width / 2 + r / 2, hight / 2);
    ctx.lineTo(width / 2, hight / 2);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#FFAE00";
    let values = $("#result-table td").toArray();
    for (let i = 0; i < values.length / 4; ++i) {
        ctx.beginPath();
        ctx.arc(values[i * 4].innerText * r / values[i * 4 + 2].innerText + width / 2, -values[i * 4 + 1].innerText * r / values[i * 4 + 2].innerText + hight / 2, 2, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
    }

    drawBase(ctx);
}

function drawBase(ctx) {

    ctx.beginPath();
    ctx.moveTo(0, hight / 2);
    ctx.lineTo(width + extraValue, hight / 2);
    ctx.lineTo(width - 10 + extraValue, hight / 2 - 5);
    ctx.moveTo(width + extraValue, hight / 2);
    ctx.lineTo(width - 10 + extraValue, hight / 2 + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, hight + extraValue);
    ctx.lineTo(width / 2, 0);
    ctx.lineTo(width / 2 - 5, 10);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 + 5, 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 + r, hight / 2 - 5);
    ctx.lineTo(width / 2 + r, hight / 2 + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - r, hight / 2 - 5);
    ctx.lineTo(width / 2 - r, hight / 2 + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - 5, hight / 2 + r);
    ctx.lineTo(width / 2 + 5, hight / 2 + r);
    ctx.stroke();

    ctx.fillStyle = "#03899C";
    ctx.font = "10px Arial";
    ctx.fillText("X", width - 10 + extraValue, hight / 2 - 15);
    ctx.fillText("Y", width / 2 - 18, 12);
    ctx.fillText("R", width / 2 + r - 5, hight / 2 + 15);
    ctx.fillText("R", width / 2 + 4, hight / 2 - r + 5);
    ctx.fillText("-R", width / 2 - r - 5, hight / 2 + 15);
    ctx.fillText("-R", width / 2 + 4, hight / 2 + r + 5);
    ctx.fillText("R/2", width / 2 + r / 2 - 5, hight / 2 + 15);
    ctx.fillText("R/2", width / 2 + 6, hight / 2 - r / 2 + 5);
    ctx.fillText("-R/2", width / 2 - r / 2 - 20, hight / 2 - 5);
    ctx.fillText("-R/2", width / 2 + 4, hight / 2 + r / 2 + 5);
}

$(() => {
    drawPoints();
    $("#result-table tr").mouseover((event) => {
        if (event.currentTarget.id == "table-header")
            return;
        event.currentTarget.style.backgroundColor = "#5FB0CF"; //#5FC0CE - #FFF
        let values = $(event.currentTarget).find("td").toArray();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(values[0].innerText * r / values[2].innerText + width / 2, -values[1].innerText * r / values[2].innerText + hight / 2, 2, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
    }).mouseout((event) => {
        if (event.currentTarget.id == "table-header")
            return;
        event.currentTarget.style.backgroundColor = null;
        let values = $(event.currentTarget).find("td").toArray();
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFAE00";
        ctx.beginPath();
        ctx.arc(values[0].innerText * r / values[2].innerText + width / 2, -values[1].innerText * r / values[2].innerText + hight / 2, 2, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
        drawPoints();
    });
});