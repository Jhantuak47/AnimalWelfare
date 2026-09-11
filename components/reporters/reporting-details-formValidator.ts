import { AnimalType } from "@/prisma/generated/prisma/enums";
import { z } from "zod";

export const PET_TYPE = ["DOG", "CAT", "RAT", "RABBIT", "OTHER"];

export const PetImageAndLocationFieldSchema = z.object({
  petImage: z.file(),
  location: z.string(),
});

export const PetInfoFormFieldSchema = z.object({
  animalType: z.enum(AnimalType),
  description: z.string(),
});

export const PetAdditionalInfoFieldSchema = z.object({
  conditionInfo: z.string(),
  firstAidRequired: z.boolean(),
});

const ReportingFormFieldSchema = PetImageAndLocationFieldSchema.merge(
  PetInfoFormFieldSchema,
).merge(PetAdditionalInfoFieldSchema);

export default ReportingFormFieldSchema;
export type ReportingFormFieldType = z.infer<typeof ReportingFormFieldSchema>;
