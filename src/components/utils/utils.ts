export const setTimer = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const generateArray = (maxLen: number, minLen: number, maxValue: number): number[] => {
  return Array.from({length: Math.floor(Math.random() * (maxLen - minLen)) + minLen}, () => Math.floor(Math.random() * maxValue))
}