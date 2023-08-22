"use client";

import Image from "next/image";

const Avater = () => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avater"
      src="/images/user.png"
    />
  );
};

export default Avater;
