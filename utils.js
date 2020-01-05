"use strict";

export function clearDiv(div) {
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
}

export const taxiDist = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

export class GameObject {
    constructor(x, y, board) {
        this._x = x;
        this._y = y;
        this._inDiv = document.createElement("div");
        this._outDiv = document.createElement("div");

        this._outDiv.classList.add("game-obj");
        this._outDiv.style.setProperty("grid-area", `${this._y} / ${this._x}`);
        this._outDiv.appendChild(this._inDiv);
        if (board) board.appendChild(this._outDiv);
    }
    get x() {return this._x}
    get y() {return this._y}
}

export class Hero extends GameObject {
    constructor(x, y, board) {
        super(x, y, board);
        this._inDiv.setAttribute("id", "hero");
    }
    move(x, y) {
        this._x = x;
        this._y = y;
        this._outDiv.style.setProperty("grid-area", `${y} / ${x}`);
    }
}

function SomeClass(field1, field2, field3) {
    this.field1 = field1;
    this.field2 = field2;
    this.nonSecretField = field3;
    this.method1 = function(param1) {
        //DO STH
    }
}
// var someObject = new SomeClass(1, 2, "pupa");

class SomeClassN {
    constructor(field1, field2, field3) {
        this._field1 = field1;
        this._field2 = field2;
        this.secretField = field3;
    }
    get field1() {return this._field1}
    get field2() {return this._field2}
    get nonSecretField() {return this.secretField}
    set nonSecretField(field4) {this.secretField = field4}
    method1(param1) {
        //Do STH
    }
}