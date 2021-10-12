export default class Utils {
    static isValidDate(date) {
      let yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
      return date<yesterday;
    }
}
  