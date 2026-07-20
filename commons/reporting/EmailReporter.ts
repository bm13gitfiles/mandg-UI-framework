import * as nodemailer from "nodemailer";

export class EmailReporter {
    static async send(html: string, attachments: any[]) {
        try {
            console.log("PREPARING TO SEND EXECUTION REPORT EMAIL...");
            const transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER || "bm13mahendran@outlook.com",
                    pass: process.env.EMAIL_PASSWORD || "sqtrjqklkxnfwfuz"
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER || "bm13mahendran@outlook.com",
                to: "balu.m@merkle.com", // Adjust as necessary
                subject: "Playwright UI Automation Report",
                html: html,
                attachments: attachments
            });
            console.log("EXECUTION REPORT EMAIL SENT SUCCESSFULLY!");
        } catch (error) {
            console.error("FAILED TO SEND EMAIL REPORT:", error);
        }
    }
}
