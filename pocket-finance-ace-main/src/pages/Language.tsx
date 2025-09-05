import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Languages, 
  ArrowLeft, 
  Globe, 
  BookOpen,
  Mic,
  Volume2,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LanguageProps {
  onBack: () => void;
}

const Language = ({ onBack }: LanguageProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: "english", name: "English", native: "English", flag: "🇺🇸" },
    { code: "hindi", name: "Hindi", native: "हिंदी", flag: "🇮🇳" },
    { code: "marathi", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
    { code: "gujarati", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
    { code: "tamil", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
    { code: "telugu", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
    { code: "kannada", name: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "bengali", name: "Bengali", native: "বাংলা", flag: "🇮🇳" },
    { code: "punjabi", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "malayalam", name: "Malayalam", native: "മലയാളം", flag: "🇮🇳" }
  ];

  const sampleContent = {
    english: {
      title: "Understanding Stock Market Basics",
      content: "The stock market is a platform where shares of publicly-held companies are issued and traded. Investors buy and sell these shares to potentially earn returns through capital appreciation and dividends. Key concepts include market capitalization, P/E ratio, and diversification."
    },
    hindi: {
      title: "शेयर बाजार की मूल बातें समझना",
      content: "शेयर बाजार एक मंच है जहां सार्वजनिक कंपनियों के शेयरों को जारी और कारोबार किया जाता है। निवेशक पूंजी वृद्धि और लाभांश के माध्यम से संभावित रिटर्न अर्जित करने के लिए इन शेयरों को खरीदते और बेचते हैं।"
    },
    marathi: {
      title: "शेअर बाजाराच्या मूलभूत गोष्टी समजून घेणे",
      content: "शेअर बाजार हे एक असे मंच आहे जिथे सार्वजनिक कंपन्यांचे शेअर्स जारी आणि व्यापार केले जातात। गुंतवणूकदार भांडवली वाढ आणि लाभांशाद्वारे संभाव्य परतावा मिळविण्यासाठी हे शेअर्स खरेदी आणि विक्री करतात."
    }
  };

  const educationalResources = [
    {
      title: "SEBI Investor Education",
      description: "Official SEBI resources for financial literacy",
      url: "https://investor.sebi.gov.in/",
      languages: ["Hindi", "English", "Regional"],
      icon: BookOpen
    },
    {
      title: "NSE Academy",
      description: "Comprehensive courses on stock market and finance",
      url: "https://www.nseindia.com/education",
      languages: ["English", "Hindi"],
      icon: Globe
    },
    {
      title: "BSE Institute",
      description: "Professional certification courses in finance",
      url: "https://www.bseinstitute.com/",
      languages: ["English", "Hindi", "Marathi"],
      icon: BookOpen
    }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Enter text to translate",
        description: "Please enter some text before translating",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    
    // Simulate translation API call
    setTimeout(() => {
      const translations = {
        hindi: "निवेश एक ऐसी प्रक्रिया है जिसमें आप भविष्य में रिटर्न की उम्मीद के साथ पैसा लगाते हैं।",
        marathi: "गुंतवणूक ही एक अशी प्रक्रिया आहे ज्यामध्ये आपण भविष्यात परतावा मिळण्याच्या अपेक्षेने पैसे लावतात।",
        gujarati: "રોકાણ એ એક પ્રક્રિયા છે જેમાં તમે ભવિષ્યમાં વળતરની અપેક્ષા સાથે પૈસા લગાવો છો।",
        tamil: "முதலீடு என்பது எதிர்காலத்தில் வருமானம் எதிர்பார்த்து பணத்தை முதலீடு செய்யும் செயல்முறையாகும்।"
      };
      
      setTranslatedText(translations[selectedLanguage as keyof typeof translations] || inputText);
      setIsTranslating(false);
      
      toast({
        title: "Translation Complete",
        description: `Text translated to ${languages.find(l => l.code === selectedLanguage)?.name}`,
      });
    }, 1500);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Text Copied",
      description: "Text has been copied to clipboard",
    });
  };

  const handleSpeak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hindi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech not supported",
        description: "Your browser doesn't support text-to-speech",
        variant: "destructive"
      });
    }
  };

  const getCurrentSample = () => {
    return sampleContent[selectedLanguage as keyof typeof sampleContent] || sampleContent.english;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Languages className="h-8 w-8" />
            Multi-Language Support
          </h1>
          <p className="text-muted-foreground">
            Access financial education content in your preferred language
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Language Selection */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Select Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  variant={selectedLanguage === language.code ? "default" : "outline"}
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedLanguage(language.code)}
                >
                  <span className="mr-3 text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs opacity-70">{language.native}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sample Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Sample Educational Content
                  <Badge variant="outline">
                    {languages.find(l => l.code === selectedLanguage)?.name}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{getCurrentSample().title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{getCurrentSample().content}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSpeak(getCurrentSample().content, selectedLanguage)}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyText(getCurrentSample().content)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Translation Tool */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Terms Translator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">English Text</label>
                  <Input
                    placeholder="Enter financial terms or concepts in English..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  className="w-full"
                >
                  {isTranslating ? "Translating..." : `Translate to ${languages.find(l => l.code === selectedLanguage)?.name}`}
                </Button>

                {translatedText && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Translation ({languages.find(l => l.code === selectedLanguage)?.name})
                    </label>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">{translatedText}</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSpeak(translatedText, selectedLanguage)}
                        >
                          <Volume2 className="h-4 w-4 mr-2" />
                          Listen
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyText(translatedText)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Educational Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Multilingual Educational Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {educationalResources.map((resource, index) => {
                  const IconComponent = resource.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {resource.languages.map((lang, langIndex) => (
                            <Badge key={langIndex} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;