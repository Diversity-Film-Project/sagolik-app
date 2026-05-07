// Compresses and resizes an image File on the client before upload.
// Keeps max dimension at 1200px, outputs JPEG at 85% quality — enough for Kling AI reference.
export function compressImage(
    file: File,
    maxDimension = 1200,
    quality = 0.85,
): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const objectUrl = URL.createObjectURL(file)

        img.onload = () => {
            let { width, height } = img
            if (width > maxDimension || height > maxDimension) {
                if (width >= height) {
                    height = Math.round((height * maxDimension) / width)
                    width = maxDimension
                } else {
                    width = Math.round((width * maxDimension) / height)
                    height = maxDimension
                }
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                reject(new Error('Canvas not supported'))
                return
            }
            ctx.drawImage(img, 0, 0, width, height)
            URL.revokeObjectURL(objectUrl)

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Compression failed'))
                        return
                    }
                    const compressed = new File(
                        [blob],
                        file.name.replace(/\.[^.]+$/, '.jpg'),
                        { type: 'image/jpeg' },
                    )
                    resolve(compressed)
                },
                'image/jpeg',
                quality,
            )
        }

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl)
            reject(new Error('Image load failed'))
        }
        img.src = objectUrl
    })
}
