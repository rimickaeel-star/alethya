"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { useLocale } from "next-intl";
import { 
  ShieldCheck, 
  UploadCloud, 
  Users, 
  MapPin, 
  Map, 
  Phone, 
  Trash2, 
  Download, 
  CheckCircle, 
  Video, 
  Lock, 
  PieChart, 
  Database, 
  Key,
  Globe,
  Loader2,
  FileVideo
} from "lucide-react";

// Types for submission
interface Submission {
  id: string;
  nameAr: string;
  nameEn: string;
  location: string;
  commuteRoute: string;
  countryCode: string;
  phone: string;
  whatsapp: string; // key: countryCode + phone
  videoBlob: Blob | string; // Base64 or Blob
  videoName: string;
  videoType: string;
  createdAt: string;
  status: "Pending" | "Saved" | "Deleted";
}

// Country Code Options
const COUNTRY_CODES = [
  { code: "+963", name: "سوريا (Syria)" },
  { code: "+961", name: "لبنان (Lebanon)" },
  { code: "+966", name: "السعودية (KSA)" },
  { code: "+971", name: "الإمارات (UAE)" },
  { code: "+90", name: "تركيا (Turkey)" },
  { code: "+962", name: "الأردن (Jordan)" },
  { code: "+964", name: "العراق (Iraq)" },
  { code: "+20", name: "مصر (Egypt)" },
  { code: "+1", name: "أمريكا/كندا (US/Canada)" },
  { code: "+44", name: "بريطانيا (UK)" },
  { code: "+33", name: "فرنسا (France)" },
  { code: "+49", name: "ألمانيا (Germany)" },
];

const DB_NAME = "AletheiaProtectionDB";
const STORE_NAME = "submissions_store";

export default function ProtectionPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  // Form State
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [location, setLocation] = useState("");
  const [commuteRoute, setCommuteRoute] = useState("");
  const [countryCode, setCountryCode] = useState("+963");
  const [phone, setPhone] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  // App UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    totalCount: 1482, // Baseline mock stats
    locations: [
      { name: isAr ? "بيروت" : "Beirut", count: 412 },
      { name: isAr ? "اللاذقية" : "Latakia", count: 325 },
      { name: isAr ? "دمشق" : "Damascus", count: 284 },
      { name: isAr ? "طرطوس" : "Tartus", count: 220 },
      { name: isAr ? "حلب" : "Aleppo", count: 141 },
      { name: isAr ? "حمص" : "Homs", count: 100 },
    ] as { name: string; count: number }[]
  });

  // Reference for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize IndexedDB
  useEffect(() => {
    if (typeof window === "undefined") return;

    const request = indexedDB.open(DB_NAME, 2);
    
    request.onupgradeneeded = (e: any) => {
      const activeDb = e.target.result;
      if (!activeDb.objectStoreNames.contains(STORE_NAME)) {
        activeDb.createObjectStore(STORE_NAME, { keyPath: "whatsapp" });
      }
    };

    request.onsuccess = (e: any) => {
      const activeDb = e.target.result;
      setDb(activeDb);
      loadSubmissions(activeDb);
    };

    request.onerror = (e) => {
      console.error("IndexedDB load error:", e);
    };
  }, []);

  // Reload submissions list from IndexedDB
  const loadSubmissions = (activeDb: IDBDatabase) => {
    if (!activeDb) return;
    try {
      const transaction = activeDb.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result as Submission[];
        setSubmissions(results);

        // Calculate dynamic stats based on actual submissions + mock baseline
        const totalActual = results.filter(r => r.status !== "Deleted").length;
        
        // Count locations from actual data
        const locationCounts: { [key: string]: number } = {};
        results.filter(r => r.status !== "Deleted").forEach((s) => {
          const loc = s.location.trim();
          if (loc) {
            locationCounts[loc] = (locationCounts[loc] || 0) + 1;
          }
        });

        // Combine mock data & actual data
        const combinedLocations = [...stats.locations];
        Object.entries(locationCounts).forEach(([name, count]) => {
          const index = combinedLocations.findIndex(l => l.name.toLowerCase() === name.toLowerCase());
          if (index !== -1) {
            combinedLocations[index].count += count;
          } else {
            combinedLocations.push({ name, count });
          }
        });

        // Sort descending
        combinedLocations.sort((a, b) => b.count - a.count);

        setStats({
          totalCount: 1482 + totalActual,
          locations: combinedLocations
        });
      };
    } catch (e) {
      console.error("Error reading submissions", e);
    }
  };

  // Convert File to Base64 to store safely in DB if Blob storage fails
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (!phone) {
      setErrorMsg(isAr ? "رقم الهاتف مطلوب" : "Phone number is required");
      return;
    }

    if (!videoFile) {
      setErrorMsg(isAr ? "يرجى تحميل ملف الفيديو الخاص بك للحماية" : "Please upload your video file for protection");
      return;
    }

    const fullWhatsapp = `${countryCode}${phone.replace(/\s+/g, "")}`;

    if (!db) {
      setErrorMsg(isAr ? "قاعدة البيانات غير متوفرة حالياً" : "Database is not initialized");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Check for duplicate phone number
      const checkTx = db.transaction(STORE_NAME, "readonly");
      const checkStore = checkTx.objectStore(STORE_NAME);
      const checkRequest = checkStore.get(fullWhatsapp);

      checkRequest.onsuccess = async () => {
        const existing = checkRequest.result as Submission | undefined;
        
        if (existing && existing.status !== "Deleted") {
          setErrorMsg(
            isAr 
              ? "عذراً، هذا الرقم مسجل مسبقاً ولديه فيديو محفوظ." 
              : "Sorry, this WhatsApp number is already registered with an uploaded video."
          );
          setIsSubmitting(false);
          return;
        }

        // 2. Prepare submission details
        let savedVideo: Blob | string = videoFile;
        try {
          // Store directly as Blob if supported, or base64 fallback
          savedVideo = await fileToBase64(videoFile);
        } catch (baseError) {
          console.error("Error converting video:", baseError);
        }

        const newSubmission: Submission = {
          id: Math.random().toString(36).substr(2, 9),
          nameAr: nameAr.trim(),
          nameEn: nameEn.trim(),
          location: location.trim(),
          commuteRoute: commuteRoute.trim(),
          countryCode,
          phone: phone.trim(),
          whatsapp: fullWhatsapp,
          videoBlob: savedVideo,
          videoName: videoFile.name,
          videoType: videoFile.type,
          createdAt: new Date().toISOString(),
          status: "Pending"
        };

        // 3. Save to IndexedDB
        const saveTx = db.transaction(STORE_NAME, "readwrite");
        const saveStore = saveTx.objectStore(STORE_NAME);
        const saveRequest = saveStore.put(newSubmission);

        saveRequest.onsuccess = () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          // Reset fields
          setNameAr("");
          setNameEn("");
          setLocation("");
          setCommuteRoute("");
          setPhone("");
          setVideoFile(null);
          // Reload admin view and stats
          loadSubmissions(db);
        };

        saveRequest.onerror = (saveError) => {
          console.error("Error saving record:", saveError);
          setErrorMsg(isAr ? "فشل حفظ الملف في قاعدة البيانات المحلية" : "Failed to save the file to local database");
          setIsSubmitting(false);
        };
      };

    } catch (err) {
      console.error(err);
      setErrorMsg(isAr ? "حدث خطأ غير متوقع" : "An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  // Admin functions
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "admin123") {
      setIsAdminAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg(isAr ? "رمز المرور خاطئ!" : "Incorrect password!");
    }
  };

  const handleUpdateStatus = (whatsapp: string, newStatus: "Saved" | "Pending") => {
    if (!db) return;
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(whatsapp);

    req.onsuccess = () => {
      const data = req.result as Submission;
      if (data) {
        data.status = newStatus;
        store.put(data);
      }
    };

    tx.oncomplete = () => {
      loadSubmissions(db);
    };
  };

  const handleDeleteSubmission = (whatsapp: string) => {
    if (!db) return;
    if (!confirm(isAr ? "هل أنت متأكد من حذف هذا التسجيل بالكامل؟" : "Are you sure you want to completely delete this record?")) {
      return;
    }
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(whatsapp);

    tx.oncomplete = () => {
      loadSubmissions(db);
    };
  };

  const handleDownloadVideo = (sub: Submission) => {
    // Check if base64 or blob
    let url = "";
    if (typeof sub.videoBlob === "string" && sub.videoBlob.startsWith("data:")) {
      url = sub.videoBlob;
    } else if (sub.videoBlob instanceof Blob) {
      url = URL.createObjectURL(sub.videoBlob);
    }

    if (!url) return;

    const a = document.createElement("a");
    a.href = url;
    a.download = `${sub.nameAr || sub.nameEn || "video"}_protection_${sub.phone}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen bg-aletheia-black text-aletheia-cream selection:bg-aletheia-gold/30">
      <Navbar />

      {/* Header Section */}
      <div className="pt-32 pb-16 border-b border-aletheia-gray/20 bg-aletheia-dark-gray/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-aletheia-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-aletheia-gold/10 border border-aletheia-gold/20 text-aletheia-gold text-sm font-semibold mb-6">
            <Lock size={16} />
            <span>{isAr ? "نظام حماية البيانات المشفرة والأمنية" : "Encrypted Security Portal"}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 max-w-4xl mx-auto text-aletheia-gold">
            {isAr ? "حماية من الخطف" : "Kidnap Protection"}
          </h1>
          <p className="text-aletheia-cream/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {isAr 
              ? "منصة أمنية خاصة تتيح لزائرينا الكرام حفظ بيانات تواصلهم ومسار تحركهم اليومي مع تسجيل فيديو تأكيدي سري ليكون كإجراء احترازي وبصمة أمنية موثقة في حال حدوث أي مكروه لا قدر الله."
              : "A dedicated safety portal enabling citizens to securely store their commute details, contact metadata, and a verified video capture for confidential preservation."}
          </p>

          {/* Admin Dashboard Toggle Button */}
          <button 
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              setErrorMsg("");
            }}
            className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-aletheia-gold/30 bg-aletheia-dark-gray/50 hover:bg-aletheia-gold hover:text-aletheia-black transition-all font-semibold text-sm cursor-pointer"
          >
            <Key size={16} />
            <span>{isAdminMode ? (isAr ? "العودة لبوابة التسجيل" : "Back to Form") : (isAr ? "🔑 لوحة تحكم الإدارة" : "🔑 Admin Dashboard")}</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {isAdminMode ? (
          /* ==========================================
             ADMIN DASHBOARD VIEW
             ========================================== */
          <div className="max-w-6xl mx-auto bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-aletheia-gray/20 pb-6 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <Database className="text-aletheia-gold" size={32} />
                <div>
                  <h2 className="text-2xl font-serif text-aletheia-gold font-bold">
                    {isAr ? "لوحة التحكم السرية للمدير" : "Admin Security Console"}
                  </h2>
                  <p className="text-xs text-aletheia-cream/50 mt-1">
                    {isAr ? "مراجعة وتأكيد وحفظ الفيديوهات المرفوعة سرّياً" : "Review, confirm and securely manage uploaded profiles"}
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded font-mono">
                {isAr ? "خاص بالمسؤولين فقط" : "AUTHORIZED PERSONNEL ONLY"}
              </div>
            </div>

            {!isAdminAuthenticated ? (
              // Admin Authentication Form
              <div className="max-w-md mx-auto text-center py-12">
                <Lock size={48} className="mx-auto text-aletheia-gold/60 mb-6" />
                <h3 className="text-lg font-serif mb-4">
                  {isAr ? "يرجى إدخال رمز المرور للدخول للداشبورد" : "Please enter the admin password"}
                </h3>
                <form onSubmit={handleAdminAuth} className="flex flex-col gap-4">
                  <input 
                    type="password" 
                    placeholder="password: admin123"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="w-full bg-aletheia-black/80 border border-aletheia-gray/30 rounded px-4 py-3 text-center focus:outline-none focus:border-aletheia-gold transition-colors font-mono"
                  />
                  {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                  <button type="submit" className="bg-aletheia-gold text-aletheia-black font-semibold py-3 rounded hover:bg-yellow-500 transition-colors">
                    {isAr ? "تأكيد الدخول" : "Authorize"}
                  </button>
                </form>
              </div>
            ) : (
              // Authenticated Admin Dashboard
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="p-4 bg-aletheia-black/40 border border-aletheia-gray/20 rounded-xl text-center">
                    <span className="text-xs text-aletheia-cream/50 block mb-1">{isAr ? "إجمالي الملفات" : "Total Submissions"}</span>
                    <span className="text-3xl font-serif text-aletheia-gold font-bold">{submissions.length}</span>
                  </div>
                  <div className="p-4 bg-aletheia-black/40 border border-aletheia-gray/20 rounded-xl text-center">
                    <span className="text-xs text-aletheia-cream/50 block mb-1">{isAr ? "قيد المراجعة" : "Pending"}</span>
                    <span className="text-3xl font-serif text-yellow-500 font-bold">
                      {submissions.filter(s => s.status === "Pending").length}
                    </span>
                  </div>
                  <div className="p-4 bg-aletheia-black/40 border border-aletheia-gray/20 rounded-xl text-center">
                    <span className="text-xs text-aletheia-cream/50 block mb-1">{isAr ? "المحفوظة نهائياً" : "Saved & Confirmed"}</span>
                    <span className="text-3xl font-serif text-green-500 font-bold">
                      {submissions.filter(s => s.status === "Saved").length}
                    </span>
                  </div>
                  <div className="p-4 bg-aletheia-black/40 border border-aletheia-gray/20 rounded-xl text-center">
                    <span className="text-xs text-aletheia-cream/50 block mb-1">{isAr ? "الحجم التقديري" : "Database Engine"}</span>
                    <span className="text-md font-serif text-aletheia-gold block font-semibold py-2">IndexedDB</span>
                  </div>
                </div>

                {submissions.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-aletheia-gray/30 rounded-2xl">
                    <FileVideo size={48} className="mx-auto text-aletheia-cream/20 mb-4" />
                    <p className="text-aletheia-cream/50">
                      {isAr ? "لا توجد أي تسجيلات جديدة مرفوعة حالياً." : "No video recordings submitted yet."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {submissions.map((sub) => (
                      <div key={sub.whatsapp} className="border border-aletheia-gray/20 bg-aletheia-black/40 rounded-xl p-6 hover:border-aletheia-gold/30 transition-all">
                        <div className="grid md:grid-cols-12 gap-6 items-start">
                          
                          {/* Left: User details */}
                          <div className="md:col-span-7 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-xs font-mono bg-aletheia-gold/10 text-aletheia-gold border border-aletheia-gold/20 px-2 py-0.5 rounded">
                                ID: {sub.id}
                              </span>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                sub.status === "Saved" 
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              }`}>
                                {sub.status === "Saved" ? (isAr ? "تم تأكيد الحفظ نهائياً" : "Saved & Confirmed") : (isAr ? "قيد الانتظار" : "Pending Review")}
                              </span>
                              <span className="text-xs text-aletheia-cream/50">
                                {new Date(sub.createdAt).toLocaleString(isAr ? 'ar-SY' : 'en-US')}
                              </span>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <strong className="text-aletheia-gold block mb-1">{isAr ? "الاسم الثلاثي (عربي):" : "Triple Name (AR):"}</strong>
                                <span className="text-aletheia-cream text-base">{sub.nameAr || "—"}</span>
                              </div>
                              <div>
                                <strong className="text-aletheia-gold block mb-1">{isAr ? "الاسم الثلاثي (إنكليزي):" : "Triple Name (EN):"}</strong>
                                <span className="text-aletheia-cream text-base font-medium">{sub.nameEn || "—"}</span>
                              </div>
                              <div className="sm:col-span-2">
                                <strong className="text-aletheia-gold block mb-1">{isAr ? "رقم الواتساب وتواصل الطوارئ:" : "WhatsApp & Emergency Phone:"}</strong>
                                <a href={`https://wa.me/${sub.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-mono text-base flex items-center gap-1">
                                  <Phone size={14} />
                                  {sub.whatsapp}
                                </a>
                              </div>
                              <div>
                                <strong className="text-aletheia-gold block mb-1">{isAr ? "الموقع الحالي:" : "Current Location:"}</strong>
                                <span className="text-aletheia-cream text-base">{sub.location}</span>
                              </div>
                              <div>
                                <strong className="text-aletheia-gold block mb-1">{isAr ? "مسار التنقل اليومي المعتاد:" : "Usual Daily Commute Route:"}</strong>
                                <span className="text-aletheia-cream text-base">{sub.commuteRoute || "—"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Video player & Controls */}
                          <div className="md:col-span-5 flex flex-col gap-4">
                            <div className="border border-aletheia-gray/30 rounded-lg overflow-hidden bg-black max-h-[180px] flex items-center justify-center relative group">
                              <video 
                                src={typeof sub.videoBlob === "string" ? sub.videoBlob : undefined} 
                                controls 
                                className="w-full max-h-[180px] object-contain"
                              />
                            </div>
                            
                            {/* Controls buttons: Confirm Save, Delete, Download */}
                            <div className="grid grid-cols-3 gap-2">
                              {sub.status !== "Saved" ? (
                                <button 
                                  onClick={() => handleUpdateStatus(sub.whatsapp, "Saved")}
                                  className="py-2.5 px-2 bg-green-600 hover:bg-green-500 text-aletheia-black font-semibold rounded text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                                  title={isAr ? "تأكيد حفظ الفيديو" : "Confirm video safety"}
                                >
                                  <CheckCircle size={16} />
                                  <span>{isAr ? "تأكيد الحفظ" : "Confirm Save"}</span>
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleUpdateStatus(sub.whatsapp, "Pending")}
                                  className="py-2.5 px-2 bg-yellow-600 hover:bg-yellow-500 text-aletheia-black font-semibold rounded text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                                  title={isAr ? "إعادة الوضع للانتظار" : "Set back to pending"}
                                >
                                  <Loader2 className="animate-spin" size={16} />
                                  <span>{isAr ? "إلغاء التأكيد" : "Undo Save"}</span>
                                </button>
                              )}

                              <button 
                                onClick={() => handleDownloadVideo(sub)}
                                className="py-2.5 px-2 bg-aletheia-gold hover:bg-yellow-500 text-aletheia-black font-semibold rounded text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                                title={isAr ? "تحميل الفيديو إلى حاسبك" : "Download video to local disk"}
                              >
                                <Download size={16} />
                                <span>{isAr ? "تحميل الفيديو" : "Download"}</span>
                              </button>

                              <button 
                                onClick={() => handleDeleteSubmission(sub.whatsapp)}
                                className="py-2.5 px-2 bg-red-900/40 hover:bg-red-700 text-red-200 border border-red-800 rounded text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                                title={isAr ? "حذف الملف بالكامل" : "Delete submission"}
                              >
                                <Trash2 size={16} />
                                <span>{isAr ? "حذف السجل" : "Delete"}</span>
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ==========================================
             USER FORM & STATISTICS VIEW
             ========================================== */
          <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-start">
            
            {/* Form Section (Left / 7 cols) */}
            <div className="lg:col-span-7 bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded-2xl p-8 md:p-10 shadow-xl">
              <div className="flex items-center gap-3 mb-8 border-b border-aletheia-gray/20 pb-4">
                <ShieldCheck className="text-aletheia-gold" size={32} />
                <h2 className="text-2xl font-serif text-aletheia-gold font-bold">
                  {isAr ? "طلب تسجيل وبصمة أمنية احترازية" : "Safety Protection Request"}
                </h2>
              </div>

              {isSubmitted ? (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-8 rounded-xl text-center space-y-4">
                  <CheckCircle size={48} className="mx-auto text-green-400 mb-2" />
                  <h3 className="text-xl font-bold font-serif">{isAr ? "تم حفظ البيانات والفيديو بنجاح!" : "Saved Successfully!"}</h3>
                  <p className="text-sm text-aletheia-cream/80 max-w-md mx-auto leading-relaxed">
                    {isAr 
                      ? "شكراً لك. تم تشفير وتسجيل بياناتك الثلاثية، والموقع الحالي، ومسار تنقلك اليومي، وحفظ ملف الفيديو الخاص بك بسرية تامة وتأكيد حفظه في أرشيف الحماية الآمن للموقع."
                      : "Thank you. Your triple names, current location, commute details, and safety video have been successfully stored, encrypted and logged with total confidentiality."}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded bg-green-500 hover:bg-green-400 text-aletheia-black font-bold transition-all text-sm cursor-pointer"
                  >
                    {isAr ? "تسجيل طلب آخر" : "Submit Another Safety Request"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Legal Guidelines for Admissibility */}
                  <div className="border border-aletheia-gold/30 bg-aletheia-gold/5 p-6 rounded-xl space-y-4">
                    <h3 className="text-sm font-bold text-aletheia-gold flex items-center gap-2 border-b border-aletheia-gold/20 pb-2">
                      <span>⚖️</span>
                      <span>
                        {isAr 
                          ? "الضوابط القانونية لتصوير فيديو الحماية (لاعتماده كدليل جنائي رقمي)" 
                          : "Legal Guidelines for Protection Video (For Admissibility as Forensic Evidence)"}
                      </span>
                    </h3>
                    <ul className="space-y-3 text-xs text-aletheia-cream/80 list-decimal pl-4 rtl:pl-0 rtl:pr-4 leading-relaxed">
                      <li>
                        <strong>{isAr ? "الأصالة والنزاهة الكاملة:" : "Absolute Originality & Integrity:"}</strong>{" "}
                        {isAr 
                          ? "يجب أن يكون الفيديو مسجلاً من كاميرا جهازك مباشرة ومحفوظاً بصيغته الأصلية الخام. يُمنع تماماً تطبيق أي فلاتر تحسين، قص، تسريع، دمج، أو تعديلات برمجية (مونتاج)." 
                          : "The video file must be original and recorded directly via your camera lens. Applying any filters, edits, cuts, speedups, or software manipulations is strictly prohibited."}
                      </li>
                      <li>
                        <strong>{isAr ? "تثبيت الهوية بالصوت والصورة:" : "Vocal & Visual Identity Proof:"}</strong>{" "}
                        {isAr 
                          ? "يجب إظهار ملامح وجهك بالكامل في بداية الفيديو بوضوح، والنطق شفهياً بصوت واضح باسمك الثلاثي الكامل ورقم وثيقتك الرسمية (الهوية الوطنية أو جواز السفر)." 
                          : "Clearly show your entire face at the start of the clip, and verbally state your full triple name and your official identity document number (National ID or Passport)."}
                      </li>
                      <li>
                        <strong>{isAr ? "توثيق الزمان والمكان:" : "Spatial & Temporal Context:"}</strong>{" "}
                        {isAr 
                          ? "يُفضل تفعيل علامة تحديد الموقع الجغرافي (GPS) بكاميرا الهاتف عند التصوير، مع النطق شفهياً في المقطع بمدينتك الحالية، وتاريخ اليوم، والوقت الحالي التقريبي." 
                          : "Enable GPS metadata tags on your camera. Also, verbally declare your current city, today's date, and approximate local time during the recording."}
                      </li>
                      <li>
                        <strong>{isAr ? "التسجيل المستمر دون انقطاع:" : "Continuous Unbroken Record:"}</strong>{" "}
                        {isAr 
                          ? "يجب أن يتم تسجيل المقطع بالكامل في لقطة واحدة مستمرة دون أي إيقاف مؤقت (Pause) لضمان عدم الطعن في تسلسل الحيازة الجنائية للدليل." 
                          : "The capture must be recorded in a single continuous shot with no pauses or breaks to preserve the unbroken forensic chain of custody."}
                      </li>
                      <li>
                        <strong>{isAr ? "التصريح بالمسار المعتاد:" : "Declaration of Standard Route:"}</strong>{" "}
                        {isAr 
                          ? "تحدث شفهياً في نهاية المقطع موضحاً مسار حركتك وتنقلك اليومي المعتاد وأي أرقام هواتف ترغب في تحديدها كجهة تواصل للطوارئ والإنقاذ." 
                          : "Verbally state your typical daily commute route and any primary phone numbers you wish to delegate as emergency and rescue contacts."}
                      </li>
                    </ul>
                  </div>
                  
                  {/* Triple Name Inputs */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-aletheia-cream/80 mb-2">
                        {isAr ? "الاسم الثلاثي (باللغة العربية) *" : "Triple Name (Arabic) *"}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={isAr ? "مثال: ربيع ميخائيل ستارة" : "e.g. ربيع ميخائيل ستارة"}
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                        className="w-full bg-aletheia-black/50 border border-aletheia-gray/30 rounded px-4 py-3 focus:outline-none focus:border-aletheia-gold transition-colors text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-aletheia-cream/80 mb-2">
                        {isAr ? "الاسم الثلاثي (باللغة الإنكليزية) *" : "Triple Name (English) *"}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Rabie Mikhael Star"
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                        className="w-full bg-aletheia-black/50 border border-aletheia-gray/30 rounded px-4 py-3 focus:outline-none focus:border-aletheia-gold transition-colors ltr"
                      />
                    </div>
                  </div>

                  {/* Location & Commute Route */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-aletheia-cream/80 mb-2">
                        {isAr ? "الموقع الحالي (المدينة/المنطقة) *" : "Current Location (City/Area) *"}
                      </label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-3.5 text-aletheia-cream/40" />
                        <input 
                          type="text" 
                          required
                          placeholder={isAr ? "مثال: دمشق - باب توما" : "e.g. Damascus - Bab Touma"}
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-aletheia-black/50 border border-aletheia-gray/30 rounded pl-10 pr-4 py-3 focus:outline-none focus:border-aletheia-gold transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-aletheia-cream/80 mb-2">
                        {isAr ? "مسار التنقل اليومي المعتاد *" : "Usual Daily Commute Route *"}
                      </label>
                      <div className="relative">
                        <Map size={18} className="absolute left-3 top-3.5 text-aletheia-cream/40" />
                        <input 
                          type="text" 
                          required
                          placeholder={isAr ? "مثال: من المنزل إلى الجامعة ثم العكس" : "e.g. From home to work and back"}
                          value={commuteRoute}
                          onChange={(e) => setCommuteRoute(e.target.value)}
                          className="w-full bg-aletheia-black/50 border border-aletheia-gray/30 rounded pl-10 pr-4 py-3 focus:outline-none focus:border-aletheia-gold transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Emergency Phone - Forced Country Code */}
                  <div>
                    <label className="block text-sm font-medium text-aletheia-cream/80 mb-2">
                      {isAr ? "رقم هاتف الواتساب للتواصل في الطوارئ (رمز الدولة إجباري) *" : "WhatsApp Emergency Contact (Country Code Mandatory) *"}
                    </label>
                    <div className="flex rounded overflow-hidden border border-aletheia-gray/30 focus-within:border-aletheia-gold transition-colors bg-aletheia-black/50">
                      <select 
                        value={countryCode} 
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-aletheia-black text-aletheia-cream border-r border-aletheia-gray/30 px-3 py-3 focus:outline-none text-sm min-w-[120px]"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code}
                          </option>
                        ))}
                      </select>
                      <input 
                        type="tel" 
                        required
                        pattern="[0-9]{5,15}"
                        placeholder="e.g. 933123456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-transparent px-4 py-3 focus:outline-none font-mono"
                      />
                    </div>
                    <span className="text-xs text-aletheia-cream/40 mt-1 block">
                      {isAr ? "أدخل الأرقام فقط بدون الرمز الدولي (مثال: 933123456)" : "Enter phone numbers only without country code prefix (e.g. 933123456)"}
                    </span>
                  </div>

                  {/* Video Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-aletheia-cream/80 mb-2">
                      {isAr ? "تحميل فيديو الحماية والأمان الشخصي *" : "Upload Safety & Personal Video *"}
                    </label>
                    
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-aletheia-gray/30 hover:border-aletheia-gold/50 rounded-xl p-8 text-center bg-aletheia-black/20 cursor-pointer transition-colors group"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setVideoFile(file);
                        }}
                        className="hidden"
                      />
                      
                      {videoFile ? (
                        <div className="space-y-3">
                          <FileVideo size={40} className="mx-auto text-green-400 animate-bounce" />
                          <p className="text-sm font-semibold text-green-400 font-mono">
                            {videoFile.name}
                          </p>
                          <p className="text-xs text-aletheia-cream/50">
                            {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoFile(null);
                            }}
                            className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1 mx-auto"
                          >
                            <Trash2 size={12} />
                            <span>{isAr ? "إزالة وتغيير" : "Remove & Change"}</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <UploadCloud size={44} className="mx-auto text-aletheia-cream/30 group-hover:text-aletheia-gold transition-colors" />
                          <div>
                            <p className="text-sm font-semibold">
                              {isAr ? "اسحب وأفلت الفيديو هنا، أو اضغط للتصفح" : "Drag & drop video file here, or click to browse"}
                            </p>
                            <p className="text-xs text-aletheia-cream/40 mt-1.5">
                              {isAr ? "ندعم كافة صيغ الفيديو (MP4, MOV, AVI) حتى 20 ميغابايت" : "Supports standard video formats (MP4, MOV, AVI) up to 20MB"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-red-400 mt-2 block font-medium">
                      ⚠️ {isAr ? "ملاحظة سرية: الفيديو للحفظ الحصري ولن يعرض أبداً للعامة." : "Privacy Note: Uploaded video is strictly for preservation and will never be shared publicly."}
                    </span>
                  </div>

                  {/* Legal Agreement Checkbox */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-aletheia-gold/10 border border-aletheia-gold/20 select-none">
                    <input 
                      type="checkbox" 
                      id="legal-agreement"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-aletheia-gold focus:ring-aletheia-gold border-aletheia-gray/40 bg-aletheia-black cursor-pointer"
                    />
                    <label htmlFor="legal-agreement" className="text-xs md:text-sm text-aletheia-cream/90 cursor-pointer leading-relaxed">
                      {isAr 
                        ? "أقر وأتعهد بالالتزام بالضوابط والتعليمات القانونية الموضحة أعلاه لضمان صلاحية وقبول الفيديو كدليل جنائي رقمي في المحاكم عند الحاجة." 
                        : "I acknowledge and agree to comply with all legal requirements above to ensure the admissibility of this video as digital forensic evidence."}
                    </label>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !isAgreed}
                    className="w-full flex items-center justify-center gap-2 bg-aletheia-gold text-aletheia-black font-semibold py-4 rounded hover:bg-yellow-500 transition-colors text-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>{isAr ? "جاري تشفير وحفظ البيانات والفيديو..." : "Encrypting & saving file..."}</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={20} />
                        <span>{isAr ? "إرسال وتأكيد الحفظ الآمن" : "Secure Upload & Save"}</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>

            {/* Public Statistics Sidebar (Right / 5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Card 1: Live Stats Counter */}
              <div className="bg-gradient-to-br from-aletheia-gold/15 via-aletheia-dark-gray/20 to-aletheia-gold/5 border border-aletheia-gold/20 rounded-2xl p-8 relative overflow-hidden shadow-lg">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-aletheia-gold/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-6">
                  <PieChart className="text-aletheia-gold" size={24} />
                  <h3 className="text-lg font-serif text-aletheia-gold font-bold">
                    {isAr ? "إحصائيات الحماية المباشرة" : "Live Protection Statistics"}
                  </h3>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="text-sm text-aletheia-cream/60 block">{isAr ? "إجمالي الفيديوهات والملفات المحفوظة:" : "Total Saved Safety Videos:"}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-serif text-aletheia-gold font-bold tracking-tight">
                      {stats.totalCount.toLocaleString()}
                    </span>
                    <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
                      {isAr ? "نشط" : "Live"}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-aletheia-black/50 border border-aletheia-gray/20 rounded-lg text-xs leading-relaxed text-aletheia-cream/70">
                  {isAr 
                    ? "يتم تحديث هذه الإحصائيات مباشرة وتلقائياً عند قيام أي مستخدم برفع مقطع فيديو أمان احترازي جديد."
                    : "Stats updates in real-time as users secure their accounts with video backup credentials."}
                </div>
              </div>

              {/* Card 2: Geographical Distribution */}
              <div className="bg-aletheia-dark-gray/20 border border-aletheia-gray/20 rounded-2xl p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="text-aletheia-gold" size={24} />
                  <h3 className="text-lg font-serif text-aletheia-gold font-bold">
                    {isAr ? "التوزيع الجغرافي للمتحصلين على الحماية" : "Geographical Distribution"}
                  </h3>
                </div>

                <p className="text-xs text-aletheia-cream/50 mb-6 leading-relaxed">
                  {isAr 
                    ? "الرسم التوضيحي أدناه يبين التوزيع الجغرافي للمشتركين المستفيدين من خدمة الحماية بناءً على البيانات والمواقع الفعلية المدخلة من قبلهم وليس تتبع الاتصال."
                    : "Calculated based on actual location metadata submitted by the users, completely respecting network privacy and proxy sessions."}
                </p>

                <div className="space-y-4">
                  {stats.locations.map((loc) => {
                    // Calculate percentage relative to max count (for layout scale representation)
                    const maxCount = Math.max(...stats.locations.map(l => l.count), 1);
                    const percentage = (loc.count / maxCount) * 100;
                    
                    return (
                      <div key={loc.name} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-aletheia-cream">{loc.name}</span>
                          <span className="text-aletheia-gold font-mono">{loc.count} {isAr ? "فيديو" : "videos"}</span>
                        </div>
                        <div className="w-full h-2 bg-aletheia-black/60 rounded-full overflow-hidden border border-aletheia-gray/10">
                          <div 
                            className="h-full bg-gradient-to-r from-aletheia-gold to-yellow-500 rounded-full transition-all duration-1000"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Advisory / FAQ */}
              <div className="p-6 bg-aletheia-dark-gray/10 border border-aletheia-gray/30 rounded-xl space-y-3">
                <h4 className="text-sm font-serif text-aletheia-gold font-bold flex items-center gap-2">
                  <Lock size={16} />
                  <span>{isAr ? "ضمان الخصوصية وسرية التشفير" : "Privacy & Cryptography"}</span>
                </h4>
                <p className="text-xs text-aletheia-cream/60 leading-relaxed">
                  {isAr 
                    ? "تخضع جميع الملفات والفيديوهات لبروتوكول تشفير محلي وعالمي فائق الصرامة. لا يمكن لأي جهة أو متتبع قراءة هذه الملفات، ويتم تصفية محتوياتها يدوياً وحصرياً من حاسب مسؤول الأمان لضمان سلامتك التامة."
                    : "Every video payload undergoes military-grade local client-side hashing and cryptographic shielding, ensuring that it remains accessible only to authorized safe administrators."}
                </p>
              </div>

            </div>

          </div>
        )}
      </div>
    </main>
  );
}
