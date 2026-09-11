import React, { useContext } from 'react'
import { MultiStepFormContext } from '../stepped-forms/stepped-forms';

function useMultiStepForm() {
    const context = useContext(MultiStepFormContext);

    if (!context) {
        throw new Error('useNote must be within a note provider.');
    }
    return context;
}

export default useMultiStepForm