'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Grid, Box, AppBar, Button, Container, Toolbar, Typography, CssBaseline } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {

  const handleSubmit = async (planType) => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          origin: 'http://localhost:3000',
        },
        body: JSON.stringify({ planType }), 
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSession.status === 500) {
        console.error(checkoutSessionJson.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  useEffect(() => {
    // Any necessary setup can be done here
  }, []);

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
        overflowY: 'auto',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <CssBaseline />

      <Head>
        <title>CleverCards AI</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#6a1b9a', boxShadow: 'none', width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.5rem' }}>CleverCards AI</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ fontSize: '1rem' }}>Login</Button>
            <Button color="inherit" href="/sign-up" sx={{ fontSize: '1rem' }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1c1c1c',
          borderRadius: '15px',
          margin: '2rem',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0px 4px 30px rgba(106, 27, 154, 0.6)', // Darker purple shadow
          width: 'calc(100% - 4rem)', // Ensures the Box takes up full width minus margin
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#e1bee7' }}>
          Welcome to CleverCards AI
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontSize: '1.25rem', color: '#e1bee7' }}>
          The easiest way to create AI-powered flashcards from your text
        </Typography>
        <Button variant="contained" sx={{ mt: 2, px: 4, py: 1.5, background: '#7b1fa2', color: 'white', fontSize: '1.1rem' }} href="/sign-in">
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 6, paddingX: 4, width: '100%' }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#e1bee7' }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1.25rem', fontWeight: '500', color: '#e1bee7' }}>
              Effortless Text Input
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: '#d1c4e9' }}>
              Inputting your study material is a breeze. 
              Just type or paste your text, and our intuitive software will handle the rest. 
              Whether you’re cramming for an exam or casually reviewing, creating flashcards has never been simpler or faster.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1.25rem', fontWeight: '500', color: '#e1bee7' }}>
              AI-Powered Smart Flashcards
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: '#d1c4e9' }}>
              Harness the power of AI to transform your text into concise, effective flashcards. 
              Our advanced algorithms break down complex information into bite-sized pieces, tailored perfectly for efficient studying. 
              With Smart Flashcards, you’re always one step ahead in your learning journey.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1.25rem', fontWeight: '500', color: '#e1bee7' }}>
              Anywhere, Anytime Access
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: '#d1c4e9' }}>
              Never miss a study session again. 
              With seamless syncing across all your devices, you can access your flashcards from your phone, tablet, 
              or computer—wherever and whenever you need them. Whether you’re on the train, at the coffee shop, or at home, studying on the go has never been more convenient.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 6, textAlign: 'center', paddingX: 4, width: '100%' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#e1bee7' }}>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 4,
              backgroundColor: '#1c1c1c', // Dark background for cards
              borderRadius: '15px',
              boxShadow: '0px 4px 30px rgba(106, 27, 154, 0.6)', // Darker purple shadow
              border: '1px solid rgba(106, 27, 154, 0.4)',
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#e1bee7' }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1.25rem', color: '#e1bee7' }}>
                Free
              </Typography>
              <Typography sx={{ fontSize: '1rem', color: '#d1c4e9' }}>
                Limited card generation sessions <br />
                1 GB storage <br />
                Basic support
              </Typography>
              <Button variant="contained" sx={{ mt: 2, px: 4, py: 1.5, background: '#7b1fa2', color: 'white', fontSize: '1.1rem' }} href="/sign-in">
                Get Started
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 4,
              backgroundColor: '#1c1c1c',
              borderRadius: '15px',
              boxShadow: '0px 4px 30px rgba(106, 27, 154, 0.6)',
              border: '1px solid rgba(106, 27, 154, 0.4)',
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#e1bee7' }}>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1.25rem', color: '#e1bee7' }}>
                $10 / month
              </Typography>
              <Typography sx={{ fontSize: '1rem', color: '#d1c4e9' }}>
                Unlimited card generation sessions <br />
                Unlimited storage <br />
                Priority support
              </Typography>
              <Button variant="contained" sx={{ mt: 2, px: 4, py: 1.5, background: '#7b1fa2', color: 'white', fontSize: '1.1rem' }} onClick={() => handleSubmit('pro')}>
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
