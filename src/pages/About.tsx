import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Users, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To make complex information accessible and understandable through the power of visual learning and AI.',
  },
  {
    icon: Brain,
    title: 'Innovation',
    description: 'We leverage cutting-edge AI technology to transform how people process and understand information.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a community of learners, educators, and professionals who value clear, visual communication.',
  },
  {
    icon: Lightbulb,
    title: 'Impact',
    description: 'Empowering individuals and teams to make better decisions through clearer understanding.',
  },
];

const team = [
  {
    name: 'Alex Chen',
    role: 'CEO & Co-Founder',
    image: '/placeholder.svg',
    initials: 'AC',
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO & Co-Founder',
    image: '/placeholder.svg',
    initials: 'SJ',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Lead AI Engineer',
    image: '/placeholder.svg',
    initials: 'MR',
  },
  {
    name: 'Emily Zhang',
    role: 'Head of Design',
    image: '/placeholder.svg',
    initials: 'EZ',
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

export default function About() {
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
            className="text-5xl md:text-6xl font-bold mb-6 text-gradient"
          >
            About MindMap Genius
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We believe that knowledge should be accessible, visual, and engaging. Our mission is to transform 
            how people understand and interact with complex information through the power of AI-driven mind mapping.
          </motion.p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Our Values
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass-card p-6 h-full text-center hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4 mx-auto">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Story
          </motion.h2>
          
          <Card className="glass-card p-8 lg:p-12">
            <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                MindMap Genius was born from a simple observation: in our information-rich world, 
                the biggest challenge isn't finding data—it's making sense of it. Traditional text-based 
                documents often hide the connections and relationships that make information truly useful.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our founders, Alex and Sarah, experienced this firsthand while working on complex research 
                projects. They spent countless hours manually creating mind maps to understand dense 
                academic papers and technical documentation. They realized there had to be a better way.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, MindMap Genius serves thousands of students, researchers, professionals, and 
                organizations worldwide, helping them unlock insights from their documents and 
                communicate complex ideas with clarity and impact.
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Meet Our Team
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="bg-gradient-primary text-white text-lg">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}