
import { BrainCircuit, MapPin, PieChart, MessageSquare, HandCoins, Zap } from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="w-6 h-6 text-tokponla-primary" />,
    title: "IA de détection des besoins",
    description:
      "Notre IA analyse les actualités locales et les réseaux sociaux pour identifier les problèmes communautaires prioritaires.",
  },
  {
    icon: <PieChart className="w-6 h-6 text-tokponla-secondary" />,
    title: "Notation intelligente des projets",
    description:
      "L'IA évalue chaque projet selon son urgence, son impact potentiel et sa pertinence géographique.",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-tokponla-accent" />,
    title: "Assistant IA conversationnel",
    description:
      "Un chatbot qui guide les utilisateurs, explique les projets et répond aux questions dans plusieurs langues.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-tokponla-error" />,
    title: "Visualisation géographique",
    description:
      "Découvrez les projets sur une carte interactive pour identifier ceux qui sont proches de vous.",
  },
  {
    icon: <HandCoins className="w-6 h-6 text-tokponla-success" />,
    title: "Financement participatif sécurisé",
    description:
      "Contribuez facilement via Mobile Money avec suivi transparent des fonds collectés.",
  },
  {
    icon: <Zap className="w-6 h-6 text-tokponla-info" />,
    title: "Mode faible connectivité",
    description:
      "Accédez à la plateforme même dans les zones à connectivité limitée grâce à notre mode hors ligne.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-background" id="features">
      <div className="tokponla-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Une plateforme complète propulsée par l'IA
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            TokponlaEngagé utilise l'intelligence artificielle pour connecter les communautés, 
            identifier les besoins et maximiser l'impact des projets urbains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="tokponla-card p-6 flex flex-col h-full group"
            >
              <div className="p-2 w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
