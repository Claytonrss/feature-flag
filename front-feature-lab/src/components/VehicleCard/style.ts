import styled, { css } from "styled-components";
import { LayoutType } from "../../types";

export const CarImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const CarModel = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #333;

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
  }
`;

export const CarDetails = styled.div`
  display: flex;
  margin: 0.25rem 0;
  gap: 0.25rem;

  span {
    display: inline-block;
    font-size: 12px;
    color: #dfdfdf;
    background-color: #222;
    border-radius: 0.25rem;
    padding: 0.1rem 0.3rem;
  }
`;

export const CarInfoGroup = styled.div`
  font-size: 12px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const PriceTag = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  font-weight: bold;
`;

export const CardContainer = styled.div<{ layout: LayoutType }>`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  overflow: hidden;

  ${({ layout }) =>
    layout === "vertical"
      ? css`
          width: 260px;
        `
      : css`
          display: flex;
          max-width: 780px;
        `}
`;

export const CarInfo = styled.div<{ layout: LayoutType }>`
  padding: 12px;
  ${({ layout }) =>
    layout === "horizontal" &&
    css`
      flex: 1.5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

export const CarImageContainer = styled.div<{ layout: LayoutType }>`
  ${({ layout }) =>
    layout === "horizontal" &&
    css`
      flex: 1;
      position: relative;
    `}
`;

export const ButtonSeeInstallments = styled.button`
  border: 0;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  text-align: center;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: bold;
  transition: opacity 0.3s;
  cursor: pointer;

  &:hover{
    opacity: .8;
  }
`;
