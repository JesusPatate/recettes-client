import RecipeManagementService from 'js/application/RecipeManagementService.js';
import Store from 'js/application/Store.js' ;

export default class CoolStore extends Store {
  constructor(entityMgmtService) {
    super();
    this.entityMgmtService = entityMgmtService;
  }

  init(onSuccess = () => {}, onFailure = () => {}) {
    this.entityMgmtService.getAll(
      items => {
          for (var i = 0; i < items.length; i++) {
            super.add(items[i]);
          }

          onSuccess(this.items);
      },
      onFailure);
  }

  add(newEntity, onSuccess = () => {}, onFailure = () => {}) {
    this.entityMgmtService.create(newEntity,
      entity => {
        super.add(entity);
        onSuccess(entity);
      },
      onFailure);
  }

  update(entity, onSuccess = () => {}, onFailure = () => {}) {
    this.entityMgmtService.update(entity,
      () => {
        super.update(entity);
        onSuccess(entity);
      },
      onFailure);
  }

  remove(id, onSuccess = () => {}, onFailure = () => {}) {
    this.entityMgmtService.delete(id,
      () => {
        super.remove(id);
        onSuccess(id);
      }, 
      onFailure);
  }
}
