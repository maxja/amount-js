/**
 * @fileoverview This file represents a Amount, Amount[Currency] cunstructors 
 * and it's instance methods.
 * 
 * @author Maxim P. Kalenich (me@maxja.ru)
 * @version 0.0.1
 */

/**
 * Construct a new Amount class.
 * 
 * @class This class represents an instance of an Amount.
 * @constructor
 * @param {Number} value The amount of money.
 * @param {String} currency The currency short name (3 letter long, up. case).
 * @param {Number|undefined} rate The exchange rate of this currency to base one.
 * @returns A new instance of Amount.
 * @type Amount
 */
var Amount = function(value, currency, rate) {
  if ( !!this.window )
    return new arguments.callee(value, currency, rate);
  if ( typeof value !== "number" )
    throw new Error("Value must be a numerical!");
  if ( typeof currency !== "string" )
    throw new Error("Currency name must be a string!");
  if ( typeof rate !== "number" && !!rate)
    throw new Error("Rate must be a numerical or undefined!");
  
  /** @private */ this.value = value;
  /** @private */ this.currency = currency;
  /** @private */ this.rate = rate || 1;
  
  /**
   * Increment this amount with specified as the parameter.
   * @this {Amount}
   * @param {Number|Amount} amount Incremental amount will be auto-converted to 
   * the same currency as original amount is represented.
   * @returns Result of increment.
   * @type Amount
   */
  this.add = function(amount) {
    if ( typeof amount !== "number" && !amount instanceof Amount)
      throw new Error("Amount must be a numerical!");
    this.value += amount / this.rate;
    return this;
  };
  
  /**
   * Decrement this amount with specified as the parameter.
   * @this {Amount}
   * @param {Number|Amount} amount Decremental amount will be auto-converted to 
   * the same currency as original amount is represented.
   * @returns Result of decrement.
   * @type Amount
   */
  this.odd = function(amount) {
    if ( typeof amount !== "number" && !amount instanceof Amount)
      throw new Error("Amount must be a numerical!");
    this.value -= amount / this.rate;
    return this;
  };
  
  /**
   * Convert this amount with specified currency.
   * @this {Amount}
   * @param {Amount|Currency} currency Amount or Currency that represent 
   * currency with desirable exchange rate. 
   * @returns Сonversion result.
   * @type Amount
   */
  this.to_ = function(currency) {
    if ( !currency.rate )
      throw new Error("Destination must be a Currency itself or amount in that currency!");
    return new Amount(this / currency.rate, currency.currency, currency.rate);
  };
};

/**
 * Find a String representation of an Amount.
 * 
 * @override
 * @this {Amount}
 * @returns Human-readable representation of this Amount.
 * @type String
 */
Amount.prototype.toString = function() {
  return this.value + " " + this.currency;
};

/**
 * Find a Number representation of an Amount.
 * 
 * @override
 * @this {Amount}
 * @returns Math-operable representation of this Amount.
 * @type Number
 */
Amount.prototype.valueOf = function() {
  return this.value * this.rate;
};

/**
 * Bind Currency class to Amount namespace.
 * 
 * @this {Amount}
 * @param {String} name The currency short name (3 letter long, up. case).
 * @param {Number} rate The exchange rate of this currency to base one.
 * @returns Specified currency Amount builder method.
 * @type Amount[Currency]
 */
Amount.set_currency = function(name, rate) {
  if ( typeof name !== "string" )
    throw new Error("Currency name must be a string!");
  if ( typeof rate !== "number" && !!rate)
    throw new Error("Rate must be a numerical or undefined!");
  
  /** @private */ var self = this;
  
  /**
   * Construct a new Amount[Currency] class.
   * 
   * @class This class represents an instance of an Amount[Currency].
   * @constructor
   * @param {Number} value The amount of money.
   * @returns A new instance of Amount.
   * @type Amount
   */
  self[name] = function(value) {
    if ( !!this.window || this === self )
      return new self[name](value);
    self.call(this, value, name, rate);
  };
  self[name].prototype = new self(0, name);
  self[name].currency = name;
  self[name].rate = rate;
  return self[name];
};

/**
 * Bunch load amounts set
 * 
 * @param {Array} amounts Set of sets with {@link Amount}'s params in each.
 * @returns Set of Amount objects.
 * @type Array
 */
Amount.load_bunch = function(amounts) {
  if ( typeof amounts !== "object" && !amounts instanceof Array )
    throw new Error("Amounts must be a set of a sets!");
  for (var i=0,a=[]; i < amounts.length; a.push(this.apply(null, amounts[i++])));
  return a;
};

/**
 * Bunch create currency preset
 * 
 * @param {Array} rates Set of sets with {@link Amount#set_currency}'s params 
 * in each.
 * @return {Void}
 */
Amount.load_rates = function(rates) {
  if ( typeof rates !== "object" && !rates instanceof Array )
    throw new Error("Rates must be a set of a sets!");
  for (var i=0; i < rates.length; this.set_currency.apply(this, rates[i++]));
};