import { NextApiRequest, NextApiResponse } from 'next'

export interface GithubData {
  followers: number
  stars: number
}

export default async (req: NextApiRequest, res: NextApiResponse<GithubData>) => {
  const userResponse = await fetch('https://api.github.com/users/dzheky')
  const userReposResponse = await fetch('https://api.github.com/users/dzheky/repos')

  const user = await userResponse.json()
  const repositories = await userReposResponse.json()

  console.log(repositories)

  const mine = repositories?.filter((repo) => !repo.fork)
  const stars = mine.reduce((accumulator, repository) => {
    return accumulator + repository['stargazers_count']
  }, 0)

  res.status(200).json({ followers: user.followers, stars })
}
