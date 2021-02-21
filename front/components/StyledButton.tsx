import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
  border-color: ${(props) => props.theme.palette.primary.contrastText};
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.dark};
  }
`

export default StyledButton
