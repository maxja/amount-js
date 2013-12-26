var Amount = function(value, currency, rate) {
  if ( !!this.window )
    return new arguments.callee(value, currency, rate);
  this.value = value;
  this.currency = currency;
  this.rate = rate;
  this.add = function(amount) {
    this.value += amount / this.rate;
    return this;
  };
  this.odd = function(amount) {
    this.value -= amount / this.rate;
    return this;
  };
  this.to_ = function(currency) {
    return new Amount(
      this / currency.rate, 
      currency.currency, 
      currency.rate
    );
  };
  this.toString = function() {
    return [this.value, this.currency].join(" ");
  };
  this.valueOf = function() {
    return this.value * this.rate;
  };
};
Amount.set_currency = function(name, rate) {
  var self = this;
  self[name] = function(value) {
    if ( !!this.window || this === self )
      return new self[name](value);
    self.call(this, value, name, rate);
  };
  self[name].prototype = new self(0, name);
  return self[name];
};