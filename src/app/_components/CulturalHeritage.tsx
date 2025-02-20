
import React from 'react';
import { Trophy, MapPin, Heart, Coffee, Music, ChevronLeft, ChevronRight } from 'lucide-react';

interface CulturalStory {
  title: string;
  description: string;
  icon: React.ElementType;
  location: string;
}

const culturalStories: CulturalStory[] = [
  {
    title: "Family Traditions",
    description: "Every Sunday after lunch, my grandfather would teach us the art of Cuban dominoes. Those moments shaped our family bonds.",
    icon: Heart,
    location: "Havana, Cuba"
  },
  {
    title: "Park Culture",
    description: "The local park has been our domino sanctuary for decades. The sound of tiles and laughter fills the air every evening.",
    icon: Coffee,
    location: "Santiago, Cuba"
  },
  {
    title: "Musical Connection",
    description: "Domino games are accompanied by traditional Cuban rhythms, creating an atmosphere of joy and celebration.",
    icon: Music,
    location: "Trinidad, Cuba"
  }
];

interface CulturalHeritageProps {
  activeStory: number;
  setActiveStory: (index: number) => void;
}

export const CulturalHeritage = ({ activeStory, setActiveStory }: CulturalHeritageProps) => {
  const handlePrevStory = () => {
    const newIndex = (activeStory - 1 + culturalStories.length) % culturalStories.length;
    setActiveStory(newIndex);
  };

  const handleNextStory = () => {
    const newIndex = (activeStory + 1) % culturalStories.length;
    setActiveStory(newIndex);
  };

  return (
    <section className="px-4 py-16 bg-gradient-to-b from-cuban-beige/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAgIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjAyLCAxODAsIDE0MCwgMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      
      <div className="container mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-cuban-navy mb-12">
          Cultural Heritage
        </h2>
        
        {/* Main Stories Section */}
        <div className="max-w-4xl mx-auto mb-16 relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            {culturalStories.map((story, index) => (
              <div
                key={story.title}
                className={`transform transition-all duration-500 ${
                  index === activeStory
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute inset-0"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-cuban-navy/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <story.icon className="w-10 h-10 text-cuban-navy" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold text-cuban-navy mb-3">{story.title}</h4>
                    <p className="text-cuban-brown/70 mb-4 text-lg">{story.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cuban-beige/20 rounded-full text-sm text-cuban-brown/80">
                      <MapPin className="w-4 h-4" />
                      <span>{story.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Navigation Controls */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={handlePrevStory}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-cuban-navy hover:bg-cuban-beige/10 transition-colors pointer-events-auto"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextStory}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-cuban-navy hover:bg-cuban-beige/10 transition-colors pointer-events-auto"
                aria-label="Next story"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Story Progress Indicators */}
            <div className="mt-8 flex justify-center gap-3">
              {culturalStories.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeStory
                      ? "bg-cuban-gold w-8"
                      : "bg-cuban-navy/20 w-3 hover:bg-cuban-navy/30"
                  }`}
                  onClick={() => setActiveStory(index)}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="bg-white p-8 rounded-xl shadow-lg h-full">
              <h3 className="text-2xl font-semibold text-cuban-navy mb-4">Traditional Gameplay</h3>
              <p className="text-cuban-brown/70 mb-6">
                Experience authentic Cuban domino traditions, from the strategic "La Salida" opening to the celebratory "Pollona" perfect game.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cuban-gold/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-cuban-gold" />
                </div>
                <span className="text-sm text-cuban-brown/60">Preserving authentic gameplay</span>
              </div>
            </div>
          </div>
          
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-r from-cuban-coral/10 to-cuban-gold/10 p-8 rounded-xl h-full">
              <h3 className="text-xl font-semibold text-cuban-navy mb-4">Did You Know?</h3>
              <p className="text-cuban-brown/70">
                Cuban dominoes is played with a double-nine set, different from the standard double-six, adding layers of strategy and excitement.
              </p>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Community Spirit",
              description: "More than a game, it's about bringing people together and fostering connections.",
              color: "bg-cuban-coral/10"
            },
            {
              title: "Family Legacy",
              description: "Passing down traditions and strategies from generation to generation.",
              color: "bg-cuban-gold/10"
            },
            {
              title: "Social Bonds",
              description: "Creating lasting friendships through shared moments around the domino table.",
              color: "bg-cuban-navy/10"
            }
          ].map((item) => (
            <div
              key={item.title}
              className={`${item.color} p-6 rounded-xl hover:scale-105 transition-transform duration-300`}
            >
              <h3 className="text-lg font-semibold text-cuban-navy mb-2">{item.title}</h3>
              <p className="text-cuban-brown/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
