import { FeatureFlag } from "../types";

export const checkIsBlackFairActive = (data: FeatureFlag[]): boolean => {
  const isBlackFair = data.find((item) => item.name === "isBlackFair");
  return !!isBlackFair && isBlackFair.status === 1;
};

export const checkIsNewLayoutCardActive = (data: FeatureFlag[]): boolean => {
const isNewCard = data.find((item) => item.name === "isNewCard");
return !!isNewCard && isNewCard.status === 1;
};