'use client'

import { db } from '@/firebase'; 
import { writeBatch, doc, collection, getDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText,
  DialogActions
} from '@mui/material';

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async () => {
    fetch('api/generate', {
      method: 'POST',
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const saveFlashcards = async () => {
    if (!name) {
      alert('Please enter a name');
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('Flashcard collection with the same name already exists');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    
    await batch.commit();
    handleClose();
    router.push('/flashcards');
  };

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
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        background: 'linear-gradient(135deg, #121212 0%, #1c1c1c 100%)', // Dark background gradient
        color: '#e1bee7', // Light purple 
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '1200px', 
          mt: 4, 
          mb: 6, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#e1bee7' }}>
          Generate Flashcards
        </Typography>
        <Paper 
          sx={{
            p: 4, 
            width: '100%', 
            backgroundColor: '#1c1c1c', // Dark paper background
            color: '#e1bee7', // Light purple text
            boxShadow: '0px 4px 20px rgba(106, 27, 154, 0.4)', // Subtle purple shadow
            borderRadius: '15px'
          }}
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2, backgroundColor: '#333', color: '#e1bee7', borderRadius: '5px' }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: '#7b1fa2', color: 'white' }}
            onClick={handleSubmit}
            fullWidth
          >
            Generate Flashcards
          </Button>
        </Paper>
      </Box>
      
      {flashcards.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: '1200px', mt: 4 }}>
          <Typography variant="h5" sx={{ color: '#e1bee7' }}>
            Generated Flashcards
          </Typography>
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
                            transform: flipped[index] 
                              ? 'rotateY(180deg)'
                              : 'rotateY(0deg)',
                          },
                          '& > div > div': {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display:'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing: 'border-box',
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)'
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
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ backgroundColor: '#7b1fa2', color: 'white' }} onClick={handleOpen}>
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { backgroundColor: '#1c1c1c', color: '#e1bee7' } }}>
        <DialogTitle sx={{ color: '#e1bee7' }}>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#b39ddb' }}>
            Please enter a name for your flashcard collection.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: '#333', color: '#e1bee7', borderRadius: '5px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#7b1fa2' }}>
            Cancel
          </Button>
          <Button onClick={saveFlashcards} sx={{ color: '#7b1fa2' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
