/**
 * @class
 * used to run the commands of the user,
 * it garanty to just runs one command at a time
 */
class CommandExecuter {
  constraction() {
    /**
     * value used to track if there is a running command or not
     */
    this._isProssessRunning = false;
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

  /**
   *
   * @param {string} commandType - schema or query
   * @param {*} command
   *
   * @throws invalid commandType
   */
  runCommand(commandType, command) {
    console.log({
      commandType: commandType.toLowerCase(),
      command,
    });

    if (commandType !== 'schema' && commandType !== 'query') {
      throw new Error(
        'invalid commandType, commandType value must be schema or query',
      );
    }

    if (this._getIsProssessRunning) {
      return undefined;
    }

    // this.reverseIsProssessRunning();
    return command;
  }
}

module.exports = new CommandExecuter();
