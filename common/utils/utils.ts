export const getCategory = (level: number) => {
    if (level < 20) {
      return "Bronze";
    } else if (level >= 20 && level < 50) {
      return "Silver";
    } else {
      return "Gold";
    }
  }