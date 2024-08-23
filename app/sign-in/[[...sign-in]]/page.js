import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
    return (
        <Container
            maxWidth={false}
            disableGutters={true}
            sx={{
                minHeight: '100vh',
                width: '100vw',
                padding: 0,
                margin: 0,
                background: 'linear-gradient(135deg, #121212 0%, #1c1c1c 100%)', // Dark background gradient
                color: '#e1bee7', // Light purple text
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Roboto, sans-serif',
            }}
        >
            <AppBar position="static" sx={{ backgroundColor: '#6a1b9a', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.5rem' }}>
                        Flashcard SaaS
                    </Typography>
                    <Link href="/sign-in" passHref>
                        <Button color="inherit">Login</Button>
                    </Link>
                    <Link href="/sign-up" passHref>
                        <Button color="inherit">Sign Up</Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    textAlign: 'center',
                    my: 4,
                    p: 4,
                    background: '#1c1c1c', // Dark background for sign-in box
                    borderRadius: '15px',
                    boxShadow: '0px 4px 30px rgba(106, 27, 154, 0.6)', // Dark purple shadow
                    color: '#e1bee7', // Light purple text
                    maxWidth: '400px',
                    width: '100%',
                }}
            >
                <Typography variant='h4' sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                    Sign In
                </Typography>
                <SignIn />
            </Box>
        </Container>
    )
}
