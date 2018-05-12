import RecettesApiClient from 'js/presentation/RecettesApiClient.js';

export default class UnitManagementService {
    
    constructor() {
      this.apiClient = new RecettesApiClient();
    }

    getUnits(onSuccess, onFailure) {
        this.apiClient.getUnits(onSuccess, onFailure);
    }
}
