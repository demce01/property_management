import { ClientAPI } from './modules/ClientAPI.js';
import { ClientUI } from './modules/ClientUI.js';

class ClientManager {
  constructor() {
    this.initialize();
  }

  async initialize() {
    await this.loadInitialData();
    this.setupEventListeners();
  }

  async loadInitialData() {
    try {
      const clients = await ClientAPI.fetchAll();
      ClientUI.renderClients(clients);
    } catch (error) {
      console.error('Gabim në ngarkim:', error);
      alert('Problem në ngarkimin e të dhënave!');
    }
  }

  setupEventListeners() {
    // Klikim në rresht
    document.querySelector('#klientetList').addEventListener('click', (e) => {
      const row = e.target.closest('tr.client-row');
      if (row) this.toggleEditForm(row.dataset.id);
    });

    // Submit form
    document.querySelector('#klientetList').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target.closest('.edit-form');
      if (form) await this.handleInlineEdit(form);
    });

    // Butoni Cancel
    document.querySelector('#klientetList').addEventListener('click', (e) => {
      if (e.target.closest('.cancel-edit')) {
        const formRow = e.target.closest('tr.edit-form-row');
        ClientUI.toggleEditForm(formRow.dataset.parent, false);
      }
    });
  }

  async handleInlineEdit(form) {
    try {
      const formData = new FormData(form);
      const clientData = {
        emri: formData.get('emri'),
        email: formData.get('email'),
        telefoni: formData.get('telefoni'),
        adresa: formData.get('adresa')
      };

      await ClientAPI.update(form.dataset.id, clientData);
      
      // Update rreshtin pa reload
      const mainRow = document.querySelector(`tr.client-row[data-id="${form.dataset.id}"]`);
      mainRow.querySelector('td:nth-child(1)').textContent = clientData.emri;
      mainRow.querySelector('td:nth-child(2)').textContent = clientData.email;
      mainRow.querySelector('td:nth-child(3)').textContent = clientData.telefoni;
      mainRow.querySelector('td:nth-child(4)').textContent = clientData.adresa;

      ClientUI.toggleEditForm(form.dataset.id, false);
    } catch (error) {
      console.error('Gabim në update:', error);
      alert('Update i dështuar!');
    }
  }

  toggleEditForm(rowId) {
    // Mbyll të gjitha format
    document.querySelectorAll('.edit-form-row').forEach(row => {
      if (row.dataset.parent !== rowId) {
        row.style.display = 'none';
        document.querySelector(`tr.client-row[data-id="${row.dataset.parent}"]`)
          ?.classList.remove('active-row');
      }
    });

    // Toggle forma aktuale
    const isVisible = document.querySelector(`tr.edit-form-row[data-parent="${rowId}"]`).style.display === 'table-row';
    ClientUI.toggleEditForm(rowId, !isVisible);
  }
}

// Nis aplikacionin
document.addEventListener('DOMContentLoaded', () => new ClientManager());