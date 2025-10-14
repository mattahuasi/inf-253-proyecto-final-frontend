import { useState } from "react";
import { OnClickButton } from "../../components/buttons/OnClickButton";
import { Counter } from "./Counter";

interface NewProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
}
interface Product {
  id?: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface ProductsItemProps {
  onAddProduct: (product: NewProducts) => void;
  product: Product;
}

const ProductItem: React.FC<ProductsItemProps> = ({
  product,
  onAddProduct,
}) => {
  const [counter, setCounter] = useState(0);
  const handleIncrease = () => {
    setCounter(counter + 1);
  };
  const handleDecrease = () => {
    if (counter >= 1) {
      setCounter(counter - 1);
    }
  };
  const calculateSubtotal = (price: number, quantity: number) =>
    price * quantity;

  const handleSendProduct = () => {
    const newProduct = {
      id: crypto.randomUUID(),
      name: product.name,
      price: product.price ?? 0,
      quantity: counter,
      subTotal: calculateSubtotal(product.price, counter),
    };
    setCounter(0);
    onAddProduct(newProduct);
  };

  return (
    <div
      key={product.id}
      className="bg-slate-200 text-slate-600 dark:text-slate-200 dark:bg-slate-800 shadow-md rounded-lg flex flex-col items-center w-full max-w-sm overflow-hidden pb-4"
    >
      <div className="w-full h-60 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 w-full">
        <article className="text-lg text-slate-600 dark:text-slate-200 font-bold mb-2">
          <strong>{product.name}</strong>
        </article>

        <p className="text-slate-600 dark:text-slate-200 text-sm mb-4">
          {product.description}
        </p>

        <article className="text-lg text-slate-600 dark:text-slate-200 font-semibold">
          <strong>Precio: {product.price}Bs</strong>
        </article>
      </div>

      <div className="w-full p-4 flex justify-center items-center">
        <Counter
          count={counter}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>
      <OnClickButton label="Add Product" onClick={handleSendProduct} />
    </div>
  );
};

export { ProductItem };
