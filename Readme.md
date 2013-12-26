# Amount.js
## About
Simple JS library to operate values as an amounts in various currency.

## Final structure:
1. Set an amount of certain currency with rate ( *based to USD* ): **Amount**( value, currency-name, rate );
2. Set base currency: Amount**.set_currency**( currency-name, rate ) will return callable **Amount.CHF**;
3. Load a set of sets: Amount**.load_bunch**( [[val, curr, rate], […], … ] );
4. Every _amount_ can operate as a number like so: 
* usd1 __><==__ rub1 - **comparation** between values in USD, 
* usd2 __+-/*__ chf2 - **math operation** with values in USD;
5. Every amount has own methods: 
* usd1**.add**( rub1 ) - increment *usd1* on *rub1* amount in USD, 
* chf3**.odd**( usd2 ) - decrement *chf3* on *usd2* amount in USD, 
* usd1**.to_**( Amount.CHF ) _or_ chf2**.to_**( usd2 ) - convert amount from one currency to another.