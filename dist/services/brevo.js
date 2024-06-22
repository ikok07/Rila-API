import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const brevo = __require("@getbrevo/brevo");
import { TransactionalEmailsApiApiKeys } from "@getbrevo/brevo";
export default class Brevo {
    static getInstance() {
        const instance = new brevo.TransactionalEmailsApi();
        instance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
        return instance;
    }
    static async sendEmail(templateId, username, userEmail, params) {
        try {
            const email = new brevo.SendSmtpEmail();
            email.templateId = templateId;
            email.to = [{ "name": username, "email": userEmail }];
            email.params = params;
            return await this.getInstance().sendTransacEmail(email);
        }
        catch (err) {
            throw err;
        }
    }
}
//# sourceMappingURL=brevo.js.map