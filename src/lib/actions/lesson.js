// 'use server';
// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// export const createLesson = async (lessonData) => {
// const res = await fetch(`${baseUrl}/lesson`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(lessonData),
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch lesson');
//   }

//   return res.json();    

// }