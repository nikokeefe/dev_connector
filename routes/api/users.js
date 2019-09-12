const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const config = require('config');
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
	'/',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email address.').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters.'
		).isLength({ min: 6 })
	],
	async (request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = request.body;

		try {
			// See if user exists
			let user = await User.findOne({ email });
			// send error
			if (user) {
				return response
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			// Get Users Gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			// New user instance
			user = new User({
				name,
				email,
				avatar,
				password
			});

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// Save user
			await user.save();

			// return jsonwebtoken
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(error, token) => {
					if (error) throw error;
					response.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			response.status(500).send('Server Error');
		}
	}
);

module.exports = router;
