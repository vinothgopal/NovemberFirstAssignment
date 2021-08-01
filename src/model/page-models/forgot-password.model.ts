import { Selector, t } from 'testcafe';
import Routing from '../routing';
import { Account } from '../account';
import MailosaurClient from "mailosaur";
class ForgotPasswordPage {
	public customerNumber: Selector;
	public email: Selector;
	public submitButton: Selector;
	public loginLink: Selector;
	public successMessage: Selector;
	public verificationPage: Selector;
	
	constructor() {
		this.customerNumber = Selector('input[formcontrolname="customerNumber"]');
		this.email = Selector('input[formcontrolname="email"]');
		this.submitButton = Selector('button[type="submit"]');
		this.loginLink = Selector('a[name="login"]');
		this.successMessage = Selector('n1-alert-message .alert[type="success"]');
		this.verificationPage = Selector('n1-verification-code');
		
	}

	async navigateToPage() {
		await t.navigateTo(`https://app-demo.novemberfirst.com/${Routing.FORGOT_PASSWORD}`);
	}

	async submitForm(account: Account) {
		await t
			.typeText(this.customerNumber, account.accountNumber)
			.typeText(this.email, account.email)
			.click(this.submitButton);
	}
	async enterverificationcode()  {
		// const MailosaurClient = require('mailosaur')
	  
		// Available in the API tab of a server
		const apiKey = 'lbG0sJTHlSjtZnpK'
		const serverId = 'nphy6hol'
		const serverDomain = 'nphy6hol.mailosaur.net'
		const mailosaur = new MailosaurClient(apiKey)
	  
		const criteria = {
		  sentTo: 'morning-struck@' + serverDomain
		}
	  
		const email = await mailosaur.messages.get(serverId, criteria)
	  
		console.log(`Subject: ${email.received}`)

		console.log(email.text.body) // "Your access code is 243546."

		const regEx = new RegExp('([A-Z]{2}[0-9]{6})')
		const matches = regEx.exec(email.text.body)

		console.log(matches[0]) // 
		await t.typeText(this.verificationPage,matches[0])
	  }
}

export default new ForgotPasswordPage();
