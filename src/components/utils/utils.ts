export const setTimer = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}