import React from 'react'
import styled from 'styled-components'
import projects from '../projects.json'
import { Img } from '../components/Img'
import GopherIcon from '../svgs/technologies/gopher.svg'
import NextJsIcon from '../svgs/technologies/nextjs.svg'
import NodeJsIcon from '../svgs/technologies/nodejs.svg'
import ReactIcon from '../svgs/technologies/react.svg'
import StyledComponentsIcon from '../svgs/technologies/styled-components.svg'
import TypeScriptIcon from '../svgs/technologies/typescript.svg'
import GithubIcon from '../svgs/socialMedia/githubFilled.svg'
import LinkIcon from '../svgs/link.svg'
import Head from 'next/head'

interface Projects {
  className?: string
}

const Container = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: minmax(30rem, 43.85rem) minmax(30rem, 43.85rem);
  grid-gap: 4.7rem;

  @media (max-width: 790px) {
    grid-template-columns: minmax(30rem, 40.7rem);
    grid-gap: 4.7rem;
  }
`

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  grid-row-gap: 1.5rem;
`

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
`

const ProjectImg = styled(Img)`
  flex-shrink: 0;
  width: 7.5rem;
  height: 7.5rem;
  margin-right: 1.6rem;
  border-radius: 1.1rem;
`

const ProjectTitle = styled.div`
  flex-shrink: 1;
  font-size: 1.6rem;
  font-weight: bold;
`

const ProjectBody = styled.div`
  font-size: 1.2rem;
  line-height: 1.5em;
  opacity: 0.5;
`

const ProjectFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

const ProjectStack = styled.div`
  display: flex;
`

const ProjectLinks = styled.div`
  display: flex;
  align-items: center;
`

const StackIconContainer = styled.a`
  display: block;
  color: ${(props) => props.theme.colors.primary};
  margin-right: 0.9rem;
  text-transform: none;

  & > svg {
    height: 2.2rem;
    width: auto;
  }
`

const LinkWithIcon = styled.a`
  display: grid;
  margin-left: 1.1rem;
  color: ${(props) => props.theme.colors.primary};
  grid-template-columns: auto auto;
  text-decoration: none;
  justify-content: center;
  grid-column-gap: 0.3rem;
  font-size: 1.6rem;
  font-weight: bold;
  border-bottom: 0.2rem solid transparent;

  &:hover {
    border-bottom: 0.2rem solid ${(props) => props.theme.colors.orange};
  }

  & > svg {
    height: 1em;
    width: auto;
  }
`

enum StackTechnologies {
  Reactjs = 'react',
  TypeScript = 'typescript',
  NextJs = 'next',
  StyledComponents = 'styled-components',
  GoLang = 'golang',
  NodeJs = 'node',
}

const Projects = (props: Projects) => {
  const stackRouter = (techs: StackTechnologies, id: number) => {
    switch (techs) {
      case StackTechnologies.GoLang:
        return (
          <StackIconContainer
            rel="noopener noreferrer"
            key={id}
            href="https://golang.org/"
            target="_blank"
          >
            <GopherIcon />
          </StackIconContainer>
        )
      case StackTechnologies.NextJs:
        return (
          <StackIconContainer
            rel="noopener noreferrer"
            key={id}
            href="https://nextjs.org/"
            target="_blank"
          >
            <NextJsIcon />
          </StackIconContainer>
        )
      case StackTechnologies.NodeJs:
        return (
          <StackIconContainer
            rel="noopener noreferrer"
            key={id}
            href="https://nodejs.org/en/"
            target="_blank"
          >
            <NodeJsIcon />
          </StackIconContainer>
        )
      case StackTechnologies.Reactjs:
        return (
          <StackIconContainer
            rel="noopener noreferrer"
            key={id}
            href="https://reactjs.org/"
            target="_blank"
          >
            <ReactIcon />
          </StackIconContainer>
        )
      case StackTechnologies.StyledComponents:
        return (
          <StackIconContainer
            rel="noopener noreferrer"
            key={id}
            href="https://styled-components.com/"
            target="_blank"
          >
            <StyledComponentsIcon />
          </StackIconContainer>
        )
      case StackTechnologies.TypeScript:
        return (
          <StackIconContainer
            rel="noopener noreferrer"
            key={id}
            href="https://www.typescriptlang.org/"
            target="_blank"
          >
            <TypeScriptIcon />
          </StackIconContainer>
        )
      default:
        return null
    }
  }

  return (
    <Container className={props.className}>
      <Head>
        <title>Projects page</title>
      </Head>
      {projects?.map((project, id) => {
        return (
          <ProjectContainer key={`container_${id}`}>
            <ProjectHeader>
              {project.avatarUrl && (
                <ProjectImg
                  alt={`Image of project ${project.title}`}
                  src={project.avatarUrl}
                />
              )}
              <ProjectTitle>{project.title}</ProjectTitle>
            </ProjectHeader>
            <ProjectBody>{project.description}</ProjectBody>
            <ProjectFooter>
              <ProjectStack>
                {project.techStack?.map((technology, id) => {
                  return stackRouter(technology as StackTechnologies, id)
                }) || <div />}
              </ProjectStack>
              <ProjectLinks>
                {project.url && (
                  <LinkWithIcon href={project.url} target="_blank">
                    <LinkIcon />
                    Link
                  </LinkWithIcon>
                )}
                {project.sourceCodeUrl && (
                  <LinkWithIcon href={project.sourceCodeUrl} target="_blank">
                    <GithubIcon />
                    Source
                  </LinkWithIcon>
                )}
              </ProjectLinks>
            </ProjectFooter>
          </ProjectContainer>
        )
      })}
    </Container>
  )
}

export default Projects
