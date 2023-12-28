const Joi = require('joi')
const joiValidation = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = {
        firstName,
        lastName,
        email,
        password
    }
    const schema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(30)
            .required(),

        lastName: Joi.string()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
    })

  const {error} = schema.validate( user);

    if(error){
        return res.status(400).send(error.details[0].message);
    }
    next();
}

module.exports = joiValidation;