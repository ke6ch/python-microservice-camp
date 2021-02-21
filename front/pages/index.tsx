import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { fade } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import StyledButton from '../components/StyledButton'
import { Product } from '../interfaces'

const StyledAppBar = styled(AppBar)`
  color: ${(props) => props.theme.palette.primary.main};
  position: static;
  margin-bottom: 1rem;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 4rem;
  }
`

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`

const StyledAnchor = styled.a`
  text-decoration: none;
  background-color: transparent;
  color: ${(props) => props.theme.palette.primary.contrastText};
`

const StyledSearchWrapper = styled.div`
  position: relative;
  border-radius: ${(props) => props.theme.shape.borderRadius};
  background-color: ${(props) => fade(props.theme.palette.common.white, 0.15)};
  &:hover {
    background-color: ${(props) =>
      fade(props.theme.palette.common.white, 0.25)};
  }
  margin-left: 0;
  width: 100%;
  ${(props) => props.theme.breakpoints.up('md')} {
    margin-left: ${(props) => props.theme.spacing(1)};
    width: auto;
  }
`

const StyledSearchIcon = styled.div`
  padding: ${(props) => props.theme.spacing(0, 2)};
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledInputBase = styled(InputBase)`
  color: ${(props) => props.theme.palette.primary.light};
  padding: ${(props) => props.theme.spacing(1, 1, 1, 0)};
  padding-left: calc(1rem + ${(props) => props.theme.spacing(4)}px);
  transition: ${(props) => props.theme.transitions.create('width')};
  width: 100%;
`

interface Props {
  product: Product[]
}

export default function IndexPage({ product }: Props) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [products, setProducts] = useState<Product[]>([])
  const [filterProducts, setFilterProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts(product)
    setFilterProducts(product)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setFilterProducts(
      products.filter((p: Product) =>
        p.title.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  async function handleClick(id: number) {
    const { message } = await fetch(`${process.env.mainUrl}/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    if (message === 'success') {
      const data: Product[] = await fetch(`${process.env.mainUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      setProducts(data.map((p: Product) => p))
      setFilterProducts(data.map((p: Product) => p))
    }
  }

  return (
    <Layout title="main">
      <StyledAppBar>
        <StyledToolbar>
          <Link href="/">
            <StyledAnchor>
              <Typography>Python MicroCamp</Typography>
            </StyledAnchor>
          </Link>
          <Hidden smDown>
            <StyledSearchWrapper>
              <StyledSearchIcon>
                <FontAwesomeIcon icon={faSearch} color="white" />
              </StyledSearchIcon>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e)
                }}
              />
            </StyledSearchWrapper>
          </Hidden>
          <div>
            <StyledButton variant="outlined">Log in</StyledButton>
            <StyledButton>Sign Up</StyledButton>
          </div>
        </StyledToolbar>
      </StyledAppBar>
      <Container maxWidth="md">
        <Grid container spacing={matches ? 4 : 1}>
          {filterProducts.map((p: Product) => (
            <Grid key={p.id.toString()} item xs={12} sm={4}>
              <ProductCard props={p} handleClick={handleClick} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data: Product[] = await fetch(`${process.env.MAIN_URL}`, {
    method: 'GET',
  }).then((res) => res.json())

  return {
    props: {
      product: data.map((d: Product) => d),
    },
  }
}
