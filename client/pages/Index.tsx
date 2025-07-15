import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, Sparkles, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MobileMenu from "@/components/MobileMenu";

export default function Index() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const analyzeImage = () => {
    if (selectedFile) {
      navigate("/results", {
        state: { imageFile: selectedFile, imageUrl: previewUrl },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <header className="border-b border-orange-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                FridgeChef
              </span>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <a
                  href="#upload"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Upload
                </a>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </nav>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Analyze your fridge
            <br />
            Get <span className="text-primary">recipes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take a photo of your fridge and get ingredient detection with
            calories and recipe suggestions.
          </p>
        </div>

        {/* Upload Area */}
        <div className="max-w-2xl mx-auto mb-16" id="upload">
          <Card className="border-2 border-dashed border-primary/30 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-8">
              {!selectedFile ? (
                <div
                  className={`relative text-center transition-all ${
                    dragActive ? "scale-105 border-primary bg-primary/5" : ""
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Upload a photo of your fridge
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop or click to select an image
                  </p>
                  <Button
                    onClick={openFileDialog}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Choose Photo
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="relative mb-6">
                    <img
                      src={previewUrl}
                      alt="Selected"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Photo uploaded successfully
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ready to analyze ingredients and get recipe suggestions
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                      }}
                    >
                      Choose Different Photo
                    </Button>
                    <Button
                      onClick={analyzeImage}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Analyze
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
