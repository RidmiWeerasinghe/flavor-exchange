import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

interface Props { }

function Spinner(props: Props) {
    const { } = props

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}

export default Spinner
