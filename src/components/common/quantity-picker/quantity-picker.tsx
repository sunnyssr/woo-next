import { MinusIcon, PlusIcon } from "../icons";

type QuantityPickerProps = {
  quantity: number;
  handleUpdateQuantity: (quantity: number) => void;
};

const QuantityPicker = (props: QuantityPickerProps) => {
  return (
    <div className="shadow-sm border border-solid rounded-md flex items-center justify-center">
      <button
        className="px-3 py-3"
        onClick={() => props.handleUpdateQuantity(Math.max(props.quantity - 1, 0))}
      >
        <MinusIcon className="h-4 w-4 text-gray-500" />
      </button>
      <span className="text-center min-w-6 w-auto font-medium">{props.quantity}</span>
      <button className="px-3 py-3" onClick={() => props.handleUpdateQuantity(props.quantity + 1)}>
        <PlusIcon className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
};

export default QuantityPicker;
