export const updatedObject = (oldState, updatedProperties) => {
    return {
        ...oldState,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    let invalidMessage = [];
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
        if (!isValid) {
            invalidMessage.push('is required');
        }
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        if (!isValid) {
            invalidMessage.push('minimum length is ' + rules.minLength);
        }
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        if (!isValid) {
            invalidMessage.push('maximum length is ' + rules.minLength);
        }
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
        isValid = pattern.test(value) && isValid;
        if (!isValid) {
            invalidMessage.push('invalid e-mail ');
        }
    }

    return { isValid: isValid, invalidMessage: invalidMessage.join(', ') };
};
