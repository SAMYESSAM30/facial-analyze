import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Product data
const products = [
  {
    id: 1,
    name: "Hydrating Serum",
    description: "Intense hydration for dry skin with hyaluronic acid",
    price: "$45.00",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "serum",
    concerns: ["dryness", "wrinkles"],
  },
  {
    id: 2,
    name: "Brightening Cream",
    description: "Reduces dark spots and evens skin tone",
    price: "$38.00",
    image:
      "https://images.unsplash.com/photo-1656147961292-a3fd00ac95ac?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "moisturizer",
    concerns: ["dark-spots", "uneven-tone"],
  },
  {
    id: 3,
    name: "Oil Control Cleanser",
    description: "Gentle formula that removes excess oil without drying",
    price: "$28.00",
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cleanser",
    concerns: ["oiliness", "enlarged-pores"],
  },
  {
    id: 4,
    name: "Soothing Mask",
    description: "Calms inflammation and reduces redness",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "mask",
    concerns: ["redness"],
  },
  {
    id: 5,
    name: "Retinol Night Cream",
    description: "Anti-aging formula that reduces fine lines and wrinkles",
    price: "$52.00",
    image:
      "https://images.unsplash.com/photo-1648712789205-4a05ebb8d026?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "moisturizer",
    concerns: ["wrinkles"],
  },
  {
    id: 6,
    name: "Pore Minimizing Toner",
    description: "Tightens pores and balances skin pH",
    price: "$26.00",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "toner",
    concerns: ["enlarged-pores", "oiliness"],
  },
];

const ProductsPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const filterProducts = (category: string) => {
    if (category === "all") {
      return products;
    }
    return products.filter(
      (product) =>
        product.category === category || product.concerns.includes(category)
    );
  };

  const filteredProducts = filterProducts(activeFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-skin-pink-light to-white dark:from-skin-dark dark:to-skin-dark-charcoal">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair">
            {t("products.title")}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            {t("products.subtitle")}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 md:px-6 bg-white dark:bg-skin-dark">
        <div className="container mx-auto">
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8 bg-skin-pink-light/30 dark:bg-skin-dark-gray">
              <TabsTrigger value="all" onClick={() => setActiveFilter("all")}>
                All
              </TabsTrigger>
              <TabsTrigger
                value="cleanser"
                onClick={() => setActiveFilter("cleanser")}
              >
                Cleansers
              </TabsTrigger>
              <TabsTrigger
                value="toner"
                onClick={() => setActiveFilter("toner")}
              >
                Toners
              </TabsTrigger>
              <TabsTrigger
                value="serum"
                onClick={() => setActiveFilter("serum")}
              >
                Serums
              </TabsTrigger>
              <TabsTrigger
                value="moisturizer"
                onClick={() => setActiveFilter("moisturizer")}
              >
                Moisturizers
              </TabsTrigger>
              <TabsTrigger value="mask" onClick={() => setActiveFilter("mask")}>
                Masks
              </TabsTrigger>
              <TabsTrigger
                value="dark-spots"
                onClick={() => setActiveFilter("dark-spots")}
              >
                Dark Spots
              </TabsTrigger>
              <TabsTrigger
                value="wrinkles"
                onClick={() => setActiveFilter("wrinkles")}
              >
                Wrinkles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden animated-card"
                  >
                    <div className="h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">{product.price}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.concerns.map((concern) => (
                          <span
                            key={concern}
                            className="bg-skin-pink-light dark:bg-skin-dark-gray px-2 py-1 rounded-full text-xs"
                          >
                            {concern.replace("-", " ")}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full btn-primary">
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Duplicate the TabsContent for other tabs but we'll use the filtered products variable */}
            {[
              "cleanser",
              "toner",
              "serum",
              "moisturizer",
              "mask",
              "dark-spots",
              "wrinkles",
            ].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden animated-card"
                    >
                      <div className="h-64 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-semibold">{product.price}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.concerns.map((concern) => (
                            <span
                              key={concern}
                              className="bg-skin-pink-light dark:bg-skin-dark-gray px-2 py-1 rounded-full text-xs"
                            >
                              {concern.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full btn-primary">
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
