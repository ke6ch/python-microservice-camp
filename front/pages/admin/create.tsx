import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Wrapper from '../../components/Wrapper'
import StyledButton from '../../components/StyledButton'

export default function CreatePage() {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (title === '' || image === '') {
      return undefined
    }
    await fetch(`${process.env.adminUrl}`, {
      method: 'POST',
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
              placeholder="http://"
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
