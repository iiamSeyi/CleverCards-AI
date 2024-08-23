'use client'

import { Button, Container, Typography, Box, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { doc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return;

            const colRef = collection(doc(collection(db, 'users'), user.id), search);
            const docs = await getDocs(colRef);
            const flashcards = [];
            
            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() });
            });
            setFlashcards(flashcards);
        }
        getFlashcard();
    }, [search, user]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (!isLoaded || !isSignedIn) {
        return <></>;
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
            <Box sx={{ width: '100%', maxWidth: '1200px', mt: 2, display: 'flex', justifyContent: 'flex-end', px: 2 }}>
                <Button variant="contained" sx={{ backgroundColor: '#7b1fa2', color: 'white' }} onClick={() => router.back()}>
                    Go Back
                </Button>
            </Box>
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
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box 
                                            sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}
                                        >
                                            <div>
                                                <div>
                                                    <Typography variant="h5" component="div" sx={{ color: '#e1bee7' }}>
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" component="div" sx={{ color: '#e1bee7' }}>
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
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
