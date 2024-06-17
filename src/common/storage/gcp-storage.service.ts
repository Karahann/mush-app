import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Bucket, Storage } from "@google-cloud/storage";
import { File } from "./types/file.interface";
import { randomUUID } from "crypto";

@Injectable()
export class GcpStorageService {
  private bucket: Bucket;

  constructor(private readonly configService: ConfigService) {
    const gcpBucket = configService.get<string>("GCP_BUCKET");

    if (!gcpBucket) {
      throw new Error("GCP Bucket Not Defined!");
    }

    const storage = new Storage();

    this.bucket = storage.bucket(gcpBucket);

    this.bucket.setCorsConfiguration([
      {
        origin: ["*"],
        responseHeader: ["Content-Type"],
        method: ["GET", "POST"],
      },
    ]);
  }

  async upload(
    file: File,
    fileName: string,
    filePath: string,
    isPublic: boolean = false
  ) {
    const targetPath = `${filePath}/${fileName}`;
    const bucketFile = this.bucket.file(targetPath);
    await bucketFile.save(file.buffer, { contentType: file.mimetype });

    if (isPublic) {
      await bucketFile.makePublic();
    }

    return {
      type: "gcp",
      bucket: this.bucket.name,
      path: targetPath,
      url: isPublic
        ? await this.getPublicUrl(targetPath)
        : await this.getSignedUrl(targetPath),
    };
  }

  async uploadBuffer(
    buffer: Buffer,
    fileName: string,
    filePath: string,
    isPublic: boolean = false
  ) {
    console.log(buffer);
    const targetPath = `${filePath}/${fileName}`;
    const bucketFile = this.bucket.file(targetPath);
    await bucketFile.save(buffer, {
      metadata: {
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    if (isPublic) {
      await bucketFile.makePublic();
    }

    return {
      type: "gcp",
      bucket: this.bucket.name,
      path: targetPath,
      url: isPublic
        ? await this.getPublicUrl(targetPath)
        : await this.getSignedUrl(targetPath),
    };
  }

  async getFileBuffer(filePath: string): Promise<Buffer> {
    const fileBuffer = await this.bucket.file(filePath).download();

    return fileBuffer[0];
  }

  async getSignedUrl(
    filePath: string,
    expireTime: number = 86400
  ): Promise<string | null> {
    const signedUrl = await this.bucket.file(filePath).getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + expireTime * 1000,
    });

    return signedUrl[0] ?? null;
  }

  async getPublicUrl(filePath: string): Promise<string> {
    return `https://storage.googleapis.com/${this.bucket.name}/${filePath}`;
  }

  // async removeFromStorage(path: string) {
  //   return await this.bucket.file(path).delete();
  // }

  private toArrayBuffer(buffer) {
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  }

  async saveBase64ToFile(
    fileName: string,
    filePath: string,
    isPublic: boolean = false,
    base64: string
  ) {
    const targetPath = `${filePath}/${fileName}`;
    const bucketFile = this.bucket.file(targetPath);

    const excludedBase64Data = await this.excludeMimeTypeFromBase64(base64);
    const base64Data = Buffer.from(excludedBase64Data, "base64");

    await bucketFile.save(base64Data, { contentType: "image/png" });

    if (isPublic) {
      await bucketFile.makePublic();
    }
    return {
      type: "gcp",
      bucket: this.bucket.name,
      path: targetPath,
      url: isPublic
        ? await this.getPublicUrl(targetPath)
        : await this.getSignedUrl(targetPath),
    };
  }

  async excludeMimeTypeFromBase64(base64: string) {
    var base64Data: string = base64;
    if (base64Data.includes(";base64,")) {
      base64Data = base64.split(";base64,").pop();
    }
    return base64Data;
  }
}
