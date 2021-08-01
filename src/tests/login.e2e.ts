import { t } from 'testcafe';
import Routing from '../model/routing';
import Times from '../model/waiting-times';
import LoginPage from '../model/page-models/login.model';
import { Selector } from 'testcafe';

fixture('Login')
	.page(`https://app-demo.novemberfirst.com/${Routing.PUBLIC}`)
	.meta('section', 'public');

test
	('Signup link exists', async t => {
		await t.expect(LoginPage.signupLink.exists).ok({ timeout: Times.SHORT });
	});

test
	('Forgot password link exists', async t => {
		await t.click(Selector('#mat-select-value-1'))
			.click(Selector('[value=en] span'))
			.expect(LoginPage.forgotPasswordLink.exists).ok({ timeout: Times.SHORT })
			.expect(Selector('.info-right').innerText).eql('Forgot password?');
		// TODO - assert that the forgot password link exists.
	});

test
	('Submit valid credentials and accounts', async t => {
		//TODO - Login with the created account and assert a correct login.
		await t.click(Selector('#mat-select-value-1'))
				.click(Selector('[value=en] span'));
		 await LoginPage.submitForm({
		 	accountNumber: '208102161',
		 	email: 'vinothgopal3792@gmail.com',
		 	password: 'Vinoth@123',
		 	environment: 'demo',
		 	economicToken: ''
		 });
	
		await t.click('#user-button')
		.expect(Selector('.current-user-name').innerText).eql('vinoth')
		.click('#logout')
			// .typeText(LoginPage.customerNumber, '208102161')
			// .typeText(LoginPage.email, 'vinothgopal3792@gmail.com')
			// .typeText(LoginPage.password, 'Vinoth@123')
			// .click(LoginPage.submitButton)
			
	});

test
	('Submit invalid credentials and show an error message', async t => {
		// TODO - Type a wrong password and assert that an error message appear.
		// NOTE: if the password is type 5 times wrong in a row the account is blocked. Might be good idea to use the same account
		// as the login to prevent the account lock.
		await t.click(Selector('#mat-select-value-1'))
			.click(Selector('[value=en] span'));
		await LoginPage.submitForm({
				accountNumber: '208102161122',
				email: 'vinothgopal@gmail.com',
				password: 'Vinoth@123',
				environment: 'demo',
				economicToken: ''
		});
		await t.expect(Selector('[type=error] n1-auth-errors ').innerText).contains('Your login attempt was unsuccessful');
	})
