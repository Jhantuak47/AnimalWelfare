import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ReportingFormFieldType } from '../reporting-details-formValidator';
import useMultiStepForm from '../hooks/useMultiStepForm';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { NextButton } from '@/components/NextButton';
import { Switch } from '@/components/ui/switch';

const AdditionalInformationForm: React.FC = ({ }) => {

    const {
        register,
        getValues,
        setError,
        control,
        formState: { errors }
    } = useFormContext<ReportingFormFieldType>();

    const { nextStep } = useMultiStepForm()

    const handleSubmitStep = () => {
        const { conditionInfo, firstAidRequired } = getValues();

        if (!conditionInfo) {
            setError('conditionInfo', {
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
                <Label htmlFor="conditionInfo">Addition Info: Explain Pet Condition</Label>
                <Textarea
                    {...register('conditionInfo')}
                    placeholder="e.g. Limping, appears injured, hiding under a car near the corner store."
                />

                {
                    errors?.conditionInfo && <span className='text-sm text-red-300'>{errors.conditionInfo.message}</span>
                }
            </div>

            <div className="flex space-x-2">
                <Controller
                    name='firstAidRequired'
                    control={control}
                    render={({ field: { onChange } }) => <>
                        <Switch
                            {...register('firstAidRequired')}
                            onCheckedChange={(value) => {
                                onChange(value);
                            }}
                            id="firstAidRequired" />
                        <Label htmlFor="firstAidRequired">First Aid Required ?</Label>
                    </>}
                />
                {
                    errors?.firstAidRequired && <span className='text-sm text-red-300'>{errors.firstAidRequired.message}</span>
                }
            </div>

            <div className="fex py-2">
                <NextButton onClick={handleSubmitStep} />
            </div>
        </>
    )
}

export default AdditionalInformationForm