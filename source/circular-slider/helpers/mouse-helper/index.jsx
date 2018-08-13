export class MouseHelper {
    constructor(container, sliderRadius) {
        this.container = container;
        this.sliderRadius = sliderRadius;
        this.setNewPosition({ x: 0, y: 0 });
    }
    setNewPosition(event) {
        const rectSize = this.container.getBoundingClientRect();
        const width = rectSize.width;
        this.center = width / 2;
        this.relativeX = event.x - rectSize.left;
        this.relativeY = event.y - rectSize.top;
    }
    getNewSliderAngle() {
        const angle =
            (Math.atan2(this.relativeY - this.center, this.relativeX - this.center) +
                Math.PI * 3 / 2) %
            (Math.PI * 2);
        return angle;
    }
}
