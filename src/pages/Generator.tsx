import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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

export default function Generator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File uploaded successfully!",
        description: `${file.name} is ready to be processed.`,
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
  });

  const handleGenerateFromFile = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock mind map data
    const mockData = {
      title: selectedFile.name.replace(/\.[^/.]+$/, ""),
      nodes: [
        {
          id: "root",
          text: "Main Topic",
          children: [
            {
              id: "1",
              text: "Subtopic 1",
              children: [
                { id: "1.1", text: "Detail A", children: [] },
                { id: "1.2", text: "Detail B", children: [] },
              ]
            },
            {
              id: "2",
              text: "Subtopic 2",
              children: [
                { id: "2.1", text: "Detail C", children: [] },
                { id: "2.2", text: "Detail D", children: [] },
              ]
            },
          ]
        }
      ]
    };

    setIsProcessing(false);
    navigate('/mindmap', { state: { mindMapData: mockData } });
  };

  const handleGenerateFromText = async () => {
    if (!textInput.trim()) {
      toast({
        title: "No text provided",
        description: "Please enter some text to generate a mind map.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate text processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock mind map data
    const mockData = {
      title: "Generated Mind Map",
      nodes: [
        {
          id: "root",
          text: "Main Concept",
          children: [
            {
              id: "1",
              text: "Key Point 1",
              children: [
                { id: "1.1", text: "Supporting Idea A", children: [] },
                { id: "1.2", text: "Supporting Idea B", children: [] },
              ]
            },
            {
              id: "2",
              text: "Key Point 2",
              children: [
                { id: "2.1", text: "Supporting Idea C", children: [] },
                { id: "2.2", text: "Supporting Idea D", children: [] },
              ]
            },
          ]
        }
      ]
    };

    setIsProcessing(false);
    navigate('/mindmap', { state: { mindMapData: mockData } });
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
            Create Your Mind Map
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Upload a document or paste your text to generate an interactive mind map powered by AI.
          </motion.p>
        </motion.div>
      </section>

      {/* Generator Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* File Upload Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="glass-card p-8 h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Upload Document</h2>
              </div>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? 'border-primary bg-primary/5 animate-glow'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                {selectedFile ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or click to select • PDF, DOC, DOCX, TXT
                    </p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleGenerateFromFile}
                disabled={!selectedFile || isProcessing}
                className="w-full mt-6 bg-gradient-primary hover:opacity-90 text-white font-medium py-6"
              >
                {isProcessing ? (
                  <>
                    <Zap className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Generate Mind Map
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </Card>
          </motion.div>

          {/* Text Input Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="glass-card p-8 h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Paste Text</h2>
              </div>

              <div className="space-y-4">
                <Label htmlFor="text-input" className="text-sm font-medium">
                  Enter your text content
                </Label>
                <Textarea
                  id="text-input"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste your text here... The more detailed and structured your content, the better your mind map will be."
                  className="glass-card border-white/20 resize-none min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  {textInput.length} characters • Minimum 50 characters recommended
                </p>
              </div>

              <Button
                onClick={handleGenerateFromText}
                disabled={textInput.length < 10 || isProcessing}
                className="w-full mt-6 bg-gradient-primary hover:opacity-90 text-white font-medium py-6"
              >
                {isProcessing ? (
                  <>
                    <Zap className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Generate Mind Map
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </Card>
          </motion.div>

        </div>
      </section>
    </div>
  );
}