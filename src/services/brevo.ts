import brevo = require("@getbrevo/brevo")
import {TransactionalEmailsApiApiKeys} from "@getbrevo/brevo"

export default class Brevo {

    private static getInstance() {
        const instance = new brevo.TransactionalEmailsApi()
        instance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string)
        return instance
    }

    static async sendEmail(templateId: number, username: string, userEmail: string, params?: object) {
        try {
            const email = new brevo.SendSmtpEmail()
            email.templateId = templateId
            email.to = [{"name": username, "email": userEmail}]
            email.params = params

            return await this.getInstance().sendTransacEmail(email)
        } catch(err) {
            throw err
        }
    }


}