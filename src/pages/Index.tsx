
import { useTheme } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DashboardPreviews from "@/components/DashboardPreviews";
import ChatbotAssistant from "@/components/ChatbotAssistant";
import Footer from "@/components/Footer";

const Index = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleDarkMode={toggleTheme} isDarkMode={isDarkMode} />
      <main className="flex-grow">
        <Hero />
        <Features />
        <DashboardPreviews />
        <ChatbotAssistant />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
