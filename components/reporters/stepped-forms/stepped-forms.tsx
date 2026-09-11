"use client"

import { createContext, useState } from "react";
import ReportingFormFieldSchema, { reportingFormFieldKeys, ReportingFormFieldType } from "../reporting-details-formValidator";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { Progress } from "@/components/ui/progress";
import useLocalStorage from "../hooks/useLocalStorage";


type ReportingFormFieldKeys = keyof ReportingFormFieldType;

export type FormSteps = {
    title: string;
    position: number;
    validationSchema: ZodType<Partial<ReportingFormFieldType>>
    component: React.ReactElement;
    fields: ReportingFormFieldKeys[];
}

export interface MultiStepFormContextProps {
    currentStep: FormSteps;
    currentStepIndex: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (step: number) => void;
    steps: FormSteps[]
}

export const MultiStepFormContext = createContext<MultiStepFormContextProps | null>(null);


const MultiStepFormProvider = (
    { steps, onFinalSubmission, children }: { steps: FormSteps[], onFinalSubmission: (formData: ReportingFormFieldType, ...rest: any[]) => void, children: (props: { currStep: FormSteps }) => React.ReactElement }
) => {
    const methods = useForm<ReportingFormFieldType>({
        resolver: zodResolver(ReportingFormFieldSchema)
    });
    const { currentStepIndex, setCurrentStepIndex, saveIntoLocalStorage } = useLocalStorage(methods, "reportFormData")

    const currStep = steps[currentStepIndex];

    const nextStep = async () => {

        const isValid = await methods.trigger(currStep.fields);

        if (!isValid) {
            return; // stop progressing if validation fails.
        }

        const { valid } = validateFormFields(currStep.fields, currStep.validationSchema);

        if (!valid) {
            return;
        }

        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
            saveIntoLocalStorage(currentStepIndex)
        }

        if (currentStepIndex === steps.length - 1) {
            submitSteppedForm(methods.getValues());
            methods.reset();
            saveIntoLocalStorage(0, methods.getValues());
        }
    }

    const validateFormFields = (fields: ReportingFormFieldKeys[], validationSchema: ZodType<Partial<ReportingFormFieldType>>) => {
        const currStepValues = methods.getValues(fields);
        const formValues = Object.fromEntries(
            fields.map((field, index) => [
                field,
                currStepValues[index]
            ])
        );

        if (validationSchema) {
            const validationResult = validationSchema.safeParse(formValues);
            const errors: string[] = [];

            if (!validationResult.success) {
                validationResult.error.issues.forEach(err => {
                    errors.push(`${err.path.join('.')} - ${err.message}`);
                    methods.setError(err.path.join('.') as ReportingFormFieldKeys, {
                        type: 'manual',
                        message: err.message
                    })
                });

                return {
                    valid: validationResult.success,
                    errors: errors
                }
            }
        }

        return {
            valid: true,
            errors: []
        }
    }

    const previousStep = () => {
        if (currentStepIndex > 0 && currentStepIndex - 1 < steps.length) {
            saveIntoLocalStorage(currentStepIndex - 1);
            setCurrentStepIndex(currentStepIndex - 1);
        }
    }

    const goToStep = (position: number) => {
        if (position > 0 && position - 1 < steps.length) {
            setCurrentStepIndex(position - 1);
            // saveFormState(position - 1);
        }
    }

    async function submitSteppedForm(data: ReportingFormFieldType) {
        const validateResult = validateFormFields(reportingFormFieldKeys, ReportingFormFieldSchema);

        try {
            onFinalSubmission(data, validateResult);
        } catch (error) {
            console.error('From submission error: ', error);
        }
    }

    const value: MultiStepFormContextProps = {
        currentStep: steps[currentStepIndex],
        currentStepIndex,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goToStep,
        nextStep,
        previousStep,
        steps
    }


    return <MultiStepFormContext.Provider value={value}>
        <Progress value={currentStepIndex * (100 / steps.length - 2)} className="w-full max-w-md mx-auto" />

        <FormProvider {...methods}>
            {children({ currStep })}
        </FormProvider>
    </MultiStepFormContext.Provider>
}


export default MultiStepFormProvider;