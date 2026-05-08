"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";
import { AlertTriangle, FileText, Globe2, ShieldAlert, Send, Download, Loader2 } from "lucide-react";
import { client } from "@/sanity/client";

interface Incident {
  _id: string;
  title_en: string;
  title_ar: string;
  category: string;
  date: string;
  status: string;
  sourceLink?: string;
}

export default function MonitorPage() {
  const t = useTranslations("Monitor");
  const locale = useTranslations("Navigation")("about") === "من نحن" ? "ar" : "en";
  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await client.fetch<Incident[]>(`
          *[_type == "incident"] | order(date desc) {
            _id,
            title_en,
            title_ar,
            category,
            date,
            status,
            sourceLink
          }
        `);
        setIncidents(data);
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "media": return <Globe2 className="text-aletheia-gold" size={20} />;
      case "political": return <AlertTriangle className="text-red-400" size={20} />;
      case "cyber": return <ShieldAlert className="text-orange-400" size={20} />;
      default: return <FileText className="text-aletheia-gold" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-900/50 text-green-400 border-green-700/50";
      case "Legal Notice Sent": return "bg-aletheia-gold/20 text-aletheia-gold border-aletheia-gold/50";
      default: return "bg-orange-900/50 text-orange-400 border-orange-700/50";
    }
  };

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 border-b border-aletheia-gray/20 bg-aletheia-dark-gray/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <ShieldAlert className="mx-auto text-aletheia-gold mb-6" size={48} />
          <h1 className="text-4xl md:text-6xl font-serif mb-6 max-w-4xl mx-auto">{t("title")}</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-aletheia-cream/80">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Incidents Feed & Map */}
          <div className="w-full lg:w-2/3">
            {/* Global Map Placeholder */}
            <div className="mb-12 bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2 text-aletheia-gold">
                  <Globe2 size={20} />
                  <h3 className="font-serif text-xl">{locale === "ar" ? "خريطة الرصد العالمية" : "Global Incident Map"}</h3>
                </div>
                <span className="text-xs uppercase tracking-widest text-aletheia-cream/50">Live View</span>
              </div>
              
              <div className="w-full h-64 bg-aletheia-black/50 rounded-lg border border-aletheia-gray/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aletheia-gold via-aletheia-black to-aletheia-black"></div>
                <Globe2 size={120} className="text-aletheia-gray/10 absolute animate-pulse" />
                <div className="text-center relative z-10">
                  <p className="text-aletheia-cream/60 mb-2">{locale === "ar" ? "الخريطة التفاعلية قيد التطوير" : "Interactive map is under development"}</p>
                  <p className="text-xs text-aletheia-gold/60">{locale === "ar" ? "سيتم ربطها بواجهة برمجية لعرض الحوادث جغرافياً" : "Will be connected to API to display incidents geographically"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8 border-b border-aletheia-gray/20 pb-4">
              <ShieldAlert className="text-aletheia-gold" />
              <h2 className="text-2xl font-serif">{t("incidents_map")}</h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-aletheia-gold" size={48} />
              </div>
            ) : (
              <div className="space-y-6">
                {incidents.map((incident) => (
                  <div key={incident._id} className="bg-aletheia-dark-gray/30 border border-aletheia-gray/20 rounded-xl p-6 hover:border-aletheia-gray/40 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-aletheia-black rounded-lg border border-aletheia-gray/20">
                          {getCategoryIcon(incident.category)}
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-wider text-aletheia-cream/50 block mb-1">
                            {incident.category ? t(`categories.${incident.category}`) : ""}
                          </span>
                          <span className="text-sm font-mono text-aletheia-gold">{incident.date}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-serif mb-3">
                      {locale === "ar" && incident.title_ar ? incident.title_ar : incident.title_en}
                    </h3>
                    
                    {incident.sourceLink && (
                      <a href={incident.sourceLink} target="_blank" rel="noopener noreferrer" className="text-sm text-aletheia-gold hover:underline flex items-center gap-1 mt-4">
                        Source Evidence <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                ))}
                
                {incidents.length === 0 && (
                  <div className="py-20 text-center text-aletheia-cream/50 border border-dashed border-aletheia-gray/30 rounded-lg">
                    No incidents recorded yet.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Sidebar */}
          <aside className="w-full lg:w-1/3 space-y-8">
            {/* Report Form */}
            <div className="bg-aletheia-dark-gray/50 border border-aletheia-gray/20 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-aletheia-gold/5 blur-3xl rounded-full" />
              
              <h3 className="text-2xl font-serif text-aletheia-gold mb-2 relative z-10">{t("form.title")}</h3>
              <p className="text-sm text-aletheia-cream/60 mb-6 relative z-10">{t("form.desc")}</p>
              
              <form className="space-y-4 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-aletheia-cream/80 mb-1">{t("form.link_label")}</label>
                  <input type="url" className="w-full bg-aletheia-black border border-aletheia-gray/30 rounded px-4 py-2 text-aletheia-cream focus:border-aletheia-gold focus:outline-none" placeholder="https://" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-aletheia-cream/80 mb-1">{t("form.type_label")}</label>
                  <select className="w-full bg-aletheia-black border border-aletheia-gray/30 rounded px-4 py-2 text-aletheia-cream focus:border-aletheia-gold focus:outline-none">
                    <option value="media">{t("categories.media")}</option>
                    <option value="political">{t("categories.political")}</option>
                    <option value="cyber">{t("categories.cyber")}</option>
                    <option value="religious">{t("categories.religious")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-aletheia-cream/80 mb-1">{t("form.details_label")}</label>
                  <textarea rows={4} className="w-full bg-aletheia-black border border-aletheia-gray/30 rounded px-4 py-2 text-aletheia-cream focus:border-aletheia-gold focus:outline-none" />
                </div>
                <button type="button" className="w-full bg-aletheia-gold text-aletheia-black font-medium py-3 rounded flex items-center justify-center gap-2 hover:bg-aletheia-cream transition-colors">
                  <Send size={18} />
                  {t("form.submit")}
                </button>
              </form>
            </div>

            {/* Legal Templates */}
            <div className="bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded-xl p-6">
              <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                <FileText className="text-aletheia-gold" size={20} />
                {t("legal_responses")}
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded hover:border-aletheia-gold/40 transition-colors group">
                  <span className="group-hover:text-aletheia-gold transition-colors">{t("download_template")} (EN)</span>
                  <Download size={18} className="text-aletheia-cream/50 group-hover:text-aletheia-gold transition-colors" />
                </button>
              </div>
            </div>

            {/* Periodic Reports */}
            <div className="bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded-xl p-6">
              <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                <FileText className="text-aletheia-gold" size={20} />
                {locale === "ar" ? "التقارير الدورية" : "Periodic Reports"}
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded hover:border-aletheia-gold/40 transition-colors group">
                  <span className="group-hover:text-aletheia-gold transition-colors text-left">{locale === "ar" ? "التقرير السنوي 2025" : "Annual Report 2025"}</span>
                  <Download size={18} className="text-aletheia-cream/50 group-hover:text-aletheia-gold transition-colors" />
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
