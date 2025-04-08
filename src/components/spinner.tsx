import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

interface Props { }

function Spinner(props: Props) {
    const { } = props

    return (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
        </Stack>
    )
}

export default Spinner
