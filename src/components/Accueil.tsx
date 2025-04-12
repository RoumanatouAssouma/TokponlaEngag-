
import { ArrowRight, Star, TrendingUp, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative from-background to-muted overflow-hidden">
      <div className="tokponla-container py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-yellow-600 dark:bg-tokponla-dark/50 text-white text-sm font-medium">
              Propulsé par l'IA pour l'Engagement Citoyen
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Transformez votre communauté avec{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-orange-400 to-blue-950">
                TokponlaEngagé
              </span>
            </h1>
            <p className="text-lg md:pr-10">
              Une plateforme intelligente qui connecte les citoyens, les ONG et les administrateurs pour
              créer un impact positif dans les communautés urbaines africaines.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/projects">
                <Button className="bg-blue-950">
                  Explorer les projets
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="bg-yellow-600">
                Comment ça marche
              </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star size={16} className="text-tokponla-secondary mr-1" />
                <span>AI-powered</span>
              </div>
              <div className="flex items-center">
                <TrendingUp size={16} className="text-tokponla-success mr-1" />
                <span>Projets avec impact</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="text-tokponla-accent mr-1" />
                <span>Collaboration communautaire</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="text-tokponla-error mr-1" />
                <span>Axé sur les besoins locaux</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-tokponla-primary/20 to-tokponla-accent/20 rounded-xl blur-xl opacity-70"></div>
            <div className="relative bg-card border border-border rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-lg">Projets recommandés par l'IA</h3>
              </div>
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 border-b border-border hover:bg-muted/50 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-md bg-tokponla-primary/20 flex items-center justify-center">
                        <Star className="text-tokponla-primary" size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Rénovation du parc municipal</h4>
                        <span className="text-xs px-2 py-1 bg-yellow-600 text-black rounded-full">
                          85% financé
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        Revitalisation du parc central pour créer un espace vert et sécurisé pour les familles.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex -space-x-1">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-5 h-5 rounded-full border-2 border-background bg-muted"
                            ></div>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">+32 contributeurs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4 text-center bg-yellow-600">
                <Link to="/projects" className="text-sm font-medium text-tokponla-dark hover:underline">
                  Voir tous les projets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
