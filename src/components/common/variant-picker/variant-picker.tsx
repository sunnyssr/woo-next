import { ProductListItem } from "@/lib/types/api";
import React, { useEffect, useMemo, useState } from "react";
import QuantityPicker from "../quantity-picker/quantity-picker";
import { useCart } from "@/lib/context/cartContext";

type Attribute = ProductListItem["attributes"][0];

type VariantPickerProps = {
  product: ProductListItem;
  containerClassname?: string;
};
const VariantPicker = (props: VariantPickerProps) => {
  const { cartItems, isAddingToCart, addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCartFlash, setShowAddedToCartFlash] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductListItem["variations"][0] | null>(
    null
  );

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const variations = useMemo<Attribute[]>(() => {
    const variationsAllowedInVariant = props.product.variations.reduce(
      (acc: Record<string, string[]>, variation) => {
        variation.attributes.forEach((attribute) => {
          if (!acc[attribute.name]) {
            acc[attribute.name] = [];
          }
          if (!acc[attribute.name].includes(attribute.value)) {
            acc[attribute.name].push(attribute.value);
          }
        });
        return acc;
      },
      {}
    );
    const variations = Object.entries(variationsAllowedInVariant)
      .map(([attributeName, allowedAttributeValues]) => {
        const attributeDetails = props.product.attributes.find(
          (attribute) => attribute.name === attributeName
        );
        if (!attributeDetails) return null;

        const allowedAttributeTerms = attributeDetails?.terms.filter((term) =>
          allowedAttributeValues.includes(term.slug)
        );
        return {
          ...attributeDetails,
          terms: allowedAttributeTerms,
        } as Attribute;
      })
      .filter((val) => !!val) as Attribute[];
    return variations;
  }, [props.product.variations, props.product.attributes]);

  useEffect(() => {
    setSelectedAttributes(
      variations.reduce((acc: Record<string, string>, variation) => {
        const defaultValue = variation.terms.find((term) => term.default)?.slug || "";
        acc[variation.name] = defaultValue;
        return acc;
      }, {})
    );
  }, [variations]);

  useEffect(() => {
    const variant = props.product.variations.find((variation) =>
      variation.attributes.every(
        (attribute) => selectedAttributes[attribute.name] == attribute.value
      )
    );
    setSelectedVariant(variant || null);
  }, [props.product.variations, selectedAttributes]);

  const handleVariationSelect = (variationValue: string, variationName: string) => {
    setSelectedAttributes((selectedAttributes) => ({
      ...selectedAttributes,
      [variationName]: variationValue,
    }));
  };

  const hasVariants = props.product.variations.length > 0

  const selectedVariantQuantityInCart = hasVariants ? (selectedVariant
    ? cartItems.find((cartItem) => cartItem.id === selectedVariant?.id)?.quantity
    : 0) : cartItems.find((cartItem) => cartItem.id === props.product?.id)?.quantity;

  return (
    <div className={`w-full max-w-full ${props.containerClassname || ""}`}>
      {variations.map((variation) => (
        <div key={variation.id}>
          <h3 className="mb-1 text-xs text-black">{variation?.name}</h3>
          <ul className="flex gap-3">
            {variation.terms?.map((term) => {
              const isActive = term.slug === selectedAttributes[variation.name];
              return (
                <li key={term.id}>
                  <button
                    onClick={() => handleVariationSelect(term.slug, variation.name)}
                    className={`text-sm px-3 py-1 rounded-full border border-black border-solid ${isActive ? "text-white bg-black" : "text-black bg-white"
                      }`}
                  >
                    {term.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="flex items-end justify-between mt-6">
        <div className="flex flex-col items-start justify-start">
          <span className="mb-1 text-xs text-black">
            Quantity{" "}
            {selectedVariantQuantityInCart ? (
              <span>({selectedVariantQuantityInCart} in cart)</span>
            ) : null}
          </span>
          <QuantityPicker
            quantity={quantity}
            handleUpdateQuantity={(updatedQuantity) => {
              setQuantity(updatedQuantity);
            }}
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => {
            if (hasVariants ? selectedVariant : true) {
              addItemToCart(String(hasVariants && selectedVariant ? selectedVariant.id : props.product.id), quantity).then(succes => {
                setShowAddedToCartFlash(true)
                window.setTimeout(() => {
                  setShowAddedToCartFlash(false)
                }, 1000)

              });
            }
          }}
          className="w-full px-3 py-1.5 text-xl font-light border border-black border-solid rounded-md sm:px-6 relative"
        >
          {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
          {showAddedToCartFlash ? <span className="animate-flash absolute left-0 right-0">+Added to Cart</span> : null}
        </button>
      </div>
    </div>
  );
};

export default VariantPicker;
