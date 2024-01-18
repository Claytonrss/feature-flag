import { useLayout } from "../../context/LayoutContext";
import { CarProps } from "../../types";
import {
  ButtonSeeInstallments,
  CarDetails,
  CarImage,
  CarImageContainer,
  CarInfo,
  CarInfoGroup,
  CarModel,
  CardContainer,
  PriceTag,
} from "./style";

interface CarCardProps {
  data: CarProps;
}

const ResponsiveCarCard = ({ data }: CarCardProps) => {
  const { layout } = useLayout();

  return (
    <CardContainer layout={layout}>
      <CarImageContainer layout={layout}>
        <CarImage
          src={`/images/VECHICLE_${data.id}.webp`}
          alt={`${data.model} image`}
        />
      </CarImageContainer>
      <CarInfo layout={layout}>
        <div>
          <CarModel>
            {data.model} <span>{data.version}</span>
          </CarModel>
          <CarDetails>
            {data.details.map((detail, index) => (
              <span key={index}>{detail}</span>
            ))}
          </CarDetails>
          <CarInfoGroup>
            <p>
              {data.year} | {data.mileage}
            </p>
            <p>{data.location}</p>
          </CarInfoGroup>
        </div>
        <PriceTag>{data.price}</PriceTag>
        <ButtonSeeInstallments>Ver Parcelas</ButtonSeeInstallments>
      </CarInfo>
    </CardContainer>
  );
};

export default ResponsiveCarCard;
