import { dataCars } from "../../data";
import ResponsiveCarCard from "../VehicleCard";
import { CardsWrapper } from "./styles";

const ResponsiveCardParent = () => {
  return (
    <CardsWrapper>
      {dataCars.map((car) => (
        <ResponsiveCarCard key={car.id} data={car} />
      ))}
    </CardsWrapper>
  );
};

export default ResponsiveCardParent;
