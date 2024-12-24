import React from "react";

const colorMeanings = [
  {
    color: "#9b87f5",
    name: "Primary Purple",
    meaning: "Trust, luxury, and creativity",
    useCases: ["SaaS platforms", "Creative agencies", "Digital products"]
  },
  {
    color: "#E5DEFF",
    name: "Soft Purple",
    meaning: "Calmness, elegance, and sophistication",
    useCases: ["Beauty websites", "Wellness apps", "Portfolio sites"]
  },
  {
    color: "#F97316",
    name: "Bright Orange",
    meaning: "Energy, enthusiasm, and confidence",
    useCases: ["E-commerce", "Food delivery", "Sports websites"]
  },
  {
    color: "#0EA5E9",
    name: "Ocean Blue",
    meaning: "Stability, trust, and professionalism",
    useCases: ["Corporate sites", "Financial services", "Healthcare"]
  },
  {
    color: "#8B5CF6",
    name: "Vivid Purple",
    meaning: "Innovation, wisdom, and royalty",
    useCases: ["Tech startups", "Educational platforms", "Event websites"]
  },
  {
    color: "#D946EF",
    name: "Magenta Pink",
    meaning: "Creativity, youth, and excitement",
    useCases: ["Fashion sites", "Beauty blogs", "Entertainment"]
  },
  {
    color: "#1EAEDB",
    name: "Bright Blue",
    meaning: "Communication, clarity, and efficiency",
    useCases: ["Communication apps", "Project management", "Social media"]
  },
  {
    color: "#ea384c",
    name: "Vibrant Red",
    meaning: "Energy, passion, and urgency",
    useCases: ["Food delivery", "Gaming sites", "Sports brands"]
  }
];

const ColorSuggestions = () => {

  return (
    <div className="h-full bg-white p-6 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Color Guide</h2>
      <div className="space-y-6">
        {colorMeanings.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <h3 className="font-medium">{item.name}</h3>
            </div>
            <p className="text-sm text-zinc-600">{item.meaning}</p>
            <div className="flex flex-wrap gap-2">
              {item.useCases.map((useCase, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded-full"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSuggestions;