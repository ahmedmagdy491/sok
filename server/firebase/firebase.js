var adminFb = require('firebase-admin');

adminFb.initializeApp({
	credential: adminFb.credential.cert({
		type: 'service_account',
		project_id: 'ecommerce-e38d2',
		private_key_id: 'fd3d81285bbc2061407e31e3eead3232072b85d7',
		private_key:
			'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDR5pvNhTguAF3y\nBfGy4b0GzM/pvSfJHCSBxbPH++edSia7UGnOv81YT2J8DG47afHyxGjAfjwgNcQn\ndMU//HqyKA4zZ8e8ySA0Pn3DkBcdT7WFcZT57Z9fWRefRZqEiN7eOJ4s+kJ/NI6x\nUFhvgDXvhoeIJ4ggeXR9QUFSi0AwT6qrSPXOh0YWn6Nsgr6dZqOFGJ32VplM+2b8\ntTpzw0mjPbam5MOpGSF14UZAsZjM8kHo7ebHt0aQNpqS3yQmgXtFFj2cb0oqmG8l\nuO/gmybtm2dx/fgceKQUM7mY3JNiHmLqlvsBllMgsSWS1c1lAbsgm1pEpC2R4Yue\nNAyxHu8TAgMBAAECggEAZt+XTMsWFbWoVY4EP5/TfRm0bOKANVjNq6yxyDn18mj9\nQqDOur3Wbom5wwJ0pDnwkwMgM/eqkD7JvGzGn+2mVNq82wTqJ+SLHA/ko4xjR8Jh\nPN3GHhgQHDMWGMGMUZijYlZtb63YGXAw30Z5kWxNAu/0TQ7S8NeV+C2bTlFhTEtc\nKKzwEGTs64lc4yaprmgLXo5mQrdc8leQnoPDtU37Iu44Rtv+CNcRNifOCME8W8dI\nJPj+ZNbxqDiWOvwOe/zP67AIL6j2FYrMfPHRwZuh1JyKPjMusDbhkNsRt9uZiHh/\n607yBywKVBKG30Dg19yE8nNfOdpZOeyUXBeQidBpAQKBgQDovGvWXF9aQn86nT+H\nxv0bDEQzvWoWuJBsS6uy/8HqO1HA7g78SoG4pnR1Eo6OOBOWQ0Dg1wBn6XYbk1jM\nd75bsL7qBrH/QioWV1OU32i11gB8+G5PnDu8lRgHA36PmHN8rTjbMLq2O8/8MwOf\n3gp+I4SJG2Fkxqk8vf4ukxY9wwKBgQDm4dkJR0TTiDN4dXV7qK6SbgpBJsVdEyN6\nzXCMi6WuVazf8GaKcHe0MqEA/xZP6dWFe/eYvDJSo5wZ2EspIwkqWd9s1jFKqjGA\nuPxaBVzAaKiBkPtgCp5RFi9AbZoRBICvwe+FNe8s7dTEvtOkwRKuTMmnKjRp4jD9\nQatn5MTkcQKBgFbkIg7CJgd41C96DgIPVOgISF5Y1YbuGV2VUuFdg3SD+R3iw02G\nM7BQ1SHwb7DBVu6+5TYMj2Y8T5A0Du8ntbZd4qlVHpeCiFwW9mmaj2l0IHKH/gdS\n+SqLL5FOyK2r6VIfCh8rrknjQt+R3ESPjbNSZ2UZB9+sG/tFo+SXnbIpAoGAC7I1\nRHsPyYeE0/1fTjxlW5Wnf1Vveh+WFIqDwRrx8br1XwLWrvyzk7Vc4qgJgVLfNjvp\ndxtRkU4ogkaqyBK2TCbxYpoXNSkaCONWJVlQMY8bujSWB2+CRalSC3mB7IrF2iGA\n+MaarzP9K1pfbmE5iQrqzEUfEp4azTmebUzxjIECgYEAi8+TUcy86SiDOMGS38wy\nlxL6DAOk5ReN4ALBlr1y3TJYMkr50b84YJp57mpw2kEIF2iUIqBpTzqzZlRyoxY/\nI7GFklrsnLx5poUAtRw83AiX69u/Ig4MMfHV5QpNaTPfjJWs54H75ZSvPA99vAfb\nXHR/wvabLCgq/UBC5zK5zrk=\n-----END PRIVATE KEY-----\n',
		client_email:
			'firebase-adminsdk-igkic@ecommerce-e38d2.iam.gserviceaccount.com',
		client_id: '101531466139410861137',
		auth_uri: 'https://accounts.google.com/o/oauth2/auth',
		token_uri: 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url:
			'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url:
			'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-igkic%40ecommerce-e38d2.iam.gserviceaccount.com',
	}),
});

module.exports = adminFb;
