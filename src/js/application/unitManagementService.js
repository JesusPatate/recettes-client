import RecettesApiClient from 'js/presentation/RecettesApiClient.js';

class UnitManagementService {

    constructor() {
      this.apiClient = new RecettesApiClient();
    }

    getAll(onSuccess, onFailure) {
        this.apiClient.getUnits(onSuccess, onFailure);
    }
}

const service = new UnitManagementService();

export default service;
