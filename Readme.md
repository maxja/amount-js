# Amount.js
## About
Simple JS Class to operate values as an amounts in various currency.

## Final structure
1. Set an amount of certain currency with rate ( *based to USD* ): __Amount__( value, currency-name, rate );
2. Set base currency: __Amount.set_currency__( currency-name, rate ) will return callable **Amount.CHF**;
3. Load a set of sets: __Amount.load_bunch__( [[val, curr, rate], […], … ] );
4. Every _amount_ can operate as a number like so: 
  4.1. usd1 __> < ==__ rub1 - **comparation** between values in USD,
  4.2. usd2 __+ - / *__ chf2 - **math operation** with values in USD;
5. Every amount has own methods: 
  5.1. __usd1.add__( rub1 ) - increment *usd1* on *rub1* amount in USD, 
  5.2. __chf3.odd__( usd2 ) - decrement *chf3* on *usd2* amount in USD, 
  5.3. __usd1.to___( Amount.CHF ) _or_ __chf2.to___( usd2 ) - convert amount from one currency to another.

## Use case
1. Create amount certain currency, e.g. 100 USD: var __usd1__ = __Amount__(100, "USD", 1);
2. Create amount with predefined currency constructor:
  2.1. Define constructor, e.g. CHF (Swiss Franc) with rate 1.11557 USD: __Amount.set_currency__("CHF", 1.11557);
  2.2. Create amount, e.g. 250 CHF: var __chf1__ = __Amount.CHF__(250);
3. Bunch create amounts, e.g. 150 USD, 320 RUB, 270 RMB:  __Amount.load_bunch__([ [150, "USD", 1], [320, "RUB", 0.03061], [270, "RMB", 0.16461] ]);
4. Compare 2 amount of any currency gives us Boolean, e.g. 100 USD in __usd1__ and 250 CHF in __chf1__:  __chf1__ > __usd1__ will be true, coz: 250 CHF ≈ 278.89 USD;
5. Math operation with 2 amount of any currency gives us Numeric value in USD rate, e.g. same __usd1__ and __chf1__:  __chf1__ - __usd1__ will be 178.89, coz: 250 CHF (≈ 278.89 USD) - 100 USD;
6. Math operation with 2 amount of any currency with aim to change one of them gives us Amount in the base currency, e.g. __usd1__ and __chf1__:  __usd1.add__( __chf1__ ) after this __usd1__ will be 378.89 USD;
7. Currency conversion aimed to return converted amount in pointed currency or currency of existing amount, e.g. CHF to USD: __usd2__ = __chf1.to___( __Amount.USD__ ) after this __usd2__ will be 278.89 USD. Note, that __Amount.USD__ must be defined like in 2 par. of this "Use case" or you can use __usd1__ variable as Amount.USD descendant. 