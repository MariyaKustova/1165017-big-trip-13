export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can not instantiate Abstract, only concrete one.`);
    }
  }
}
