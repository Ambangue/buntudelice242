import { useParams } from "react-router-dom";
import { Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const RestaurantDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const restaurant = {
    id,
    name: "Mami Wata",
    description: "Les meilleurs plats congolais traditionnels",
    rating: 4.8,
    deliveryTime: "25-35 min",
    minOrder: "5000 FCFA",
    image: "/restaurant.jpg",
    categories: ["Entrées", "Plats principaux", "Desserts", "Boissons"],
    menu: [
      // Entrées
      {
        id: "1",
        name: "Salade d'avocat",
        description: "Salade fraîche d'avocat avec tomates et oignons",
        price: 2000,
        image: "/salade.jpg",
        category: "Entrées"
      },
      {
        id: "2",
        name: "Accras de morue",
        description: "Beignets de morue épicés",
        price: 2500,
        image: "/accras.jpg",
        category: "Entrées"
      },
      // Plats principaux
      {
        id: "3",
        name: "Poulet Moambé",
        description: "Poulet mijoté dans une sauce à base de noix de palme",
        price: 5000,
        image: "/moambe.jpg",
        category: "Plats principaux"
      },
      {
        id: "4",
        name: "Saka Saka",
        description: "Feuilles de manioc pilées avec poisson fumé",
        price: 4000,
        image: "/saka-saka.jpg",
        category: "Plats principaux"
      },
      // Desserts
      {
        id: "5",
        name: "Beignets aux bananes",
        description: "Beignets de bananes plantains sucrés",
        price: 2000,
        image: "/beignets.jpg",
        category: "Desserts"
      },
      {
        id: "6",
        name: "Gâteau à la noix de coco",
        description: "Gâteau moelleux à la noix de coco",
        price: 2500,
        image: "/gateau.jpg",
        category: "Desserts"
      },
      // Boissons
      {
        id: "7",
        name: "Jus de Gingembre",
        description: "Jus de gingembre fait maison",
        price: 1500,
        image: "/gingembre.jpg",
        category: "Boissons"
      },
      {
        id: "8",
        name: "Bissap",
        description: "Jus d'hibiscus naturel",
        price: 1500,
        image: "/bissap.jpg",
        category: "Boissons"
      }
    ] as MenuItem[]
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: restaurant.id
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        {/* En-tête du restaurant */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-6">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="mb-2">{restaurant.description}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>2.5 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="grid md:grid-cols-[240px,1fr] gap-6">
          {/* Catégories */}
          <div className="space-y-2">
            {restaurant.categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className="w-full justify-start"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Liste des plats */}
          <div className="space-y-6">
            {restaurant.categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-4">{category}</h2>
                <div className="grid gap-4">
                  {restaurant.menu
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <Card key={item.id}>
                        <div className="flex">
                          <CardContent className="flex-1 p-6">
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription className="mt-2">
                              {item.description}
                            </CardDescription>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="font-bold">
                                {item.price} FCFA
                              </span>
                              <Button 
                                className="bg-buntu-primary hover:bg-buntu-secondary"
                                onClick={() => handleAddToCart(item)}
                              >
                                Ajouter au panier
                              </Button>
                            </div>
                          </CardContent>
                          {item.image && (
                            <div className="w-40 h-40">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;