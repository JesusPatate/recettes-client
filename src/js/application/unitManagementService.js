import unitStore from 'js/application/unitStore.js';
import Unit from 'js/model/Unit.js' ;
import RecettesApiClient from 'js/presentation/RecettesApiClient.js';

class UnitManagementService {

    constructor() {
      this.store = unitStore;
      this.apiClient = new RecettesApiClient();
    }

    getAll(onSuccess, onFailure) {
      if (!this.store.isEmpty()) {
        onSuccess(this.store.items);
      } else {
        this.apiClient.getUnits(
          result => {
            let units = [];

            for (let index in result) {
              let representation = result[index];
              let unit = new Unit(representation.id, representation.name);
              this.store.add(unit);
              units.push(unit);
            }

            onSuccess(units);
          },
          onFailure
        );
      }
    }
}

const service = new UnitManagementService();

export default service;
