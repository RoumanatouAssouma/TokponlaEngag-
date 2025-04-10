
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Calendar,
  Users,
  Heart,
  MessageSquare,
  Share2,
  Clock,
  BarChart3,
  FileText,
  Image,
  AlertCircle,
  Award
} from "lucide-react";
import ChatbotAssistant from "@/components/ChatbotAssistant";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

// Données fictives du projet
const PROJECT = {
  id: 1,
  title: "Rénovation du parc municipal",
  description: "Notre projet vise à revitaliser le parc municipal du quartier Nord, un espace vert essentiel mais actuellement dégradé. Nous prévoyons d'installer de nouveaux équipements de jeux pour enfants, de créer des zones ombragées avec des bancs, d'améliorer les chemins piétonniers et de planter de nouvelles espèces végétales locales.\n\nCe parc est le seul espace vert dans un rayon de 3 km et sert quotidiennement à plus de 500 familles. Sa rénovation améliorera considérablement la qualité de vie des résidents, offrira un espace sûr pour les enfants et contribuera à la biodiversité urbaine.",
  location: "Cotonou, Bénin",
  category: "Environnement",
  raisedAmount: 3200000,
  goalAmount: 5000000,
  supporters: 47,
  daysLeft: 23,
  startDate: "2025-03-15",
  endDate: "2025-05-15",
  image: "/images/park-renovation.jpg",
  gallery: [
    "/images/park-renovation.jpg", 
    "/images/park-playground.jpg", 
    "/images/park-benches.jpg"
  ],
  aiScore: 85,
  organization: {
    name: "Association pour un Bénin Vert",
    logo: "/images/benin-vert-logo.jpg",
    verified: true,
    projects: 12,
    description: "Association à but non lucratif fondée en 2018, dédiée à l'amélioration des espaces verts urbains et à la sensibilisation environnementale.",
  },
  updates: [
    {
      date: "2025-03-28",
      title: "Lancement du projet",
      content: "Nous sommes ravis d'annoncer le lancement officiel de notre campagne de financement pour la rénovation du parc municipal!",
    },
    {
      date: "2025-04-05",
      title: "Premier objectif atteint",
      content: "Grâce à votre générosité, nous avons atteint 30% de notre objectif en seulement 3 semaines. Un grand merci à tous les contributeurs!",
    }
  ],
  comments: [
    {
      user: "Marie K.",
      avatar: null,
      date: "2025-04-01",
      content: "Ce projet est exactement ce dont notre quartier a besoin. Mes enfants seront ravis d'avoir un espace de jeu rénové!",
    },
    {
      user: "Thomas L.",
      avatar: null,
      date: "2025-04-03",
      content: "J'apprécie particulièrement l'aspect écologique du projet avec la plantation d'espèces locales. Avez-vous prévu un système d'irrigation durable?",
    }
  ],
  documents: [
    {
      name: "Plan_de_renovation.pdf",
      size: "2.4 MB",
      type: "pdf"
    },
    {
      name: "Budget_detaille.xlsx",
      size: "1.1 MB",
      type: "excel"
    }
  ],
  impact: [
    "Amélioration de la qualité de vie pour plus de 2000 résidents",
    "Création d'un espace de loisirs sécurisé pour 500+ enfants",
    "Augmentation de 30% de la couverture végétale dans le quartier",
    "Réduction des îlots de chaleur urbains"
  ]
};

// Formatter les montants en francs CFA
const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
};

// Calculer le pourcentage de financement atteint
const calculateProgress = (raised: number, goal: number) => {
  return Math.min(Math.round((raised / goal) * 100), 100);
};

// Formatter les dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Fonction pour gérer les erreurs d'image et fournir un fallback
const getPlaceholderForImage = (category: string) => {
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

const ProjectDetail = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const { projectId } = useParams();
  const [comment, setComment] = useState("");
  const [likedProject, setLikedProject] = useState(false);
  const [selectedImage, setSelectedImage] = useState(PROJECT.image);
  const { toast } = useToast();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Dans une vraie application, nous chargerions les données du projet en fonction de l'ID
  // const { data: project, isLoading, error } = useQuery({
  //   queryKey: ['project', projectId],
  //   queryFn: () => fetchProject(projectId),
  // });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      toast({
        title: "Commentaire envoyé",
        description: "Votre commentaire a été publié avec succès.",
      });
      setComment("");
    }
  };

  const handleContribute = () => {
    toast({
      title: "Contribution en cours",
      description: "Vous allez être redirigé vers la page de paiement.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Partage",
      description: "Lien copié dans le presse-papier. Partagez avec vos amis!",
    });
  };

  const toggleLike = () => {
    setLikedProject(!likedProject);
    toast({
      title: likedProject ? "Retiré des favoris" : "Ajouté aux favoris",
      description: likedProject ? "Projet retiré de vos favoris" : "Projet ajouté à vos favoris",
    });
  };

  // Gérer les erreurs d'image
  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
    
    // Si l'image sélectionnée a échoué, définir la première disponible
    if (imageUrl === selectedImage) {
      const availableImage = PROJECT.gallery.find(img => !imageErrors[img]) || PROJECT.image;
      if (!imageErrors[availableImage]) {
        setSelectedImage(availableImage);
      } else {
        // Si toutes les images ont échoué, utiliser l'image par défaut
        setSelectedImage(getPlaceholderForImage(PROJECT.category));
      }
    }
  };

  // Obtenir l'URL d'image en tenant compte des erreurs
  const getImageUrl = (imageUrl: string) => {
    if (imageErrors[imageUrl]) {
      return getPlaceholderForImage(PROJECT.category);
    }
    return imageUrl;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleDarkMode={toggleTheme} isDarkMode={isDarkMode} />
      <main className="flex-grow py-8">
        <div className="tokponla-container">
          {/* En-tête du projet */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin size={14} className="mr-1" />
                <span>{PROJECT.location}</span>
                <span className="mx-2">•</span>
                <span>{PROJECT.category}</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{PROJECT.title}</h1>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage 
                      src={PROJECT.organization.logo} 
                      alt={PROJECT.organization.name} 
                      onError={() => setImageErrors(prev => ({ ...prev, [PROJECT.organization.logo]: true }))}
                    />
                    <AvatarFallback>{PROJECT.organization.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{PROJECT.organization.name}</span>
                  {PROJECT.organization.verified && (
                    <Award size={16} className="ml-1 text-tokponla-primary" aria-label="Organisation vérifiée" />
                  )}
                </div>
                <div className="bg-black/10 dark:bg-white/10 text-foreground px-3 py-1 rounded-full text-xs">
                  Score IA: {PROJECT.aiScore}/100
                </div>
              </div>
            </div>
            <div className="flex space-x-2 self-end">
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleLike}
                className={likedProject ? "text-red-500" : ""}
              >
                <Heart size={18} fill={likedProject ? "currentColor" : "none"} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 size={18} />
              </Button>
              <Button className="bg-tokponla-primary hover:bg-tokponla-primary/90" onClick={handleContribute}>
                Contribuer
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Galerie d'images */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img 
                    src={getImageUrl(selectedImage)} 
                    alt={PROJECT.title} 
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(selectedImage)}
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  <div 
                    className={`w-20 h-20 rounded-md cursor-pointer flex-shrink-0 border-2 ${selectedImage === PROJECT.image ? 'border-tokponla-primary' : 'border-transparent'}`}
                    onClick={() => setSelectedImage(PROJECT.image)}
                  >
                    <img 
                      src={getImageUrl(PROJECT.image)} 
                      alt="Principale" 
                      className="w-full h-full object-cover rounded-sm"
                      onError={() => handleImageError(PROJECT.image)}
                      loading="lazy"
                    />
                  </div>
                  {PROJECT.gallery.map((img, index) => (
                    <div 
                      key={index}
                      className={`w-20 h-20 rounded-md cursor-pointer flex-shrink-0 border-2 ${selectedImage === img ? 'border-tokponla-primary' : 'border-transparent'}`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img 
                        src={getImageUrl(img)} 
                        alt={`Image ${index + 1}`} 
                        className="w-full h-full object-cover rounded-sm"
                        onError={() => handleImageError(img)}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Onglets d'information */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                  <TabsTrigger value="updates" className="flex-1">Mises à jour</TabsTrigger>
                  <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
                  <TabsTrigger value="comments" className="flex-1">Commentaires</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-4">
                  <Card className="p-6">
                    <div className="whitespace-pre-line mb-6">
                      {PROJECT.description}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Impact attendu</h3>
                    <ul className="space-y-2">
                      {PROJECT.impact.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 w-5 h-5 rounded-full bg-tokponla-primary/20 flex items-center justify-center text-tokponla-primary">✓</div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="updates" className="mt-4">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Mises à jour du projet</h3>
                    <div className="space-y-6">
                      {PROJECT.updates.length > 0 ? (
                        PROJECT.updates.map((update, index) => (
                          <div key={index} className="border-l-2 border-tokponla-primary pl-4 pb-6">
                            <div className="text-sm text-muted-foreground mb-1">{formatDate(update.date)}</div>
                            <h4 className="font-medium mb-2">{update.title}</h4>
                            <p>{update.content}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                          <p className="text-muted-foreground">Aucune mise à jour pour le moment</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Documents du projet</h3>
                    {PROJECT.documents.length > 0 ? (
                      <div className="space-y-3">
                        {PROJECT.documents.map((doc, index) => (
                          <div key={index} className="flex items-center p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors">
                            <div className="mr-3 p-2 bg-tokponla-primary/10 text-tokponla-primary rounded">
                              <FileText size={20} />
                            </div>
                            <div className="flex-grow">
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.size}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Télécharger
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                        <p className="text-muted-foreground">Aucun document disponible</p>
                      </div>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="comments" className="mt-4">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Commentaires ({PROJECT.comments.length})</h3>
                    
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                      <Textarea 
                        placeholder="Partagez vos questions ou encouragements..." 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={!comment.trim()} 
                          className="bg-tokponla-primary hover:bg-tokponla-primary/90"
                        >
                          Publier
                        </Button>
                      </div>
                    </form>
                    
                    <div className="space-y-4">
                      {PROJECT.comments.length > 0 ? (
                        PROJECT.comments.map((comment, index) => (
                          <div key={index} className="border-b border-border pb-4 last:border-0">
                            <div className="flex items-center mb-2">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={comment.avatar || undefined} alt={comment.user} />
                                <AvatarFallback>{comment.user.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{comment.user}</p>
                                <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
                              </div>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                          <p className="text-muted-foreground">Soyez le premier à commenter ce projet</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Barre latérale */}
            <div className="space-y-6">
              {/* Progression de la collecte */}
              <Card className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-2xl font-semibold">{formatAmount(PROJECT.raisedAmount)}</span>
                    <span className="text-muted-foreground">{formatAmount(PROJECT.goalAmount)}</span>
                  </div>
                  <Progress value={calculateProgress(PROJECT.raisedAmount, PROJECT.goalAmount)} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users size={16} className="mr-1 text-muted-foreground" />
                      <span className="font-semibold">{PROJECT.supporters}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Contributeurs</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock size={16} className="mr-1 text-muted-foreground" />
                      <span className="font-semibold">{PROJECT.daysLeft}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Jours restants</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <BarChart3 size={16} className="mr-1 text-muted-foreground" />
                      <span className="font-semibold">{calculateProgress(PROJECT.raisedAmount, PROJECT.goalAmount)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Financé</p>
                  </div>
                </div>
                
                <div className="mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center mb-1">
                    <Calendar size={14} className="mr-2" />
                    <span>Début: {formatDate(PROJECT.startDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    <span>Fin: {formatDate(PROJECT.endDate)}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-tokponla-primary hover:bg-tokponla-primary/90 mb-2" onClick={handleContribute}>
                  Contribuer à ce projet
                </Button>
                
                <div className="text-xs text-center text-muted-foreground">
                  Paiement sécurisé par Mobile Money et carte bancaire
                </div>
              </Card>
              
              {/* À propos de l'organisation */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">À propos du porteur de projet</h3>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={PROJECT.organization.logo} alt={PROJECT.organization.name} />
                    <AvatarFallback>{PROJECT.organization.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{PROJECT.organization.name}</h4>
                      {PROJECT.organization.verified && (
                        <Award size={16} className="ml-1 text-tokponla-primary" aria-label="Organisation vérifiée" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{PROJECT.organization.projects} projets réalisés</p>
                  </div>
                </div>
                <p className="text-sm mb-4">{PROJECT.organization.description}</p>
                <Button variant="outline" className="w-full">
                  Voir le profil
                </Button>
              </Card>
              
              {/* Score IA */}
              <Card className="p-6 bg-gradient-to-br from-tokponla-primary/10 to-transparent">
                <h3 className="text-lg font-semibold mb-4">Score d'impact IA</h3>
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-tokponla-primary flex items-center justify-center">
                    <span className="text-2xl font-bold">{PROJECT.aiScore}</span>
                  </div>
                </div>
                <p className="text-sm text-center mb-4">
                  Ce projet a reçu un score d'impact élevé de notre système d'IA, indiquant un potentiel significatif de bénéfices pour la communauté.
                </p>
                <div className="text-xs text-muted-foreground">
                  Le score est calculé en fonction de l'urgence, l'impact potentiel, la faisabilité et la pertinence géographique.
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotAssistant />
    </div>
  );
};

export default ProjectDetail;
