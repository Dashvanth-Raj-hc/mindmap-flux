import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Zap, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms automatically extract key concepts and relationships from your documents.',
  },
  {
    icon: Zap,
    title: 'Visual Learning',
    description: 'Transform complex information into intuitive visual structures for better comprehension.',
  },
  {
    icon: Share2,
    title: 'Export & Share',
    description: 'Easily export your mind maps as PDFs or share them with your team and collaborators.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Landing() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient leading-tight"
          >
            Visualize Knowledge.
            <br />
            Instantly.
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Transform any document into a clear, interactive mind map with the power of AI. 
            Make complex information simple and engaging.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/generator">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white font-medium px-8 py-6 text-lg">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="glass-card border-white/20 px-8 py-6 text-lg">
              Watch Demo
              <Download className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to turn information into insights, beautifully visualized.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass-card p-8 h-full hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center glass-card p-12 rounded-3xl"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-6"
          >
            Ready to Transform Your Documents?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Join thousands of professionals who are already using MindMap Genius to visualize and understand complex information.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link to="/generator">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white font-medium px-8 py-6 text-lg">
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}