import { Selector, t } from 'testcafe';
import { Account } from '../account';

class LoginPage {
	public customerNumber: Selector;
	public email: Selector;
	public password: Selector;
	public rememberCustomerNumber: Selector;
	public submitButton: Selector;
	public signupLink: Selector;
	public forgotPasswordLink: Selector;
	public errorMessage: Selector;
	public bannedMessage: Selector;
	public alertMessage: Selector;

	constructor() {
		this.customerNumber = Selector('input[formcontrolname="customerNumber"]');
		this.email = Selector('input[formcontrolname="userName"]');
		this.password = Selector('input[formcontrolname="password"]');
		this.rememberCustomerNumber = Selector('#save-customer-number');
		this.submitButton = Selector('button[type="submit"]');
		this.signupLink = Selector('a[href="#/public/signup"]');
		this.forgotPasswordLink = Selector('a[href="#/public/enter-your-details"]');
		this.alertMessage = Selector('n1-alert-message');
		this.errorMessage = this.alertMessage.withAttribute('name', 'failed_login');
		this.bannedMessage = this.alertMessage.withAttribute('name', 'locked_down');
	}

	async submitForm(login: Account) {
		await t
			.typeText(this.customerNumber, login.accountNumber)
			.typeText(this.email, login.email)
			.typeText(this.password, login.password)
			.click(this.submitButton);
	}

	async clearForm() {
		await t
			.click(this.customerNumber).pressKey('ctrl+a delete')
			.click(this.email).pressKey('ctrl+a delete')
			.click(this.password).pressKey('ctrl+a delete');
	}
}

export default new LoginPage();
