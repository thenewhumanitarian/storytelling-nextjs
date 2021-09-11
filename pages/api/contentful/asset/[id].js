const contentful = require('contentful')

export default async function (req, res) {
  const { id } = req.query

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  try {
    await client.getAsset(id).then((asset) => {
      console.log(asset.fields.file.details)
      const assetDetails = {
        url: asset.fields.file.url,
        width: asset.fields.file.details.image.width,
        height: asset.fields.file.details.image.height,
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'max-age=180000')
      res.json(assetDetails)
    })
  } catch (error) {
    res.json(error)
    res.status(405).end()
  }
}