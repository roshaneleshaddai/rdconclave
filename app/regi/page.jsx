import Image from "next/image";
import React from 'react'
const Regi = () => {
  return (
    <div className="flex items-center justify-center ">
      <div>
        <p className="text-2xl font-bold p-4">For registration:</p>
        <Image src="/1.png" width={300} height={300} alt="registration Qr code"/>
      </div>
    </div>
  )
}

export default Regi
