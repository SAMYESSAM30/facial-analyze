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

  const [analysisResults, setAnalysisResults] = useState<any>(null);

  // الحصول على بيانات نوع البشرة بشكل آمن
  const getSkinAnalysisData = () => {
    if (!analysisResults?.phase1) {
      return {
        predicted_class: "unknown",
        confidence: 0,
        all_probabilities: {
          oily: 0,
          dry: 0,
          normal: 0,
        },
      };
    }
    return {
      predicted_class: analysisResults.phase1.predicted_class || "unknown",
      confidence: analysisResults.phase1.confidence || 0,
      all_probabilities: analysisResults.phase1.all_probabilities || {
        oily: 0,
        dry: 0,
        normal: 0,
      },
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

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
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

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
      const formData = new FormData();
      formData.append("image", file);

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 50) {
            clearInterval(uploadInterval);
            return 50;
          }
          return prev + 5;
        });
      }, 200);

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      clearInterval(uploadInterval);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Validate response structure
      if (!data.phase1 || !data.phase2) {
        throw new Error("Invalid API response structure");
      }

      // Simulate analysis progress
      const analysisInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            clearInterval(analysisInterval);
            setAnalyzing(false);
            setAnalysisComplete(true);
            setAnalysisResults(data);
            return 100;
          }
          return newProgress;
        });
      }, 200);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalyzing(false);
      setProgress(0);
      toast({
        title: "Analysis Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error analyzing your image",
        variant: "destructive",
      });
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setPreviewUrl(null);
    setAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResults(null);
  };

  // Render detection boxes with safe access
  const renderDetectionBoxes = (detections: any[] = [], type: string) => {
    if (!detections || detections.length === 0) return null;

    const boxColors: Record<string, string> = {
      acne: "border-red-500 bg-red-500/20",
      blackheads: "border-green-500 bg-green-500/20",
      dark_circles: "border-blue-500 bg-blue-500/20",
      pigmentation: "border-yellow-500 bg-yellow-500/20",
    };

    return detections.map((detection, index) => (
      <div
        key={index}
        className={`absolute border-2 ${
          boxColors[type] || "border-purple-500 bg-purple-500/20"
        }`}
      ></div>
    ));
  };

  const skinData = getSkinAnalysisData();

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
        <div className="container mx-auto ">
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
              <div className="glass-card p-8 rounded-xl mb-10 w-full">
                <h2 className="text-2xl font-bold mb-6 text-center font-playfair">
                  {t("analysis.results.title")}
                </h2>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="border rounded-lg overflow-hidden relative">
                      <img
                        src={previewUrl!}
                        alt={t("analysis.analyzed_alt")}
                        className="w-full h-auto"
                      />
                      {analysisResults?.phase2?.acne?.detections &&
                        renderDetectionBoxes(
                          analysisResults.phase2.acne.detections,
                          "acne"
                        )}
                      {analysisResults?.phase2?.blackheads?.detections &&
                        renderDetectionBoxes(
                          analysisResults.phase2.blackheads.detections,
                          "blackheads"
                        )}
                      {analysisResults?.phase2?.dark_circles?.detections &&
                        renderDetectionBoxes(
                          analysisResults.phase2.dark_circles.detections,
                          "dark_circles"
                        )}
                      {analysisResults?.phase2?.pigmentation?.detections &&
                        renderDetectionBoxes(
                          analysisResults.phase2.pigmentation.detections,
                          "pigmentation"
                        )}
                    </div>
                    <div className="mt-4 p-4 bg-skin-pink-light/50 dark:bg-primary/20 rounded-lg">
                      <h3 className="font-bold mb-2">
                        {t("analysis.skin_type")} {skinData.predicted_class}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {t("analysis.confidence")} {skinData.confidence * 100}%
                      </p>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Oily</span>
                            <span>
                              {(skinData.all_probabilities.oily * 100).toFixed(
                                2
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={skinData.all_probabilities.oily * 100}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Dry</span>
                            <span>
                              {(skinData.all_probabilities.dry * 100).toFixed(
                                2
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={skinData.all_probabilities.dry * 100}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Normal</span>
                            <span>
                              {(
                                skinData.all_probabilities.normal * 100
                              ).toFixed(2)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={skinData.all_probabilities.normal * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4">
                      {t("analysis.detailed_results")}
                    </h3>

                    <div className="space-y-4">
                      {/* Acne Results */}
                      <div className="gap-4 w-full">
                        {analysisResults?.data?.map((item, index) => (
                          <div
                            key={index}
                            className="bg-skin-pink-light/50 dark:bg-primary/20 p-6 rounded-xl mb-6 flex flex-col md:flex-row gap-6 border border-primary/20 dark:border-primary/30 shadow-sm hover:shadow-md transition-shadow"
                          >
                            {/* الصورة على اليسار */}
                            <div className="md:w-1/3 flex-shrink-0">
                              <img
                                src={item.result_image}
                                alt={item.issue}
                                className="w-full h-auto rounded-lg object-contain shadow-md"
                              />
                            </div>

                            {/* المحتوى على اليمين */}

                            <div className="md:w-2/3 space-y-4">
                              <h4 className="font-bold text-xl dark:text-primary-light mb-3">
                                {item.issue}
                              </h4>
                              {item.routine && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1 pb-1 border-b border-bleak dark:border-primary/30">
                                      Detection
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 pl-2">
                                      {item?.routine?.description}
                                    </p>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1 pb-1 border-b border-bleak dark:border-primary/30">
                                      Avoid
                                    </h3>
                                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                                      {item?.routine?.avoid?.map(
                                        (item, index) => (
                                          <li key={item} className="pl-1">
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1 pb-1 border-b border-bleak dark:border-primary/30">
                                      Evening Routine
                                    </h3>
                                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                                      {item?.routine?.eveningRoutine?.map(
                                        (item, index) => (
                                          <li key={item} className="pl-1">
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1 pb-1 border-b border-bleak dark:border-primary/30">
                                      Morning Routine
                                    </h3>
                                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                                      {item?.routine?.morningRoutine?.map(
                                        (item, index) => (
                                          <li key={item} className="pl-1">
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1 pb-1 border-b border-bleak dark:border-primary/30">
                                      Weekly Treatments
                                    </h3>
                                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                                      {item?.routine?.weeklyTreatments?.map(
                                        (item) => (
                                          <li key={item} className="pl-1">
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-1 pb-1 border-b border-bleak dark:border-primary/30">
                                      Product Recommendations
                                    </h3>
                                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                                      {item?.routine?.productRecommendations?.map(
                                        (item) => (
                                          <li key={item} className="pl-1">
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={resetAnalysis}
                    className="mr-4"
                  >
                    {t("analysis.try_another")}
                  </Button>
                </div>
              </div>

              {/* Recommendations */}
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
