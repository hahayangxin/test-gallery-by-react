// 生成某一个区间范围内的值
export function getRangeRandom(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

// 生成30°以内的正负值
export function get30degRandom() {
  return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);
}