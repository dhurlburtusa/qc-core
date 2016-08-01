/** @module Function */


// ==========================================================================
/**
 * A function that does nothing.  A true no-op.
 *
 * What use is a function that does nothing?  Well, many times a particular member of an object is expected to be a
 * function.  In order to avoid errors, this member can be assigned this no-op function.  This will allow code treating
 * the member as a function to continue to operate without error.
 *
 * ```js
 * // `requiredFn` is the object member expected to be a function.
 * MyObj.prototype.requiredFn = noop;
 * ...
 * myObjInstance.requiredFn(); // Won't throw an error.
 * ```
 *
 * Some other uses:
 *
 * ```js
 * MyObj.prototype.justDoOnceButOkayIfCalledMultipleTimes = function () {
 *   ...
 *   // Adds an instance declaration of this function.  It doesn't affect the prototype declaration.
 *   // Therefore, new instances of MyObj will continue to behave as expected.
 *   this.justDoOnceButOkayIfCalledMultipleTimes = noop;
 * };
 * ...
 * // The following call will do whatever the prototype function was designed to do.
 * myObjInstance.justDoOnceButOkayIfCalledMultipleTimes();
 * // The second call will effectively do nothing because this is now a call to the no-op function.
 * myObjInstance.justDoOnceButOkayIfCalledMultipleTimes();
 * ```
 */
function noop() { /* Do nothing. */ }


// ==========================================================================
/**
 * The "null" function is simply a function that returns `null`.  It can be used in a similar fashion to the
 * {@link noop no-op function} but might be more suited if a legitimate value (as opposed to `undefined`) is
 * expected to be returned.
 *
 * @return {null} - `null`.
 */
function nullFn() { return null; }


// ==========================================================================
/**
 * A function that throws an error with a message stating that this method should have not been called again.  This
 * can be useful in situations where a function on an object should only be called a limited number of times.
 * When that limit is reached, the function can assign itself this function.  Then the next call to the function will
 * throw an error.  This can prove useful to find extraneous calls to functions.
 *
 * ```js
 * MyObj.prototype.onlyCallMeALimitedNumberOfTimes = function () {
 *   ...
 *   // Adds an instance declaration of this function.  It doesn't affect the prototype declaration.
 *   // Therefore, new instances of MyObj will continue to behave as expected.
 *   if (limitReached) {
 *     this.onlyCallMeALimitedNumberOfTimes = notAgain;
 *   }
 * };
 * ...
 * // The following call will do whatever the prototype function was designed to do.
 * myObjInstance.onlyCallMeALimitedNumberOfTimes();
 * ...
 * // The following will throw an Error when the limit has been reached.  Now the
 * // developer can remove the extraneous call.
 * myObjInstance.onlyCallMeALimitedNumberOfTimes();
 * ```
 */
function notAgain() { throw new Error('This method should have not been called again.'); }


// ==========================================================================
module.exports = {
  noop,
  notAgain,
  nullFn,
};
