import { useMemo, useEffect } from "react";
import usePersisted from "./usePersisted";

const ATTRIBUTE_PRIORITY = {
  color: 1,
  size: 2,
  age: 3,
};

export default function useAttributes(product) {
  /*
  |--------------------------------------------------------------------------
  | Attribute Keys
  |--------------------------------------------------------------------------
  */

  const attributeKeys = useMemo(() => {
    if (!product?.variations?.length) return [];

    const allAttributes = new Set();

    product.variations.forEach((variation) => {
      variation.attributes.forEach((attr) => {
        allAttributes.add(attr.name.toLowerCase());
      });
    });

    return [...allAttributes].sort(
      (a, b) =>
        (ATTRIBUTE_PRIORITY[a] || 999) -
        (ATTRIBUTE_PRIORITY[b] || 999),
    );
  }, [product]);

  /*
  |--------------------------------------------------------------------------
  | Selected Attributes
  |--------------------------------------------------------------------------
  */

  const [selectedAttributes, setSelectedAttributes] =
    usePersisted("selectedAttributes", {});

  /*
  |--------------------------------------------------------------------------
  | Initialize Defaults
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!product?.variations?.length) return;

    const defaults = {};

    attributeKeys.forEach((attributeName) => {
      const firstVariation =
        product.variations.find((variation) =>
          variation.attributes.some(
            (attr) =>
              attr.name.toLowerCase() ===
              attributeName,
          ),
        );

      const attr =
        firstVariation?.attributes.find(
          (attr) =>
            attr.name.toLowerCase() ===
            attributeName,
        );

      if (attr) {
        defaults[attributeName] =
          attr.value;
      }
    });

    setSelectedAttributes((prev) => ({
      ...defaults,
      ...prev,
    }));
  }, [
    product,
    attributeKeys,
    setSelectedAttributes,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Available Options
  |--------------------------------------------------------------------------
  */

  const availableOptions = useMemo(() => {
    if (!product?.variations?.length) return {};

    const result = {};

    attributeKeys.forEach(
      (currentAttribute, currentIndex) => {
        let filteredVariations = [
          ...product.variations,
        ];

        /*
        |--------------------------------------------------------------------------
        | Filter Using Previous Attributes
        |--------------------------------------------------------------------------
        */

        attributeKeys
          .slice(0, currentIndex)
          .forEach((previousAttribute) => {
            const selectedValue =
              selectedAttributes[
                previousAttribute
              ];

            if (!selectedValue) return;

            filteredVariations =
              filteredVariations.filter(
                (variation) =>
                  variation.attributes.some(
                    (attr) =>
                      attr.name.toLowerCase() ===
                        previousAttribute &&
                      attr.value ===
                        selectedValue,
                  ),
              );
          });

        /*
        |--------------------------------------------------------------------------
        | Extract Values
        |--------------------------------------------------------------------------
        */

        result[currentAttribute] = [
          ...new Set(
            filteredVariations.flatMap(
              (variation) =>
                variation.attributes
                  .filter(
                    (attr) =>
                      attr.name.toLowerCase() ===
                      currentAttribute,
                  )
                  .map((attr) => attr.value),
            ),
          ),
        ];
      },
    );

    return result;
  }, [
    product,
    attributeKeys,
    selectedAttributes,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Active Variation
  |--------------------------------------------------------------------------
  */

  const activeVariation = useMemo(() => {
    if (!product?.variations?.length)
      return null;

    /*
    |--------------------------------------------------------------------------
    | Exact Match
    |--------------------------------------------------------------------------
    */

    const exactMatch =
      product.variations.find((variation) => {
        return Object.entries(
          selectedAttributes,
        ).every(([key, value]) =>
          variation.attributes.some(
            (attr) =>
              attr.name.toLowerCase() ===
                key &&
              attr.value === value,
          ),
        );
      });

    return (
      exactMatch || product.variations[0]
    );
  }, [product, selectedAttributes]);

  /*
  |--------------------------------------------------------------------------
  | Set Attribute
  |--------------------------------------------------------------------------
  */

  const setAttribute = (
    attributeName,
    value,
  ) => {
    setSelectedAttributes((prev) => {
      const updated = {
        ...prev,
        [attributeName.toLowerCase()]:
          value,
      };

      /*
      |--------------------------------------------------------------------------
      | Reset Lower Priority Attributes
      |--------------------------------------------------------------------------
      */

      const changedIndex =
        attributeKeys.indexOf(
          attributeName.toLowerCase(),
        );

      attributeKeys
        .slice(changedIndex + 1)
        .forEach((key) => {
          delete updated[key];
        });

      return updated;
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Auto Select Next Valid Option
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    attributeKeys.forEach((attributeName) => {
      const options =
        availableOptions[attributeName] ||
        [];

      if (
        options.length > 0 &&
        !options.includes(
          selectedAttributes[attributeName],
        )
      ) {
        setSelectedAttributes((prev) => ({
          ...prev,
          [attributeName]: options[0],
        }));
      }
    });
  }, [
    availableOptions,
    attributeKeys,
    selectedAttributes,
    setSelectedAttributes,
  ]);

  return {
    attributeKeys,
    selectedAttributes,
    availableOptions,
    activeVariation,
    setAttribute,
  };
}