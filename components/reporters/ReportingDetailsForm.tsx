"use client";

import React, { useState } from 'react'

import { PawPrint } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { PetAdditionalInfoFieldSchema, PetImageAndLocationFieldSchema, PetInfoFormFieldSchema, ReportingFormFieldType } from './reporting-details-formValidator';
import MultiStepFormProvider, { FormSteps } from './stepped-forms/stepped-forms';
import LocatonFrom from './stepped-forms/LocatonFrom';
import AdditionalInformationForm from './stepped-forms/AdditionalInformationForm';
import PetInformationForm from './stepped-forms/PetInformationForm';
import PrevButton from '../PrevButton';
import { saveReportingForm } from '@/actions/reports';
import { toast } from '../ui/toast';
import { useRouter } from 'next/navigation';

const reportingFormConfig: FormSteps[] = [
    {
        title: "Step 1: Add Picture and Location",
        component: <LocatonFrom />,
        position: 1,
        validationSchema: PetImageAndLocationFieldSchema,
        fields: ['petImage', 'location']
    },
    {
        title: "Step 2: Pet Information",
        component: <PetInformationForm />,
        position: 2,
        validationSchema: PetInfoFormFieldSchema,
        fields: ['animalType', 'description']
    },
    {
        title: "Step 3: Additional Information",
        component: <AdditionalInformationForm />,
        position: 3,
        validationSchema: PetAdditionalInfoFieldSchema,
        fields: ['conditionInfo', 'firstAidRequired']
    }
]

function ReportingDetailsForm() {
    const router = useRouter();
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const onSave = async (formData: ReportingFormFieldType, validateResult: {
        valid: boolean, errors: string[]
    }) => {

        const { valid, errors } = validateResult;

        if (!valid) {
            setFormErrors(errors);
            return;
        }
        const response = await saveReportingForm(formData);

        if (response.success) {
            toast.add({
                type: "success",
                title: "Success!",
                description: "Reporter form is submitted successfully!"
            })

            router.replace("/all-reports");
        }

        if (response.errorMessage) {
            toast.add({
                title: "Error saving reporter form!",
                description: response.errorMessage,
                type: "danger"
            });
        }
    }

    return (
        <div className='reporting-details-form flex w-xl flex-1 flex-col px-6 py-12'>
            <Card className='w-full max-w-xl'>
                <CardHeader>
                    <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <PawPrint className="size-4.5" />
                    </div>
                    <CardTitle className="text-xl">Report a Stray</CardTitle>
                    <CardDescription>
                        Give volunteers what they need to find and help this animal quickly.
                    </CardDescription>
                </CardHeader>

                {
                    formErrors &&
                    formErrors.map((error, index) => <span key={index} className='px-4 py-2 text-red-200 text-xs'>{error}</span>)
                }

                <MultiStepFormProvider steps={reportingFormConfig} onFinalSubmission={onSave}>
                    {({ currStep }: { currStep: FormSteps }) =>
                        currStep &&
                        <form>
                            <CardContent className="flex flex-col gap-4">
                                <h3 className="py-5 text-3xl font-bold">{currStep.title}</h3>
                                {currStep.component}
                            </CardContent>

                            <CardFooter className="justify-end gap-2">
                                <PrevButton />
                            </CardFooter>
                        </form>
                    }
                </MultiStepFormProvider>
            </Card>
        </div>
    )
}

export default ReportingDetailsForm