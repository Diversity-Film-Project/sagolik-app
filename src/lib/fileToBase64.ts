// this function converts a File object to a base64 string using the FileReader API
// we need this to convert the uploaded photo to base64 before sending it to the API

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}
