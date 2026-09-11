import React from 'react'
import useMultiStepForm from './reporters/hooks/useMultiStepForm'
import { Button } from './ui/button';

function PrevButton() {

    const { isFirstStep, previousStep } = useMultiStepForm();
    return (
        <Button
            variant={'outline'}
            type='button'
            className={'mt-5'}
            onClick={previousStep}
            disabled={isFirstStep}
        >
            Previous
        </Button>
    )
}

export default PrevButton   