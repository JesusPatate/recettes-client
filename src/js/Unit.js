export default class Unit {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static from(unit) {
    return new Unit(unit.id, unit.name);
  }
}
