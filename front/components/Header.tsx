import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import StyledButton from '../components/StyledButton'

const StyledAppBar = styled(AppBar)`
  color: ${(props) => props.theme.palette.primary.main};
  position: static;
  margin-bottom: 2rem;
`

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`

const StyledAnchor = styled.a`
  text-decoration: none;
  background-color: transparent;
  color: ${(props) => props.theme.palette.primary.contrastText};
`

export default function Header() {
  const [hidden, setHidden] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    router.pathname === '/admin' ? setHidden(true) : setHidden(false)
  }, [])

  const backButton =
    hidden === true ? (
      ''
    ) : (
      <Link href="/admin">
        <StyledButton variant="outlined">Back</StyledButton>
      </Link>
    )

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Link href="/admin" passHref>
          <StyledAnchor>
            <Typography>Python MicroCamp</Typography>
          </StyledAnchor>
        </Link>
        {backButton}
      </StyledToolbar>
    </StyledAppBar>
  )
}
