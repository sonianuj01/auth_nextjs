
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    await sendEmail({
        email,
        emailType: "RESET",
        userId: user._id,
    });

    return NextResponse.json({ message: "Reset email sent" });
}