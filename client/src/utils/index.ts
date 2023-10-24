function rgbToHex (r: number, g: number, b: number): `#${string}` {
  let red = r.toString(16)
  let green = g.toString(16)
  let blue = b.toString(16)

  if (red.length === 1) { red = '0' + red }
  if (green.length === 1) { green = '0' + green }
  if (blue.length === 1) { blue = '0' + blue }

  return `#${red}${green}${blue}`
}

const catchedImagesAverageColors = {} as Record<string, any>
export const getImageAverageColor = (imageUrl: string): Promise<`#${string}`> => {
  return new Promise((resolve, reject) => {
    if (!catchedImagesAverageColors[imageUrl]) {
      const img = document.createElement('img')
      img.crossOrigin = 'Anonymous'
      img.src = imageUrl
      img.onload = (e) => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        canvas.width = img.width
        canvas.height = img.height

        context.drawImage(img, 0, 0, img.width, img.height)
        const imageData = context.getImageData(0, 0, img.width, img.height)
        const data = imageData.data

        let red = 0
        let green = 0
        let blue = 0

        for (let i = 0; i < data.length; i += 4) {
          red += data[i]
          green += data[i + 1]
          blue += data[i + 2]
        }

        red = Math.round(red / (data.length / 4))
        green = Math.round(green / (data.length / 4))
        blue = Math.round(blue / (data.length / 4))

        const averageColor = rgbToHex(red, green, blue)
        // !Catching color in an object
        catchedImagesAverageColors[imageUrl] = averageColor
        resolve(averageColor)
      }
      img.onerror = (e) => {
        reject(new Error('Failed to load image, possibly due to CORS restrictions.'))
      }
    } else {
      resolve(catchedImagesAverageColors[imageUrl])
    }
  })
}

export const getContrastColor = (hexColor: `#${string}`) => {
  const color = (hexColor.indexOf('#') === 0) ? hexColor.slice(1) : hexColor

  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.7 ? 'white' : 'black'
}
