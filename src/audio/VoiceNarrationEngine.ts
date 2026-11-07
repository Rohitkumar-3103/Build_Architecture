// Architectural Assembly Spoken Voice Narration Engine
// Provides spoken engineering guidance for each construction milestone (Bygga-inspired hands-free voice)

export interface VoiceStepScript {
  phaseId: number;
  title: string;
  narration: string;
}

const VILLA_VOICE_SCRIPTS: VoiceStepScript[] = [
  {
    phaseId: 0,
    title: 'Site Preparation & Excavation',
    narration: 'Step 1 of 8: Site Preparation and Geotechnical Excavation. Subterranean laser grading establishes the project benchmark datum at elevation zero point zero. Heavy laser grading leveled the terrain.'
  },
  {
    phaseId: 1,
    title: 'Substructure & Foundation',
    narration: 'Step 2 of 8: Substructure and Reinforced Foundation. Pouring high-strength C35/45 concrete footings with dual-layer rebar cages, perimeter grade beams, and bentonite sheet waterproofing.'
  },
  {
    phaseId: 2,
    title: 'Structural Steel Skeleton',
    narration: 'Step 3 of 8: Structural Steel Skeleton. Tower cranes erect heavy structural W14 by 90 columns, moment-resisting primary girders, and cross-tension diagonal wind bracing.'
  },
  {
    phaseId: 3,
    title: 'Composite Slabs & Core',
    narration: 'Step 4 of 8: Composite Slabs and Cantilever Deck. Post-tensioned composite ground slab poured, followed by the dramatic 3.5-meter cantilevered master terrace deck and open steel riser staircase.'
  },
  {
    phaseId: 4,
    title: 'Envelope & Curtain Wall',
    narration: 'Step 5 of 8: Envelope and Curtain Wall. Installing high-performance triple-glazed low-emissivity curtain wall panels, thermally broken black aluminum mullions, and architectural cedar louvers.'
  },
  {
    phaseId: 5,
    title: 'Interior Architectural Fit-Out',
    narration: 'Step 6 of 8: Interior Fit-Out. Installing European white oak engineered flooring, custom book-matched walnut cabinetry, monolithic quartz kitchen island, and recessed LED accent lighting.'
  },
  {
    phaseId: 6,
    title: 'Rooftop Terraces & Solar PV',
    narration: 'Step 7 of 8: Rooftop Terraces and Solar Photovoltaic Array. Flat roof insulated with polyiso tapered board, capped with high-efficiency 400-watt monocrystalline solar panels and tempered glass parapets.'
  },
  {
    phaseId: 7,
    title: 'Finishes, Pool & Landscape',
    narration: 'Step 8 of 8: Final Finishes, Pool and Landscape. Commissioning the Basaltina volcanic stone infinity reflecting pool, limestone floating pavers, 25-year mature Japanese Red Maples, and exterior 2700K illumination.'
  }
];

const PAVILION_VOICE_SCRIPTS: VoiceStepScript[] = [
  {
    phaseId: 0,
    title: 'Site Datum & Meadow Leveling',
    narration: 'Step 1 of 8: Site Datum and Meadow Leveling. Survey benchmark established along the river basin. Topsoil leveled and stabilized with permeable aggregate.'
  },
  {
    phaseId: 1,
    title: 'Subterranean Foundation Piers',
    narration: 'Step 2 of 8: Subterranean Foundation Piers. Pouring 8 cylindrical concrete caissons extending 3 meters below grade to bedrock for flood resistance.'
  },
  {
    phaseId: 2,
    title: 'Exposed Steel Pilotis Columns',
    narration: 'Step 3 of 8: Exposed Steel Pilotis Columns. Erecting 8 wide-flange steel columns painted pure white, elevating the pavilion 1.5 meters above flood level.'
  },
  {
    phaseId: 3,
    title: 'Floating Travertine Plinth & Terrace',
    narration: 'Step 4 of 8: Floating Travertine Plinth. Installing welded steel channel edge beams and setting Roman travertine stone slabs for the floating entrance terrace.'
  },
  {
    phaseId: 4,
    title: 'Continuous Frameless Glass Skin',
    narration: 'Step 5 of 8: Continuous Frameless Glass Skin. Lifting oversized 3.2-meter single-pane low-iron glass panels to create an uninterrupted 360-degree connection to nature.'
  },
  {
    phaseId: 5,
    title: 'Burmese Teak Utility Core',
    narration: 'Step 6 of 8: Burmese Teak Utility Core. Crafting the central wooden service block housing the bathroom, mechanical ductwork, and minimalist galley kitchen.'
  },
  {
    phaseId: 6,
    title: 'Thin Steel Fascia & Roof Canopy',
    narration: 'Step 7 of 8: Roof Canopy and Thin Steel Fascia. Bolting the continuous perimeter white steel fascia and laying the high-albedo cool roof membrane.'
  },
  {
    phaseId: 7,
    title: 'Landscape Birch Trees & River Lighting',
    narration: 'Step 8 of 8: Landscape and Illumination. Planting white river birch trees, placing gravel riverstone beds, and activating warm linear grazing uplights.'
  }
];

const CABIN_VOICE_SCRIPTS: VoiceStepScript[] = [
  {
    phaseId: 0,
    title: 'Alpine Rocky Bench Excavation',
    narration: 'Step 1 of 8: Alpine Rocky Bench Excavation. Clearing subalpine forest topsoil, drilling granite bedrock, and anchoring stainless steel rock bolts.'
  },
  {
    phaseId: 1,
    title: 'Granite Masonry Stem Walls',
    narration: 'Step 2 of 8: Granite Masonry Stem Walls. Laying native mountain granite stone stem walls reinforced with reinforced concrete core and vapor barrier.'
  },
  {
    phaseId: 2,
    title: 'Glulam Timber A-Frame Portal Rafters',
    narration: 'Step 3 of 8: Glulam Timber A-Frame Portal Rafters. Heavy timber cranes hoist 6 massive 60-degree Douglas fir glulam scissor trusses anchored with black steel gusset plates.'
  },
  {
    phaseId: 3,
    title: 'Timber Floor Deck & Sleeping Loft',
    narration: 'Step 4 of 8: Timber Floor Deck and Sleeping Loft. Fastening 200-millimeter cross-laminated timber floor joists and installing the cantilevered mezzanine sleeping loft with pine staircase.'
  },
  {
    phaseId: 4,
    title: 'Triangular Glass Gable & Shiplap Walls',
    narration: 'Step 5 of 8: Triangular Glass Gable Wall. Glazing the dramatic full-height triangular front facade with argon-filled low-E glass, framed in dark thermal aluminum.'
  },
  {
    phaseId: 5,
    title: 'Nordic Pine Interior & Stone Fireplace',
    narration: 'Step 6 of 8: Nordic Pine Interior and Fireplace. Cladding interior ceiling in tongue-and-groove Scandinavian pine, installing black cast-iron wood stove, and built-in bunk nook.'
  },
  {
    phaseId: 6,
    title: 'Standing Seam Zinc 60° Steep Roof',
    narration: 'Step 7 of 8: Standing Seam Zinc 60-Degree Steep Roof. Rolling dark anthracite matte zinc panels with integrated snow guards, engineered to shed heavy alpine snow.'
  },
  {
    phaseId: 7,
    title: 'Cedar Sauna, Deck & Alpine Spruce',
    narration: 'Step 8 of 8: Cedar Sauna, Deck and Alpine Spruce. Building western red cedar outdoor deck with sunken hot tub, detached sauna, and specimen Norway spruce trees.'
  }
];

export class VoiceNarrationEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  public enabled: boolean = false;
  public isSpeaking: boolean = false;
  public currentScript: string = '';
  public speechRate: number = 1.0;
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<(speaking: boolean, text: string) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const loadVoices = () => {
      const voices = this.synth?.getVoices() || [];
      // Select natural English voice (prefer UK/US natural voice)
      this.preferredVoice = voices.find(v => 
        (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Libby') || v.name.includes('Sonia') || v.name.includes('Samantha') || v.name.includes('Jenny')) && v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  public subscribe(fn: (speaking: boolean, text: string) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify(speaking: boolean, text: string) {
    this.isSpeaking = speaking;
    this.currentScript = text;
    this.listeners.forEach(fn => fn(speaking, text));
  }

  public getScriptForStep(phaseId: number, productId: string, productName?: string, phaseTitle?: string, phaseDesc?: string): VoiceStepScript {
    const clampedId = Math.min(Math.max(0, Math.floor(phaseId)), 7);

    if (productId === 'villa') return VILLA_VOICE_SCRIPTS[clampedId] || VILLA_VOICE_SCRIPTS[0];
    if (productId === 'pavilion') return PAVILION_VOICE_SCRIPTS[clampedId] || PAVILION_VOICE_SCRIPTS[0];
    if (productId === 'cabin') return CABIN_VOICE_SCRIPTS[clampedId] || CABIN_VOICE_SCRIPTS[0];

    // Dynamic tailored narration for any of the 20 master architectural models
    const title = phaseTitle || `Stage 0${clampedId + 1}`;
    const name = productName || 'Architectural Structure';
    const detail = phaseDesc || 'Executing structural engineering tolerances and ISO quality control.';
    return {
      phaseId: clampedId,
      title,
      narration: `Step ${clampedId + 1} of 8 for ${name}: ${title}. ${detail}`
    };
  }

  public speakStep(phaseId: number, productId: string, force: boolean = false, productName?: string, phaseTitle?: string, phaseDesc?: string) {
    if (!this.enabled && !force) return;
    if (!this.synth) return;

    this.stop();

    const scriptObj = this.getScriptForStep(phaseId, productId, productName, phaseTitle, phaseDesc);
    const textToSpeak = scriptObj.narration;

    this.currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
    if (this.preferredVoice) {
      this.currentUtterance.voice = this.preferredVoice;
    }
    this.currentUtterance.rate = this.speechRate;
    this.currentUtterance.pitch = 1.0;
    this.currentUtterance.volume = 1.0;

    this.currentUtterance.onstart = () => {
      this.notify(true, textToSpeak);
    };

    this.currentUtterance.onend = () => {
      this.notify(false, '');
    };

    this.currentUtterance.onerror = () => {
      this.notify(false, '');
    };

    this.synth.speak(this.currentUtterance);
  }

  public speakCompletion(productName: string) {
    if (!this.enabled || !this.synth) return;
    this.stop();
    const text = `Construction complete! ${productName} is fully assembled across all eight engineering milestones.`;
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    if (this.preferredVoice) {
      this.currentUtterance.voice = this.preferredVoice;
    }
    this.currentUtterance.rate = this.speechRate;
    this.currentUtterance.pitch = 1.05;
    this.currentUtterance.onstart = () => this.notify(true, text);
    this.currentUtterance.onend = () => this.notify(false, '');
    this.currentUtterance.onerror = () => this.notify(false, '');
    this.synth.speak(this.currentUtterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.notify(false, '');
  }

  public toggleVoice(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stop();
    }
    return this.enabled;
  }
}

export const voiceEngine = new VoiceNarrationEngine();
