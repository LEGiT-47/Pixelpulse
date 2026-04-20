import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import {
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["About", "Network", "Services", "How It Works", "Contact"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border backdrop-blur-md bg-opacity-97 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Logo className="w-8 h-8" />
          </motion.div>
          <span className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
            Pixelpulse
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm text-foreground hover:text-secondary transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 border-r border-border pr-4 mr-2">
            <motion.a
              href="https://instagram.com/pixelpulsellp"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://facebook.com/pixelpulsellp"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://youtube.com/@pixelpulsellp"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="mailto:hello@pixelpulsellp.in"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
              title="Email"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </motion.a>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-all"
              onClick={() => {
                window.location.hash = "contact";
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Book Consultation
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block"
          >
            <Button
              size="sm"
              className="bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                window.location.hash = "how-it-works";
                const campaignSection = document.getElementById("how-it-works");
                if (campaignSection) {
                  campaignSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Start Campaign
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/10 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-white pointer-events-auto"
            style={{ pointerEvents: "auto" }}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const sectionId = item.toLowerCase().replace(/\s/g, "-");
                    window.location.hash = sectionId;
                    setTimeout(() => {
                      const section = document.getElementById(sectionId);
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-2 rounded-lg text-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {item}
                </motion.a>
              ))}

              <div className="pt-3 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.hash = "contact";
                    setTimeout(() => {
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                    setIsMenuOpen(false);
                  }}
                >
                  Book Consultation
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.hash = "how-it-works";
                    setTimeout(() => {
                      const campaignSection =
                        document.getElementById("how-it-works");
                      if (campaignSection) {
                        campaignSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                    setIsMenuOpen(false);
                  }}
                >
                  Start Campaign
                </Button>
              </div>

              <div className="pt-3 border-t border-border flex items-center gap-3 justify-center">
                <motion.a
                  href="https://instagram.com/pixelpulsellp"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://facebook.com/pixelpulsellp"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://youtube.com/@pixelpulsellp"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="mailto:hello@pixelpulsellp.in"
                  whileHover={{ scale: 1.15 }}
                  className="p-2 rounded-full hover:bg-secondary/10 text-foreground hover:text-secondary transition-colors"
                  title="Email"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
