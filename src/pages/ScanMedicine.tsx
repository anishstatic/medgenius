import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Upload, 
  Scan, 
  Loader2,
  CheckCircle,
  AlertCircle,
  DollarSign,
  X
} from "lucide-react";

// Mock the toast function for a self-contained example
const useToast = () => {
  const toast = (options) => {
    console.log("Toast:", options.title, options.description);
    // In a real app, this would show a toast notification
  };
  return { toast };
};

export default function ScanMedicine() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const { toast } = useToast();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Mock data for the OCR result
  const mockScanResult = {
    medicine: "Paracetamol",
    brand: "Crocin 500mg",
    generic: "Acetaminophen 500mg",
    brandPrice: "₹25.00",
    genericPrice: "₹12.00",
    savings: "₹13.00",
    dosage: "1-2 tablets every 4-6 hours",
    manufacturer: "GSK",
    description: "Generic medicine with same active ingredients",
    confidence: 0.95,
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
      
      toast({
        title: "Camera Ready",
        description: "Camera access granted. You can now take a photo.",
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    
    canvas.toBlob(async (blob) => {
      if (blob) {
        await processImage(blob);
      }
    }, 'image/jpeg', 0.8);
    
    stopCamera();
  };

  const processImage = async (file) => {
    setIsScanning(true);
    
    try {
      // In a real application, you would upload the file to a cloud storage
      // and then call an OCR API or function.
      // Here, we simulate the process with a timer.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setScanResult(mockScanResult);

      toast({
        title: "Scan Complete!",
        description: `Medicine identified with ${(mockScanResult.confidence * 100).toFixed(1)}% confidence`,
      });

    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Scan Failed",
        description: "Unable to process image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Scan Medicine</h1>
        <p className="text-muted-foreground">
          Take a photo or upload an image of your medicine to find generic alternatives
        </p>
      </div>

      {/* Camera View */}
      {showCamera && (
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Camera View
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={stopCamera}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover"
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.error);
                  }
                }}
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Camera overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-white border-dashed rounded-lg opacity-50"></div>
                <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  Position medicine package within the frame
                </div>
              </div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <Button 
                  onClick={capturePhoto}
                  disabled={isScanning}
                  size="lg"
                  className="bg-white/90 hover:bg-white text-foreground shadow-lg rounded-full"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capture
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan Interface */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Scan Medicine
            </CardTitle>
            <CardDescription>
              Use your camera or upload an image to identify medicines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {isScanning ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div>
                    <p className="font-medium">Scanning Medicine...</p>
                    <p className="text-sm text-muted-foreground">Processing image and identifying medicine</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Scan className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Ready to Scan</p>
                    <p className="text-sm text-muted-foreground">Take a clear photo of the medicine package</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid gap-2 md:grid-cols-2">
              <Button 
                onClick={startCamera} 
                disabled={isScanning || showCamera}
                variant="medical"
                size="lg"
                className="w-full rounded-full"
              >
                <Camera className="w-5 h-5 mr-2" />
                {showCamera ? "Camera Active" : "Take Photo"}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="w-full relative rounded-full"
                disabled={isScanning}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isScanning}
                />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Scanning Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Clear Image Quality</p>
                  <p className="text-xs text-muted-foreground">Ensure good lighting and focus on the medicine name</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Include Dosage</p>
                  <p className="text-xs text-muted-foreground">Make sure dosage information is visible</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Steady Hands</p>
                  <p className="text-xs text-muted-foreground">Keep the camera steady to avoid blur</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Multiple Angles</p>
                  <p className="text-xs text-muted-foreground">Try different angles if first scan doesn't work</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scan Results */}
      {scanResult && (
        <Card className="border-0 shadow-lg border-l-4 border-l-green-500 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Medicine Identified
            </CardTitle>
            <CardDescription>
              We found generic alternatives that can save you money
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Original Medicine */}
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-red-500 text-red-500 rounded-full">Branded Medicine</Badge>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{scanResult.brand}</h3>
                  <p className="text-muted-foreground">{scanResult.medicine}</p>
                  <p className="text-sm text-muted-foreground">by {scanResult.manufacturer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{scanResult.brandPrice}</span>
                  <Badge variant="secondary" className="rounded-full">Brand Price</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{scanResult.description}</p>
              </div>

              {/* Generic Alternative */}
              <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600 text-white rounded-full">Generic Alternative</Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600 rounded-full">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Save {scanResult.savings}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-600">{scanResult.generic}</h3>
                  <p className="text-muted-foreground">{scanResult.dosage}</p>
                  <p className="text-sm text-muted-foreground">Same active ingredient</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">{scanResult.genericPrice}</span>
                  <Badge variant="outline" className="text-green-600 rounded-full">Generic Price</Badge>
                </div>
                <p className="text-sm text-green-600/80">
                  Generic medicines have the same active ingredients and effectiveness as branded medicines
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button variant="medical" size="lg" className="rounded-full">
                Set Reminder
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Save to History
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Find Nearby Stores
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature Info */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-500">
            <AlertCircle className="w-5 h-5" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">About Generic Medicines</h4>
              <p className="text-sm text-muted-foreground">
                Generic medicines contain the same active ingredients as branded medicines and are equally effective. 
                They are typically 20-80% cheaper than branded versions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Consult Your Doctor</h4>
              <p className="text-sm text-muted-foreground">
                Always consult with your healthcare provider before switching to generic alternatives, 
                especially for critical medications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Added the "medical" variant to the `Button` component in the `tailwind.config.js` for custom styling.
// In a real project, you would define this in your Shadcn components.
// For this example, we'll assume it's already defined for the `Button`.
const customButtonVariant = {
  medical: {
    backgroundColor: '#007BFF', // A bright medical blue
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#0056b3', // Darker blue on hover
    },
  },
};
