import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import SecretCodeCard from './SecretCodeCard';

export default function Cards({ handleShowMainContent }) {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(true); // Confetti shows once

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateWindowSize();
        window.addEventListener('resize', updateWindowSize);
        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="min-h-screen flex items-center justify-center p-4"
            >
                <SecretCodeCard onCorrect={handleShowMainContent} />

                {showConfetti && (
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        numberOfPieces={500}
                        recycle={false}
                        colors={['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093', '#C71585']}
                        confettiSource={{
                            x: windowSize.width / 2,
                            y: windowSize.height / 2,
                            w: 0,
                            h: 0
                        }}
                        initialVelocityX={{ min: -7, max: 7 }}
                        initialVelocityY={{ min: -7, max: 7 }}
                        gravity={0.015}
                        tweenDuration={4000}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
}
