"use client";

import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form';

type SavedFormState = {
    currStepIndex: number,
    formValues: Record<string, unknown>
}

const useLocalStorage = <FiedType extends {},>(methods: UseFormReturn<FiedType>, storageKey: string) => {

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [savedFormState, setSavedFormState] = useState<SavedFormState | null>(() => {

        if (!localStorage) return null;

        const serializedData = localStorage.getItem(storageKey);
        const savedFormState = serializedData ? JSON.parse(serializedData) : null;

        return savedFormState;
    });

    const saveIntoLocalStorage = (stepIndex: number, formValues?: {}) => {
        const latestData = {
            currStepIndex: stepIndex ? stepIndex : currentStepIndex,
            formValues: formValues ? formValues : methods.getValues()
        };

        localStorage.setItem(storageKey, JSON.stringify(latestData));
        setSavedFormState(latestData);
    }

    useEffect(() => {
        if (savedFormState) {
            const { currStepIndex, formValues } = savedFormState;
            setCurrentStepIndex(currStepIndex);
            methods.reset(formValues as FiedType);
        }
    }, []);


    return {
        currentStepIndex,
        setCurrentStepIndex,
        saveIntoLocalStorage
    }
}

export default useLocalStorage;