import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Check, 
  Sparkles, 
  Layers, 
  Compass, 
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Hammer,
  Building,
  Building2,
  TrendingUp,
  Clock,
  ShieldCheck,
  Wrench,
  Cpu,
  FileCode,
  DollarSign,
  Activity,
  Search
} from 'lucide-react';
import { ArchitectureProductDefinition, PRODUCTS } from '../building/ProductRegistry';

interface ProductCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProductId: string;
  onSelectProduct: (productId: string, startStepByStep: boolean) => void;
}

export const ProductCatalogModal: React.FC<ProductCatalogModalProps> = ({
  isOpen,
  onClose,
  activeProductId,
  onSelectProduct,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const activeProduct = PRODUCTS.find(p => p.id === activeProductId) || PRODUCTS[0];
  const totalArea = PRODUCTS.reduce((sum, p) => sum + p.areaM2, 0);

  // Filter products by category and search query
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: `All Projects (${PRODUCTS.length})` },
    { id: 'Residential', label: `Residential (${PRODUCTS.filter(p => p.category === 'Residential').length})` },
    { id: 'Commercial', label: `Commercial (${PRODUCTS.filter(p => p.category === 'Commercial').length})` },
    { id: 'Pavilion', label: `Pavilions (${PRODUCTS.filter(p => p.category === 'Pavilion').length})` },
    { id: 'Cultural', label: `Cultural (${PRODUCTS.filter(p => p.category === 'Cultural').length})` },
    { id: 'Specialty', label: `Specialty (${PRODUCTS.filter(p => p.category === 'Specialty').length})` },
  ];

  // Helper to render authentic CAD blueprint vector illustrations for each product
  const renderCadDrawing = (prod: ArchitectureProductDefinition) => {
    switch (prod.id) {
      case 'villa':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-cyan-600 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            <rect x="140" y="105" width="65" height="15" fill="#0284c7" fillOpacity="0.25" stroke="#0284c7" />
            <rect x="35" y="106" width="18" height="14" fill="#cbd5e1" stroke="#64748b" />
            <rect x="85" y="106" width="18" height="14" fill="#cbd5e1" stroke="#64748b" />
            <rect x="25" y="100" width="105" height="6" fill="#94a3b8" />
            <line x1="38" y1="100" x2="38" y2="58" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="80" y1="100" x2="80" y2="58" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="115" y1="100" x2="115" y2="58" stroke="#0284c7" strokeWidth="2.5" />
            <rect x="45" y="54" width="115" height="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.2" />
            <rect x="52" y="22" width="102" height="32" stroke="#0284c7" opacity="0.85" />
            <rect x="40" y="15" width="138" height="7" fill="#0284c7" />
            <circle cx="20" cy="95" r="12" stroke="#f43f5e" opacity="0.85" />
            <line x1="20" y1="107" x2="20" y2="120" stroke="#f43f5e" strokeWidth="1.5" />
          </svg>
        );
      case 'pavilion':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-sky-600 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            <line x1="35" y1="120" x2="35" y2="60" stroke="#0f172a" strokeWidth="3" />
            <line x1="75" y1="120" x2="75" y2="60" stroke="#0f172a" strokeWidth="3" />
            <line x1="120" y1="120" x2="120" y2="60" stroke="#0f172a" strokeWidth="3" />
            <line x1="165" y1="120" x2="165" y2="60" stroke="#0f172a" strokeWidth="3" />
            <rect x="25" y="85" width="155" height="8" fill="#0284c7" fillOpacity="0.25" stroke="#0284c7" strokeWidth="2" />
            <rect x="80" y="42" width="50" height="43" fill="#d97706" fillOpacity="0.4" stroke="#d97706" />
            <rect x="30" y="38" width="145" height="47" stroke="#0284c7" strokeDasharray="3 3" />
            <rect x="20" y="30" width="165" height="8" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
            <line x1="195" y1="120" x2="195" y2="75" stroke="#64748b" />
            <circle cx="195" cy="68" r="14" stroke="#0284c7" opacity="0.7" />
          </svg>
        );
      case 'cabin':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-amber-500 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            <polygon points="45,120 175,120 165,100 55,100" fill="#e2e8f0" stroke="#64748b" />
            <polygon points="110,18 48,100 172,100" stroke="#d97706" strokeWidth="3" fill="#fef3c7" fillOpacity="0.4" />
            <polygon points="110,25 56,96 164,96" stroke="#0284c7" strokeWidth="1.2" opacity="0.8" />
            <line x1="75" y1="68" x2="145" y2="68" stroke="#d97706" strokeWidth="2.5" />
            <polygon points="25,120 15,120 20,85" fill="#d1fae5" opacity="0.9" stroke="#059669" />
            <polygon points="195,120 185,120 190,80" fill="#d1fae5" opacity="0.9" stroke="#059669" />
          </svg>
        );
      case 'highrise':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-cyan-600 stroke-current fill-none stroke-[1.5]">
            <line x1="10" y1="125" x2="210" y2="125" strokeDasharray="3 3" opacity="0.4" />
            {/* Ground plaza trees */}
            <circle cx="35" cy="116" r="6" fill="#d1fae5" stroke="#059669" />
            <line x1="35" y1="122" x2="35" y2="125" stroke="#059669" />
            <circle cx="185" cy="116" r="6" fill="#d1fae5" stroke="#059669" />
            <line x1="185" y1="122" x2="185" y2="125" stroke="#059669" />
            {/* Tower Core Shaft with Soft Sky Wash */}
            <rect x="75" y="20" width="70" height="105" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            {/* Horizontal Intermediate Floor Bands */}
            <line x1="75" y1="41" x2="145" y2="41" stroke="#0284c7" opacity="0.4" strokeWidth="1" />
            <line x1="75" y1="62" x2="145" y2="62" stroke="#0284c7" opacity="0.4" strokeWidth="1" />
            <line x1="75" y1="83" x2="145" y2="83" stroke="#0284c7" opacity="0.4" strokeWidth="1" />
            <line x1="75" y1="104" x2="145" y2="104" stroke="#0284c7" opacity="0.4" strokeWidth="1" />
            {/* 4-Tier Perimeter Diagrid Crosses */}
            <line x1="75" y1="20" x2="145" y2="46" stroke="#0284c7" strokeWidth="1.8" opacity="0.85" />
            <line x1="145" y1="20" x2="75" y2="46" stroke="#0284c7" strokeWidth="1.8" opacity="0.85" />
            <line x1="75" y1="46" x2="145" y2="72" stroke="#0284c7" strokeWidth="1.8" opacity="0.85" />
            <line x1="145" y1="46" x2="75" y2="72" stroke="#0284c7" strokeWidth="1.8" opacity="0.85" />
            <line x1="75" y1="72" x2="145" y2="98" stroke="#0284c7" strokeWidth="1.8" opacity="0.85" />
            <line x1="145" y1="72" x2="75" y2="98" stroke="#0284c7" strokeWidth="1.8" opacity="0.85" />
            <line x1="75" y1="98" x2="145" y2="125" stroke="#0284c7" strokeWidth="1.8" opacity="0.85" />
            <line x1="145" y1="98" x2="75" y2="125" stroke="#0284c7" strokeWidth="1.8" opacity="0.85" />
            {/* Double-Height Glazed Entry Lobby */}
            <rect x="90" y="108" width="40" height="17" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="103" y1="108" x2="103" y2="125" stroke="#0284c7" strokeWidth="1" />
            <line x1="117" y1="108" x2="117" y2="125" stroke="#0284c7" strokeWidth="1" />
            {/* Crown & Slender Spire with Beacon */}
            <line x1="110" y1="20" x2="110" y2="6" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="110" cy="6" r="3" fill="#38bdf8" stroke="#0284c7" />
          </svg>
        );
      case 'museum':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-slate-600 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            {/* Sculptural Step Entrance on Left */}
            <rect x="25" y="112" width="45" height="8" fill="#e2e8f0" stroke="#64748b" />
            <line x1="25" y1="116" x2="70" y2="116" stroke="#64748b" strokeWidth="0.8" />
            {/* Lower Monolithic Gallery Volume */}
            <rect x="45" y="68" width="75" height="52" fill="#e2e8f0" stroke="#475569" strokeWidth="2.2" />
            {/* Board-formed concrete horizontal reveal joints */}
            <line x1="45" y1="80" x2="120" y2="80" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            <line x1="45" y1="92" x2="120" y2="92" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            <line x1="45" y1="104" x2="120" y2="104" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            {/* Monumental Upper Cantilevered Gallery */}
            <rect x="90" y="40" width="85" height="48" fill="#cbd5e1" stroke="#334155" strokeWidth="2.5" />
            <line x1="90" y1="52" x2="175" y2="52" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            <line x1="90" y1="64" x2="175" y2="64" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            <line x1="90" y1="76" x2="175" y2="76" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            {/* Deep-Recessed Clerestory Skylight Light Slits */}
            <rect x="95" y="37" width="45" height="4" fill="#0284c7" stroke="#0284c7" />
            <rect x="55" y="65" width="35" height="3" fill="#0284c7" stroke="#0284c7" />
            {/* Entry Colonnade shadow */}
            <rect x="70" y="105" width="22" height="15" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" />
          </svg>
        );
      case 'arena':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-amber-500 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            {/* Arena Foundation Plinth & Spectator Bowl */}
            <ellipse cx="110" cy="116" rx="72" ry="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
            <ellipse cx="110" cy="116" rx="50" ry="7" fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 2" />
            {/* Double-Curved Outer Glulam Gridshell Arch */}
            <path d="M 22 120 Q 110 12 198 120" stroke="#d97706" strokeWidth="3" fill="#fef3c7" fillOpacity="0.35" />
            {/* Secondary Inner Tension Arch */}
            <path d="M 38 120 Q 110 32 182 120" stroke="#d97706" strokeWidth="1.8" opacity="0.75" />
            {/* Diagonal Timber Lattice Rib Network */}
            <line x1="45" y1="115" x2="90" y2="35" stroke="#d97706" strokeWidth="1.2" opacity="0.6" />
            <line x1="70" y1="117" x2="110" y2="20" stroke="#d97706" strokeWidth="1.2" opacity="0.6" />
            <line x1="95" y1="118" x2="130" y2="28" stroke="#d97706" strokeWidth="1.2" opacity="0.6" />
            <line x1="175" y1="115" x2="130" y2="35" stroke="#d97706" strokeWidth="1.2" opacity="0.6" />
            <line x1="150" y1="117" x2="110" y2="20" stroke="#d97706" strokeWidth="1.2" opacity="0.6" />
            <line x1="125" y1="118" x2="90" y2="28" stroke="#d97706" strokeWidth="1.2" opacity="0.6" />
            {/* Center Crown Apex Pin */}
            <circle cx="110" cy="18" r="3.5" fill="#d97706" stroke="#b45309" />
            {/* Tension Tie Rods */}
            <line x1="110" y1="18" x2="110" y2="108" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          </svg>
        );
      case 'rammedearth':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-orange-500 stroke-current fill-none stroke-[1.6]">
            {/* Desert sand dune ground datum */}
            <path d="M 10 120 Q 60 116 110 120 T 210 120" stroke="#f59e0b" strokeDasharray="3 3" opacity="0.5" />
            {/* Stabilized rammed earth thick walls */}
            <rect x="42" y="52" width="136" height="68" fill="#fef3c7" fillOpacity="0.8" stroke="#d97706" strokeWidth="2.5" />
            {/* Rammed earth stratified compaction lift lines */}
            <line x1="42" y1="68" x2="178" y2="68" stroke="#f59e0b" opacity="0.7" strokeWidth="1.2" />
            <line x1="42" y1="84" x2="178" y2="84" stroke="#d97706" opacity="0.7" strokeWidth="1.2" />
            <line x1="42" y1="102" x2="178" y2="102" stroke="#b45309" opacity="0.7" strokeWidth="1.2" />
            {/* Deep recessed Corten steel pocket window */}
            <rect x="90" y="65" width="55" height="42" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="117" y1="65" x2="117" y2="107" stroke="#0284c7" opacity="0.7" />
            {/* Projecting timber log vigas */}
            <circle cx="50" cy="50" r="2.5" fill="#d97706" stroke="#f59e0b" />
            <circle cx="70" cy="50" r="2.5" fill="#d97706" stroke="#f59e0b" />
            <circle cx="150" cy="50" r="2.5" fill="#d97706" stroke="#f59e0b" />
            <circle cx="170" cy="50" r="2.5" fill="#d97706" stroke="#f59e0b" />
            {/* Cantilevered Cor-Ten steel sunshade parasol canopy */}
            <rect x="28" y="42" width="164" height="7" fill="#ea580c" fillOpacity="0.25" stroke="#ea580c" strokeWidth="2.2" />
            {/* Saguaro cactus with arms */}
            <path d="M 24 120 L 24 88 M 20 102 L 20 94 L 24 94 M 28 98 L 28 92 L 24 92" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'geodesic':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-cyan-600 stroke-current fill-none stroke-[1.5]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 30 120 A 80 80 0 0 1 190 120 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            {/* Geodesic facets */}
            <line x1="110" y1="40" x2="70" y2="85" stroke="#0284c7" opacity="0.7" />
            <line x1="110" y1="40" x2="150" y2="85" stroke="#0284c7" opacity="0.7" />
            <line x1="70" y1="85" x2="150" y2="85" stroke="#0284c7" opacity="0.7" />
            <line x1="70" y1="85" x2="45" y2="120" stroke="#0284c7" opacity="0.7" />
            <line x1="150" y1="85" x2="175" y2="120" stroke="#0284c7" opacity="0.7" />
          </svg>
        );
      case 'flothabitat':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-cyan-500 stroke-current fill-none stroke-[1.6]">
            {/* Water Line */}
            <path d="M 10 95 Q 35 90 60 95 T 110 95 T 160 95 T 210 95" stroke="#0284c7" strokeWidth="2" opacity="0.8" />
            <line x1="10" y1="125" x2="210" y2="125" strokeDasharray="3 3" opacity="0.3" />
            {/* Submerged Buoyancy Pontoons */}
            <rect x="40" y="98" width="40" height="18" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
            <rect x="140" y="98" width="40" height="18" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
            {/* Diagonal Trusses to Deck */}
            <line x1="60" y1="98" x2="80" y2="70" stroke="#0284c7" strokeWidth="2" />
            <line x1="160" y1="98" x2="140" y2="70" stroke="#0284c7" strokeWidth="2" />
            {/* Main Pod Platform */}
            <rect x="50" y="65" width="120" height="7" fill="#0284c7" fillOpacity="0.25" stroke="#0284c7" strokeWidth="2" />
            {/* Central Spherical Research Dome */}
            <path d="M 75 65 A 35 35 0 0 1 145 65 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.2" />
            {/* Observation Ring & Antenna */}
            <line x1="85" y1="52" x2="135" y2="52" stroke="#0284c7" strokeDasharray="2 2" />
            <line x1="110" y1="30" x2="110" y2="15" stroke="#0284c7" strokeWidth="2" />
            <circle cx="110" cy="15" r="2.5" fill="#0284c7" />
            {/* Anchor lines */}
            <line x1="50" y1="116" x2="30" y2="135" stroke="#0284c7" strokeDasharray="2 2" />
            <line x1="170" y1="116" x2="190" y2="135" stroke="#0284c7" strokeDasharray="2 2" />
          </svg>
        );
      case 'origami':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-amber-500 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            {/* Raised Engawa Timber Plinth */}
            <rect x="35" y="108" width="150" height="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <line x1="45" y1="114" x2="45" y2="120" stroke="#64748b" strokeWidth="2" />
            <line x1="110" y1="114" x2="110" y2="120" stroke="#64748b" strokeWidth="2" />
            <line x1="175" y1="114" x2="175" y2="120" stroke="#64748b" strokeWidth="2" />
            {/* Post & Shoji Screen Walls */}
            <rect x="50" y="65" width="120" height="43" fill="#fef3c7" fillOpacity="0.7" stroke="#d97706" strokeWidth="1.8" />
            <line x1="80" y1="65" x2="80" y2="108" stroke="#d97706" opacity="0.7" strokeDasharray="2 2" />
            <line x1="110" y1="65" x2="110" y2="108" stroke="#d97706" opacity="0.7" strokeDasharray="2 2" />
            <line x1="140" y1="65" x2="140" y2="108" stroke="#d97706" opacity="0.7" strokeDasharray="2 2" />
            {/* Origami Angular Folded Roof */}
            <polygon points="30,68 85,32 120,50 190,38 180,68" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.4" />
            <line x1="85" y1="32" x2="120" y2="50" stroke="#d97706" strokeWidth="2" />
            {/* Bonsai silhouette */}
            <path d="M 195 120 Q 200 105 195 95 Q 190 90 200 85" stroke="#059669" strokeWidth="1.8" />
            <circle cx="200" cy="85" r="7" fill="#d1fae5" stroke="#059669" />
          </svg>
        );
      case 'verticalforest':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-emerald-500 stroke-current fill-none stroke-[1.5]">
            <line x1="10" y1="125" x2="210" y2="125" strokeDasharray="3 3" opacity="0.4" />
            {/* Tower Core */}
            <rect x="80" y="20" width="60" height="105" fill="#f0fdf4" stroke="#0284c7" strokeWidth="2" />
            {/* Staggered Cantilever Balconies with Green Planters */}
            <rect x="62" y="32" width="30" height="6" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="1.8" />
            <circle cx="72" cy="27" r="4" fill="#10b981" stroke="#047857" />
            <circle cx="80" cy="28" r="3.5" fill="#10b981" stroke="#047857" />

            <rect x="128" y="46" width="32" height="6" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="1.8" />
            <circle cx="138" cy="41" r="4.5" fill="#10b981" stroke="#047857" />
            <circle cx="148" cy="42" r="3.5" fill="#10b981" stroke="#047857" />

            <rect x="60" y="62" width="32" height="6" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="1.8" />
            <circle cx="68" cy="57" r="4" fill="#10b981" stroke="#047857" />
            <circle cx="78" cy="58" r="4" fill="#10b981" stroke="#047857" />

            <rect x="128" y="78" width="30" height="6" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="1.8" />
            <circle cx="136" cy="73" r="4.5" fill="#10b981" stroke="#047857" />
            <circle cx="146" cy="74" r="3.5" fill="#10b981" stroke="#047857" />

            <rect x="62" y="94" width="30" height="6" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="1.8" />
            <circle cx="70" cy="89" r="4" fill="#10b981" stroke="#047857" />
            <circle cx="80" cy="90" r="3.5" fill="#10b981" stroke="#047857" />
            {/* Glazed Penthouse */}
            <rect x="85" y="14" width="50" height="6" fill="#e0f2fe" stroke="#0284c7" />
          </svg>
        );
      case 'geothermal':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-emerald-600 stroke-current fill-none stroke-[1.6]">
            {/* Ground Berm Slope */}
            <path d="M 10 90 Q 60 90 90 60 L 130 60 Q 160 90 210 90" stroke="#059669" strokeWidth="3" fill="#d1fae5" fillOpacity="0.4" />
            {/* Subterranean Vault Chamber */}
            <rect x="65" y="60" width="90" height="45" fill="#f0fdf4" stroke="#059669" strokeWidth="2.2" />
            {/* Clerestory Light Oculus */}
            <polygon points="95,60 125,60 120,48 100,48" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="110" y1="48" x2="110" y2="35" stroke="#0284c7" strokeDasharray="2 2" />
            {/* Vertical Geothermal Borehole Loops underground */}
            <path d="M 85 105 L 85 135 L 93 135 L 93 105" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M 127 105 L 127 135 L 135 135 L 135 105" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Underground Strata Datum */}
            <line x1="20" y1="105" x2="200" y2="105" stroke="#64748b" opacity="0.4" strokeDasharray="4 4" />
          </svg>
        );
      case 'observatory':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-sky-600 stroke-current fill-none stroke-[1.6]">
            {/* Hilltop Ridge */}
            <path d="M 10 120 Q 110 95 210 120" stroke="#64748b" strokeWidth="2" opacity="0.6" />
            {/* Masonry Rotunda Base */}
            <rect x="75" y="72" width="70" height="32" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.2" />
            <line x1="75" y1="88" x2="145" y2="88" stroke="#0284c7" opacity="0.5" strokeDasharray="3 3" />
            {/* Hemispherical Observatory Dome */}
            <path d="M 70 72 A 40 40 0 0 1 150 72 Z" fill="#bae6fd" fillOpacity="0.4" stroke="#0284c7" strokeWidth="2.5" />
            {/* Open Shutter Slit & Telescope Tube */}
            <rect x="104" y="32" width="12" height="40" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
            <line x1="110" y1="58" x2="135" y2="28" stroke="#0284c7" strokeWidth="3.5" />
            <circle cx="135" cy="28" r="3" fill="#0284c7" />
            {/* Starlight beams */}
            <line x1="140" y1="22" x2="160" y2="10" stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="1.5" />
          </svg>
        );
      case 'loft':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-orange-500 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            {/* Brick Factory Base & Walls */}
            <rect x="35" y="65" width="150" height="55" fill="#ffedd5" fillOpacity="0.6" stroke="#ea580c" strokeWidth="2.2" />
            {/* Multi-Pane Clerestory Windows */}
            <rect x="50" y="78" width="30" height="30" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="65" y1="78" x2="65" y2="108" stroke="#0284c7" opacity="0.7" />
            <line x1="50" y1="93" x2="80" y2="93" stroke="#0284c7" opacity="0.7" />

            <rect x="95" y="78" width="30" height="30" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="110" y1="78" x2="110" y2="108" stroke="#0284c7" opacity="0.7" />
            <line x1="95" y1="93" x2="125" y2="93" stroke="#0284c7" opacity="0.7" />

            <rect x="140" y="78" width="30" height="30" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="155" y1="78" x2="155" y2="108" stroke="#0284c7" opacity="0.7" />
            <line x1="140" y1="93" x2="170" y2="93" stroke="#0284c7" opacity="0.7" />

            {/* Iconic Industrial Sawtooth Roof with Clerestory Glazing */}
            <polygon points="35,65 35,42 85,65 85,42 135,65 135,42 185,65" fill="#ffedd5" stroke="#ea580c" strokeWidth="2.4" />
            <line x1="35" y1="42" x2="35" y2="65" stroke="#0284c7" strokeWidth="3" />
            <line x1="85" y1="42" x2="85" y2="65" stroke="#0284c7" strokeWidth="3" />
            <line x1="135" y1="42" x2="135" y2="65" stroke="#0284c7" strokeWidth="3" />
          </svg>
        );
      case 'arctic':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-cyan-600 stroke-current fill-none stroke-[1.6]">
            {/* Frozen Permafrost Ground Datum */}
            <line x1="10" y1="120" x2="210" y2="120" stroke="#64748b" strokeWidth="1.8" />
            <path d="M 20 120 L 25 128 L 30 120" stroke="#0284c7" opacity="0.6" />
            <path d="M 80 120 L 85 128 L 90 120" stroke="#0284c7" opacity="0.6" />
            <path d="M 140 120 L 145 128 L 150 120" stroke="#0284c7" opacity="0.6" />
            <path d="M 190 120 L 195 128 L 200 120" stroke="#0284c7" opacity="0.6" />
            {/* Hydraulic Stilt Legs with Skis */}
            <line x1="60" y1="88" x2="50" y2="120" stroke="#ea580c" strokeWidth="3" />
            <line x1="90" y1="88" x2="90" y2="120" stroke="#ea580c" strokeWidth="3" />
            <line x1="130" y1="88" x2="130" y2="120" stroke="#ea580c" strokeWidth="3" />
            <line x1="160" y1="88" x2="170" y2="120" stroke="#ea580c" strokeWidth="3" />
            {/* Stilt Cross-bracing */}
            <line x1="50" y1="110" x2="90" y2="98" stroke="#0284c7" opacity="0.6" />
            <line x1="130" y1="98" x2="170" y2="110" stroke="#0284c7" opacity="0.6" />
            {/* Aerodynamic Chamfered Pod Capsule */}
            <polygon points="45,60 175,60 185,75 175,88 45,88 35,75" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.4" />
            {/* Observation Portholes */}
            <circle cx="70" cy="74" r="4.5" fill="#0284c7" />
            <circle cx="95" cy="74" r="4.5" fill="#0284c7" />
            <circle cx="120" cy="74" r="4.5" fill="#0284c7" />
            <circle cx="145" cy="74" r="4.5" fill="#0284c7" />
            {/* Roof Communications Dome & Met Mast */}
            <path d="M 100 60 A 10 10 0 0 1 120 60 Z" fill="#ea580c" stroke="#ea580c" />
            <line x1="110" y1="50" x2="110" y2="30" stroke="#ea580c" strokeWidth="2" />
          </svg>
        );
      case 'cliffside':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-sky-600 stroke-current fill-none stroke-[1.6]">
            {/* Stepped Cliff Contour */}
            <path d="M 15 125 L 50 125 L 50 95 L 90 95 L 90 65 L 140 65 L 140 35 L 205 35" stroke="#64748b" strokeWidth="2" strokeDasharray="3 2" />
            {/* Cascading Limestone Plinths */}
            <rect x="45" y="88" width="55" height="7" fill="#0284c7" fillOpacity="0.25" stroke="#0f172a" strokeWidth="2" />
            <rect x="85" y="58" width="60" height="7" fill="#0284c7" fillOpacity="0.25" stroke="#0f172a" strokeWidth="2" />
            <rect x="135" y="28" width="65" height="7" fill="#0284c7" fillOpacity="0.25" stroke="#0f172a" strokeWidth="2" />
            {/* Timber Pergola Trellis */}
            <line x1="40" y1="72" x2="105" y2="72" stroke="#d97706" strokeWidth="3" />
            <line x1="52" y1="88" x2="52" y2="72" stroke="#d97706" strokeWidth="2" />
            <line x1="95" y1="88" x2="95" y2="72" stroke="#d97706" strokeWidth="2" />
            <line x1="60" y1="69" x2="60" y2="75" stroke="#d97706" strokeWidth="2" />
            <line x1="72" y1="69" x2="72" y2="75" stroke="#d97706" strokeWidth="2" />
            <line x1="84" y1="69" x2="84" y2="75" stroke="#d97706" strokeWidth="2" />
            {/* Infinity Pool Plinth at Lower Tier */}
            <rect x="25" y="112" width="40" height="13" fill="#0284c7" fillOpacity="0.4" stroke="#0284c7" />
          </svg>
        );
      case 'stadium':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-cyan-600 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            {/* Sloped Stadium Seating Bowl Plinths */}
            <polygon points="25,120 65,80 75,80 45,120" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1.8" />
            <polygon points="195,120 155,80 145,80 175,120" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="75" y1="118" x2="145" y2="118" stroke="#059669" strokeWidth="3" />
            {/* Massive Pylon Masts */}
            <line x1="30" y1="120" x2="45" y2="30" stroke="#0284c7" strokeWidth="3" />
            <line x1="190" y1="120" x2="175" y2="30" stroke="#0284c7" strokeWidth="3" />
            {/* Prestressed Tensile Cable Net Swoop */}
            <path d="M 45 30 Q 110 75 175 30" stroke="#d97706" strokeWidth="2.8" />
            <path d="M 45 35 Q 110 82 175 35" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Tieback backstay cables */}
            <line x1="45" y1="30" x2="15" y2="120" stroke="#d97706" strokeWidth="2" strokeDasharray="2 2" />
            <line x1="175" y1="30" x2="205" y2="120" stroke="#d97706" strokeWidth="2" strokeDasharray="2 2" />
          </svg>
        );
      case 'timberoffice':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-amber-500 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            {/* 5-Story Post & Beam Glulam Grid */}
            <rect x="45" y="30" width="130" height="90" fill="#fef3c7" fillOpacity="0.5" stroke="#d97706" strokeWidth="2.4" />
            {/* Horizontal CLT Slabs */}
            <line x1="45" y1="48" x2="175" y2="48" stroke="#d97706" strokeWidth="2" />
            <line x1="45" y1="66" x2="175" y2="66" stroke="#d97706" strokeWidth="2" />
            <line x1="45" y1="84" x2="175" y2="84" stroke="#d97706" strokeWidth="2" />
            <line x1="45" y1="102" x2="175" y2="102" stroke="#d97706" strokeWidth="2" />
            {/* Vertical Glulam Columns */}
            <line x1="75" y1="30" x2="75" y2="120" stroke="#d97706" strokeWidth="2.2" />
            <line x1="110" y1="30" x2="110" y2="120" stroke="#d97706" strokeWidth="2.2" />
            <line x1="145" y1="30" x2="145" y2="120" stroke="#d97706" strokeWidth="2.2" />
            {/* Timber Braced Cross in Center */}
            <line x1="75" y1="66" x2="110" y2="84" stroke="#0284c7" opacity="0.7" />
            <line x1="110" y1="66" x2="75" y2="84" stroke="#0284c7" opacity="0.7" />
            <line x1="110" y1="66" x2="145" y2="84" stroke="#0284c7" opacity="0.7" />
            <line x1="145" y1="66" x2="110" y2="84" stroke="#0284c7" opacity="0.7" />
            {/* Rooftop Pergola Garden */}
            <rect x="55" y="24" width="40" height="6" fill="#10b981" stroke="#047857" />
            <circle cx="75" cy="20" r="4" fill="#10b981" stroke="#047857" />
          </svg>
        );
      case 'watchtower':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-orange-500 stroke-current fill-none stroke-[1.6]">
            {/* Promontory Rock Cliff */}
            <polygon points="10,125 105,125 115,95 85,95 70,125" fill="#e2e8f0" opacity="0.8" stroke="#64748b" />
            <line x1="10" y1="125" x2="210" y2="125" strokeDasharray="3 3" opacity="0.4" />
            {/* Tapering Corten Monolith Shaft */}
            <polygon points="90,95 110,95 106,25 94,25" fill="#ffedd5" stroke="#ea580c" strokeWidth="2.5" />
            {/* Dramatic Cantilevered Observation Lantern Box */}
            <polygon points="80,25 140,25 135,42 80,42" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.2" />
            <line x1="80" y1="33" x2="138" y2="33" stroke="#0284c7" strokeWidth="1.2" opacity="0.7" />
            {/* Vertical Slit Windows & Light Beacon */}
            <line x1="100" y1="50" x2="100" y2="85" stroke="#d97706" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="110" cy="18" r="3" fill="#fbbf24" stroke="#d97706" />
            <line x1="110" y1="18" x2="110" y2="8" stroke="#0284c7" strokeWidth="1.8" />
          </svg>
        );
      case 'church':
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-sky-600 stroke-current fill-none stroke-[1.6]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            {/* Sweeping Hyperbolic Paraboloid Curved Concrete Vaults */}
            <path d="M 35 120 Q 95 15 110 18 Q 125 15 185 120" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.6" />
            <path d="M 45 120 Q 100 35 110 38 Q 120 35 175 120" stroke="#0284c7" strokeWidth="1.4" opacity="0.7" strokeDasharray="3 3" />
            {/* Monumental Triangular Stained Glass Facade */}
            <polygon points="65,120 155,120 110,48" fill="#4338ca" fillOpacity="0.35" stroke="#4f46e5" strokeWidth="1.8" />
            {/* Slender Cross Finial */}
            <line x1="110" y1="18" x2="110" y2="6" stroke="#d97706" strokeWidth="2.2" />
            <line x1="105" y1="10" x2="115" y2="10" stroke="#d97706" strokeWidth="2.2" />
            {/* Reflecting Pool Base */}
            <rect x="55" y="116" width="110" height="4" fill="#0284c7" stroke="#0284c7" />
          </svg>
        );
      default:
        // Universal clean modern architectural CAD elevation
        return (
          <svg viewBox="0 0 220 140" className="w-full h-full relative z-10 text-cyan-600 stroke-current fill-none stroke-[1.5]">
            <line x1="10" y1="120" x2="210" y2="120" strokeDasharray="3 3" opacity="0.4" />
            <rect x="40" y="55" width="140" height="65" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <line x1="70" y1="55" x2="70" y2="120" stroke="#0284c7" strokeDasharray="2 2" />
            <line x1="110" y1="55" x2="110" y2="120" stroke="#0284c7" strokeDasharray="2 2" />
            <line x1="150" y1="55" x2="150" y2="120" stroke="#0284c7" strokeDasharray="2 2" />
            <rect x="30" y="46" width="160" height="9" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <circle cx="20" cy="100" r="9" stroke="#059669" opacity="0.7" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#050c1a]/95 catalog-modal-backdrop backdrop-blur-2xl overflow-y-auto flex flex-col p-4 sm:p-6 lg:p-8 animate-fadeIn text-slate-100 font-sans select-none">
      
      {/* Top Enterprise Dashboard Navigation Bar */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-sky-500/20 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-300 flex items-center justify-center text-slate-950 font-black shadow-[0_0_25px_rgba(56,189,248,0.5)] shrink-0">
            <LayoutDashboard className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>ArchConstruct</span>
                <span className="px-2 py-0.5 rounded-lg bg-sky-500/20 border border-sky-400/40 text-cyan-400 text-xs font-mono font-bold">3D</span>
                <span className="text-slate-500 font-light">—</span>
                <span className="text-slate-200">Architecture Projects Dashboard</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-700 border border-cyan-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                20 MASTER BLUEPRINTS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
              Enterprise Architectural Portfolio • 20 Real-Time BIM Assembly Structures & Voice Narration
            </p>
          </div>
        </div>

        {/* Enter 3D Viewport Button */}
        <button
          onClick={onClose}
          title="Enter 3D Viewport (Esc)"
          className="px-5 py-2.5 rounded-xl bg-sky-100 hover:bg-sky-500 text-sky-800 hover:text-white border border-sky-300 hover:border-transparent text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Enter 3D Viewport</span>
          <span className="text-[10px] text-sky-700 bg-sky-200/80 px-1.5 py-0.5 rounded border border-sky-300">ESC</span>
        </button>
      </header>

      {/* Search & Category Filter Navigation Bar */}
      <nav className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 my-4 shrink-0">
        {/* Category Pills */}
        <div className="glass-panel p-1 rounded-xl flex items-center gap-1 text-xs font-mono overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 20 models by name or typology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 catalog-search-input border border-slate-700/80 focus:border-cyan-400 text-white placeholder-slate-500 text-xs font-mono rounded-xl pl-9 pr-4 py-2 outline-none transition-colors"
          />
        </div>
      </nav>

      {/* Executive Portfolio KPI Metrics Summary Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 my-2 shrink-0">
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-3.5 border border-sky-500/20">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30 shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">Master Architectures</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-white">{PRODUCTS.length}</span>
              <span className="text-xs font-mono text-cyan-400">Total Structures</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center gap-3.5 border border-sky-500/20">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">Total Portfolio Gross Area</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-emerald-300">{totalArea.toLocaleString()}</span>
              <span className="text-xs font-mono text-emerald-400/80">m² Usable Area</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center gap-3.5 border border-sky-500/20">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400/30 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">Active 3D Benchmark</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-sm sm:text-base font-bold text-white truncate max-w-[170px] block">{activeProduct.name}</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center gap-3.5 border border-sky-500/20">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-400/30 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">BIM Standard &amp; CAD Engine</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs sm:text-sm font-bold text-purple-300">ISO 19650 • LOD 400</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 20 Architectural Projects Grid (3 Columns on Large Displays) */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4 flex-1">
        {filteredProducts.map((prod) => {
          const isActive = prod.id === activeProductId;

          return (
            <article
              key={prod.id}
              className={`rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 border catalog-card ${
                isActive
                  ? 'catalog-card-active bg-gradient-to-b from-sky-950/80 via-slate-900/90 to-slate-950 border-cyan-400/70 shadow-[0_0_35px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/50'
                  : 'catalog-card-inactive bg-slate-900/60 hover:bg-slate-900/85 border-slate-800 hover:border-sky-500/50 shadow-xl'
              }`}
            >
              <div>
                {/* Header & Badges */}
                <div className="flex items-center justify-between mb-3 gap-1">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-cyan-700 bg-sky-100 border border-sky-300 uppercase catalog-badge-pill">
                    {prod.badge}
                  </span>

                  {isActive ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 flex items-center gap-1 shadow-md shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ACTIVE MODEL
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200/80 catalog-category-label shrink-0">
                      {prod.category}
                    </span>
                  )}
                </div>

                {/* Model Title & Tagline */}
                <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-600 transition-colors catalog-card-title">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed line-clamp-2 catalog-card-tagline">
                  {prod.tagline}
                </p>

                {/* Technical CAD Blueprint Vector Line Art Drawing Box */}
                <div className="w-full h-44 rounded-2xl bg-[#f0f7ff] border border-sky-200/90 p-3 my-3 relative flex items-center justify-center overflow-hidden shadow-inner hover:border-sky-400 transition-colors catalog-cad-box">
                  {/* Subtle Blueprint Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#bae6fd_1px,transparent_1px),linear-gradient(to_bottom,#bae6fd_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

                  {/* Dimension overlay datum lines */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-sky-700 font-bold border-l-2 border-t-2 border-sky-400/60 pl-1.5 pt-0.5 pointer-events-none select-none z-10">
                    CAD DATUM
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-sky-800 font-extrabold bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-sky-300 shadow-sm pointer-events-none select-none z-10">
                    {prod.areaM2.toLocaleString()} m²
                  </div>

                  {/* Vector Drawing */}
                  {renderCadDrawing(prod)}
                </div>

                {/* BIM Engineering Specifications Matrix */}
                <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-slate-800 text-xs font-mono catalog-spec-grid">
                  <div className="catalog-spec-box bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Gross Area</span>
                    <span className="text-white font-bold spec-val-area">{prod.areaM2.toLocaleString()} m²</span>
                  </div>
                  <div className="catalog-spec-box bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Est. Budget</span>
                    <span className="text-emerald-300 font-bold spec-val-cost">{prod.estCost}</span>
                  </div>
                  <div className="catalog-spec-box bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Milestones</span>
                    <span className="text-cyan-600 font-bold spec-val-milestones">{prod.phases.length} Phases</span>
                  </div>
                  <div className="catalog-spec-box bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Typology</span>
                    <span className="text-amber-300 font-bold truncate block spec-val-type">{prod.category}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => {
                    onSelectProduct(prod.id, true);
                    onClose();
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400 text-slate-950 shadow-cyan-500/30 hover:brightness-110 catalog-btn-primary'
                      : 'bg-sky-500/20 hover:bg-sky-500 text-sky-700 hover:text-slate-950 border border-sky-400/40 hover:border-transparent catalog-btn-secondary'
                  }`}
                >
                  <Hammer className="w-4 h-4" />
                  <span>Build Step-by-Step with Voice</span>
                </button>

                <button
                  onClick={() => {
                    onSelectProduct(prod.id, false);
                    onClose();
                  }}
                  className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center gap-2 transition-colors catalog-btn-tertiary"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect in 3D Viewport</span>
                </button>
              </div>
            </article>
          );
        })}
      </main>

      {/* Enterprise Dashboard Footer */}
      <footer className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 shrink-0">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Showing {filteredProducts.length} of {PRODUCTS.length} Master Architectures. Full CAD suite with True Orthographic Camera, SVG Leader Lines &amp; Voice.</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">Esc</kbd> anytime to return</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700"
          >
            Close Dashboard
          </button>
        </div>
      </footer>
    </div>
  );
};
