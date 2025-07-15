import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, Sparkles, ChefHat, Zap, Users } from "lucide-react";
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
      // Pass the selected file data to the results page
      navigate("/results", {
        state: { imageFile: selectedFile, imageUrl: previewUrl },
      });
    }
  };

  const features = [
    {
      icon: Camera,
      title: "사진 촬영",
      description: "냉장고 속 재료를 간단히 촬영하세요",
    },
    {
      icon: Sparkles,
      title: "AI 분석",
      description: "인공지능이 재료를 자동으로 인식합니다",
    },
    {
      icon: Zap,
      title: "칼로리 계산",
      description: "각 재료의 영양 정보를 제공합니다",
    },
    {
      icon: ChefHat,
      title: "레시피 추천",
      description: "가진 재료로 만들 수 있는 요리를 추천합니다",
    },
  ];

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
                  href="#features"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  기능
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  사용법
                </a>
                <Button variant="outline" size="sm">
                  로그인
                </Button>
              </nav>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            냉장고 속 재료로
            <br />
            <span className="text-primary">맛있는 요리</span>를 만들어보세요
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI가 냉장고 사진을 분석하여 재료를 인식하고, 칼로리 정보와 함께 만들
            수 있는 레시피를 추천해드립니다.
          </p>
        </div>

        {/* Upload Area */}
        <div className="max-w-2xl mx-auto mb-16">
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
                    냉장고 사진을 업로드하세요
                  </h3>
                  <p className="text-gray-600 mb-6">
                    사진을 드래그하거나 클릭하여 업로드하세요
                  </p>
                  <Button
                    onClick={openFileDialog}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    사진 선택하기
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
                    사진이 업로드되었습니다!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    AI가 재료를 분석하고 레시피를 추천해드릴게요
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                      }}
                    >
                      다시 선택
                    </Button>
                    <Button
                      onClick={analyzeImage}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      분석 시작하기
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            어떻게 작동하나요?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center bg-white/70 backdrop-blur-sm border-orange-200"
              >
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                10,000+
              </div>
              <div className="text-gray-600">인식 가능한 재료</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                50,000+
              </div>
              <div className="text-gray-600">레시피 데이터베이스</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-gray-600">인식 정확도</div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
