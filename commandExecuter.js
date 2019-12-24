const generateMongooseSchema = require('./generate-mongoose-schema');

/**
 * @class
 * used to run the commands of the user,
 * it garanty to just runs one command at a time
 */
class CommandExecuter {
  constructor() {
    /**
     * value used to track if there is a running command or not
     */
    this._isProssessRunning = false;
    this._dbModel = undefined;
    this._dbModelName = 'data';
  }

  /**
   * @private
   *
   * @returns {boolean}
   */
  _getIsProssessRunning() {
    return this._isProssessRunning;
  }

  /**
   * @private
   * sets _isProssessRunning to false if it equals true,
   * or to true if it equals false.
   *
   * @returns {void}
   */
  _reverseIsProssessRunning() {
    if (this._isProssessRunning) {
      this._isProssessRunning = false;
    } else {
      this._isProssessRunning = true;
    }
  }

  _setdbModel(dbModel) {
    this._dbModel = dbModel;
  }

  get dbModel() {
    return this._dbModel;
  }

  get dbModelName() {
    return this._dbModelName;
  }

  /**
   *
   * @param {string} commandType - schema or query
   * @param {*} command
   *
   * @throws invalid commandType
   */
  runCommand(commandType, command) {
    if (commandType !== 'schema' && commandType !== 'query') {
      throw new Error(
        'invalid commandType, commandType value must be schema or query',
      );
    }

    if (commandType === 'schema') {
      // stop other commands
      this._reverseIsProssessRunning();

      const dbModel = generateMongooseSchema(command, this.dbModelName);
      this._setdbModel(dbModel);

      // free the command runner
      this._reverseIsProssessRunning();
    }

    if (this._getIsProssessRunning) {
      return undefined;
    }

    // this.reverseIsProssessRunning();
    return command;
  }
}

module.exports = new CommandExecuter();
