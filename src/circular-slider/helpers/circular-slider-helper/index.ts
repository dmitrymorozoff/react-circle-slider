export class CircularSliderHelper {
    private stepsArray: number[];
    private currentStepIndex: number;
    private countSteps: number;

    constructor(stepsArray: number[], initialValue: any) {
        this.stepsArray = stepsArray;
        this.countSteps = this.stepsArray.length;
        this.currentStepIndex = 0;
        this.stepsArray.forEach((step: number, index: number) => {
            if (step === initialValue) {
                this.currentStepIndex = index;
                return;
            }
        });
    }

    public getAnglePoint() {
        return (Math.PI * 2) / this.countSteps;
    }

    public getAngle() {
        return Math.min(
            this.getAnglePoint() * this.currentStepIndex,
            Math.PI * 2 - Number.EPSILON,
        );
    }

    public getCurrentStep() {
        return this.stepsArray[this.currentStepIndex];
    }

    public updateCurrentStepFromValue(value: number) {
        for (let i = 0; i < this.countSteps; i++) {
            if (value <= this.stepsArray[i]) {
                this.currentStepIndex = i;
                return;
            }
        }
        this.currentStepIndex = this.countSteps - 1;
    }

    public updateCurrentStepFromAngle(angle: number) {
        const stepIndex = Math.floor(angle / this.getAnglePoint());
        this.currentStepIndex = Math.min(
            Math.max(stepIndex, 0),
            this.countSteps - 1,
        );
    }
}
