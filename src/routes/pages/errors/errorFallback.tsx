import { Box, Alert, AlertTitle, Typography, Button } from "@mui/material";

export default function Fallback({ error, resetErrorBoundary }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return (
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error.message}
            </Alert>
            <Button variant="text" onClick={() => resetErrorBoundary()}>Try again</Button>
        </Box>
    );
}
