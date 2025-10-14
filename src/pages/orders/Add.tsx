import { SectionCard } from "../../components/cards/SectionCard";
import { MenuListPage } from "./MenuListPage";
import listProducts from "./dataFood.json";

export default function OrderAdd() {
  return (
    <SectionCard title="Agregar pedido">
      <MenuListPage listProducts={listProducts} />
    </SectionCard>
  );
}
