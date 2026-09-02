"use client";

import React, { useState } from 'react'

import { Camera, LocateFixed, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function ReportingDetailsForm() {


    const [locating, setLocating] = useState(false);
    const [location, setLocation] = useState<string | null>(null);

    const handleUseMyLocation = () => {
        setLocating(true);
        setTimeout(() => {
            setLocation("37.7749, -122.4194");
            setLocating(false);
        }, 800);
    };

    return (
        <div className='reporting-details-form flex w-full max-w-xl flex-1 flex-col px-6 py-12'>
            <Card>
                <CardHeader>
                    <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <PawPrint className="size-4.5" />
                    </div>
                    <CardTitle className="text-xl">Report a Stray</CardTitle>
                    <CardDescription>
                        Give volunteers what they need to find and help this animal quickly.
                    </CardDescription>
                </CardHeader>

                <form>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="animalType">Animal type</Label>
                            <Select defaultValue="dog" name="animalType">
                                <SelectTrigger id="animalType" className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dog">Dog</SelectItem>
                                    <SelectItem value="cat">Cat</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="description">What's going on?</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="e.g. Limping, appears injured, hiding under a car near the corner store."
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="photo">Photo</Label>
                            <label
                                htmlFor="photo"
                                className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-input text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
                            >
                                <Camera className="size-5" />
                                <span className="text-sm">Tap to add a photo</span>
                                <Input id="photo" name="photo" type="file" accept="image/*" className="hidden" />
                            </label>
                        </div>

                        <div className="flex flex-col gap-1.5 py-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="Lat, long or nearest address"
                                    value={location ?? ""}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleUseMyLocation}
                                    disabled={locating}
                                >
                                    <LocateFixed className="size-4" />
                                    {locating ? "Locating…" : "Use my location"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="justify-end gap-2">
                        <Button type="submit" size="lg" className="px-6">
                            Submit Report
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default ReportingDetailsForm