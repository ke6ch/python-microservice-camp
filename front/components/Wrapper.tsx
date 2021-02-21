import React, { ReactNode } from 'react'
import Container from '@material-ui/core/Container'
import Layout from './Layout'
import Header from './Header'

type Props = {
  children?: ReactNode
  title?: string
}

export default function Wrapper({
  children,
  title = 'This is the default title',
}: Props) {
  return (
    <Layout title={title}>
      <Header />
      <Container maxWidth="md">
        <>{children}</>
      </Container>
    </Layout>
  )
}
