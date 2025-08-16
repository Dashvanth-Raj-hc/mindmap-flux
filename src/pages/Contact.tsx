import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get in touch with our team',
    contact: 'hello@mindmapgenius.com',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with our support team',
    contact: 'Available 9am-5pm EST',
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setIsSubmitting(false);
  };

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
            Get in Touch
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Have questions about MindMap Genius? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-8"
            >
              Contact Information
            </motion.h2>

            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                      <p className="text-muted-foreground mb-2">{info.description}</p>
                      <p className="text-primary font-medium">{info.contact}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 2:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-8"
            >
              Send us a Message
            </motion.h2>

            <motion.div variants={itemVariants}>
              <Card className="glass-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="glass-card border-white/20"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="glass-card border-white/20"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="glass-card border-white/20 resize-none"
                      placeholder="Tell us about your project or question..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}