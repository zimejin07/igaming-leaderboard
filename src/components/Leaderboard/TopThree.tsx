"use client";

import { useEffect, useState } from "react";
import { Player } from "@/lib/store";
import { motion, Variants } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Image from "next/image";

interface Props {
  players: Player[];
}

export default function TopThree({ players }: Props) {
  const [first, second, third] = players;
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Set up a timer to change the state after 10 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false); // Hide confetti after the timer expires
    }, 10000);

    // Cleanup function to clear the timeout if the component unmounts or re-renders
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run effect only once on mount

  const cardVariant: Variants = {
    hidden: {
      opacity: 0, // Initial opacity for the hidden state
      scale: 0.9, // Initial scale for a slightly smaller appearance
      y: 20, // Initial vertical position (slightly shifted down)
    },
    visible: (i: number) => ({
      opacity: 1, // Fully opaque in the visible state
      scale: i === 0 ? 1.1 : 1, // Slightly larger scale for the first item
      y: 0, // Reset vertical position to align with the view
      transition: {
        type: "spring", // Transition type for spring-like motion
        stiffness: 300, // Stiffness of the spring for bounce effect
        damping: 20, // Damping factor to control oscillation
        delay: i * 0.2, // Delay based on the item's index for staggered animation
      },
    }),
  };

  const renderCard = (player: Player, i: number) => (
    <motion.div
      key={player.name}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={cardVariant}
      className="bg-[#1c1f2e] p-4 rounded-lg text-center shadow-md hover:scale-105 transition-transform duration-200"
    >
      <div className="relative mx-auto w-16 h-16">
        <img
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${player.name}`}
          alt={`Avatar of ${player.name}`}
          className="object-cover"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h3 className="text-lg font-semibold mt-2">{player.name}</h3>
      <p className="text-sm text-gray-400">Score {player.score}</p>
      <div className="text-sm mt-1">💎</div>
    </motion.div>
  );

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {second && renderCard(second, 1)}
        {first && renderCard(first, 0)}
        {third && renderCard(third, 2)}
      </motion.div>
    </>
  );
}
