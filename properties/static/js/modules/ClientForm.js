export class ClientForm {
    static SELECTORS = {
        form: "#klientFormData",
        fields: ["emri", "email", "telefoni", "adresa"],
        hiddenId: "#klientId"
    };

    static init() {
        this.formElement = document.querySelector(this.SELECTORS.form);
    }

    static getFormData() {
        return {
            id: document.querySelector(this.SELECTORS.hiddenId).value || null,
            emri: document.getElementById('emri').value,
            email: document.getElementById('email').value,
            telefoni: document.getElementById('telefoni').value,
            adresa: document.getElementById('adresa').value
        };
    }

    static populateForm(clientData) {
        document.querySelector(this.SELECTORS.hiddenId).value = clientData.id;
        this.SELECTORS.fields.forEach(field => {
            document.getElementById(field).value = clientData[field];
        });
    }

    static resetForm() {
        this.formElement.reset();
        document.querySelector(this.SELECTORS.hiddenId).value = '';
    }

    static bindSubmit(handler) {
        this.formElement.addEventListener('submit', async event => {
            event.preventDefault();
            await handler();
        });
    }
}