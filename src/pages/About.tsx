
import { useTheme } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const About = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleDarkMode={toggleTheme} isDarkMode={isDarkMode} />
      <main className="flex-grow py-12">
        <div className="tokponla-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">À propos de TokponlaEngagé</h1>
            
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
              <p className="text-lg mb-4">
                TokponlaEngagé est une plateforme innovante de coaction urbaine qui connecte les citoyens, 
                les ONG et les autorités locales pour identifier, financer et réaliser des projets d'amélioration
                communautaire grâce à l'intelligence artificielle et au financement participatif.
              </p>
              <p className="text-lg">
                Notre objectif est de transformer les défis urbains en opportunités d'action collective,
                en particulier dans les environnements urbains africains où les ressources peuvent être limitées
                mais où l'engagement communautaire est fort.
              </p>
            </Card>
            
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Comment ça fonctionne</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-950 text-white mr-3 flex-shrink-0">1</span>
                  <span>Les citoyens et ONG identifient et proposent des projets locaux via notre plateforme.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-950 text-white mr-3 flex-shrink-0">2</span>
                  <span>Notre IA analyse et score ces projets selon leur impact potentiel et leur urgence.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-950 text-white mr-3 flex-shrink-0">3</span>
                  <span>Les contributeurs peuvent soutenir financièrement les projets qui leur tiennent à cœur.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-950 text-white mr-3 flex-shrink-0">4</span>
                  <span>Les porteurs de projets reçoivent les fonds et mettent en œuvre les améliorations.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-950 text-white mr-3 flex-shrink-0">5</span>
                  <span>Tout le monde peut suivre l'impact et l'avancement des projets en temps réel.</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Notre équipe</h2>
              <p className="text-lg mb-6">
                TokponlaEngagé a été fondée par une équipe passionnée de technologues, d'urbanistes et 
                d'experts en développement communautaire, tous dédiés à créer un avenir urbain plus participatif et durable.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-24 h-24 rounded-full bg-yellow-600 mx-auto mb-3 flex items-center justify-center text-3xl font-bold">PK</div>
                  <h3 className="font-semibold">Paul KOMBETO</h3>
                  <p className="text-black">Fondateur & PDG</p>
                </div>
                <div>
                  <div className="w-24 h-24 rounded-full bg-yellow-600 mx-auto mb-3 flex items-center justify-center text-3xl font-bold">RA</div>
                  <h3 className="font-semibold">Roumanatou Assouma</h3>
                  <p className="text-black">Directrice des Operations</p>
                </div>
                <div>
                  <div className="w-24 h-24 rounded-full bg-yellow-600 mx-auto mb-3 flex items-center justify-center text-3xl font-bold">FH</div>
                  <h3 className="font-semibold">Fredy HOUNDAYI</h3>
                  <p className="text-black">Directeur Technique</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
