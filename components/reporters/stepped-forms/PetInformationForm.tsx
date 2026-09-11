import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { PET_TYPE, ReportingFormFieldType } from '../reporting-details-formValidator';
import useMultiStepForm from '../hooks/useMultiStepForm';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { NextButton } from '@/components/NextButton';

const PetInformationForm: React.FC = ({ }) => {

    const {
        register,
        getValues,
        setError,
        control,
        formState: { errors }
    } = useFormContext<ReportingFormFieldType>();

    const { nextStep } = useMultiStepForm()

    const handleSubmitStep = () => {
        const { animalType, description } = getValues();

        if (!animalType) {
            setError('animalType', {
                type: 'manual',
                message: 'This is a mandatory field.'
            })

            return;
        }

        nextStep();
    }

    return (
        <>
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="animalType">Animal type</Label>
                <Controller
                    name='animalType'
                    control={control}
                    render={({ field: { onChange, value } }) => <Select {...register('animalType')}
                        value={value}
                        onValueChange={(value) => {
                            onChange(value)
                        }}
                        defaultValue="dog"
                    >
                        <SelectTrigger id="animalType" className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                PET_TYPE.map((type, i) => <SelectItem key={i + type} value={type}>{type}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>}
                />
                {
                    errors?.animalType && <span className='text-sm text-red-300'>{errors.animalType.message}</span>
                }
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Describe</Label>
                <Textarea
                    {...register('description')}
                    placeholder="description about the animal."
                />
                {
                    errors?.description && <span className='text-sm text-red-300'>{errors.description.message}</span>
                }
            </div>

            <div className="fex py-2">
                <NextButton onClick={handleSubmitStep} />
            </div>
        </>
    )
}

export default PetInformationForm