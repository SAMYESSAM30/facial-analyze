
import React, { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const Analysis: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mock analysis results
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const openCamera = async () => {
    setCameraOpen(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        toast({
          title: "Camera Error",
          description: "Your browser does not support camera access",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive"
      });
      setCameraOpen(false);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOpen(false);
  };

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL and create file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
            setFile(file);
            const imageUrl = URL.createObjectURL(blob);
            setPreviewUrl(imageUrl);
            closeCamera();
          }
        }, 'image/jpeg');
      }
    }
  };
  
  const simulateAnalysis = () => {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please upload a photo to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setAnalyzing(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setAnalysisComplete(true);
          
          // Set mock analysis results
          setAnalysisResults({
            skinType: 'Combination',
            concerns: [
              { name: 'Dryness', severity: 'Mild', score: 35 },
              { name: 'Dark Spots', severity: 'Moderate', score: 60 },
              { name: 'Enlarged Pores', severity: 'Mild', score: 30 },
              { name: 'Wrinkles', severity: 'Minimal', score: 15 },
              { name: 'Uneven Tone', severity: 'Moderate', score: 55 },
            ],
            recommendations: [
              { id: 2, name: 'Brightening Cream' },
              { id: 6, name: 'Pore Minimizing Toner' },
              { id: 1, name: 'Hydrating Serum' },
            ]
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    
    return () => clearInterval(interval);
  };
  
  const resetAnalysis = () => {
    setFile(null);
    setPreviewUrl(null);
    setAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResults(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-skin-pink-light to-white dark:from-skin-dark dark:to-skin-dark-charcoal">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair">
            {t('analysis.title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            {t('analysis.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Analysis Section */}
      <section className="py-20 px-4 md:px-6 bg-white dark:bg-skin-dark flex-grow">
        <div className="container mx-auto max-w-4xl">
          {!analysisComplete ? (
            <div className="glass-card p-8 rounded-xl">
              {!previewUrl ? (
                <div className="flex flex-col items-center">
                  <div className="mb-8 max-w-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Upload Your Photo</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t('analysis.guidelines')}
                    </p>
                  </div>
                  
                  <div className="w-full max-w-md mb-6">
                    <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white/50 dark:bg-skin-dark-gray/50 hover:bg-gray-50 dark:hover:bg-skin-dark-charcoal">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          JPEG, PNG or JPG (MAX. 5MB)
                        </p>
                      </div>
                      <input 
                        id="photo-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="border-t border-gray-300 dark:border-gray-600 w-16"></div>
                    <span className="text-gray-500 dark:text-gray-400">{t('analysis.or')}</span>
                    <div className="border-t border-gray-300 dark:border-gray-600 w-16"></div>
                  </div>
                  
                  <Button variant="outline" onClick={openCamera} className="mt-6 flex items-center gap-2">
                    <Camera size={16} />
                    <span>{t('analysis.camera')}</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="mb-8 w-full max-w-md">
                    {analyzing ? (
                      <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold mb-4">Analyzing Your Skin...</h2>
                        <Progress value={progress} className="h-2 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {progress}% complete
                        </p>
                      </div>
                    ) : (
                      <h2 className="text-2xl font-bold mb-4 text-center">Review Your Photo</h2>
                    )}
                    
                    <div className="relative border rounded-lg overflow-hidden">
                      <img 
                        src={previewUrl} 
                        alt="Uploaded face" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    {!analyzing && (
                      <>
                        <Button variant="outline" onClick={resetAnalysis}>
                          Change Photo
                        </Button>
                        <Button className="btn-primary" onClick={simulateAnalysis}>
                          Analyze Skin
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Analysis Results */}
              <div className="glass-card p-8 rounded-xl mb-10">
                <h2 className="text-2xl font-bold mb-6 text-center font-playfair">
                  {t('analysis.results.title')}
                </h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={previewUrl!} 
                        alt="Analyzed face" 
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="mt-4 p-4 bg-skin-pink-light/50 dark:bg-skin-dark-gray/50 rounded-lg">
                      <h3 className="font-bold mb-2">Skin Type: {analysisResults.skinType}</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Your skin shows characteristics of both dry and oily areas. This is typical of combination skin.
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4">Identified Concerns</h3>
                    
                    <div className="space-y-4">
                      {analysisResults.concerns.map((concern: any) => (
                        <div key={concern.name} className="bg-white/70 dark:bg-skin-dark-charcoal/70 p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold">{concern.name}</span>
                            <span className="text-skin-purple-dark">{concern.severity}</span>
                          </div>
                          <Progress value={concern.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center font-playfair">
                  {t('analysis.recommendations')}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {analysisResults.recommendations.map((rec: any) => (
                    <div key={rec.id} className="bg-white/70 dark:bg-skin-dark-charcoal/70 p-6 rounded-lg flex flex-col items-center text-center animated-card">
                      <div className="w-16 h-16 bg-skin-purple/20 rounded-full flex items-center justify-center mb-4">
                        <img 
                          src={`https://picsum.photos/seed/${rec.id}/200/200`}
                          alt={rec.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </div>
                      <h3 className="font-bold mb-2">{rec.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Recommended for your {analysisResults.concerns[rec.id % analysisResults.concerns.length].name.toLowerCase()} concerns.
                      </p>
                      <Button asChild className="mt-auto" variant="outline">
                        <a href={`/products?id=${rec.id}`}>View Product</a>
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={resetAnalysis} className="mr-4">
                    Try Another Photo
                  </Button>
                  <Button asChild className="btn-primary">
                    <a href="/products">View All Products</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Camera Dialog */}
      <Dialog open={cameraOpen} onOpenChange={(open) => !open && closeCamera()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take a Photo</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video overflow-hidden rounded-md bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="h-full w-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={takePicture}
              className="bg-skin-purple hover:bg-skin-purple-dark text-white"
            >
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
            <Button variant="outline" onClick={closeCamera}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Analysis;
