import { PlotPoint } from "./plot-point";
export class PlotLineup extends PlotPoint {
    constructor(data, size, map) {
        super(data.posThrown.x, data.posThrown.y, size, map);
        this.data = data;
        this.size = size;
        this.element = null;
        this.landing = new PlotPoint(data.posDetonated.x, data.posDetonated.y, size / 2, map);
    }

    render(container) {
        super.render(container);
        this.landing.render(container);
    }

    showLanding() {
        // todo: put line code here
        this.landing.show();
    }

    hideLanding() {
        // todo: put line code here
        this.landing.hide();
    }
}