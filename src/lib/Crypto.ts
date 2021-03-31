import crypto from "crypto";

export class Crypto {
  public aesEncrypt(data: any, key: any, encoding: any = "hex") {
    const iv = crypto.randomBytes(16);
    try {
      const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
      let encrypted: any = Buffer.concat([
        iv,
        cipher.update(data),
        cipher.final(),
      ]);
     
      if (encoding) {
        encrypted = encrypted.toString(encoding);
      }
      return encrypted;
    } catch (error) {
      return null
    }
  }

  public aesDecrypt(encrypted: any, key: any, encoding: any) {
    if (typeof encrypted === "string") {
      encrypted = Buffer.from(encrypted, "hex");
    }
    const [iv, data] = [encrypted.slice(0, 16), encrypted.slice(16)];
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted: any = Buffer.concat([
      decipher.update(data),
      decipher.final(),
    ]);
    if (encoding) {
      decrypted = decrypted.toString(encoding);
    }
    return decrypted;
  }
}
