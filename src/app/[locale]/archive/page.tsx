"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";
import { Search, Filter, FileText, FileSpreadsheet, FileVideo, Download, Eye, Loader2 } from "lucide-react";
import { client } from "@/sanity/client";

interface ArchiveDocument {
  _id: string;
  title_en: string;
  title_ar: string;
  type: string;
  era: string;
  year: string;
  author: string;
  fileUrl?: string;
}

export default function ArchivePage() {
  const t = useTranslations("Archive");
  // Basic check for locale since NextIntl hooks for locale sometimes require provider context depending on setup
  const locale = useTranslations("Navigation")("about") === "من نحن" ? "ar" : "en";
  
  const [documents, setDocuments] = useState<ArchiveDocument[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEra, setSelectedEra] = useState<string>("all");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await client.fetch<ArchiveDocument[]>(`
          *[_type == "archiveDocument"] | order(_createdAt desc) {
            _id,
            title_en,
            title_ar,
            type,
            era,
            year,
            author,
            "fileUrl": file.asset->url
          }
        `);
        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const filteredArchive = documents.filter((item) => {
    const matchesSearch = 
      (item.title_en?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
      (item.title_ar || '').includes(searchQuery);
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesEra = selectedEra === "all" || item.era === selectedEra;
    return matchesSearch && matchesType && matchesEra;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "manuscript": return <FileText className="text-aletheia-gold" />;
      case "study": return <FileSpreadsheet className="text-aletheia-gold" />;
      case "document": return <FileText className="text-aletheia-gold" />;
      default: return <FileVideo className="text-aletheia-gold" />;
    }
  };

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-16 border-b border-aletheia-gray/20 bg-aletheia-dark-gray/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-aletheia-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">{t("title")}</h1>
          <p className="text-aletheia-cream/70 text-lg max-w-2xl">{t("subtitle")}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar / Filters */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute top-3 left-4 text-aletheia-cream/40 rtl:left-auto rtl:right-4" size={20} />
            <input 
              type="text" 
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-aletheia-dark-gray/50 border border-aletheia-gray/30 rounded px-12 py-3 text-aletheia-cream focus:outline-none focus:border-aletheia-gold transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 text-aletheia-gold border-b border-aletheia-gray/20 pb-4">
            <Filter size={20} />
            <h3 className="font-serif text-xl">{t("filters")}</h3>
          </div>

          {/* Type Filter */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-aletheia-cream/50 mb-4">{t("type")}</h4>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="type" checked={selectedType === "all"} onChange={() => setSelectedType("all")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">All</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="type" checked={selectedType === "manuscript"} onChange={() => setSelectedType("manuscript")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">{t("types.manuscript")}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="type" checked={selectedType === "study"} onChange={() => setSelectedType("study")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">{t("types.study")}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="type" checked={selectedType === "document"} onChange={() => setSelectedType("document")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">{t("types.document")}</span>
              </label>
            </div>
          </div>

          {/* Era Filter */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-aletheia-cream/50 mb-4">{t("era")}</h4>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="era" checked={selectedEra === "all"} onChange={() => setSelectedEra("all")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">All</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="era" checked={selectedEra === "medieval"} onChange={() => setSelectedEra("medieval")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">{t("eras.medieval")}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="era" checked={selectedEra === "ottoman"} onChange={() => setSelectedEra("ottoman")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">{t("eras.ottoman")}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="era" checked={selectedEra === "mandate"} onChange={() => setSelectedEra("mandate")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">{t("eras.mandate")}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="era" checked={selectedEra === "modern"} onChange={() => setSelectedEra("modern")} className="accent-aletheia-gold" />
                <span className="group-hover:text-aletheia-gold transition-colors">{t("eras.modern")}</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="animate-spin text-aletheia-gold" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArchive.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded-lg p-6 hover:border-aletheia-gold/40 transition-all duration-300 group flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-aletheia-dark-gray rounded-md">
                      {getIcon(item.type)}
                    </div>
                    <div className="text-xs font-mono text-aletheia-cream/40 bg-aletheia-black px-2 py-1 rounded border border-aletheia-gray/20">
                      {item.year || "Unknown"}
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl mb-2 group-hover:text-aletheia-gold transition-colors">
                    {locale === "ar" && item.title_ar ? item.title_ar : item.title_en}
                  </h3>
                  
                  <p className="text-aletheia-cream/60 text-sm mb-6 flex-grow">
                    By: <span className="text-aletheia-cream/80">{item.author || "Anonymous"}</span>
                  </p>

                  <div className="flex items-center justify-between border-t border-aletheia-gray/10 pt-4 mt-auto">
                    <span className="text-xs uppercase tracking-wider text-aletheia-gold">
                      {item.type ? t(`types.${item.type}`) : ""}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const citation = `${item.author || "Anonymous"} (${item.year || "n.d."}). ${item.title_en}. Aletheia Digital Archive.`;
                          navigator.clipboard.writeText(citation);
                          alert("Citation copied to clipboard (APA Format)");
                        }}
                        className="p-2 text-aletheia-cream/50 hover:text-aletheia-gold hover:bg-aletheia-gold/10 rounded transition-colors" 
                        title="Copy Citation (APA)"
                      >
                        <FileText size={18} />
                      </button>
                      {item.fileUrl && (
                        <a 
                          href={item.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 text-aletheia-cream/50 hover:text-aletheia-gold hover:bg-aletheia-gold/10 rounded transition-colors" 
                          title={t("view_document")}
                        >
                          <Eye size={18} />
                        </a>
                      )}
                      {item.fileUrl && (
                        <a 
                          href={`${item.fileUrl}?dl=`} 
                          className="p-2 text-aletheia-cream/50 hover:text-aletheia-gold hover:bg-aletheia-gold/10 rounded transition-colors" 
                          title={t("download")}
                        >
                          <Download size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredArchive.length === 0 && (
                <div className="col-span-full py-20 text-center text-aletheia-cream/50 border border-dashed border-aletheia-gray/30 rounded-lg">
                  No documents found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
