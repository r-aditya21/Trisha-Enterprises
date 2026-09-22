import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured' },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const data = await request.json();

    // 1. Send data to Google Sheets
    if (GOOGLE_SHEET_URL) {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }

    // 2. Send an Email Notification to your inbox
    await resend.emails.send({
      from: 'Leads <onboarding@resend.dev>', // Update this when you add your custom domain to Resend
      to: 'rsadityarajput@gmail.com',  // Where you want to receive the lead alert
      subject: `🚨 New ${data.propertyType} Lead: ${data.name}`,
      html: `
        <h3>New Inquiry Details:</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Property Type:</strong> ${data.propertyType}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Backend error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}