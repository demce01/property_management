export class ClientAPI {
    static BASE_URL = "/api/klientet/";

    static async fetchAll() {
        const response = await fetch(this.BASE_URL);
        return response.json();
    }

    static async fetchOne(id) {
        const response = await fetch(`${this.BASE_URL}${id}/`);
        return response.json();
    }

    static async create(clientData) {
        return this._sendRequest(this.BASE_URL, 'POST', clientData);
    }

    static async update(id, clientData) {
        return this._sendRequest(`${this.BASE_URL}${id}/`, 'PUT', clientData);
    }

    static async delete(id) {
        return this._sendRequest(`${this.BASE_URL}${id}/`, 'DELETE');
    }

    static async _sendRequest(url, method, data = null) {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this._getCSRFToken()
            }
        };

        if (data) config.body = JSON.stringify(data);

        const response = await fetch(url, config);
        if (!response.ok) throw new Error('Request failed');
        return response.json();
    }

    static _getCSRFToken() {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1] || '';
    }
}