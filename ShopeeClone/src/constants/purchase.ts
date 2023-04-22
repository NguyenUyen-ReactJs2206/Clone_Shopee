export const purchaseStatus = {
  //trong gio hang
  inCart: -1,
  all: 0,
  //sp dang doi xac nhan tu chu shop
  waitForConfirmation: 1,
  //sp dang duoc lay hang
  waitForGetting: 2,
  //sp dang duoc ban chuyen
  inFrogress: 3,
  //sp da duoc giao
  delivered: 4,
  //sp da bi huy
  cancelled: 5
} as const
