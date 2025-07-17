// import { NextResponse } from 'next/server';
// import prisma from 'prisma'; 

// // GET: Fetch all leads
// export async function GET() {
//   try {
//     const leads = await prisma.lead.findMany({
//       orderBy: { createdAt: 'desc' },
//       include: {
//         user: true,
//         company: true,
//         reminders: true,
//       },
//     });

//     return NextResponse.json(leads);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // POST: Create a new lead
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const {
//       name,
//       email,
//       phone,
//       status,
//       assignedTo,
//       source,
//       notes,
//       companyId,
//     } = body;

//     if (!name || !email || !phone || !status || !assignedTo) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     const newLead = await prisma.lead.create({
//       data: {
//         name,
//         email,
//         phone,
//         status,
//         assignedTo,
//         source,
//         notes,
//         companyId,
//       },
//     });

//     return NextResponse.json(newLead, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
