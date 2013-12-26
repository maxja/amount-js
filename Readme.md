# Amount.js
## About
Simple JS library to operate values as an amounts in various currency.

## Final structure:
1. Set an amount of certain currency with rate ( *based to USD* ): __Amount__( value, currency-name, rate );
2. Set base currency: __Amount.set_currency__( currency-name, rate ) will return callable **Amount.CHF**;
3. Load a set of sets: __Amount.load_bunch__( [[val, curr, rate], […], … ] );
4. Every _amount_ can operate as a number like so: 

* usd1 __> < ==__ rub1 - **comparation** between values in USD, 
* usd2 __+ - / *__ chf2 - **math operation** with values in USD;
5. Every amount has own methods: 

* __usd1.add__( rub1 ) - increment *usd1* on *rub1* amount in USD, 
* __chf3.odd__( usd2 ) - decrement *chf3* on *usd2* amount in USD, 
* __usd1.to___( Amount.CHF ) _or_ __chf2.to___( usd2 ) - convert amount from one currency to another.