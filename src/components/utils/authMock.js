export const authenticateMock = (email, password) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@mail.ru' && password === 'test') {
                resolve({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'});
            } else {
                const error = new Error('Неверные учетные данные');
                if (email !== 'test@mail.ru' && password !== 'test') {
                    error.type = 'invalid_credentials';
                } else if (email !== 'test@mail.ru') {
                    error.type = 'invalid_email';
                } else {
                    error.type = 'invalid_password';
                }
                reject(error);
            }
        }, 1000);
    });
};
