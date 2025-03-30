import { supabase } from "@/lib/supabase-client"

export interface UploadOptions {
  bucket: string
  path?: string
  upsert?: boolean
  contentType?: string
  cacheControl?: string
}

export async function uploadImage(file: File, options: UploadOptions): Promise<string> {
  if (!file) {
    throw new Error("No file provided")
  }

  const { bucket, path = "", upsert = false, contentType, cacheControl } = options

  // Generate a unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${path}${path ? "/" : ""}${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`

  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
    upsert,
    contentType,
    cacheControl,
  })

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`)
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName)

  return publicUrl
}

export async function deleteImage(path: string, bucket: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    throw new Error(`Error deleting image: ${error.message}`)
  }
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      })
    }
    img.onerror = () => {
      reject(new Error("Failed to load image"))
    }
    img.src = URL.createObjectURL(file)
  })
}

export function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Could not create blob"))
          return
        }

        const resizedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        })

        resolve(resizedFile)
      }, file.type)
    }

    img.onerror = () => {
      reject(new Error("Failed to load image for resizing"))
    }

    img.src = URL.createObjectURL(file)
  })
}

