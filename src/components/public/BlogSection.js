import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BlogSection() {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/contentblocks/slug/blog-section")
      .then(res => {
        const block = res.data.data;
        setContent(block?.Content || "<div>Section not found.</div>");
      });
  }, []);

  return (
    <section className="w-full">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}



// import React from "react";

// export default function BlogSection() {
//   return (
//     <section className="bg-white w-full pt-10 pb-12 border-t-8 border-[#116353] border-b-8 border-red-600">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center px-4">
//         {/* Left: Text */}
//         <div
//           className="flex-1 text-gray-800 text-lg leading-relaxed"
//           style={{ fontFamily: "math" }}
//         >
//           <p>
//             <span className="font-bold uppercase">Welcome to DAILY SATTA RESULT</span>, your ultimate destination for all things related to daily satta result and Satta matka results. We are dedicated to providing precise and up-to-date details about the world of Satta matka. We aim to be your primary resource for the latest information in this exciting and ever-evolving industry, helping experienced players and newcomers alike. Our team of dedicated experts brings together years of experience in the daily satta matka and daily satta king industry to ensure you receive the most reliable updates and results. We understand the diverse nature of the game and the importance of reliable information to guide informed decisions. Our dedication lies in producing trustworthy and impartial content while upholding principles of honesty and transparency. What sets us apart is our unwavering focus on serving our audience diligently. We recognize the varying requirements of daily satta matka and satta king news enthusiasts, tailoring our content for newcomers and seasoned players.
//           </p>
//         </div>
//         {/* Right: Image */}
//         <div className="flex-1 flex justify-center">
//           <img
//             src="/golden-pot.jpg"
//             alt="Golden Matka Pot"
//             className="rounded-none object-cover w-[430px] h-[430px] max-w-full"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

