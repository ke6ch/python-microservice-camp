import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Wrapper from '../../../components/Wrapper'
import StyledButton from '../../../components/StyledButton'
import { Product } from '../../../interfaces'

interface Props {
  product: Product
}

export default function EditPage({ product }: Props) {
  const [id, setId] = useState<Number>()
  const [title, setTitle] = useState<String>('')
  const [image, setImage] = useState<String>('')
  const router = useRouter()

  useEffect(() => {
    setId(product.id)
    setTitle(product.title)
    setImage(product.image)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await fetch(`${process.env.adminUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        image: image,
      }),
    })
    router.push('/admin')
  }

  return (
    <Wrapper title="admin">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-title-input"
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-image-input"
              label="Image"
              variant="outlined"
              fullWidth
              value={image}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImage(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <StyledButton type="submit" variant="contained">
              Save
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </Wrapper>
  )
}

export async function getServerSideProps(context: any) {
  const id = context.params.id
  const data: Product = await fetch(`${process.env.ADMIN_URL}/${id}`, {
    method: 'GET',
  }).then((res) => res.json())

  return {
    props: {
      product: data,
    },
  }
}
