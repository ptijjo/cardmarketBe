
import { MailService } from '../../services/mail.service';

const mailService = new MailService();

export const sendMailForgetPassword = async (email: string, firstname: string, lastname: string, link: string) => {

    try {
        const subject = `${firstname},  réinitialisez votre mot de passe 🔒`;

    const prehead = `
        <p>Bonjour ${firstname} ${lastname},</p>
    `;

    const content = `
        
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Pour cela, cliquez sur le lien ci-dessous : </p>
        <p> <a href="${link}">${link}</a></p>
        
    `;

    const disclaimer = `
        <p>Si vous n'étes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p>
        <p>A bientôt sur <a href="https://ventecartesvibz.com">Carte Vibz</a></p>
    `;

    const buttonText = 'Réinitialiseer mon mot de passe';

    
    
        const lien = await mailService.sendEmail(email, subject, content, lastname, firstname, link, disclaimer, prehead, buttonText);

        console.log(lien);
        
    
        
    } catch (error) {
        console.log(error)
    }

    
}