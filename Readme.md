# Amount.js
## About
Simple JS library to operate values as an amounts in various currency.

## Final structure:
1. Set an amount of certain currency with rate ( **based to USD** ): **Amount**( value (100.01), currency ("RUB"), rate (0.0001) );
2. Set base currency: Amount **.set_currency**( currency ("CHF"), rate (2.34567) ) will return callable Amount.CHF;
3. Load a set of sets: Amount **.load_bunch** ( [ [100, "USD", 1], [200, "GBP", 5.0321], … ] );
4. Every *amount* can operate as number like so: usd1 __><==__ rub1 ( **comparation** between values in USD ), usd2 __+-/*__ chf2 ( **math operation** with values in USD );
5. Every amount has own methods: usd1 **.add**( rub1 ) to increment *usd1* on *rub1* amount in USD, chf3 **.odd**(usd2) to decrement *chf3* on *usd2*, usd1 **.to_**( Amount.CHF ) / chf2 **.to_**( usd2 ) to convert amount from one currency to another.