class Sort {

    constructor() {
        this._pressed = null;
    }

    sorting(event) {
        if (event.target.className != "sort-symbol")
            return;
        if (this._pressed == null) {
            this._pressed = [].fill(false,0,event.target.parentElement.parentElement.children.length);
        }
        let press = event.currentTarget.firstElementChild.children;
        let numberOfColumn;
        for (let i = 0; i < press.length; ++i) {
            if (press[i].isEqualNode(event.target.parentElement)) {
                numberOfColumn = i;
                break;
            }
        }
        let tableBody = event.currentTarget.parentElement.getElementsByTagName('tbody')[0];
        let array = [].slice.call(tableBody.children);
        let sortfn;
        switch (event.target.parentElement.getAttribute("data-type")) {
            case "number":
                sortfn = (left, right) => {
                        let NaNNumber = (!this._pressed[numberOfColumn]) ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
                    let leftValue = parseFloat(left.children[numberOfColumn].innerHTML);
                    let rightValue = parseFloat(right.children[numberOfColumn].innerHTML);
                    if (isNaN(leftValue))
                        return 1;
                    if (isNaN(rightValue))
                        return -1;
                    let result = leftValue - rightValue;
                    if (!this._pressed[numberOfColumn])
                        result *= -1;
                    return result;
                }
                break;
            case "reverse":
                sortfn = (left, right) => {
                    let leftValue = left.children[numberOfColumn].innerHTML;
                    let rightValue = right.children[numberOfColumn].innerHTML;
                    if (!leftValue)
                        return 1;
                    if (!rightValue)
                        return -1;
                    let result = leftValue.localeCompare(rightValue);
                    if (!this._pressed[numberOfColumn])
                        result *= -1;
                    return -result;
                }
                break;
            case "string":
            default:
                sortfn = (left, right) => {
                    let leftValue = left.children[numberOfColumn].innerHTML;
                    let rightValue = right.children[numberOfColumn].innerHTML;
                    if (!leftValue)
                        return 1;
                    if (!rightValue)
                        return -1;
                    let result = leftValue.localeCompare(rightValue);
                    if (!this._pressed[numberOfColumn])
                        result *= -1;
                    return result;
                }
                break;
        }
        this._pressed[numberOfColumn] = !this._pressed[numberOfColumn];
        array.sort(sortfn);
        [].forEach.call(tableBody.children, (el) => {
            tableBody.removeChild(el);
        });
        for (let i = 0; i < array.length; ++i) {
            tableBody.appendChild(array[i]);
        }
    }
}

var sort = new Sort().sorting.bind(this);