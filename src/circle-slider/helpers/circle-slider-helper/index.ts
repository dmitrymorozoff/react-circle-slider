interface INumber {
    EPSILON: any;
}
declare var Number: INumber;

export class CircleSliderHelper {
    private stepsArray: number[];
    private stepIndex: number;
    private countSteps: number;

    constructor(stepsArray: number[], initialValue: any) {
        this.stepsArray = stepsArray;
        this.countSteps = this.stepsArray.length - 1;
        this.stepIndex = 0;
        this.setCurrentStepIndexFromArray(initialValue);
    }

    public getEpsilon() {
        let epsilon = 1.0;
        while (1.0 + 0.5 * epsilon !== 1.0) {
            epsilon *= 0.5;
        }
        return epsilon;
    }

    public getAngle(): number {
        const accuracy = 0.00001;
        const epsilon = Number.EPSILON || this.getEpsilon();
        return (
            Math.min(
                this.getAnglePoint() * this.stepIndex,
                2 * Math.PI - epsilon,
            ) - accuracy
        );
    }

    public getCurrentStep(): number {
        return this.stepsArray[this.stepIndex];
    }

    public updateStepIndexFromValue(value: number) {
        const isSetValue = this.setCurrentStepIndexFromArray(value);
        if (isSetValue) {
            return;
        }
        this.stepIndex = this.countSteps;
    }

    public updateStepIndexFromAngle(angle: number) {
        const stepIndex = Math.round(angle / this.getAnglePoint());
        if (stepIndex < this.countSteps) {
            this.stepIndex = stepIndex;
            return;
        }
        this.stepIndex = this.countSteps;
    }

    public setCurrentStepIndexFromArray = (value: number): boolean => {
        for (let i = 0; i < this.countSteps; i++) {
            if (value <= this.stepsArray[i]) {
                this.stepIndex = i;
                return true;
            }
        }
        this.stepIndex = this.countSteps;
        return false;
    };

    public getAnglePoint(): number {
        return (Math.PI * 2) / this.countSteps;
    }
}
