import contactForm from '../styles/contact-form.module.scss';
import buttons from '../styles/buttons.module.scss';

import { DefaultPageWrap } from '../components/default-page-wrap';
import { FormEvent, RefObject, useRef, useState } from 'react';
import FeaturePhoto from '../components/feature-photo';

function useForm() {
	const [state, setState] = useState({
		didSubmit: false,
		errors: {
			name: false,
			email: false,
			message: false,
		},
	});

	function submitForm(event: FormEvent) {
		const formElement: HTMLFormElement = event.target as any;
		const formData = new FormData(formElement);
		const errors: (keyof typeof state.errors)[] = [];
		if (!formData.get('name')) {
			errors.push('name');
		}
		if (
			!formData.get('_replyto') ||
			!(formData.get('_replyto') as string).includes('@')
		) {
			console.log(formData.get('_replyto'));
			errors.push('email');
		}
		if (!formData.get('message')) {
			errors.push('message');
		}

		if (errors.length) {
			setState((prevState) => ({
				...prevState,
				errors: ['name', 'email', 'message'].reduce(
					(memo, key) => ({ ...memo, [key]: errors.includes(key as any) }),
					{} as any
				),
			}));
			event.preventDefault();
		}
	}

	return [state, submitForm] as const;
}

function renderForm({ errors, submitForm }) {
	return (
		<>
			<form
				onSubmit={submitForm}
				className={contactForm.form}
				action="https://mailthis.to/info@playmarin.org"
				method="POST"
				encType="multipart/form-data"
			>
				<input
					className={[
						contactForm.input,
						...(errors.name ? [contactForm.error] : []),
					].join(' ')}
					type="text"
					name="name"
					placeholder="Name"
				/>
				<input
					className={[
						contactForm.input,
						...(errors.email ? [contactForm.error] : []),
					].join(' ')}
					type="email"
					name="_replyto"
					placeholder="Email"
				/>
				<label className={contactForm.messageLabel}>
					Message
					<textarea
						className={[
							contactForm.textarea,
							...(errors.message ? [contactForm.error] : []),
						].join(' ')}
						name="message"
					></textarea>
				</label>
				<input type="hidden" name="_subject" value="Contact form submitted" />
				<input type="hidden" name="_honeypot" value="" />
				<input type="hidden" name="_confirmation" value="" />
				<input
					className={[buttons.primary, contactForm.submit].join(' ')}
					type="submit"
					value="Submit"
				/>
			</form>
			<hr className={contactForm.seperator} />
			<ul className={contactForm['info-sidebar']}>
				<li>
					<div
						className={[
							contactForm['info-illustration'],
							contactForm.email,
						].join(' ')}
					></div>
					info@playmarin.org
				</li>
				<li>
					<div
						className={[
							contactForm['info-illustration'],
							contactForm.phone,
						].join(' ')}
					></div>
					+1 415 944 7141
				</li>
				<li>
					<div
						className={[
							contactForm['info-illustration'],
							contactForm.address,
						].join(' ')}
					></div>
					PO BOX 530
					<br />
					Sausalito, CA
					<br />
					94965
				</li>
			</ul>
		</>
	);
}

function renderThankYou() {
	return <p>Message sent. We'll get back to you shortly!</p>;
}

export default function Contact() {
	const [{ errors, didSubmit }, submitForm] = useForm();

	return (
		<DefaultPageWrap activeMenuItem="contact">
			<FeaturePhoto url="http://playmarin.org/uploads/Copy_of_pauleasya_34901526_233206387455704_7377692081432559616_n_2_1_977fb80af3.jpg"></FeaturePhoto>
			<h1 className={contactForm.title}>Send us a message</h1>
			<div className={contactForm.content}>
				{didSubmit ? renderThankYou() : renderForm({ errors, submitForm })}
			</div>
		</DefaultPageWrap>
	);
}
