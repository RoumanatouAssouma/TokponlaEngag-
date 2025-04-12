import { Link } from "react-router-dom";
import logo from '../assets/LOGo tokponlaEngagé.png'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white border-t border-border">
      <div className="tokponla-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-14 h-10 rounded-full flex items-center justify-center">
                <img src={logo} alt="Logo" className="rounded-full" />
              </div>
              <span className="font-bold text-xl">TokponlaEngagé</span>
            </div>
            <p className="text-muted-foreground mb-4 text-white">
              Une plateforme intelligente pour la coaction urbaine en Afrique, propulsée par l'IA pour l'engagement citoyen.
            </p>
            <div className="flex space-x-4 hover:text-white">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-600"
                  >
                    <FaFacebook size={24} />
                    <span>Facebook</span>
                  </a>
            
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-600"
                  >
                    <FaTwitter size={24} />
                    <span>Twitter</span>
                  </a>
            
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-600"
                  >
                    <FaInstagram size={24} />
                    <span>Instagram</span>
                  </a>
            
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-600"
                  >
                    <FaLinkedin size={24} />
                    <span>LinkedIn</span>
                  </a>
            
                  <a
                    href="https://www.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-600"
                  >
                    <FaGithub size={24} />
                    <span>GitHub</span>
                  </a>
                </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-white hover:text-pink-600">
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-tokponla-primary">
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-muted-foreground hover:text-tokponla-primary">
                  Carte
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-tokponla-primary">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-tokponla-primary">
                   Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Pour les organisations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ngo-dashboard" className="text-muted-foreground hover:text-tokponla-primary">
                  Tableau de bord ONG
                </Link>
              </li>
              <li>
                <Link to="/create-project" className="text-muted-foreground hover:text-tokponla-primary">
                  Créer un projet
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-muted-foreground hover:text-tokponla-primary">
                  Rapports d'impact
                </Link>
              </li>
              <li>
                <Link to="/partnership" className="text-muted-foreground hover:text-tokponla-primary">
                  Partenariat
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-tokponla-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-tokponla-primary">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-tokponla-primary">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-tokponla-primary">
                  Centre d'aide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TokponlaEngagé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
