import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface MindMapNode {
  id: string;
  text: string;
  children: MindMapNode[];
}

interface MindMapData {
  title: string;
  nodes: MindMapNode[];
}

const MindMapVisualization: React.FC<{ data: MindMapData }> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const renderNode = (node: MindMapNode, level: number = 0, angle: number = 0, total: number = 1, index: number = 0) => {
    const radius = 100 + level * 80;
    const nodeAngle = angle + (index - (total - 1) / 2) * (Math.PI / Math.max(total, 3));
    
    const x = level === 0 ? 300 : 300 + Math.cos(nodeAngle) * radius;
    const y = level === 0 ? 200 : 200 + Math.sin(nodeAngle) * radius;

    const isSelected = selectedNode === node.id;

    return (
      <g key={node.id}>
        {/* Connection line to parent */}
        {level > 0 && (
          <line
            x1={300}
            y1={200}
            x2={x}
            y2={y}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            opacity="0.6"
          />
        )}
        
        {/* Node circle */}
        <motion.circle
          cx={x}
          cy={y}
          r={level === 0 ? 30 : 20}
          fill={isSelected ? "hsl(var(--primary))" : "hsl(var(--accent))"}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          className="cursor-pointer"
          onClick={() => setSelectedNode(node.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: level * 0.2 + index * 0.1 }}
        />
        
        {/* Node text */}
        <motion.text
          x={x}
          y={y + 50}
          textAnchor="middle"
          className="fill-foreground text-sm font-medium max-w-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: level * 0.2 + index * 0.1 + 0.2 }}
        >
          {node.text.length > 15 ? `${node.text.substring(0, 15)}...` : node.text}
        </motion.text>
        
        {/* Render children */}
        {node.children.map((child, childIndex) =>
          renderNode(child, level + 1, nodeAngle, node.children.length, childIndex)
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-full">
      <svg
        width="100%"
        height="600"
        viewBox="0 0 600 400"
        className="border border-border rounded-lg bg-card/50"
      >
        {data.nodes.map((node, index) => renderNode(node, 0, 0, 1, index))}
      </svg>
    </div>
  );
};

export default function MindMapViewer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.mindMapData) {
      setMindMapData(location.state.mindMapData);
    } else {
      // Fallback sample data if no data is passed
      setMindMapData({
        title: "Sample Mind Map",
        nodes: [
          {
            id: "root",
            text: "Central Topic",
            children: [
              {
                id: "1",
                text: "Branch 1",
                children: [
                  { id: "1.1", text: "Leaf A", children: [] },
                  { id: "1.2", text: "Leaf B", children: [] },
                ]
              },
              {
                id: "2",
                text: "Branch 2",
                children: [
                  { id: "2.1", text: "Leaf C", children: [] },
                ]
              },
            ]
          }
        ]
      });
    }
  }, [location.state]);

  const handleExportPDF = () => {
    toast({
      title: "Exporting PDF...",
      description: "Your mind map will be downloaded shortly.",
    });
    // Simulate PDF export
    setTimeout(() => {
      toast({
        title: "PDF exported successfully!",
        description: "Your mind map has been saved to your downloads folder.",
      });
    }, 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Mind map link has been copied to your clipboard.",
    });
  };

  if (!mindMapData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No mind map data found</h1>
          <Button onClick={() => navigate('/generator')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Generator
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card border-b border-white/10 sticky top-20 z-40"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold">{mindMapData.title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="glass-card border-white/20">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="glass-card border-white/20">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="glass-card border-white/20">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleShare} className="glass-card border-white/20">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button onClick={handleExportPDF} className="bg-gradient-primary hover:opacity-90 text-white">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Main Visualization Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Card className="glass-card p-6">
              <MindMapVisualization data={mindMapData} />
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Summary</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Total Nodes:</span>
                  <span className="font-medium text-foreground">
                    {mindMapData.nodes.reduce((count, node) => {
                      const countNodes = (n: MindMapNode): number => 
                        1 + n.children.reduce((sum, child) => sum + countNodes(child), 0);
                      return count + countNodes(node);
                    }, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Depth Level:</span>
                  <span className="font-medium text-foreground">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="font-medium text-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Node Details Card */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Node Details</h3>
              {selectedNode ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected: {selectedNode}</p>
                  <p className="text-sm text-muted-foreground">
                    Click on nodes in the visualization to explore details.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click on a node in the visualization to see its details here.
                </p>
              )}
            </Card>

            {/* Actions Card */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full glass-card border-white/20">
                  Edit Mind Map
                </Button>
                <Button variant="outline" className="w-full glass-card border-white/20">
                  Duplicate
                </Button>
                <Button variant="outline" className="w-full glass-card border-white/20">
                  Save to Library
                </Button>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}