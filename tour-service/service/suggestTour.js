function getDataTour(x1,x2,x3,x4,x5,n = 10,n1 = 0,n2 = 0,n3 = 0,n4 = 0,n5 = 0) {
  if (x1 == 0) n1 = 0;
  else n1 = Math.round(0.3 * n);
  if (x2 == 0) n2 = 0;
  else n2 = Math.round(0.28 * (n - n1));
  if (x3 == 0) n3 = 0;
  else n3 = Math.round(0.4 * (n - n1 - n2));
  if (x4 == 0) n4 = 0;
  else n4 = Math.round(0.7 * (n - n1 - n2 - n3));
  if (x5 == 0) n5 = 0;
  else n5 = n - n1 - n2 - n3 - n4;
  if (n < x1) n1 = n1;
  else {
    n1 = x1;
  }
  if (n2 < x2) n2 = n2;
  else {
    n2 = x2;
  }
  if (n3 < x3) n3 = n3;
  else {
    n3 = x3;
  }
  if (n4 < x4) n4 = n4;
  else {
    n4 = x4;
  }
  if (n4 < x4) n5 = n5;
  else {
    n5 = x5;
  }
  if (n1 + n2 + n3 + n4 + n5 === n)
    return {x1,x2,x3,x4,x5,n1,n2,n3,n4,n5,};
  n -= n1 + n2 + n3;
  x1 = x1 - n1;
  x2 = x2 - n2;
  x3 = x3 - n3;
  x4 = x4 - n4;
  x5 = x5 - n5;
  if (x1 + x2 + x3 + x4 + x5 === 0)
    return {x1,x2,x3,x4,x5,n1,n2,n3,n4,n5};
  return getDataTour(x1, x2, x3, n, n1, n2, n3);
}
module.exports = getDataTour;
