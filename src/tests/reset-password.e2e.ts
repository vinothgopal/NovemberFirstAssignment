import {t} from 'testcafe';
import ForgotPasswordPage from '../model/page-models/forgot-password.model'
import Times from "../model/waiting-times";
import { Selector } from 'testcafe';
import SignupPage from '../model/page-models/signup.model';
fixture('ResetPassword')
	.meta('section', 'public');

test
('Reset password and login', async t => {
	await ForgotPasswordPage.navigateToPage();
	await t.click(Selector('#mat-select-value-1'))
			.click(Selector('[value=en] span'))
	await ForgotPasswordPage.submitForm({
		accountNumber: '208102161',
		email: 'vinothgopal3792@gmail.com',
		password: 'Vinoth@123',
		environment: 'demo',
		economicToken: ''
	});
	

	// TODO - OPTIONAL - create a test that reset the password from an account.
	// 1. Use forgot-password model and request a new password. This page will send a code to the account email.
	// 2. Get the code from the email (at n1 we use mailosaur.com, you have a free 15 days trial if you want to use this, or feel free to use any other method)
	// 3. The code is used in reset-password.model.ts to reset the users model.
	// 4. assert the correctness of the process.
})
