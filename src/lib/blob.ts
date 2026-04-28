import { put, del } from "@vercel/blob";

export async function uploadImage(
  file: File,
  folder: string = "images"
): Promise<string> {
  const blob = await put(`${folder}/${file.name}`, file, {
    access: "public",
  });
  return blob.url;
}

export async function deleteImage(url: string): Promise<void> {
  await del(url);
}
