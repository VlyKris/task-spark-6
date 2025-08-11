import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Star, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full py-6 px-4 fixed top-0 z-50 bg-background/50 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-glow-primary">
              TodoFlow
            </span>
          </motion.div>
          <AuthButton
            trigger={
              <Button
                size="lg"
                className="px-8 text-glow-primary shadow-[0_0_15px_oklch(var(--primary)/0.5)]"
              >
                Get Started Free
              </Button>
            }
            dashboardTrigger={
              <Button size="lg" variant="outline" className="px-8">
                Open App
              </Button>
            }
          />
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 pt-48 pb-20 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-glow-primary"
        >
          Organize Your Life, In Style
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          The simple, powerful todo app that helps you stay focused and get
          things done. Beautiful, fast, and designed for productivity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <AuthButton
            trigger={
              <Button
                size="lg"
                className="px-12 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 text-glow-primary shadow-[0_0_20px_oklch(var(--primary)/0.6)]"
              >
                Start Organizing Today
              </Button>
            }
          />
          <Button
            size="lg"
            variant="secondary"
            className="px-12 py-6 text-lg text-glow-secondary shadow-[0_0_20px_oklch(var(--secondary)/0.6)]"
          >
            Watch Demo
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-glow-secondary">
            Everything you need to stay organized
          </h2>
          <p className="text-xl text-muted-foreground">
            Simple features that make a big difference in your daily
            productivity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-8 w-8 text-secondary" />,
              title: "Lightning Fast",
              description:
                "Add, edit, and complete tasks in seconds. No lag, no waiting.",
            },
            {
              icon: <Star className="h-8 w-8 text-primary" />,
              title: "Priority System",
              description:
                "Set priorities to focus on what matters most. High, medium, low.",
            },
            {
              icon: <Clock className="h-8 w-8 text-accent" />,
              title: "Due Dates",
              description:
                "Never miss a deadline with optional due date tracking.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 0 20px oklch(var(--primary)/0.4)",
                borderColor: "oklch(var(--primary))",
              }}
              className="p-8 rounded-lg border bg-card/80 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 py-20 text-center"
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20 shadow-[0_0_30px_oklch(var(--primary)/0.3)]">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-glow-primary">
            Ready to get organized?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of productive people who trust TodoFlow to keep their
            lives organized.
          </p>
          <AuthButton
            trigger={
              <Button
                size="lg"
                className="px-12 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 text-glow-primary shadow-[0_0_20px_oklch(var(--primary)/0.6)]"
              >
                Start Your Free Account
              </Button>
            }
          />
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="border-t py-12 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-glow-primary">
              TodoFlow
            </span>
          </div>
          <p className="text-muted-foreground">
            Built with cyberpunk vibes for productivity enthusiasts
          </p>
        </div>
      </motion.footer>
    </div>
  );
}