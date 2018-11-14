const width = 400;
const hight = 400;
const r = 45;
const extraValue = 0;

function canvasSubmit(event) {
    let rect = $("#canvas")[0].getBoundingClientRect();
    let paramR = $("input[name$='param-r']").val();
    let x = (event.clientX - rect.left - width / 2) / getCustomR() * paramR;
    let y = (hight / 2 - (event.clientY - rect.top)) / getCustomR() * paramR;
    if (x < -4)
        x = -5; //magic value for validation failed
    if(x > 4)
        x = 5; //magic value for validation failed
    x = (Math.round(x*2)*1.)/2;
    $("input[name*='param-x']").val(x);
    $("input[name$='param-y']").val(y);
    formSubmit();
}

function getCustomR() {
    let result = $('input[name$="param-r"]').val().replace(",", ".") * r;
    if (isNaN(result) || result < r || result > r * 4)
        return r;
    else
        return result;
}

function drawPoints() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let customR = getCustomR();

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width + extraValue, hight + extraValue);

    ctx.fillStyle = "#03899C";
    ctx.beginPath();
    ctx.moveTo(width / 2, hight / 2);
    ctx.lineTo(width / 2 - customR / 2, hight / 2);
    ctx.lineTo(width / 2 - customR / 2, hight / 2 - customR);
    ctx.lineTo(width / 2, hight / 2 - customR);
    ctx.lineTo(width / 2, hight / 2 - customR / 2);
    ctx.lineTo(width / 2 + customR, hight / 2);
    ctx.lineTo(width / 2 + customR / 2, hight / 2);
    ctx.arc(width / 2, hight / 2, customR / 2, 0, Math.PI / 2, false);
    ctx.lineTo(width / 2, hight / 2);
    ctx.stroke();
    ctx.fill();

    let allPointExist = true;

    let values = $("#result-table td").toArray();
    if (values.length > 3)
        for (let i = 0; i < values.length / 4; ++i) {
            allPointExist &= drawPoint(ctx,
                values[i * 4].innerText,
                values[i * 4 + 1].innerText,
                values[i * 4 + 2].innerText,
                !values[i * 4 + 3].innerText.includes("нет"));
        }

    if (!allPointExist)
        drawWarningMessage(ctx, "Не все точки будут отображены!", "#dc9100");

    drawBase(ctx, customR);
}

function drawPoint(ctx, x, y, r, match, color) {
    if (color)
        ctx.fillStyle = color;
    else if (!match)
        ctx.fillStyle = "#FFAE00";
    else
        ctx.fillStyle = "#00D300";
    let customR = getCustomR();
    let pointX = x * customR / r + width / 2;
    let pointY = -y * customR / r + hight / 2;
    if (pointX < 0 || pointY < 0 || pointX > width || pointY > hight)
        return false;
    else {
        ctx.beginPath();
        ctx.arc(pointX, pointY, 2, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
    }
    return true;
}

function drawWarningMessage(ctx, message, color) {
    ctx.fillStyle = color;
    ctx.font = "10px Arial";
    ctx.fillText(message, 0, hight);
}

function drawBase(ctx, customR) {

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
    ctx.moveTo(width / 2 + customR, hight / 2 - 5);
    ctx.lineTo(width / 2 + customR, hight / 2 + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - customR, hight / 2 - 5);
    ctx.lineTo(width / 2 - customR, hight / 2 + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - 5, hight / 2 + customR);
    ctx.lineTo(width / 2 + 5, hight / 2 + customR);
    ctx.stroke();

    ctx.fillStyle = "#03899C";
    ctx.font = "10px Arial";
    ctx.fillText("X", width - 10 + extraValue, hight / 2 - 15);
    ctx.fillText("Y", width / 2 - 18, 12);
    ctx.fillText("R", width / 2 + customR - 5, hight / 2 + 15);
    ctx.fillText("R", width / 2 + 4, hight / 2 - customR + 5);
    ctx.fillText("-R", width / 2 - customR - 5, hight / 2 + 15);
    ctx.fillText("-R", width / 2 + 4, hight / 2 + customR + 5);
    ctx.fillText("R/2", width / 2 + customR / 2, hight / 2 + 15); //
    ctx.fillText("R/2", width / 2 + 6, hight / 2 - customR / 2 + 2);
    ctx.fillText("-R/2", width / 2 - customR / 2 - 20, hight / 2 - 5);
    ctx.fillText("-R/2", width / 2 + 4, hight / 2 + customR / 2 + 9); //
}

$(() => {
    drawPoints();
    setListeners();
});

function setListeners() {
    $(document).on("mouseover", "#result-table tr", (event) => {
        let values = $(event.currentTarget).find("td").toArray();
        if (values.length < 4)
            return;
        event.currentTarget.style.backgroundColor = "#5FB0CF"; //#5FC0CE - #FFF
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        if (!drawPoint(ctx,
            values[0].innerText,
            values[1].innerText,
            values[2].innerText,
            !values[3].innerText.includes("нет"),
            "red"))
            drawWarningMessage(ctx, "Не все точки будут отображены!", "red");
    });
    $(document).on("mouseout", "#result-table tr", (event) => {
        event.currentTarget.style.backgroundColor = null;
        drawPoints();
    });
    $(document).on("click", "#result-table thead", (event) => {
        sort(event);
    });
    $(document).on("change paste keyup", "input[name$='param-r']", (event) => {
        drawPoints();
    });
}