import { NextApiRequest, NextApiResponse } from 'next'
import Mailjet from 'node-mailjet'

interface Data {
  ok?: boolean
  statusText?: string
}

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_SECRET_KEY,
})

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const email = req.query.email
  const slug = req.query.slug
  if (!email || email === 'undefined') {
    return res.status(400).json({
      ok: false,
      statusText: 'No email provided',
    })
  }
  if (!slug || slug === 'undefined') {
    return res.status(400).json({
      ok: false,
      statusText: 'No slug provided',
    })
  }
  try {
    await mailjet.post('contact', { version: 'v3' }).request({
      Email: email,
      IsExcludedFromCampaigns: false,
    })

    return res.status(200).json({ ok: true })
  } catch (e) {
    if (e.statusText.includes('already exists')) {
      return res
        .status(200)
        .json({ ok: true, statusText: 'Thank you, you have already subscribed.' })
    } else {
      return res.status(400).json({
        ok: false,
        statusText:
          e?.statusText?.split?.('error:')?.[1] ||
          'Something went wrong, try again later',
      })
    }
  }
}
