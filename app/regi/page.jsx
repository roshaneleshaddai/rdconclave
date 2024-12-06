import Image from "next/image";
import React from "react";

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

  const publications = [
    { name: "IEEE Conference Proceedings (IEEE)", cost: "12000 INR", isJournal: false },
    { name: "Lecture Notes in Electrical Engineering (LNEE)", cost: "9000 INR", isJournal: false },
    { name: "Proceedings on Engineering Sciences (PES)", cost: "175 EUR", isJournal: true },
    { name: "Journal of Computational and Cognitive Engineering (JCC)", cost: "800 USD", isJournal: true },
    { name: "Journal of Infrastructure, Policy and Development (JIPD)", cost: "1800 USD", isJournal: true },
  ];

  return (
    <div className="relative font-SUSE min-h-screen w-screen mt-44 md:mt-56 flex-col items-center justify-center p-4">
      {/* Note Section */}
      <div className=" border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
        <p className="font-bold">Important Note</p>
        <p>
          Journals (marked with <span className="font-bold">*</span>) include an additional registration fee of 2000 INR.
        </p>
        <h2 className="lg:text-3xl text-2xl font-bold mb-4 text-center">Publication Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-2">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Publication</th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="px-4 py-2 border-b border-gray-200 font-semibold">
                    {pub.name} {pub.isJournal && <span className="text-red-500">*</span>}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">{pub.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Section */}
      <h2 className="lg:text-3xl text-2xl font-bold mb-4 text-center">For Payment</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 bg-gray w-full">
        <div className="flex flex-col lg:flex-row items-center justify-evenly mb-6">
          <div>
            <Image
              src="/images/1.png"
              width={300}
              height={300}
              alt="registration QR code"
              className="mb-4 md:mb-0 md:mr-6"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-2 mb-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Detail</th>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Information</th>
                </tr>
              </thead>
              <tbody>
                {bankDetails.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2 border-b border-gray-200 font-semibold">{item.label}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Publications Table */}
        
      </div>
    </div>
  );
};

export default Regi;
