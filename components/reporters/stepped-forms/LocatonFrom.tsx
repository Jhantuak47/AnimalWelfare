"use client";

import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ReportingFormFieldType } from "../reporting-details-formValidator"
import useMultiStepForm from '../hooks/useMultiStepForm';
import { Label } from '@/components/ui/label';
import { Camera, LocateFixed } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NextButton } from '@/components/NextButton';

const LocatonFrom = () => {

    const {
        register,
        getValues,
        setError,
        control,
        formState: { errors }
    } = useFormContext<ReportingFormFieldType>();

    const { nextStep } = useMultiStepForm();
    const [locating, setLocating] = useState(false);
    const [location, setLocation] = useState<string | null>(null);

    const handleStepSubmit = async () => {
        const { location, petImage } = getValues();

        if (!petImage) {
            setError("petImage", {
                type: 'manual',
                message: 'Pet image is a mandotory field you should not be skipping it.'
            });

            return
        }

        nextStep();
    }

    const onChangeLocation = (onChangeFn: (...event: any[]) => void) => () => {
        setLocating(true);
        setTimeout(() => {
            const tempLocation = "37.7749, -122.4194"; // replace this with live location.
            setLocation(tempLocation);
            onChangeFn(tempLocation);
            setLocating(false);
        }, 800);
    }

    return (
        <>
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="petImage">Photo</Label>
                <Controller
                    name='petImage'
                    control={control}
                    render={({ field: { onChange } }) => <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-input text-muted-foreground transition-colors hover:border-ring hover:text-foreground">
                        <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                            <Camera className="size-5" />
                            <span className="text-sm">Tap to add a photo</span>
                            <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input {...register("petImage")} onChange={e => {
                            const files = e.target.files;

                            if (files === null) return;

                            if (files[0]) {
                                onChange(files[0]);
                            }
                        }} type="file" accept="image/*" className="hidden" />
                    </label>}
                />
                {
                    errors?.petImage && <span className='text-sm text-red-300'>{errors.petImage.message}</span>
                }
            </div>

            <div className="flex flex-col gap-1.5 py-2">
                <Label htmlFor="location">Location</Label>
                <Controller
                    name='location'
                    control={control}
                    render={({ field: { onChange } }) => {
                        const onChangeFn = onChangeLocation(onChange);
                        return <div className="flex gap-2">
                            <Input
                                {...register('location')}
                                placeholder="Lat, long or nearest address"
                                onChange={e => {
                                    setLocation(e.target.value);
                                    onChange(e.target.value);
                                }}
                                value={location || ""}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onChangeFn}
                                disabled={locating}
                            >
                                <LocateFixed className="size-4" />
                                {locating ? "Locating…" : "Use my location"}
                            </Button>
                        </div>
                    }}
                />

                {
                    errors?.location && <span className='text-sm text-red-300'>{errors.location.message}</span>
                }
            </div>

            <div className="flex py-2">
                <NextButton onClick={handleStepSubmit} />
            </div>
        </>
    )
}

export default LocatonFrom