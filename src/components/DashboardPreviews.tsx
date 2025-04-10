
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, PieChart, Building2, LineChart, Briefcase } from "lucide-react";

const DashboardPreviews = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="tokponla-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Des tableaux de bord personnalisés</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Des expériences adaptées aux besoins spécifiques des différents utilisateurs
            pour une collaboration optimale.
          </p>
        </div>

        <Tabs defaultValue="citizen" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="citizen">Citoyen</TabsTrigger>
            <TabsTrigger value="ngo">ONG</TabsTrigger>
            <TabsTrigger value="admin">Administrateur</TabsTrigger>
          </TabsList>
          
          <TabsContent value="citizen" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tableau de bord citoyen</CardTitle>
                <CardDescription>
                  Découvrez, contribuez et suivez vos projets communautaires favoris
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="tokponla-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-tokponla-primary/10 flex items-center justify-center">
                        <BarChart className="text-tokponla-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Vos contributions</h3>
                        <p className="text-sm text-muted-foreground">Suivez l'impact de vos dons</p>
                      </div>
                    </div>
                  </div>
                  <div className="tokponla-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-tokponla-success/10 flex items-center justify-center">
                        <Users className="text-tokponla-success" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Projets recommandés</h3>
                        <p className="text-sm text-muted-foreground">Basés sur vos préférences</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Aperçu du tableau de bord citoyen</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ngo" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tableau de bord ONG / Porteur de projet</CardTitle>
                <CardDescription>
                  Gérez vos projets, suivez les financements et communiquez avec les contributeurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="tokponla-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-tokponla-secondary/10 flex items-center justify-center">
                        <PieChart className="text-tokponla-secondary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Suivi des financements</h3>
                        <p className="text-sm text-muted-foreground">Statistiques en temps réel</p>
                      </div>
                    </div>
                  </div>
                  <div className="tokponla-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-tokponla-accent/10 flex items-center justify-center">
                        <Building2 className="text-tokponla-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Projets actifs</h3>
                        <p className="text-sm text-muted-foreground">Gérez vos initiatives</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Aperçu du tableau de bord ONG</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tableau de bord administrateur</CardTitle>
                <CardDescription>
                  Supervisez l'ensemble de la plateforme et analysez les données d'impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="tokponla-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-tokponla-info/10 flex items-center justify-center">
                        <LineChart className="text-tokponla-info" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Analyse d'impact</h3>
                        <p className="text-sm text-muted-foreground">Statistiques globales</p>
                      </div>
                    </div>
                  </div>
                  <div className="tokponla-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-tokponla-error/10 flex items-center justify-center">
                        <Briefcase className="text-tokponla-error" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Modération des projets</h3>
                        <p className="text-sm text-muted-foreground">Revue et validation</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Aperçu du tableau de bord administrateur</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DashboardPreviews;
