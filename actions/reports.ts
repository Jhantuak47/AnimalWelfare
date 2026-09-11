"use server";

import React from "react";

import { getUser } from "@/auth/server";
import { ReportingFormFieldType } from "@/components/reporters/reporting-details-formValidator";
import { saveToS3 } from "@/lib/aws.utils";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { ReporterStatus, Role } from "@/prisma/generated/prisma/enums";
import { AuthError, User } from "@supabase/supabase-js";
import { after } from "next/server";

export const saveReportingForm = async (formData: ReportingFormFieldType) => {
  try {
    const {
      petImage,
      location,
      animalType,
      description,
      conditionInfo,
      firstAidRequired,
    } = formData;

    const user = await getUser();

    console.log("user from server", { user });

    if (!user) {
      throw new AuthError(
        "Unauthorized, You need to login to perform this action!",
        401,
      );
    }

    let photoUrl = "";
    const response = await saveToS3({
      key: "/reports",
      file: petImage,
    });

    if (response.errorMessage) {
      return {
        success: false,
        errorMessage: response.errorMessage,
      };
    }

    if (response.s3Url) {
      photoUrl = response.s3Url;
    }

    const [lat, lang] = location?.split(",");

    const reporter = await prisma.reporter.create({
      data: {
        photoUrl,
        reporterId: user?.id,
        lang,
        animalType,
        description: `${description}, ${conditionInfo}`,
        status: ReporterStatus.REPORTED,
        firstAidRequired,
      },
    });

    /**
     * curently implemented using after() from next js,
     * implement below logic with queue system
     * supapase pgmq could be ideal for this.
     *
     */

    after(async () => {
      const dbUser = await prisma.user.findFirst({
        where: {
          id: user?.id,
          email: user.email,
        },
      });

      if (dbUser && dbUser.role === Role.USER) {
        prisma.user.update({
          where: {
            id: user?.id,
          },
          data: {
            role: Role.REPORTER,
          },
        });
      }
    });

    return {
      errorMessage: null,
      success: true,
    };
  } catch (error) {
    return { ...handleError(error), success: false };
  }
};

export const getAllReportsByUser = async (user: User | null) => {
  if (!user) {
    return null;
  }

  const reports = await prisma.reporter.findMany({
    where: {
      reporterId: user.id,
    },
  });

  return reports.length > 0 ? reports : null;
};
