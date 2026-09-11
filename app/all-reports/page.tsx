"use server";

import React from 'react'

import { getAllReportsByUser } from '@/actions/reports';
import { getUser } from '@/auth/server'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default async function AllReports() {

    const user = await getUser();

    const reports = await getAllReportsByUser(user);

    return (
        reports ?
            <div className='w-full max-w-[85%] mx-auto flex gap-8 pt-10 flex-wrap'>
                {
                    reports.map((report, index) => {
                        return <Card className='w-full max-w-sm' key={report.id + index}>
                            <CardHeader className='flex justify-center items-center'>
                                <Image src={`/globe.svg`} height={100} width={100} alt="logo" className="rounded-full" priority />
                            </CardHeader>
                            <CardContent>
                                <p className='text-sm'>{report.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant='outline' size={"sm"}>
                                    Action
                                </Button>
                            </CardFooter>
                        </Card>
                    })
                }
            </div> : <div className="no-reports">
                <p>No reports avaialble</p>
            </div>
    )
}
