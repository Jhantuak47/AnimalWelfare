import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { handleError } from "./utils";

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.AWS_REGION;
console.log({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
});
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
console.log("after initializing");
export async function getS3Url({ params }: { params: { key: string } }) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: params.key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return url;
}

export async function saveToS3({
  key = process.env.S3_BUCKET_KEY_NAME!,
  file,
}: {
  key: string;
  file: File;
}) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const uniqueId = crypto.randomUUID();
    const cleanFileName = file.name.replace(/\s+/g, "-");
    const s3Key = `${key}/${uniqueId}-${cleanFileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: file.type,
    });

    await s3.send(command);
    const s3Url = `https://${bucketName}.s3.${region}://{s3Key}`;

    return { errorMessage: null, s3Url };
  } catch (error) {
    return { ...handleError(error), s3Url: null };
  }
}
