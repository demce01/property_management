export class ClientUI {
    static renderClients(clients) {
      const tbody = document.querySelector('#klientetList');
      tbody.innerHTML = clients.map(client => `
        <tr class="client-row" data-id="${client.id}">
          <td>${client.emri}</td>
          <td>${client.email}</td>
          <td>${client.telefoni}</td>
          <td>${client.adresa}</td>
          <td>
            <button class="btn btn-sm btn-warning" data-action="edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" data-action="delete">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
        <tr class="edit-form-row" data-parent="${client.id}">
          <td colspan="5">
            <div class="edit-form-container p-3">
              <form class="edit-form" data-id="${client.id}">
                <div class="row g-3 align-items-center">
                  <div class="col-md-3">
                    <input type="text" name="emri" value="${client.emri}" 
                      class="form-control" placeholder="Emri" required>
                  </div>
                  <div class="col-md-3">
                    <input type="email" name="email" value="${client.email}" 
                      class="form-control" placeholder="Email" required>
                  </div>
                  <div class="col-md-2">
                    <input type="text" name="telefoni" value="${client.telefoni}" 
                      class="form-control" placeholder="Telefoni" required>
                  </div>
                  <div class="col-md-3">
                    <textarea name="adresa" class="form-control" 
                      placeholder="Adresa" required>${client.adresa}</textarea>
                  </div>
                  <div class="col-md-1">
                    <div class="d-flex">
                      <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i>
                      </button>
                      <button type="button" class="btn btn-secondary cancel-edit">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </td>
        </tr>
      `).join('');
    }
  
    static toggleEditForm(rowId, show = true) {
      const formRow = document.querySelector(`tr.edit-form-row[data-parent="${rowId}"]`);
      const mainRow = document.querySelector(`tr.client-row[data-id="${rowId}"]`);
      
      if (show) {
        formRow.style.display = 'table-row';
        mainRow.classList.add('active-row');
        formRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        formRow.style.display = 'none';
        mainRow.classList.remove('active-row');
      }
    }
  }