'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!sessionId) return;

      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${sessionId}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [sessionId]);

  const commonBoxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #121212 0%, #1c1c1c 100%)", // Dark background gradient
    color: "#e1bee7", // Light purple text
    padding: "2rem",
    textAlign: "center",
  };

  if (loading) {
    return (
      <Box sx={commonBoxStyles}>
        <CircularProgress sx={{ color: "#e1bee7" }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={commonBoxStyles}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={commonBoxStyles}>
      {session.payment_status === "paid" ? (
        <>
          <Typography variant="h4">Your purchase was successful!</Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Session ID: {sessionId}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              We have received your payment. You will receive an email with your
              order details shortly.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Payment Failed!
          </Typography>
          <Typography variant="body1">
            Your payment was not successful. Please try again!
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ResultPage;
