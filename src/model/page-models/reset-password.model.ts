import { Selector, t } from 'testcafe';
import MailosaurClient from "mailosaur";
class ResetPasswordPage {
	// TODO - Create page model following the standards of login.model.ts and forgot-password.model.ts

	
	public forgotPasswordLink: Selector;
	public customernumber: Selector;
	public email: Selector;
	public continuebutton: Selector;
	public verificationcode: Selector;
	public passowrd: Selector;
	public passwordConfirmation: Selector;
	public setpassword: Selector;
	constructor() {
		this.forgotPasswordLink = Selector('.info-right');
		this.customernumber = Selector('input[name="customer-number"]');
		this.email = Selector('input[name="email"]');
		this.continuebutton=Selector('button[type="submit"]')
		this.verificationcode=Selector('input[name="code"]')
		this.passowrd=Selector('input[name="password"]')
		this.passwordConfirmation=Selector('input[name="password-confirmation"]')
		this.setpassword=Selector('button[type="submit"]')
	}
}
