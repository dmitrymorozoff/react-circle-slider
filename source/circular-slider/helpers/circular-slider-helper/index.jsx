export class CircularSliderHelper {
    constructor(stepsArray, initialValue) {
        this.stepsArray = stepsArray;
        this.currentStepIndex = 0;
        for (let stepIndex of this.stepsArray) {
            if (this.stepsArray[stepIndex] === initialValue) {
                this.currentStepIndex = stepIndex;
                break;
            }
        }
        this.countSteps = this.stepsArray.length;
    }
    getAnglePoint() {
        return Math.PI * 2 / this.countSteps;
    }
    getAngle() {
        return Math.min(this.getAnglePoint() * this.currentStepIndex, Math.PI * 2 - Number.EPSILON);
    }
    getCurrentStep() {
        return this.stepsArray[this.currentStepIndex];
    }
    updateCurrentStepFromValue(value) {
        for (let i = 0; i < this.countSteps; i++) {
            if (value <= this.stepsArray[i]) {
                this.currentStepIndex = i;
                return;
            }
        }

        this.currentStepIndex = this.countSteps - 1;
    }
    updateCurrentStepFromAngle(angle) {
        const stepIndex = Math.floor(angle / this.getAnglePoint());
        this.currentStepIndex = Math.min(Math.max(stepIndex, 0), this.countSteps - 1);
    }
}
