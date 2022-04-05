const CurrencyFormat = (currency) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });

  var currency = formatter.format(currency).substring(3);

  if (currency.startsWith("N") && !currency.startsWith("NaN")) {
    currency = currency.substring(1, currency.length);
    currency = " -" + currency;
  }
  if (currency.includes(".00")) {
    currency = currency.substring(0, currency.length - 3);
  }
  return currency;
};

export default CurrencyFormat;
