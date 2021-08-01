import { Selector, t } from 'testcafe';
import Routing from '../routing';
// import mailosaur from 'mailosaur';
import MailosaurClient from "mailosaur";
class SignupPage {
	public countryCode: Selector;
	public registrationNumber: Selector;
	public firstName: Selector;
	public lastName: Selector;
	public email: Selector;
	public emailConfirmation: Selector;
	public phoneNumber: Selector;
	public submitButton: Selector;
	public loginLink: Selector;
	public successMessage: Selector;
	public errorMessage: Selector;
	public duplicatedCVRWarning: Selector;
	public consentCheckbox: Selector;
	public alertMessage: Selector;
	public verificationPage: Selector;
	public existingAccount: Selector;
	public customerNum : Selector;
	public continue : Selector;
	constructor() {
		this.countryCode = Selector('mat-select[formcontrolname="countryCode"]');
		this.registrationNumber = Selector('input[formcontrolname="registrationNumber"]');
		this.firstName = Selector('input[formcontrolname="firstName"]');
		this.lastName = Selector('input[formcontrolname="lastName"]');
		this.email = Selector('input[formcontrolname="email"]');
		this.emailConfirmation = Selector('input[formcontrolname="emailConfirmation"]');
		this.phoneNumber = Selector('input[formcontrolname="phoneNumber"]');
		this.submitButton = Selector('button[type="submit"]');
		// TODO - Define proper selectors for the missing class variables.
		this.loginLink=Selector('a[href="#/public"]');
		this.continue=Selector('button[name="confirm"]');
		this.duplicatedCVRWarning=Selector('[name="duplicate-warning"]');
		this.consentCheckbox=Selector('input[type="checkbox"]');
		this.verificationPage=Selector('input[name="code"]');
		this.alertMessage=Selector('[class="mat-dialog-content"] p');
		this.existingAccount=Selector('[class="mat-dialog-title"]');
		this.customerNum=Selector('[name="customer-number"]');
	}

	async navigateToPage() {
		await t.navigateTo(`https://app-demo.novemberfirst.com/${Routing.SIGN_UP}`);
	}

	async fillForm(cvr: string, email: string) {
		// TODO - implement missing method.
		// This method is a guidance. You can define any other method in this page-model that resembles the page actions
		await t
			.typeText(this.registrationNumber, cvr)
			.typeText(this.email, email)
			.typeText(this.emailConfirmation,email);
		
		
	}

	async submitForm() {
		// TODO - implement missing method.
		// This method is a guidance. You can define any other method in this page-model that resembles the page actions
		await t
			.click(this.submitButton)
		
	}
	
	async enterCustomerNumber()  {
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

		const regEx = new RegExp('([0-9]{9})')
		const matches = regEx.exec(email.text.body)

		console.log(matches[0]) // 
		await t.typeText(this.customerNum,matches[0])
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
	async selectCountry() {
		await t
			.click(this.countryCode)
			.wait(1000)
			.click(this.countryOption('DK'));
	}

	async fillPersonalInfo(firstname: string, lastname: string,phone: string) {
		// TODO - implement missing method.
		// This method is a guidance. You can define any other method in this page-model that resembles the page actions
		t.typeText(this.firstName, firstname)
			.typeText(this.lastName, lastname)
			.typeText(this.phoneNumber,phone)
			.click(this.consentCheckbox);
		
	}

	private countryOption(value: string): Selector {
		return Selector('mat-option[country-code="' + value + '"]');
	}
}

export default new SignupPage();
