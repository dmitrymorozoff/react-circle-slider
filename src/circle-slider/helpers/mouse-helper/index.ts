export class MouseHelper {
    private container: any;
    private center!: number;
    private relativeX!: number;
    private relativeY!: number;

    constructor(container: any) {
        this.container = container;
        this.setPosition({ x: 0, y: 0 });
    }

    public setPosition(event: any): void {
        if (!this.container) {
            return;
        }
        const rectSize = this.container.getBoundingClientRect();
        const width = rectSize.width;
        this.center = width / 2;
        this.relativeX = event.clientX - rectSize.left;
        this.relativeY = event.clientY - rectSize.top;
    }

    public getNewSliderAngle(): number {
        const angleBetweenTwoVectors = Math.atan2(
            this.relativeY - this.center,
            this.relativeX - this.center,
        );
        return (angleBetweenTwoVectors + (3 * Math.PI) / 2) % (2 * Math.PI);
    }
}
