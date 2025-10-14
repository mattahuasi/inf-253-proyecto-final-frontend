import { SectionCard } from "../../components/cards/SectionCard";
import { CustomerOrdersPage } from "./CustomersOrderPage";

export default function OrdersList() {
  return (
    <SectionCard title="Lista de pedidos" addButton={{ path: "/orders/add" }}>
      <CustomerOrdersPage />
    </SectionCard>
  );
}
