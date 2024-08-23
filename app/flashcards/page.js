'use client'

import { db } from '@/firebase' 
import { collection, doc, getDoc, setDoc} from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid,
    Typography,
    Box,
} from '@mui/material';

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
        async function getFlashcards() {
          if (!user) return;
          const docRef = doc(collection(db, 'users'), user.id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            setFlashcards(collections);
          } else {
            await setDoc(docRef, { flashcards: [] });
          }
        }
        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    }

    return (
        <Container 
            maxWidth={false} 
            disableGutters={true} 
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 0,
                margin: 0,
                background: 'linear-gradient(135deg, #121212 0%, #1c1c1c 100%)', // Dark background gradient
                color: '#e1bee7', // Light purple text
                fontFamily: 'Roboto, sans-serif',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '1200px', mt: 4 }}>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: '#1c1c1c', // Dark card background
                                    color: '#e1bee7', // Light text color
                                    borderRadius: '15px',
                                    boxShadow: '0px 4px 20px rgba(106, 27, 154, 0.4)', // Subtle purple shadow
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: '#e1bee7' }}>
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
