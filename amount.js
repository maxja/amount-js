var Amount = function(value, currency, rate) {
  if ( !!this.window )
    return new arguments.callee(value, currency, rate);
  
  if ( typeof value !== "number" )
    throw new Error("Value must be a numerical!");
  if ( typeof currency !== "string" )
    throw new Error("Currency name must be a string!");
  if ( typeof rate !== "number" && !!rate)
    throw new Error("Rate must be a numerical or undefined!");
  
  this.value = value;
  this.currency = currency;
  this.rate = rate || 1;
  
  this.add = function(amount) {
    if ( typeof amount !== "number" && !amount instanceof Amount)
      throw new Error("Amount must be a numerical!");
    this.value += amount / this.rate;
    return this;
  };
  this.odd = function(amount) {
    if ( typeof amount !== "number" && !amount instanceof Amount)
      throw new Error("Amount must be a numerical!");
    this.value -= amount / this.rate;
    return this;
  };
  this.to_ = function(currency) {
    if ( !currency.rate )
      throw new Error("Destination must be a Currency itself or amount in that currency!");
    return new Amount(this / currency.rate, currency.currency, currency.rate);
  };
  this.toString = function() {
    return [this.value, this.currency].join(" ");
  };
  this.valueOf = function() {
    return this.value * this.rate;
  };
};
Amount.set_currency = function(name, rate) {
  if ( typeof name !== "string" )
    throw new Error("Currency name must be a string!");
  if ( typeof rate !== "number" && !!rate)
    throw new Error("Rate must be a numerical or undefined!");
  
  var self = this;
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
Amount.load_bunch = function(amounts) {
  if ( typeof amounts !== "object" && !amounts instanceof Array )
    throw new Error("Amounts must be a set of a sets!");
  for (var i=0,a=[]; i < amounts.length; a.push(this.apply(null, amounts[i++])));
  return a;
};
Amount.load_rates = function(rates) {
  if ( typeof rates !== "object" && !rates instanceof Array )
    throw new Error("Rates must be a set of a sets!");
  for (var i=0; i < rates.length; this.set_currency.apply(null, rates[i++])));
};