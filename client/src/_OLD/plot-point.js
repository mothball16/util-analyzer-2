import { gameToAppAxis } from "../util/plot-utils";

export class PlotPoint {
    constructor(x, y, size, map) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.map = map;
        this.element = null;
    }

    render(container){
        if (!this.element) {
            this.element = document.createElement("div");
            this.element.className = "plot-point";
        }

        this.element.style.top = `${gameToAppAxis(this.map, this.y, "y")}%`;
        this.element.style.left = `${gameToAppAxis(this.map, this.x, "x")}%`;
        this.element.style.width = `${this.size}rem`;
        this.element.style.height = `${this.size}rem`;
        console.log(`$orig: (${this.x}, ${this.y}), new: (${this.element.style.left}, ${this.element.style.top})`);
        // appendchild will move the element anyways - can only be one
        container.appendChild(this.element);
    }


    show() {
        this.element.classList.remove('hidden');
    }

    hide() {
        this.element.classList.add('hidden');
    }
}