import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Product } from '../interfaces'

const StyledCard = styled(Card)`
  max-width: 345px;
`

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
`

const StyledTypography = styled(Typography)`
  margin-left: auto;
  margin-right: 1rem;
`

interface Props {
  props: Product
  handleClick: (id: number) => void
}

export default function ProductCard({ props, handleClick }: Props) {
  return (
    <StyledCard>
      <StyledCardMedia image={props.image} title={props.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            handleClick(props.id)
          }}
        >
          like
        </Button>
        <StyledTypography variant="caption">
          {props.likes} likes
        </StyledTypography>
      </CardActions>
    </StyledCard>
  )
}
