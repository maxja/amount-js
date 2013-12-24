var Amount = function( value, cur_name, rate ) {
  if (typeof value !== "number")
    throw new Error("Value must be a number!");
  if (typeof cur_name !== "string") 
    throw new Error("Currency must be a string!");
  this.value = value;
  this.currency = cur_name;
  this.rate = rate;
  this.toString = function() { return [this.value, this.currency].join(" "); };
  this.valueOf = function() { return this.value * this.rate; };
  this.add = function( amount ) { this.value += amount / this.rate; return this; };
  this.odd = function( amount ) { this.value -= amount / this.rate; return this; };
  this.to_ = function( cur ) { return Amount.set(this.valueOf() * cur.rate, cur.currency, cur.rate) };
};
Amount.set = function( value, cur_name, rate ) { return new Amount(value, cur_name, rate); };
Amount.set_currency = function( name, rate ) {
  var self = this;
  self[name] = function( value ) { self.call(this, value, name, rate); };
  self[name].prototype = Amount.set(0, "");
  window[name] = self[name].set = function( value ) { return new self[name]( value ); };
};

var small_amount = Amount.set(100, "USD", 1);
console.log(small_amount instanceof Amount, small_amount);
Amount.set_currency("USD", 1);

Amount.set_currency("RUB", 0.03333);
var smaller_amount = Amount.RUB.set(100);
console.log(smaller_amount instanceof Amount.RUB, smaller_amount instanceof Amount, smaller_amount);

var some = RUB(4000);
console.log(some.to_(small_amount));