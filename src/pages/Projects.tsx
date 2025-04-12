
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Calendar, Heart, MessageSquare, Filter, Search } from "lucide-react";
import ChatbotAssistant from "@/components/ChatbotAssistant";
import { Link } from "react-router-dom";

// Données fictives pour les projets
const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Rénovation du parc municipal",
    description: "Amélioration des espaces verts et installation de jeux pour enfants au parc central.",
    location: "Cotonou, Bénin",
    category: "Environnement",
    raisedAmount: 3200000,
    goalAmount: 5000000,
    supporters: 47,
    daysLeft: 23,
    image: "/images/park-renovation.jpg",
    aiScore: 85,
  },
  {
    id: 2,
    title: "Accès à l'eau potable - Quartier Nord",
    description: "Installation de 5 points d'eau potable dans les zones non desservies du quartier Nord.",
    location: "Lomé, Togo",
    category: "Infrastructure",
    raisedAmount: 1800000,
    goalAmount: 3000000,
    supporters: 32,
    daysLeft: 15,
    image: "/images/water-access.jpg",
    aiScore: 92,
  },
  {
    id: 3,
    title: "Programme d'alphabétisation numérique",
    description: "Cours d'initiation à l'informatique pour les jeunes et les femmes de la communauté.",
    location: "Porto-Novo, Bénin",
    category: "Éducation",
    raisedAmount: 900000,
    goalAmount: 2000000,
    supporters: 18,
    daysLeft: 35,
    image: "/images/digital-literacy.jpg",
    aiScore: 78,
  },
  {
    id: 4,
    title: "Centre de santé communautaire",
    description: "Rénovation et équipement d'un petit centre de santé pour améliorer l'accès aux soins.",
    location: "Parakou, Bénin",
    category: "Santé",
    raisedAmount: 4500000,
    goalAmount: 7000000,
    supporters: 68,
    daysLeft: 12,
    image: "/images/health-center.jpg",
    aiScore: 94,
  },
  {
    id: 5,
    title: "Électrification solaire de l'école",
    description: "Installation de panneaux solaires pour fournir de l'électricité à l'école du village.",
    location: "Kpalimé, Togo",
    category: "Énergie",
    raisedAmount: 1200000,
    goalAmount: 2500000,
    supporters: 29,
    daysLeft: 18,
    image: "/images/solar-school.jpg",
    aiScore: 89,
  },
  {
    id: 6,
    title: "Programme de gestion des déchets",
    description: "Mise en place d'un système communautaire de collecte et tri des déchets.",
    location: "Abomey, Bénin",
    category: "Environnement",
    raisedAmount: 750000,
    goalAmount: 1500000,
    supporters: 23,
    daysLeft: 28,
    image: "/images/waste-management.jpg",
    aiScore: 81,
  }
];

// Formatter les montants en francs CFA
const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
};

// Calculer le pourcentage de financement atteint
const calculateProgress = (raised: number, goal: number) => {
  return Math.min(Math.round((raised / goal) * 100), 100);
};

// Fonction pour obtenir une image de secours pour les projets sans image
const getPlaceholderImage = (category: string) => {
  switch (category.toLowerCase()) {
    case 'environnement':
      return "/images/environment-placeholder.jpg";
    case 'infrastructure':
      return "/images/infrastructure-placeholder.jpg";
    case 'éducation':
      return "/images/education-placeholder.jpg";
    case 'santé':
      return "/images/health-placeholder.jpg";
    case 'énergie':
      return "/images/energy-placeholder.jpg";
    default:
      return "/placeholder.svg";
  }
};

const Projects = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("list");
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Gérer les erreurs d'image
  const handleImageError = (projectId: number) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  // Obtenir l'URL d'image en tenant compte des erreurs
  const getImageUrl = (project: any) => {
    if (imageErrors[project.id]) {
      return getPlaceholderImage(project.category);
    }
    return project.image;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleDarkMode={toggleTheme} isDarkMode={isDarkMode} />
      <main className="flex-grow py-8">
        <div className="tokponla-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Projets communautaires</h1>
              <p className="text-muted-foreground">Découvrez et soutenez des initiatives locales à fort impact</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-yellow-600">
                <Filter size={18} className="mr-2" />
                Filtrer
              </Button>
              <Link to="/create-project">
                <Button className="bg-blue-950 hover:bg-tokponla-primary/90">
                  Proposer un projet
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md w-full mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Rechercher par nom, lieu ou catégorie..."
                className="pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="mb-6 bg-yellow-600 text-white">
              <TabsTrigger value="all">Tous les projets</TabsTrigger>
              <TabsTrigger value="popular">Populaires</TabsTrigger>
              <TabsTrigger value="urgent">Urgents</TabsTrigger>
              <TabsTrigger value="nearMe">Près de moi</TabsTrigger>
            </TabsList>

            <div className="flex justify-end mb-4">
              <div className="inline-flex border rounded-md p-1 bg-yellow-600">
                <Button 
                  variant={currentView === "list" ? "default" : "ghost"} 
                  size="sm" 
                  onClick={() => setCurrentView("list")}
                  className={currentView === "list" ? "bg-blue-950 hover:bg-tokponla-primary/90" : ""}
                >
                  Liste
                </Button>
                <Button 
                  variant={currentView === "map" ? "default" : "ghost"} 
                  size="sm" 
                  onClick={() => setCurrentView("map")}
                  className={currentView === "map" ? "bg-blue-950 hover:bg-tokponla-primary/90" : ""}
                >
                  Carte
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {currentView === "list" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MOCK_PROJECTS.map((project) => (
                    <Card key={project.id} className="overflow-hidden flex flex-col h-full">
                      <div className="relative">
                        <Link to={`/projects/${project.id}`}>
                          <div className="w-full h-48 bg-muted">
                            <img 
                              src={getImageUrl(project)} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(project.id)}
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                            Score IA: {project.aiScore}/100
                          </div>
                        </Link>
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin size={14} className="mr-1" />
                          <span>{project.location}</span>
                          <span className="mx-2">•</span>
                          <span>{project.category}</span>
                        </div>
                        <Link to={`/projects/${project.id}`} className="text-blue-600 hover:text-tokponla-primary transition-colors">
                          <h3 className="text-xl font-semibold mb-2 ">{project.title}</h3>
                        </Link>
                        <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                        
                        <div className="mb-4 ">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{formatAmount(project.raisedAmount)}</span>
                            <span className="text-muted-foreground">{formatAmount(project.goalAmount)}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div 
                              className="bg-yellow-600 h-2.5 rounded-full" 
                              style={{ width: `${calculateProgress(project.raisedAmount, project.goalAmount)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Users size={14} className="mr-1" />
                            <span>{project.supporters} supporters</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{project.daysLeft} jours restants</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link to={`/projects/${project.id}`} className="flex-grow">
                            <Button className="w-full bg-blue-950 hover:bg-tokponla-primary/90">
                              Contribuer
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            <Heart size={18} />
                          </Button>
                          <Button variant="outline" size="icon">
                            <MessageSquare size={18} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">Vue Carte</h3>
                  <p className="text-muted-foreground mb-4">
                    La visualisation des projets sur une carte sera disponible prochainement.
                  </p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <MapPin size={48} className="text-muted-foreground opacity-50" />
                  </div>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <Card className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Projets populaires</h3>
                <p className="text-muted-foreground">
                  Les projets les plus soutenus par la communauté seront affichés ici.
                </p>
              </Card>
            </TabsContent>
            
            <TabsContent value="urgent" className="mt-0">
              <Card className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Projets urgents</h3>
                <p className="text-muted-foreground">
                  Les projets nécessitant une action rapide seront affichés ici.
                </p>
              </Card>
            </TabsContent>
            
            <TabsContent value="nearMe" className="mt-0">
              <Card className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Projets près de vous</h3>
                <p className="text-muted-foreground">
                  Cette fonctionnalité nécessite l'accès à votre localisation pour afficher les projets à proximité.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <ChatbotAssistant />
    </div>
  );
};

export default Projects;
