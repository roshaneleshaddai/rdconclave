import Image from "next/image";
import React from 'react';

const Regi = () => {
  const bankDetails = [
    { label: "Name of the Bank", value: "CANARA BANK" },
    { label: "Name of the Account Holder", value: "Principal, V.R.Siddhartha Engineering College" },
    { label: "Account Type", value: "Savings Bank" },
    { label: "Account Number", value: "33672200004978" },
    { label: "Bank Branch IFSC Code", value: "CNRB0013367" },
    { label: "MICR No.", value: "520015027" },
    { label: "Bank Branch Address", value: "VRS ENGG COLLEGE, KANURU, VIJAYAWADA - 520007" },
    { label: "SWIFT CODE", value: "CNRBINBBBFD" },
    { label: "COLLEGE PAN", value: "AABTS1271J" },
    { label: "COLLEGE GST NO.", value: "37AABTS1271J4ZA" },
    { label: "Institution Permanent ID", value: "1-10213343" },
    { label: "PFMS Unique code", value: "VRSEC" },
  ];

  return (
    <div className="relative font-SUSE min-h-screen w-screen mt-44 md:mt-56 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">For Payment :</h2>
        <div className="flex flex-col items-center justify-center mb-6">
          <Image
            src="/images/1.png"
            width={300}
            height={300}
            alt="registration QR code"
            className="mb-4 md:mb-0 md:mr-6"
          />
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Detail</th>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Information</th>
                </tr>
              </thead>
              <tbody>
                {bankDetails.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="px-4 py-2 border-b border-gray-200 font-semibold">{item.label}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regi;
