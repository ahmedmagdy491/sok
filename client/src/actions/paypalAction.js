import axios from 'axios';

const PAYPAL_CLIENT =
	'AadkgopSfK3_OtaYe4jNcPK-A8uV3RrJelTKG7DMwFJlNeuR3pOBHyMJKjrx8ELwIGLNfir_EGD8UeYk';
const PAYPAL_SECRET =
	'EC3cP_qqosipFrKb-emG4_KniWit_3aGc4_iC7z6FAINmGiGuqN6eWk8NsdXW_4lPL3uc8ANZ0DVfvqp';

const PAYPAL_OAUTH_API = 'https://api-m.sandbox.paypal.com/v1/oauth2/token/';

const PAYPAL_AUTHORIZATION_API =
	'https://api-m.sandbox.paypal.com/v2/payments/authorizations/';

const basicAuth = btoa(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`);

export const paypalAction = () => {
	const data = axios.post(PAYPAL_OAUTH_API, {
		headers: {
			Accept: `application/json`,

			Authorization: `Basic ${basicAuth}`,
		},

		data: `grant_type=client_credentials`,
	});

	console.log(data);
};
