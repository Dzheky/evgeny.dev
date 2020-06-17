import { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  ok?: boolean
  statusText?: string
}

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
  const response = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_CLIENT_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      metadata: {
        slug,
      },
    }),
  })

  if (response) {
    const data = await response.json()
    if (response.status !== 201 && data.email) {
      return res.status(400).json({ ok: false, statusText: data.email?.[0] })
    }

    if (response.status !== 201) {
      return res.status(400).json({ ok: false, statusText: data[0] })
    }
    return res.status(200).json({ ok: true })
  }
}
