import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperContextValue {
    activeStep: number;
    setActiveStep?: (step: number) => void;
}

const StepperContext = React.createContext<StepperContextValue>({
    activeStep: 0,
});

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    activeStep: number;
    onStepClick?: (step: number) => void;
    children: React.ReactNode;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
    ({ className, activeStep, onStepClick, children, ...props }, ref) => {
        return (
            <StepperContext.Provider
                value={{ activeStep, setActiveStep: onStepClick }}
            >
                <div
                    ref={ref}
                    className={cn("flex items-center w-full", className)}
                    {...props}
                >
                    {children}
                </div>
            </StepperContext.Provider>
        );
    }
);
Stepper.displayName = "Stepper";

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
    description?: React.ReactNode;
    stepNumber: number;
    isLast?: boolean;
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
    (
        { className, label, description, stepNumber, isLast = false, ...props },
        ref
    ) => {
        const { activeStep, setActiveStep } = React.useContext(StepperContext);
        const isActive = stepNumber === activeStep;
        const isCompleted = stepNumber < activeStep;

        return (
            <div
                ref={ref}
                className={cn("flex items-center flex-1", className)}
                {...props}
            >
                <div className="flex flex-col items-center">
                    <button
                        type="button"
                        onClick={() => setActiveStep?.(stepNumber)}
                        disabled={!setActiveStep}
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                            isCompleted &&
                                "bg-primary border-primary text-primary-foreground",
                            isActive &&
                                !isCompleted &&
                                "border-primary text-primary",
                            !isActive &&
                                !isCompleted &&
                                "border-gray-300 text-gray-400",
                            setActiveStep && "cursor-pointer hover:border-primary"
                        )}
                    >
                        {isCompleted ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <span className="text-sm font-medium">
                                {stepNumber + 1}
                            </span>
                        )}
                    </button>
                    {(label || description) && (
                        <div className="mt-2 text-center">
                            {label && (
                                <div
                                    className={cn(
                                        "text-sm font-medium",
                                        isActive && "text-primary",
                                        !isActive && "text-gray-600"
                                    )}
                                >
                                    {label}
                                </div>
                            )}
                            {description && (
                                <div className="text-xs text-gray-500 mt-1">
                                    {description}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {!isLast && (
                    <div
                        className={cn(
                            "flex-1 h-0.5 mx-2 transition-colors",
                            isCompleted ? "bg-primary" : "bg-gray-300"
                        )}
                    />
                )}
            </div>
        );
    }
);
Step.displayName = "Step";
