"use client";

import Image from "next/image";

interface AvaterProps {
  src?: string | null | undefined;
}
// Avater
const Avater: React.FC<AvaterProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avater"
      src={src || "/images/user.png"}
    />
  );
};

export default Avater;
