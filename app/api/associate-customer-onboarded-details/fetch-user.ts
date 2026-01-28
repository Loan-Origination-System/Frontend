// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

//   try {
//     const response = await fetch(
//       "http://119.2.100.178/api/cdms/associate-customer-onboarded-details",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(req.body),
//       }
//     );

//     const data = await response.json();
//     res.status(response.status).json(data);
//   } catch (err) {
//     console.error("Proxy error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
