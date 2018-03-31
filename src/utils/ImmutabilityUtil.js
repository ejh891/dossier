class ImmutabilityUtil {
  /**
   * Returns new Set with the given element added
   * @param {*} element
   * @param {Set} set
   */
  static addElementToSet(element, set) {
      const setClone = new Set([...set]);
      setClone.add(element);
      return setClone;
  }

  /**
   * Returns a new Set with the given element removed
   * @param {*} element
   * @param {Set} set
   */
  static removeElementFromSet(element, set) {
      const setClone = new Set([...set]);
      setClone.delete(element);
      return setClone;
  }

  /**
   * Returns a new Map with the given key-value pair added (or overwritten if the key already exists)
   * @param {*} key
   * @param {*} value
   * @param {Map} map
   */
  static setValueInMap(key, value, map) {
      const mapClone = new Map([...Array.from(map)]);
      mapClone.set(key, value);

      return mapClone;
  }

  /**
   * Returns a new Map with the value at the given key processed through the updater function
   * e.g. to increment the value at a given key, you could do something like this:
   * updateValueInMap('numApples', fruitCountsMap, (currentValue) => { return currentValue !== undefined ? currentValue + 1 : 1 })
   * @param {*} key
   * @param {Map} map
   * @param {(currentValue) => newValue} updater
   */
  static updateValueInMap(key, map, updater) {
      const mapClone = new Map([...Array.from(map)]);
      const updatedValue = updater(mapClone.get(key));
      mapClone.set(key, updatedValue);

      return mapClone;
  }

  /**
   * Returns a new Map with the given key removed
   * @param {*} key
   * @param {Map} map
   */
  static removeKeyFromMap(key, map) {
      const mapClone = new Map([...Array.from(map)]);
      mapClone.delete(key);

      return mapClone;
  }
}

export default ImmutabilityUtil;
