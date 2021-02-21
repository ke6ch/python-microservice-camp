import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Wrapper from '../../components/Wrapper'
import StyledButton from '../../components/StyledButton'
import { Product } from '../../interfaces'

const StyledTableContainer = styled(({ children, ...props }) => (
  <TableContainer component={Paper} {...props}>
    {children}
  </TableContainer>
))`
  margin-top: 1rem;
`

const StyledTable = styled(Table)`
  min-width: 650;
`

interface Props {
  product: Product[]
}

export default function AdminIndexPage({ product }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts(product)
  }, [])

  async function handleClick(id: number) {
    await fetch(`${process.env.adminUrl}/${id}`, {
      method: 'DELETE',
    })

    const data: Product[] = await fetch(`${process.env.adminUrl}`, {
      method: 'GET',
    }).then((res) => res.json())

    setProducts(data)
  }

  return (
    <Wrapper title="admin">
      <Link href="/admin/create" passHref>
        <StyledButton variant="contained">Add</StyledButton>
      </Link>
      <StyledTableContainer>
        <StyledTable aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p: Product, idx: number) => (
              <TableRow key={idx.toString()}>
                <TableCell component="th" scope="row">
                  {p.id}
                </TableCell>
                <TableCell>
                  <img src={p.image} alt={p.title} height="64" />
                </TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.likes}</TableCell>
                <TableCell>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button href={`/admin/edit/${p.id}`}>Edit</Button>
                    <Button onClick={() => handleClick(p.id)}>Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </Wrapper>
  )
}

export async function getServerSideProps() {
  const data: Product[] = await fetch(`${process.env.ADMIN_URL}`, {
    method: 'GET',
  }).then((res) => res.json())

  return {
    props: {
      product: data.map((d: Product) => d),
    },
  }
}
