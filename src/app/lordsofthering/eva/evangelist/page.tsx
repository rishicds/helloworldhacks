"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Badge } from 'lucide-react';
import Image from 'next/image';

interface BadgeGeneratorProps {
  templatePath?: string;
}

const BadgeGenerator: React.FC<BadgeGeneratorProps> = ({ templatePath = '/cardtemplates/evangelist.png' }) => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

const generateBadge = async (): Promise<void> => {
    if (!name.trim()) {
        alert('Please enter a name for the badge');
        return;
    }
    
    setLoading(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
        setLoading(false);
        alert('Could not initialize canvas context');
        return;
    }
    
    try {
        const template = new window.Image();
        template.src = templatePath;
        
        await new Promise<void>((resolve, reject) => {
            template.onload = () => resolve();
            template.onerror = () => reject(new Error('Failed to load template image'));
        });
        
        canvas.width = template.width;
        canvas.height = template.height;
        ctx.drawImage(template, 0, 0);
        
        if (image) {
            const userImg = new window.Image();
            userImg.src = image;
            
            await new Promise<void>((resolve, reject) => {
            userImg.onload = () => resolve();
            userImg.onerror = () => reject(new Error('Failed to load user image'));
            });
            
            const squareSize = 1550;
            const squareX = (canvas.width - squareSize) / 2;
            const squareY = 2800 - squareSize;

            // Calculate dimensions to cover the entire square
            let drawWidth = squareSize;
            let drawHeight = squareSize;
            const aspectRatio = userImg.width / userImg.height;

            if (aspectRatio > 1) {
            // Image is wider than tall
            drawHeight = squareSize;
            drawWidth = drawHeight * aspectRatio;
            } else {
            // Image is taller than wide
            drawWidth = squareSize;
            drawHeight = drawWidth / aspectRatio;
            }

            // Calculate offsets to center the image
            const offsetX = squareX - (drawWidth - squareSize) / 2;
            const offsetY = squareY - (drawHeight - squareSize) / 2;

            // Center the image in the square
           

            ctx.save();
            ctx.beginPath();
            ctx.rect(squareX, squareY, squareSize, squareSize);
            ctx.clip();
            ctx.drawImage(userImg, offsetX, offsetY, drawWidth, drawHeight);
            ctx.restore();
        }
        
        // Improved text fitting
        const nameText = name.toUpperCase();
        const maxTextWidth = 2800;
        const targetY = 3050;
        let fontSize = 400; // Start with a larger font size
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Binary search for the optimal font size
        let minSize = 50;
        let maxSize = fontSize;
        
        while (minSize <= maxSize) {
            const midSize = Math.floor((minSize + maxSize) / 2);
            ctx.font = `bold ${midSize}px Inter, system-ui`;
            const textWidth = ctx.measureText(nameText).width;
            
            if (textWidth <= maxTextWidth && textWidth >= maxTextWidth * 0.8) {
                fontSize = midSize;
                break;
            } else if (textWidth > maxTextWidth) {
                maxSize = midSize - 1;
            } else {
                minSize = midSize + 1;
            }
        }
        
        ctx.font = `bold ${fontSize}px Inter, system-ui`;
        ctx.fillStyle = '#000000';
        ctx.fillText(nameText, canvas.width / 2, targetY);
        
        setGeneratedImage(canvas.toDataURL());
    } catch (error) {
        console.error('Error generating badge:', error);
        alert('Failed to generate badge. Please try again.');
    } finally {
        setLoading(false);
    }
};

  const downloadBadge = (): void => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `badge-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-green-900 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-6">
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="h-8 w-8 mr-2 text-green-400" />
            <h1 className="text-2xl font-bold">Hello World Hacks Badge Generator</h1>
          </motion.div>
          
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <input 
                type="text" 
                placeholder="Enter Your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-2 bg-black border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-green-400 placeholder-green-700"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 border border-green-500 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Upload className="h-5 w-5 mr-2" />
                {image ? 'Change Profile Photo' : 'Upload Profile Photo'}
              </button>
              {image && (
                <div className="mt-2 flex justify-center">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full border border-green-500">
                    <Image 
                      src={image} 
                      alt="Uploaded" 
                      fill 
                      style={{ objectFit: 'cover' }}
                      unoptimized={true}
                    />
                  </div>
                </div>
              )}
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={generateBadge}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-700 text-black font-bold rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Generate Badge'}
            </motion.button>
          </div>
        </div>
        
        {generatedImage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border-t border-green-800"
          >
            <div className="flex justify-center mb-4">
              <div className="relative w-full max-w-xs">
                <Image 
                  src={generatedImage} 
                  alt="Generated Badge" 
                  width={400} 
                  height={500} 
                  className="rounded-md shadow-lg border border-green-700"
                  unoptimized={true}
                />
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadBadge}
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-black font-bold rounded-md hover:bg-green-500 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Badge
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BadgeGenerator;