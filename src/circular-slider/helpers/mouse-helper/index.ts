export class MouseHelper {
    private container: any;
    private center!: number;
    private relativeX!: number;
    private relativeY!: number;

    constructor(container: any) {
        this.container = container;
        this.setNewPosition({ x: 0, y: 0 });
    }

    setNewPosition(event: any) {
        const rectSize = this.container.getBoundingClientRect();
        const width = rectSize.width;
        this.center = width / 2;
        this.relativeX = event.x - rectSize.left;
        this.relativeY = event.y - rectSize.top;
    }

    getNewSliderAngle() {
        return (
            (Math.atan2(
                this.relativeY - this.center,
                this.relativeX - this.center,
            ) +
                (Math.PI * 3) / 2) %
            (Math.PI * 2)
        );
    }
}
