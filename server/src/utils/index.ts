import nodemailer from "nodemailer";
import "dotenv/config"
import path from 'path';

const pass = process.env.GOOGLE_PASS as string;
const user = process.env.GOOGLE_NAME as string;


export type MailMessage = {
    to: string,
    subject: string,
    text: string
}

export const sendMessage = async (message: MailMessage) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user,
            pass
        },
    });

    let info = await transporter.sendMail({
        from: 'Stud <studportal.contact@gmail.com>', // sender address
        to: message.to, // list of receivers
        subject: message.subject, // Subject line
        text: message.text, // plain text body

    });

    console.log("Message sent: %s", info.messageId);
}



export const newError = (status?: number, message?: string, options?: any) => {
    return {
        status: status || 500,
        message: message || 'Internal Server Error',
        ...options
    }
}

export const newResponse = (message: string, status: number = 200, options?: any) => {
    return  options ? {
        status,
        message,
        ...options
    }
    :
    {
        status,
        message,
        ...options
    }
}

export function hasThirtyMinutesPassed(time: string): boolean {
    // Parse the date string into a Date object
    const dbDate: Date = new Date(time);

    // Get the current date and time
    const currentDate: Date = new Date();

    // Calculate the difference in milliseconds
    const difference: number = currentDate.getTime() - dbDate.getTime();

    // Convert the difference from milliseconds to minutes
    const differenceInMinutes: number = difference / (1000 * 60);

    // Return true if 30 minutes have passed, false otherwise
    return differenceInMinutes >= 30;
}

