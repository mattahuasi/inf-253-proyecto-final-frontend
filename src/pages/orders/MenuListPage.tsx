import { useEffect, useState } from "react";
import { OnClickButton } from "../../components/buttons/OnClickButton";
import { ListOrderProducts } from "./ListOredererProduct";
import { ProductItem } from "./ProductItem";

interface NewProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
}

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuProps {
  listProducts: Product[];
}

export const MenuListPage: React.FC<MenuProps> = ({ listProducts }) => {
  const [order, setOrder] = useState<NewProducts[]>([]);
  const [ordersHistory, setOrdersHistory] = useState<NewProducts[][]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("ordersHistory");
    if (storedOrders) {
      setOrdersHistory(JSON.parse(storedOrders));
    }
  }, []);

  const handleConfirmOrder = () => {
    if (order.length === 0) {
      alert("No hay productos en la orden para confirmar.");
      return;
    }

    const updatedOrders = [...ordersHistory, order];
    setOrdersHistory(updatedOrders);
    localStorage.setItem("ordersHistory", JSON.stringify(updatedOrders));
    setOrder([]);
    alert("¡Pedido confirmado y guardado en localStorage!");
  };

  const handleAddProduct = (product: NewProducts) => {
    setOrder((prevOrder) => [...prevOrder, product]);
  };

  const handleRemoveProduct = (productId: string) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.id !== productId));
  };

  return (
    <div className="flex w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {listProducts.map((itemMenu, index) => (
          <ProductItem
            key={index}
            product={itemMenu}
            onAddProduct={handleAddProduct}
          />
        ))}
      </div>

      <div className="flex flex-col w-full mt-8 p-10">
        <h1 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
          Orden Actual
        </h1>
        <ListOrderProducts
          listOrder={order}
          onRemoveProduct={handleRemoveProduct}
        />
        <OnClickButton label="Confirmar Pedido" onClick={handleConfirmOrder} />
      </div>
    </div>
  );
};
