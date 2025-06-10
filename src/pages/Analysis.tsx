import React, { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Camera, Upload, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        toast({
          title: "Camera Error",
          description: "Your browser does not support camera access",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive",
      });
      setCameraOpen(false);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOpen(false);
  };

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to data URL and create file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-photo.jpg", {
              type: "image/jpeg",
            });
            setFile(file);
            const imageUrl = URL.createObjectURL(blob);
            setPreviewUrl(imageUrl);
            closeCamera();
          }
        }, "image/jpeg");
      }
    }
  };

  const analyzeSkin = async () => {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please upload a photo to analyze",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    setProgress(0);

    try {
      // Create FormData and append the image file
      const formData = new FormData();
      formData.append("image", file);

      // Simulate progress while uploading
      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 50) {
            clearInterval(uploadInterval);
            return 50;
          }
          return prev + 5;
        });
      }, 200);

      // Send the image to API
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      clearInterval(uploadInterval);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      // Parse the API response
      const data = await response.json();

      // Simulate analysis progress after upload
      const analysisInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            clearInterval(analysisInterval);
            setAnalyzing(false);
            setAnalysisComplete(true);
            setAnalysisResults(data); // Set the actual API response
            return 100;
          }
          return newProgress;
        });
      }, 200);

      return () => {
        clearInterval(uploadInterval);
        clearInterval(analysisInterval);
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Failed",
        description:
          "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
      setAnalyzing(false);
      setProgress(0);
    }
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
            {t("analysis.title")}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            {t("analysis.subtitle")}
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
                    <h2 className="text-2xl font-bold mb-4">
                      {t("analysis.upload.title")}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("analysis.guidelines")}
                    </p>
                  </div>

                  <div className="w-full max-w-md mb-6">
                    <label
                      htmlFor="photo-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white/50 dark:bg-skin-dark-gray/50 hover:bg-gray-50 dark:hover:bg-skin-dark-charcoal"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            {t("analysis.upload.click")}
                          </span>{" "}
                          {t("analysis.upload.drag")}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t("analysis.upload.formats")}
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
                    <span className="text-gray-500 dark:text-gray-400">
                      {t("analysis.or")}
                    </span>
                    <div className="border-t border-gray-300 dark:border-gray-600 w-16"></div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={openCamera}
                    className="mt-6 flex items-center gap-2"
                  >
                    <Camera size={16} />
                    <span>{t("analysis.camera")}</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="mb-8 w-full max-w-md">
                    {analyzing ? (
                      <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold mb-4">
                          {t("analysis.analyzing")}
                        </h2>
                        <Progress value={progress} className="h-2 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {progress}% {t("analysis.complete")}
                        </p>
                      </div>
                    ) : (
                      <h2 className="text-2xl font-bold mb-4 text-center">
                        {t("analysis.review")}
                      </h2>
                    )}

                    <div className="relative border rounded-lg overflow-hidden">
                      <img
                        src={previewUrl}
                        alt={t("analysis.uploaded_alt")}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {!analyzing && (
                      <>
                        <Button variant="outline" onClick={resetAnalysis}>
                          {t("analysis.change_photo")}
                        </Button>
                        <Button className="btn-primary" onClick={analyzeSkin}>
                          {t("analysis.analyze")}
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
                  {t("analysis.results.title")}
                </h2>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={previewUrl!}
                        alt={t("analysis.analyzed_alt")}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="mt-4 p-4 bg-skin-pink-light/50 dark:bg-skin-dark-gray/50 rounded-lg">
                      <h3 className="font-bold mb-2">
                        {t("analysis.skin_type")}{" "}
                        {analysisResults?.predicted_class}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {t("analysis.confidence")}{" "}
                        {(analysisResults?.confidence * 100).toFixed(2)}%
                      </p>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t("analysis.oily")}</span>
                            <span>
                              {(
                                analysisResults?.all_probabilities.oily * 100
                              ).toFixed(2)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              analysisResults?.all_probabilities.oily * 100
                            }
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t("analysis.dry")}</span>
                            <span>
                              {(
                                analysisResults?.all_probabilities.dry * 100
                              ).toFixed(2)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={analysisResults?.all_probabilities.dry * 100}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t("analysis.normal")}</span>
                            <span>
                              {(
                                analysisResults?.all_probabilities.normal * 100
                              ).toFixed(2)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              analysisResults?.all_probabilities.normal * 100
                            }
                            className="h-2"
                          />
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                        {analysisResults?.predicted_class === "oily"
                          ? t("skin_descriptions.oily")
                          : analysisResults?.predicted_class === "dry"
                          ? t("skin_descriptions.dry")
                          : t("skin_descriptions.normal")}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4">
                      {t("analysis.concerns")}
                    </h3>

                    <div className="space-y-4">
                      {analysisResults?.concerns?.map((concern: any) => (
                        <div
                          key={concern.name}
                          className="bg-white/70 dark:bg-skin-dark-charcoal/70 p-4 rounded-lg"
                        >
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold">
                              {concern.name}
                            </span>
                            <span className="text-skin-purple-dark">
                              {concern.severity}
                            </span>
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
                  {t("analysis.recommendations")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {analysisResults?.recommendations?.map((rec: any) => (
                    <div
                      key={rec.id}
                      className="bg-white/70 dark:bg-skin-dark-charcoal/70 p-6 rounded-lg flex flex-col items-center text-center animated-card"
                    >
                      <div className="w-16 h-16 bg-skin-purple/20 rounded-full flex items-center justify-center mb-4">
                        <img
                          src={`https://picsum.photos/seed/${rec.id}/200/200`}
                          alt={rec.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </div>
                      <h3 className="font-bold mb-2">{rec.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {t("analysis.recommended_for")}{" "}
                        {analysisResults.concerns[
                          rec.id % analysisResults.concerns.length
                        ].name.toLowerCase()}{" "}
                        {t("analysis.concerns")}.
                      </p>
                      <Button asChild className="mt-auto" variant="outline">
                        <a href={`/products?id=${rec.id}`}>
                          {t("analysis.view_product")}
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={resetAnalysis}
                    className="mr-4"
                  >
                    {t("analysis.try_another")}
                  </Button>
                  <Button asChild className="btn-primary">
                    <a href="/products">{t("analysis.view_all_products")}</a>
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
            <DialogTitle>{t("camera.title")}</DialogTitle>
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
              {t("camera.capture")}
            </Button>
            <Button variant="outline" onClick={closeCamera}>
              {t("camera.cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Analysis;
