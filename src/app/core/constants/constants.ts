export const allBanks = [
  {
    name: "ACCESS BANK",
    Code: "044",
  },
  {
    name: "AG MORTGAGE BANK",
    Code: "100028",
  },
  {
    name: "CITI BANK",
    Code: "023",
  },
  {
    name: "DIAMOND BANK",
    Code: "063",
  },
  {
    name: "ECOBANK NIGERIA",
    Code: "050",
  },

  {
    name: "FIDELITY BANK ",
    Code: "070",
  },
  {
    name: "FIRST BANK OF NIGERIA",
    Code: "011",
  },
  {
    name: "FIRST CITY MONUMENT BANK",
    Code: "214",
  },
  {
    name: "GUARANTY TRUST BANK",
    Code: "058",
  },
  {
    name: "HERITAGE BANK",
    Code: "030",
  },
  {
    name: "JAIZ BANK",
    Code: "301",
  },
  {
    name: "KEYSTONE BANK",
    Code: "082",
  },
  {
    name: "PROVIDUS BANK",
    Code: "101",
  },
  {
    name: "STANBIC IBTC BANK",
    Code: "221",
  },

  {
    name: "SKYE BANK",
    Code: "076",
  },
  {
    name: "SUNTRUST BANK",
    Code: "100",
  },
  {
    name: "STANDARD CHARTERED BANK",
    Code: "068",
  },
  {
    name: "STERLING BANK",
    Code: "232",
  },
  {
    name: "UNION BANK",
    Code: "032",
  },
  {
    name: "UNITED BANK FOR AFRICA",
    Code: "033",
  },
  {
    name: "UNITY BANK",
    Code: "215",
  },
  {
    name: "WEMA BANK",
    Code: "035",
  },

  {
    name: "ZENITH BANK",
    Code: "057",
  },
];

export const defaultDateFilterValues = Object.freeze({
  startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
  endDate: new Date()
});

export const countries: [string, string][] = [
  ['Nigeria', '+234'],
  ['Ghana', '+233']
]

export const currencies: [string, string][] = [
  ['Naira', 'NGN'],
  ['Ghana Cedis', 'GHS'],
  ['US Dollar', 'USD']
]

export const settlementTypes: [string, string][] = [
  ['Same Day', 'same'],
  ['Next Day', 'T + 1'],
]

export const paymentMethods: [string, string][] = [
  ['Card', 'Card'],
  ['Wallet', 'Wallet'],
  ['OnlineCard', 'OnlineCard'],
  ['OnlineUssd', 'OnlineUssd'],
  ['OnlineAccountTransfer', 'OnlineAccountTransfer']
]

export const statusTypes: [string, string][] = [
  ['Active', 'Active'],
  ['Active', 'Active'],
]

export const countryCodes: [string, string][] = [
  ['Nigeria', '234'],
  ['Ghana', '233']
]

export const dialCodes: [string, string][] = [
  ['234', '+234'],
  ['233', '+233']
]

export const currencyCodes: [string, string][] = [
  ['NGN', 'NGN'],
  ['GHS', 'GHS']
]

export const ghanaIDTypes: [string, string][] = [
  ['Ghana Card', 'Ghana Card'],
]

export const billingPaymentMethods: [string, string][] = [
  ['Card', 'Card'],
  ['OnlineAccountTransfer', 'OnlineAccountTransfer']
]

export const payCycles: any = cycles()

function cycles() {
  let days = []
  for (let i = 1; i <= 24; i++){
    let cycle = [
      i,
      i
    ]
    days.push(cycle)
  }
  return days;
}
