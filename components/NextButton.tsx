import React from 'react'
import useMultiStepForm from './reporters/hooks/useMultiStepForm';
import { Button } from '@base-ui/react';

export const NextButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    onClick,
    type,
    ...rest
}) => {
    const { isLastStep } = useMultiStepForm();
    return (
        <Button
            className={'text-white bg-black hover:bg-slate-900 transition-colors w-full py-4 rounded-xl'}
            type={type ?? 'button'}
            onClick={onClick}
            {...rest}
        >
            {
                isLastStep ? 'Submit' : 'Continue'
            }
        </Button>
    )
}