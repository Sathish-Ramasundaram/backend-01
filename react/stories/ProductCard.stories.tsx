import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "../src/components/ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Customer/ProductCard",
  component: ProductCard,
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      id: "rice",
      name: "Rice",
      imageUrl:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      quantity: "1 kg",
      price: 50,
      description: "Premium daily-use rice.",
    },
    onAddToCart: () => {
      // Story action placeholder.
    },
  },
};


export const ApplePack: Story = {
  args: {
    product: {
      id: "apple",
      name: "Apple",
      imageUrl:
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
      quantity: "1 kg",
      price: 140,
      description: "Fresh apples with crisp texture.",
    },
    onAddToCart: () => {
      // Story action placeholder.
    },
  },
};

export const BananaDozen: Story = {
  args: {
    product: {
      id: "banana",
      name: "Banana",
      imageUrl:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      quantity: "12",
      price: 60,
      description: "Naturally sweet bananas for daily snacks.",
    },
    onAddToCart: () => {
      // Story action placeholder.
    },
  },
};

export const PremiumPaneer: Story = {
  args: {
    product: {
      id: "paneer",
      name: "Paneer",
      imageUrl:
        "https://raw.githubusercontent.com/Sathish-Ramasundaram/images-srs/refs/heads/main/images/Paneer.png",
      quantity: "200 g",
      price: 90,
      description: "Soft paneer cubes suitable for curries and snacks.",
    },
    onAddToCart: () => {
      // Story action placeholder.
    },
  },
};

export const NoImagePreview: Story = {
  args: {
    product: {
      id: "toor-dal",
      name: "Toor Dal",
      imageUrl:
        "https://raw.githubusercontent.com/Sathish-Ramasundaram/images-srs/refs/heads/main/images/Toor%20Dal.png",
      quantity: "1 kg",
      price: 130,
      description: "High-quality toor dal for nutritious everyday meals.",
    },
    showImage: false,
    onAddToCart: () => {
      // Story action placeholder.
    },
  },
};