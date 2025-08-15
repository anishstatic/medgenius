import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingDown,
  Star,
  MapPin,
  Clock,
  AlertTriangle,
  Pill
} from "lucide-react";

const searchSuggestions = [
 "Paracetamol", "Ibuprofen", "Aspirin", "Naproxen", "Ambroxol", "Pseudoephedrine", "Oxymetazoline ",
  "Antacids ", "Omeprazole ", "Simethicone", "Loperamide", "Ondansetron", "Diclofenac ","Thiocolchicoside ",
  "Amoxicillin ","Adapalene","Diphenhydramine", "Loratadine"
];

const allSearchResults = [
 {
    id: 1,
    brand: "Crocin 500mg",
    generic: "Acetaminophen 500mg(Paracetamol)",
    brandPrice: "₹25.00",
    genericPrice: "₹12.00",
    savings: "52%",
    rating: 4.5,
    manufacturer: "GSK",
    category: "Pain Relief",
    usage: "Fever, Headache, Body Pain",
    sideEffects: "Rare: Nausea, Allergic reactions",
    dosage: "1-2 tablets every 4-6 hours"
  },
  {
    id: 2,
    brand: "Brufen 400mg",
    generic: "Ibuprofen 400mg",
    brandPrice: "₹45.00",
    genericPrice: "₹20.00",
    savings: "55%",
    rating: 4.6,
    manufacturer: "Abbott",
    category: "Pain & Inflammation",
    usage: "Pain, Fever, Menstrual cramps",
    sideEffects: "Common: Stomach upset, Dizziness",
    dosage: "1 tablet every 6-8 hours"
  },
  {
    id: 3,
    brand: "Disprin",
    generic: "Aspirin 350mg",
    brandPrice: "₹10.00",
    genericPrice: "₹5.00",
    savings: "50%",
    rating: 4.3,
    manufacturer: "Reckitt Benckiser",
    category: "Pain Relief",
    usage: "Mild to moderate pain, Fever",
    sideEffects: "Rare: Stomach bleeding, Ringing in ears",
    dosage: "1-2 tablets every 4 hours"
  },
  {
    id: 4,
    brand: "Naprosyn 250mg",
    generic: "Naproxen 250mg",
    brandPrice: "₹60.00",
    genericPrice: "₹30.00",
    savings: "50%",
    rating: 4.4,
    manufacturer: "Piramal Healthcare",
    category: "Pain & Inflammation",
    usage: "Arthritis, Gout, Ankylosing spondylitis",
    sideEffects: "Common: Dizziness, Drowsiness",
    dosage: "250-500mg twice daily"
  },
  {
    id: 5,
    brand: "Ambrodil",
    generic: "Ambroxol 30mg",
    brandPrice: "₹35.00",
    genericPrice: "₹15.00",
    savings: "57%",
    rating: 4.2,
    manufacturer: "Alembic",
    category: "Cough & Cold",
    usage: "Productive cough, Bronchitis",
    sideEffects: "Rare: Diarrhea, Nausea",
    dosage: "1 tablet three times a day"
  },
  {
    id: 6,
    brand: "Sudafed",
    generic: "Pseudoephedrine 60mg",
    brandPrice: "₹50.00",
    genericPrice: "₹22.00",
    savings: "56%",
    rating: 4.1,
    manufacturer: "Johnson & Johnson",
    category: "Cough & Cold",
    usage: "Nasal congestion",
    sideEffects: "Common: Nervousness, Sleeplessness",
    dosage: "1 tablet every 4-6 hours"
  },
  {
    id: 7,
    brand: "Otrivin",
    generic: "Oxymetazoline 0.05%",
    brandPrice: "₹75.00",
    genericPrice: "₹35.00",
    savings: "53%",
    rating: 4.8,
    manufacturer: "GSK",
    category: "Cough & Cold",
    usage: "Blocked nose",
    sideEffects: "Rare: Nasal irritation, Dryness",
    dosage: "2-3 drops in each nostril twice daily"
  },
  {
    id: 8,
    brand: "Digene",
    generic: "Antacids",
    brandPrice: "₹40.00",
    genericPrice: "₹18.00",
    savings: "55%",
    rating: 4.4,
    manufacturer: "Abbott",
    category: "Stomach Care",
    usage: "Heartburn, Indigestion",
    sideEffects: "Rare: Constipation, Diarrhea",
    dosage: "1-2 tablets after meals"
  },
  {
    id: 9,
    brand: "Aciloc",
    generic: "Omeprazole 20mg",
    brandPrice: "₹150.00",
    genericPrice: "₹70.00",
    savings: "53%",
    rating: 4.7,
    manufacturer: "Cadila",
    category: "Stomach Care",
    usage: "Gastric ulcer, GERD",
    sideEffects: "Common: Headache, Nausea",
    dosage: "1 tablet once a day"
  },
  {
    id: 10,
    brand: "Gelusil",
    generic: "Simethicone 80mg",
    brandPrice: "₹20.00",
    genericPrice: "₹9.00",
    savings: "55%",
    rating: 4.1,
    manufacturer: "Pfizer",
    category: "Stomach Care",
    usage: "Bloating, Gas",
    sideEffects: "Generally well-tolerated",
    dosage: "1-2 tablets after meals"
  },
  {
    id: 11,
    brand: "Lomofen",
    generic: "Loperamide 2mg",
    brandPrice: "₹30.00",
    genericPrice: "₹14.00",
    savings: "53%",
    rating: 4.6,
    manufacturer: "Cipla",
    category: "Stomach Care",
    usage: "Diarrhea",
    sideEffects: "Common: Dizziness, Constipation",
    dosage: "2 tablets initially, then 1 after each loose stool"
  },
  {
    id: 12,
    brand: "Vomitril",
    generic: "Ondansetron 4mg",
    brandPrice: "₹85.00",
    genericPrice: "₹40.00",
    savings: "53%",
    rating: 4.8,
    manufacturer: "Zydus",
    category: "Stomach Care",
    usage: "Nausea, Vomiting",
    sideEffects: "Rare: Headache, Constipation",
    dosage: "1 tablet twice daily"
  },
  {
    id: 13,
    brand: "Volini",
    generic: "Diclofenac 50mg",
    brandPrice: "₹90.00",
    genericPrice: "₹45.00",
    savings: "50%",
    rating: 4.5,
    manufacturer: "Ranbaxy",
    category: "Pain & Inflammation",
    usage: "Painful inflammation, Arthritis",
    sideEffects: "Common: Stomach upset, Rash",
    dosage: "1 tablet two to three times a day"
  },
  {
    id: 14,
    brand: "Myoril 4mg",
    generic: "Thiocolchicoside 4mg",
    brandPrice: "₹160.00",
    genericPrice: "₹75.00",
    savings: "53%",
    rating: 4.6,
    manufacturer: "Sanofi",
    category: "Muscle Relaxant",
    usage: "Muscle spasms, Back pain",
    sideEffects: "Common: Drowsiness, Diarrhea",
    dosage: "1 tablet twice daily"
  },
  {
    id: 15,
    brand: "Amoxil 250mg",
    generic: "Amoxicillin 250mg",
    brandPrice: "₹120.00",
    genericPrice: "₹45.00",
    savings: "62%",
    rating: 4.7,
    manufacturer: "GSK",
    category: "Antibiotic",
    usage: "Bacterial Infections",
    sideEffects: "Common: Nausea, Diarrhea",
    dosage: "250-500mg every 8 hours"
  },
  {
    id: 16,
    brand: "Differin Gel",
    generic: "Adapalene 0.1%",
    brandPrice: "₹250.00",
    genericPrice: "₹120.00",
    savings: "52%",
    rating: 4.5,
    manufacturer: "Galderma",
    category: "Skin Care",
    usage: "Acne",
    sideEffects: "Common: Skin irritation, Dryness",
    dosage: "Apply a thin layer to affected area once daily"
  },
  {
    id: 17,
    brand: "Benadryl",
    generic: "Diphenhydramine 25mg",
    brandPrice: "₹65.00",
    genericPrice: "₹30.00",
    savings: "54%",
    rating: 4.3,
    manufacturer: "Pfizer",
    category: "Allergy",
    usage: "Allergies, Insomnia",
    sideEffects: "Common: Drowsiness, Dizziness",
    dosage: "1-2 tablets every 4-6 hours"
  },
  {
    id: 18,
    brand: "Lorin",
    generic: "Loratadine 10mg",
    brandPrice: "₹40.00",
    genericPrice: "₹18.00",
    savings: "55%",
    rating: 4.6,
    manufacturer: "Cipla",
    category: "Allergy",
    usage: "Allergies, Hay fever",
    sideEffects: "Rare: Dry mouth, Headache",
    dosage: "1 tablet once a day"
  },
  {
    id: 19,
    brand: "Allegra",
    generic: "Fexofenadine 120mg",
    brandPrice: "₹95.00",
    genericPrice: "₹40.00",
    savings: "58%",
    rating: 4.7,
    manufacturer: "Sanofi",
    category: "Allergy",
    usage: "Seasonal allergies, Urticaria",
    sideEffects: "Common: Headache, Nausea",
    dosage: "1 tablet once a day"
  }
];

export default function SearchMedicine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<typeof allSearchResults>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setResults([]); // Clear results if search term is empty
      setFilteredSuggestions([]); // Clear suggestions on empty search
      return;
    }

    setIsSearching(true);
    setSearchTerm(term);
    setFilteredSuggestions([]); // Clear suggestions when search is initiated

    // Simulate API call
    setTimeout(() => {
      const lowerCaseTerm = term.toLowerCase();
      const filteredResults = allSearchResults.filter(medicine =>
        medicine.brand.toLowerCase().includes(lowerCaseTerm) ||
        medicine.generic.toLowerCase().includes(lowerCaseTerm)
      );
      setResults(filteredResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]); // Clear suggestions after clicking one
    handleSearch(suggestion);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto font-sans">
      {/* Page Title and Description */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">Search Medicine</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Find generic alternatives and compare prices for your medicines
        </p>
      </div>

      {/* Search Bar */}
      <Card className="rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for medicine name..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  if (value.trim()) {
                    const lowerCaseValue = value.toLowerCase();
                    const newSuggestions = searchSuggestions.filter(s =>
                      s.toLowerCase().includes(lowerCaseValue)
                    );
                    setFilteredSuggestions(newSuggestions);
                  } else {
                    setFilteredSuggestions([]);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchTerm);
                  }
                }}
                className="pl-10 h-12 text-base md:text-lg rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50 dark:focus:border-blue-400"
              />
              {/* Search Suggestions Dropdown */}
              {searchTerm && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={() => handleSearch(searchTerm)}
              variant="medical"
              size="lg"
              disabled={isSearching}
              className="h-12 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Search Suggestions (only shown if no search term and no results are displayed) */}
      {!results.length && !isSearching && !searchTerm && (
        <Card className="rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">Popular Searches</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Click on any medicine to search
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 p-4 md:p-6">
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="rounded-full px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50">
              Search Results for "<span className="text-blue-600 dark:text-blue-400">{searchTerm}</span>"
            </h2>
            <Badge variant="secondary" className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              {results.length} results found
            </Badge>
          </div>

          {results.map((medicine) => (
            <Card key={medicine.id} className="rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-200 ease-in-out">
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Medicine Info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50">{medicine.brand}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{medicine.manufacturer}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Badge variant="outline" className="px-3 py-1 rounded-full border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300">{medicine.category}</Badge>
                          <div className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{medicine.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Usage</h4>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{medicine.usage}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Dosage</h4>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{medicine.dosage}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Side Effects</h4>
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {medicine.sideEffects}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Comparison */}
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-white border-red-300 text-red-600 dark:bg-gray-800 dark:border-red-700 dark:text-red-400">Branded</Badge>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{medicine.brandPrice}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Original Price</p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-600 text-white dark:bg-green-700">Generic</Badge>
                        <Badge variant="outline" className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-700">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {medicine.savings} off
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400">{medicine.genericPrice}</div>
                      <p className="text-sm text-green-700/80 dark:text-green-400/80">{medicine.generic}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="medical" size="sm" className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Set Reminder
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <MapPin className="w-4 h-4" />
                        Find Stores
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <Pill className="w-4 h-4" />
                        More Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Important Notice */}
      <Card className="rounded-xl shadow-lg border border-l-4 border-l-orange-500 dark:border-l-orange-400 bg-white dark:bg-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xl font-semibold">
            <AlertTriangle className="w-5 h-5" />
            Medical Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 p-4 md:p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This information is for educational purposes only and should not replace professional medical advice.
            Always consult with your healthcare provider before starting, stopping, or changing your medication.
            Generic medicines shown here have the same active ingredients as branded medicines but may have different inactive ingredients.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
