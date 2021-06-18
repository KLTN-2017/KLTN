function getData(x1, x2, x3,n=9,n1=0,n2=0,n3=0) {
  if (x1 == 0) n1 = 0;
  else n1 = Math.round(0.5 * n);
    
  if (x2 == 0) n2 = 0;
  else n2 = Math.round(0.6 * (n - n1));
  n3 = n - n1 - n2;
  if (n1 < x1) n1 = n1;
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
    if (n1 + n2 + n3 === n) return {
      x1,x2,x3,n1,n2,n3
    };
  n -= n1 + n2 + n3;
  x1 = x1 - n1;
  x2 = x2 - n2;
  x3 = x3 - n3;
  if (x1 + x2 + x3 === 0) return {
    x1,
    x2,
    x3,
    n1,
    n2,
    n3,
  };
  return getData(x1, x2, x3,n,n1,n2,n3);
}
module.exports = getData

