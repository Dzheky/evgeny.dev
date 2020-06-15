import { NextApiRequest, NextApiResponse } from 'next'

export interface StackOverflowData {
  reputation: number
  answers: number
}

export default async (req: NextApiRequest, res: NextApiResponse<StackOverflowData>) => {
  const user = await fetch(
    `https://api.stackexchange.com/2.2/users/11135297?site=stackoverflow`,
  )
  const answers = await fetch(
    `https://api.stackexchange.com/2.2/users/11135297/answers?site=stackoverflow&filter=total`,
  )
  const answersInfo = await answers.json()
  const userInfo = await user.json()
  res
    .status(200)
    .json({ reputation: userInfo.items[0]?.reputation || 0, answers: answersInfo.total })
}
