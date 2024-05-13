import WelcomeEmail from '@/emails/Welcome'
import { Resend } from 'resend'

export const resend = new Resend(import.meta.env.RESEND_API_KEY)
const audienceId = import.meta.env.RESEND_AUDIENCE_ID

if (!resend) {
    throw new Error('RESEND_API_KEY es requerido')
}

if (!audienceId) {
    throw new Error('RESEND_AUDIENCE_ID es requerido')
}

export const welcomeEmail = async (email: string) => {
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Gracias por Suscribirte!',
        react: WelcomeEmail({ url: `http://localhost:4321/gracias?email=${email}` })
    })
    if (data){
        return true
    }
    if (error) {
        return false
    }
}

export const subscribeEmail = async (email: string) => {
    await resend.contacts.create({
        audienceId,
        email,
    })
}