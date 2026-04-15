import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  CalendarCheck2,
  ClipboardList,
  Zap,
  CircleUserRound,
  Clock3,
  Star,
  X,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Menu,
} from "lucide-react";
import { supabase } from "./supabase";
export default function Time4TherapyFullSite() {
  const [route, setRoute] = useState("home");
  const [therapy, setTherapy] = useState("");
  const [location, setLocation] = useState("");
  const [dateLabel, setDateLabel] = useState("Elke datum");
  const [timeLabel, setTimeLabel] = useState("");
  const [openPanel, setOpenPanel] = useState(null);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [bookingPractice, setBookingPractice] = useState(null);
  const [bookingTreatment, setBookingTreatment] = useState("");
  const [bookingDay, setBookingDay] = useState("Vandaag");
  const [bookingTime, setBookingTime] = useState("10:00");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const [practiceName, setPracticeName] = useState("");
  const [practiceContactName, setPracticeContactName] = useState("");
  const [practiceEmail, setPracticeEmail] = useState("");
  const [practiceCity, setPracticeCity] = useState("");
  const [practiceMessage, setPracticeMessage] = useState("");
  const [practiceLoading, setPracticeLoading] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const therapies = [
    {
      title: "Chiropractie",
      description: "Gericht op rug, nek en houding",
      longDescription:
        "Chiropractie richt zich op de wervelkolom, houding en bewegingspatronen. Veel mensen kiezen hiervoor bij rug-, nek- of houdingsklachten.",
      image:
        "https://posture-works.com/wp-content/uploads/2023/01/understanding-different-types-of-chiropractic-treatment-1.jpg",
      objectPosition: "center center",
    },
    {
      title: "Osteopathie",
      description: "Manuele behandeling van het lichaam als geheel",
      longDescription:
        "Osteopathie kijkt naar het lichaam als geheel en richt zich op bewegelijkheid, spanning en samenhang tussen verschillende systemen in het lichaam.",
      image:
        "https://atenamc.ro/wp-content/uploads/2023/05/Osteopatie-Atena-1024x683.jpg",
      objectPosition: "center center",
    },
    {
      title: "Podotherapie",
      description: "Voor voeten, houding en beweging",
      longDescription:
        "Podotherapie helpt bij klachten aan voeten, enkels, knieën en houding. Vaak spelen looppatroon en belasting hierbij een grote rol.",
      image:
        "https://podotherapeut.nl/wp-content/uploads/2023/08/Wat-doet-een-podotherapeut.jpg",
      objectPosition: "center center",
    },
    {
      title: "Acupunctuur",
      description: "Behandeling met fijne naalden",
      longDescription:
        "Acupunctuur wordt vaak ingezet bij spanning, pijnklachten en herstel, met een rustige en laagdrempelige benadering.",
      image:
        "https://www.wellnessacademie.com/wp-content/uploads/2020/02/TCM-accupunctuur-scaled.jpg",
      objectPosition: "center center",
    },
    {
      title: "Massagetherapie",
      description: "Ontspanning en vermindering van spierspanning",
      longDescription:
        "Massagetherapie helpt bij ontspanning, stressreductie en het verminderen van spierspanning en vastzittende spieren.",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
      objectPosition: "center center",
    },
  ];

  const cities = [
    "Amsterdam",
    "Rotterdam",
    "Den Haag",
    "Utrecht",
    "Eindhoven",
    "Haarlem",
    "Leiden",
  ];

  const practices = [
    {
      name: "Amsterdam Rugkliniek",
      city: "Amsterdam",
      area: "Oud-Zuid",
      therapy: "Chiropractie",
      rating: 4.8,
      reviews: 124,
      priceFrom: 69,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      description: "Voor rug-, nek- en houdingsklachten met snelle online boeking.",
      treatments: ["Intake chiropractie", "Vervolgbehandeling", "Houdingscheck"],
      specialties: ["Rug", "Nek", "Houding", "Sportherstel"],
      address: "Cornelis Schuytstraat 18, Amsterdam",
      openingHours: [
        "Maandag 08:30 - 18:00",
        "Dinsdag 08:30 - 20:00",
        "Woensdag 08:30 - 18:00",
        "Donderdag 08:30 - 20:00",
        "Vrijdag 08:30 - 17:00",
      ],
    },
    {
      name: "Rotterdam Acu Center",
      city: "Rotterdam",
      area: "Centrum",
      therapy: "Acupunctuur",
      rating: 4.9,
      reviews: 89,
      priceFrom: 49,
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
      description: "Rustige praktijk gespecialiseerd in acupunctuur voor balans en herstel.",
      treatments: ["Acupunctuur intake", "Vervolg acupunctuur", "Ontspanningssessie"],
      specialties: ["Balans", "Herstel", "Spanning", "Ontspanning"],
      address: "Westblaak 92, Rotterdam",
      openingHours: [
        "Maandag 09:00 - 17:30",
        "Dinsdag 09:00 - 17:30",
        "Woensdag 09:00 - 21:00",
        "Vrijdag 09:00 - 17:00",
      ],
    },
    {
      name: "Den Haag Podo Studio",
      city: "Den Haag",
      area: "Benoordenhout",
      therapy: "Podotherapie",
      rating: 4.7,
      reviews: 63,
      priceFrom: 42,
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      description: "Persoonlijke praktijk voor voet-, houding- en bewegingsklachten.",
      treatments: ["Podotherapie intake", "Controle afspraak", "Voetanalyse"],
      specialties: ["Voeten", "Houding", "Sport", "Zolen"],
      address: "Van Alkemadelaan 54, Den Haag",
      openingHours: [
        "Maandag 08:00 - 17:00",
        "Dinsdag 08:00 - 17:00",
        "Donderdag 08:00 - 20:00",
        "Vrijdag 08:00 - 16:00",
      ],
    },
    {
      name: "Utrecht Body Balance",
      city: "Utrecht",
      area: "Wittevrouwen",
      therapy: "Massagetherapie",
      rating: 4.8,
      reviews: 101,
      priceFrom: 58,
      image:
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
      description: "Kleinschalige praktijk voor ontspanning, herstel en behandeling.",
      treatments: ["Massagetherapie", "Dieptemassage", "Herstelmassage"],
      specialties: ["Ontspanning", "Herstel", "Spieren", "Stress"],
      address: "Biltstraat 126, Utrecht",
      openingHours: [
        "Maandag 10:00 - 19:00",
        "Woensdag 10:00 - 21:00",
        "Donderdag 10:00 - 19:00",
        "Zaterdag 09:00 - 14:00",
      ],
    },
    {
      name: "Haarlem Osteo Huis",
      city: "Haarlem",
      area: "Centrum",
      therapy: "Osteopathie",
      rating: 4.9,
      reviews: 76,
      priceFrom: 75,
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
      description: "Integrale behandeling van het lichaam als geheel met persoonlijke aanpak.",
      treatments: ["Osteopathie consult", "Vervolgbehandeling", "Mobiliteitssessie"],
      specialties: ["Mobiliteit", "Balans", "Herstel", "Lichaam als geheel"],
      address: "Gedempte Oude Gracht 77, Haarlem",
      openingHours: [
        "Maandag 09:00 - 18:00",
        "Woensdag 09:00 - 18:00",
        "Vrijdag 09:00 - 18:00",
        "Zaterdag 09:00 - 13:00",
      ],
    },
  ];

  const benefits = [
    {
      title: "Snel een afspraak geregeld",
      text: "Vind snel wat bij jou past.",
      icon: <Zap className="h-6 w-6" />,
      accent: "bg-[#FFF4E8] text-[#FB7710]",
    },
    {
      title: "Vergelijk praktijken",
      text: "Overzichtelijk en duidelijk.",
      icon: <ClipboardList className="h-6 w-6" />,
      accent: "bg-[#EEF3FF] text-[#1B4292]",
    },
    {
      title: "Direct online boeken",
      text: "Kies een moment en plan.",
      icon: <CalendarCheck2 className="h-6 w-6" />,
      accent: "bg-[#FFF4E8] text-[#FB7710]",
    },
  ];

  const faqs = [
    {
      q: "Kan ik direct online boeken?",
      a: "Ja, bij aangesloten praktijken kun je direct online een afspraak plannen.",
    },
    {
      q: "Betaal ik extra via Time4Therapy?",
      a: "Nee, zoeken en boeken via het platform is voor gebruikers gratis.",
    },
    {
      q: "Kan ik zoeken op stad of regio?",
      a: "Ja, je kunt zoeken op therapie en locatie om snel een passende praktijk te vinden.",
    },
    {
      q: "Kan mijn praktijk zich aanmelden?",
      a: "Ja, praktijken kunnen zich aanmelden om zichtbaar te worden en online aanvragen of afspraken te ontvangen.",
    },
  ];

  const popularSearches = [
    "Chiropractie",
    "Osteopathie",
    "Acupunctuur",
    "Podotherapie",
    "Massage",
  ];

  const filteredPopular = useMemo(() => {
    if (!therapy.trim()) return popularSearches;
    return popularSearches.filter((item) =>
      item.toLowerCase().includes(therapy.toLowerCase())
    );
  }, [therapy]);

  const searchResults = useMemo(() => {
    return practices.filter((practice) => {
      const therapyMatch = !therapy.trim()
        ? true
        : practice.therapy.toLowerCase().includes(therapy.toLowerCase()) ||
          practice.name.toLowerCase().includes(therapy.toLowerCase()) ||
          practice.treatments.some((item) => item.toLowerCase().includes(therapy.toLowerCase()));

      const locationMatch = !location.trim()
        ? true
        : location === "Huidige locatie"
          ? true
          : practice.city.toLowerCase().includes(location.toLowerCase());

      return therapyMatch && locationMatch;
    });
  }, [therapy, location]);

  const chooseDate = (value) => {
    setDateLabel(value);
    if (value === "Elke datum") {
      setTimeLabel("");
    }
  };

  const chooseLocation = (value) => {
    setLocation(value === "Huidige locatie" ? "Huidige locatie" : value);
    setOpenPanel(null);
  };

  const handleSearch = (goToResultsPage = false) => {
    setSearchSubmitted(true);
    setOpenPanel(null);
    if (goToResultsPage) {
      setRoute("results");
    }
  };

  const handleOpenBooking = (practice) => {
    setBookingPractice(practice);
    setBookingTreatment(practice.treatments[0] || "");
    setBookingDay(dateLabel === "Elke datum" ? "Vandaag" : dateLabel);
    setBookingTime(timeLabel || "10:00");
    setBookingConfirmed(false);
  };

    const handleConfirmBooking = async () => {
    if (!supabase) {
      alert("Supabase is nog niet gekoppeld.");
      return;
    }

    if (!bookingName.trim() || !bookingEmail.trim()) {
      alert("Vul minimaal naam en e-mailadres in.");
      return;
    }

    setBookingLoading(true);

    const { error } = await supabase.from("bookings").insert({
      practice_name: bookingPractice?.name ?? null,
      practice_city: bookingPractice?.city ?? null,
      therapy_type: bookingPractice?.therapy ?? null,
      treatment_name: bookingTreatment || null,
      booking_day_label: bookingDay || null,
      booking_time_label: bookingTime || null,
      customer_name: bookingName,
      customer_email: bookingEmail,
      customer_phone: bookingPhone || null,
      status: "new",
    });

    setBookingLoading(false);

    if (error) {
      alert("Opslaan van boeking mislukt.");
      return;
    }

    setBookingConfirmed(true);
    setBookingName("");
    setBookingEmail("");
    setBookingPhone("");
  };
const handlePracticeSignup = async () => {
  if (!supabase) {
    alert("Supabase is nog niet gekoppeld.");
    return;
  }

  if (!practiceName.trim() || !practiceContactName.trim() || !practiceEmail.trim()) {
    alert("Vul minimaal praktijknaam, contactpersoon en e-mailadres in.");
    return;
  }

  setPracticeLoading(true);

  const { error } = await supabase.from("practice_signups").insert({
    practice_name: practiceName,
    contact_name: practiceContactName,
    email: practiceEmail,
    city: practiceCity || null,
    message: practiceMessage || null,
    status: "new",
  });

  setPracticeLoading(false);

  if (error) {
    alert("Aanmelding opslaan mislukt.");
    return;
  }

  setLeadSubmitted(true);
  setPracticeName("");
  setPracticeContactName("");
  setPracticeEmail("");
  setPracticeCity("");
  setPracticeMessage("");
};
  const goHome = () => {
    setRoute("home");
    setMobileMenuOpen(false);
    setOpenPanel(null);
  };

  const goToRoute = (nextRoute) => {
    setRoute(nextRoute);
    setMobileMenuOpen(false);
    setOpenPanel(null);
  };

  const openResultsForTherapy = (title) => {
    setTherapy(title);
    setSearchSubmitted(true);
    setRoute("results");
    setMobileMenuOpen(false);
    setOpenPanel(null);
  };

  const openResultsForCity = (city) => {
    setLocation(city);
    setSearchSubmitted(true);
    setRoute("results");
    setMobileMenuOpen(false);
    setOpenPanel(null);
  };

  const openPracticePage = (practice) => {
    setSelectedPractice(practice);
    setRoute("practice");
    setOpenPanel(null);
  };

  const Header = () => (
    <>
      <header className="sticky top-0 z-50 border-b border-[#e7ddd1] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex rounded-full border border-[#e7ddd1] p-2 text-[#1f2937] md:hidden"
              aria-label="Menu openen"
            >
              <Menu className="h-6 w-6" />
            </button>

            <button onClick={goHome} className="flex items-center text-left">
              <div className="relative h-12 w-[185px] overflow-hidden bg-white md:h-16 md:w-[220px] lg:h-20 lg:w-[300px]">
                <img
                  src="https://i.imgur.com/boyfLDS.jpeg"
                  alt="Time4therapy logo"
                  className="absolute max-w-none"
                  style={{ width: "420px", left: "-100px", top: "-92px" }}
                />
              </div>
            </button>
          </div>

          <nav className="hidden items-center gap-10 text-[15px] font-medium md:flex">
            <button onClick={goHome} className={`pb-1 ${route === "home" ? "border-b-2 border-[#FB7710] text-[#1f2937]" : "text-[#1f2937] hover:text-[#1B4292]"}`}>
              Home
            </button>
            <button onClick={() => setRoute("therapies")} className="text-[#1f2937] hover:text-[#1B4292]">
              Therapieën
            </button>
            <button onClick={() => setRoute("cities")} className="text-[#1f2937] hover:text-[#1B4292]">
              Steden
            </button>
            <button onClick={() => setRoute("for-practices")} className="text-[#1f2937] hover:text-[#1B4292]">
              Voor praktijken
            </button>
            <button onClick={() => setRoute("about")} className="text-[#1f2937] hover:text-[#1B4292]">
              Over ons
            </button>
            <button onClick={() => setRoute("faq")} className="text-[#1f2937] hover:text-[#1B4292]">
              FAQ
            </button>
            <button onClick={() => setRoute("contact")} className="text-[#1f2937] hover:text-[#1B4292]">
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <button className="hidden rounded-full p-2 text-[#4b5563] md:inline-flex" aria-label="Profiel">
              <CircleUserRound className="h-6 w-6" />
            </button>
            <button onClick={() => goToRoute("results")} className="rounded-full bg-[#FB7710] px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#E96A0A] md:px-7">
              Boek nu
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-black/40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="h-full w-[84%] max-w-[340px] bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <div className="text-lg font-semibold text-[#1f2937]">Menu</div>
              <button onClick={() => setMobileMenuOpen(false)} className="rounded-full border border-[#e7ddd1] p-2 text-[#6b7280]">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button onClick={goHome} className="block w-full rounded-2xl px-4 py-3 text-left text-[16px] font-medium text-[#1f2937] hover:bg-[#f7f1e8]">Home</button>
              <button onClick={() => goToRoute("therapies")} className="block w-full rounded-2xl px-4 py-3 text-left text-[16px] font-medium text-[#1f2937] hover:bg-[#f7f1e8]">Therapieën</button>
              <button onClick={() => goToRoute("cities")} className="block w-full rounded-2xl px-4 py-3 text-left text-[16px] font-medium text-[#1f2937] hover:bg-[#f7f1e8]">Steden</button>
              <button onClick={() => goToRoute("for-practices")} className="block w-full rounded-2xl px-4 py-3 text-left text-[16px] font-medium text-[#1f2937] hover:bg-[#f7f1e8]">Voor praktijken</button>
              <button onClick={() => goToRoute("about")} className="block w-full rounded-2xl px-4 py-3 text-left text-[16px] font-medium text-[#1f2937] hover:bg-[#f7f1e8]">Over ons</button>
              <button onClick={() => goToRoute("faq")} className="block w-full rounded-2xl px-4 py-3 text-left text-[16px] font-medium text-[#1f2937] hover:bg-[#f7f1e8]">FAQ</button>
              <button onClick={() => goToRoute("contact")} className="block w-full rounded-2xl px-4 py-3 text-left text-[16px] font-medium text-[#1f2937] hover:bg-[#f7f1e8]">Contact</button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const SearchBar = () => (
    <div className="relative mt-8 w-full max-w-5xl">
      <div className="rounded-[28px] bg-[#fffdfa] p-4 shadow-lg">
        <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_0.8fr_auto] md:items-center">
          <button type="button" onClick={() => setOpenPanel(openPanel === "therapy" ? null : "therapy")} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left shadow-sm md:bg-transparent md:shadow-none">
            <Search className="h-6 w-6 text-[#7b8794]" />
            <span className={`text-[17px] ${therapy ? "text-[#1f2937]" : "text-[#7b8794]"}`}>
              {therapy || "Welke therapie zoek je?"}
            </span>
          </button>

          <button type="button" onClick={() => setOpenPanel(openPanel === "location" ? null : "location")} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left shadow-sm md:rounded-none md:border-l md:border-[#e7ddd1] md:bg-transparent md:shadow-none">
            <MapPin className="h-6 w-6 text-[#7b8794]" />
            <span className={`text-[17px] ${location ? "text-[#1f2937]" : "text-[#7b8794]"}`}>
              {location || "In welke stad of regio?"}
            </span>
          </button>

          <button type="button" onClick={() => setOpenPanel(openPanel === "date" ? null : "date")} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left shadow-sm md:rounded-none md:border-l md:border-[#e7ddd1] md:bg-transparent md:shadow-none">
            <CalendarCheck2 className="h-6 w-6 text-[#7b8794]" />
            <span className={`${dateLabel !== "Elke datum" ? "text-[#1f2937]" : "text-[#7b8794]"} text-[17px]`}>
              {dateLabel}
            </span>
          </button>

          <button onClick={() => handleSearch(route !== "home")} className="rounded-full bg-[#FB7710] px-7 py-4 text-lg font-semibold text-white transition hover:bg-[#E96A0A]">
            Zoek afspraak <ArrowRight className="ml-2 inline h-6 w-6" />
          </button>
        </div>
      </div>

      {openPanel === "therapy" && (
        <>
          <div className="absolute left-0 top-[calc(100%+14px)] z-40 hidden w-full max-w-[430px] rounded-[28px] bg-[#fffdfa] p-6 shadow-2xl md:block">
            <div className="flex items-center gap-3 rounded-[18px] border border-[#1B4292] px-4 py-3">
              <Search className="h-5 w-5 text-[#7b8794]" />
              <input autoFocus value={therapy} onChange={(e) => setTherapy(e.target.value)} className="w-full bg-transparent text-[16px] text-[#1f2937] outline-none placeholder:text-[#9aa3b2]" placeholder="Behandelingen zoeken" />
            </div>
            <div className="mt-6">
              <div className="text-[15px] font-semibold text-[#1f2937]">Recente zoekopdrachten</div>
              <button type="button" onClick={() => { setTherapy("Massagetherapie"); setOpenPanel(null); }} className="mt-4 block text-[16px] text-slate-700">
                Massagetherapie
              </button>
            </div>
            <div className="mt-6">
              <div className="text-[15px] font-semibold text-[#1f2937]">Populaire zoekopdrachten</div>
              <div className="mt-4 flex flex-wrap gap-3">
                {filteredPopular.map((item) => (
                  <button key={item} type="button" onClick={() => { setTherapy(item); setOpenPanel(null); }} className="rounded-full border border-[#b7c3df] px-4 py-2 text-[15px] text-slate-700">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="fixed inset-0 z-[80] bg-black/35 md:hidden" onClick={() => setOpenPanel(null)}>
            <div className="absolute left-4 right-4 top-[92px] rounded-[28px] bg-[#fffdfa] p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-[22px] font-semibold text-[#1f2937]">Zoek therapie</div>
                <button onClick={() => setOpenPanel(null)} className="rounded-full border border-[#e7ddd1] p-2 text-[#6b7280]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-3 rounded-[18px] border border-[#1B4292] px-4 py-3">
                <Search className="h-5 w-5 text-[#7b8794]" />
                <input autoFocus value={therapy} onChange={(e) => setTherapy(e.target.value)} className="w-full bg-transparent text-[16px] text-[#1f2937] outline-none placeholder:text-[#9aa3b2]" placeholder="Behandelingen zoeken" />
              </div>
              <div className="mt-6">
                <div className="text-[15px] font-semibold text-[#1f2937]">Recente zoekopdrachten</div>
                <button type="button" onClick={() => { setTherapy("Massagetherapie"); setOpenPanel(null); }} className="mt-4 block text-[16px] text-slate-700">
                  Massagetherapie
                </button>
              </div>
              <div className="mt-6">
                <div className="text-[15px] font-semibold text-[#1f2937]">Populaire zoekopdrachten</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {filteredPopular.map((item) => (
                    <button key={item} type="button" onClick={() => { setTherapy(item); setOpenPanel(null); }} className="rounded-full border border-[#b7c3df] px-4 py-2 text-[15px] text-slate-700">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {openPanel === "location" && (
        <>
          <div className="absolute left-0 top-[calc(100%+14px)] z-40 hidden w-full max-w-[430px] rounded-[28px] bg-[#fffdfa] p-6 shadow-2xl md:block">
            <div className="text-[15px] font-semibold text-[#1f2937]">Kies locatie</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {["Huidige locatie", ...cities].map((item) => (
                <button key={item} type="button" onClick={() => chooseLocation(item)} className="rounded-full border px-4 py-2 text-[15px] text-slate-700" style={{ borderColor: item === "Huidige locatie" ? "#1B4292" : "#d7ddea" }}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="fixed inset-0 z-[80] bg-black/35 md:hidden" onClick={() => setOpenPanel(null)}>
            <div className="absolute left-4 right-4 top-[92px] rounded-[28px] bg-[#fffdfa] p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-[22px] font-semibold text-[#1f2937]">Kies locatie</div>
                <button onClick={() => setOpenPanel(null)} className="rounded-full border border-[#e7ddd1] p-2 text-[#6b7280]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Huidige locatie", ...cities].map((item) => (
                  <button key={item} type="button" onClick={() => chooseLocation(item)} className="rounded-full border px-4 py-2 text-[15px] text-slate-700" style={{ borderColor: item === "Huidige locatie" ? "#1B4292" : "#d7ddea" }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {openPanel === "date" && (
        <>
          <div className="absolute left-0 top-[calc(100%+14px)] z-40 hidden w-full max-w-[470px] rounded-[28px] bg-[#fffdfa] p-6 shadow-2xl md:block">
            <div className="flex items-center gap-2 text-[15px] font-semibold text-[#1f2937]">
              <CalendarCheck2 className="h-5 w-5" /> Kies datum
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["Elke datum", "Vandaag", "Morgen", "Deze week"].map((item) => (
                <button key={item} type="button" onClick={() => chooseDate(item)} className={`rounded-[16px] border px-4 py-3 text-[15px] font-medium ${dateLabel === item ? "bg-[#EEF3FF] text-[#1B4292]" : "text-slate-700"}`} style={{ borderColor: dateLabel === item ? "#1B4292" : "#e7ddd1" }}>
                  {item}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => chooseDate("Kies datum") } className="mt-3 w-full rounded-[16px] border border-[#e7ddd1] px-4 py-3 text-[15px] text-slate-700">
              Kies datum...
            </button>
            {dateLabel !== "Elke datum" && (
              <>
                <div className="mt-6 flex items-center gap-2 text-[15px] font-semibold text-[#1f2937]">
                  <Clock3 className="h-5 w-5" /> Kies tijd
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {["09:00", "10:30", "14:00", "16:30"].map((item) => (
                    <button key={item} type="button" onClick={() => setTimeLabel(item)} className={`rounded-[16px] border px-4 py-3 text-[15px] font-medium ${timeLabel === item ? "bg-[#EEF3FF] text-[#1B4292]" : "text-slate-700"}`} style={{ borderColor: timeLabel === item ? "#1B4292" : "#e7ddd1" }}>
                      {item}
                    </button>
                  ))}
                </div>
              </>
            )}
            <button type="button" onClick={() => setOpenPanel(null)} className="mt-5 w-full rounded-[16px] bg-[#14336F] px-4 py-4 text-base font-semibold text-white">
              Toepassen
            </button>
          </div>

          <div className="fixed inset-0 z-[80] bg-black/35 md:hidden" onClick={() => setOpenPanel(null)}>
            <div className="absolute left-4 right-4 top-[92px] rounded-[28px] bg-[#fffdfa] p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-[22px] font-semibold text-[#1f2937]">Kies datum</div>
                <button onClick={() => setOpenPanel(null)} className="rounded-full border border-[#e7ddd1] p-2 text-[#6b7280]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Elke datum", "Vandaag", "Morgen", "Deze week"].map((item) => (
                  <button key={item} type="button" onClick={() => chooseDate(item)} className={`rounded-[16px] border px-4 py-3 text-[15px] font-medium ${dateLabel === item ? "bg-[#EEF3FF] text-[#1B4292]" : "text-slate-700"}`} style={{ borderColor: dateLabel === item ? "#1B4292" : "#e7ddd1" }}>
                    {item}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => chooseDate("Kies datum") } className="mt-3 w-full rounded-[16px] border border-[#e7ddd1] px-4 py-3 text-[15px] text-slate-700">
                Kies datum...
              </button>
              {dateLabel !== "Elke datum" && (
                <>
                  <div className="mt-6 flex items-center gap-2 text-[15px] font-semibold text-[#1f2937]">
                    <Clock3 className="h-5 w-5" /> Kies tijd
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {["09:00", "10:30", "14:00", "16:30"].map((item) => (
                      <button key={item} type="button" onClick={() => setTimeLabel(item)} className={`rounded-[16px] border px-4 py-3 text-[15px] font-medium ${timeLabel === item ? "bg-[#EEF3FF] text-[#1B4292]" : "text-slate-700"}`} style={{ borderColor: timeLabel === item ? "#1B4292" : "#e7ddd1" }}>
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <button type="button" onClick={() => setOpenPanel(null)} className="mt-5 w-full rounded-[16px] bg-[#14336F] px-4 py-4 text-base font-semibold text-white">
                Toepassen
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const ResultsList = () => (
    <div className="grid gap-5">
      {searchResults.length === 0 ? (
        <div className="rounded-[24px] bg-[#fffdfa] p-8 shadow-sm ring-1 ring-[#e7ddd1]">
          <h3 className="text-[22px] font-semibold">Geen resultaten gevonden</h3>
          <p className="mt-3 text-[#6b7280]">Probeer een andere therapie of stad.</p>
        </div>
      ) : (
        searchResults.map((practice) => (
          <div key={practice.name} className="overflow-hidden rounded-[24px] bg-[#fffdfa] shadow-sm ring-1 ring-[#e7ddd1]">
            <div className="grid lg:grid-cols-[280px_1fr]">
              <div className="h-56 bg-[#f2ece4] lg:h-full">
                <img src={practice.image} alt={practice.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6 md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#6b7280]">
                      <span className="rounded-full bg-[#FFF4E8] px-3 py-1 font-medium text-[#FB7710]">Vanaf €{practice.priceFrom}</span>
                      <span>{practice.therapy}</span>
                    </div>
                    <h3 className="mt-3 text-[26px] font-semibold">{practice.name}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#6b7280]">
                      <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-[#FB7710] text-[#FB7710]" /><span className="font-medium text-[#1f2937]">{practice.rating}</span><span>({practice.reviews} reviews)</span></div>
                      <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{practice.city} • {practice.area}</span></div>
                    </div>
                    <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#6b7280]">{practice.description}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => openPracticePage(practice)} className="rounded-full border border-[#e7ddd1] px-6 py-3 text-sm font-semibold text-[#1B4292]">
                      Bekijk praktijk
                    </button>
                    <button onClick={() => handleOpenBooking(practice)} className="rounded-full bg-[#FB7710] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E96A0A]">
                      Boek afspraak
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const HomePage = () => (
    <>
      <section className="relative">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=80" alt="Rustige therapie behandeling" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B4292]/78 via-[#1B4292]/48 to-transparent" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 pb-24 pt-14 md:px-6 md:pt-20 lg:pb-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-white/20 bg-[#fffdfa]/10 px-4 py-2 text-sm font-medium text-white/90">Vind • Vergelijk • Boek</div>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">Boek jouw therapie direct online</h1>
            <p className="mt-4 max-w-lg text-base text-white/80 md:text-lg">Vind snel een passende praktijk en plan meteen een afspraak.</p>
          </div>
          <SearchBar />
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85 md:text-base"><div>✓ Eén platform</div><div>✓ Snel vergelijken</div><div>✓ Meteen boeken</div></div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 md:px-6">
        <div className="grid gap-3 rounded-[24px] bg-[#fffdfa] p-5 shadow-md md:grid-cols-3">
          {benefits.map((item) => (
            <div key={item.title} className="flex items-center gap-4 rounded-2xl px-3 py-2 md:border-r md:border-[#e7ddd1] md:last:border-r-0">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.accent}`}>{item.icon}</div>
              <div><h3 className="text-[18px] font-semibold leading-tight">{item.title}</h3><p className="mt-1 text-[15px] text-[#6b7280]">{item.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {searchSubmitted && (
        <section id="zoekresultaten" className="mx-auto max-w-7xl px-4 pb-6 pt-12 md:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[30px] font-semibold">Zoekresultaten</h2>
              <p className="mt-2 text-[#6b7280]">
                {searchResults.length} praktijk(en) gevonden{therapy ? ` voor ${therapy}` : ""}{location && location !== "Huidige locatie" ? ` in ${location}` : ""}
              </p>
            </div>
          </div>
          <ResultsList />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-12 md:px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-[28px] font-semibold md:text-[34px]">Populaire therapieën</h2>
          <button onClick={() => setRoute("therapies")} className="text-[18px] font-medium text-[#FB7710] hover:text-orange-600">Bekijk alle therapieën <ArrowRight className="ml-1 inline h-5 w-5" /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {therapies.map((therapyItem) => (
            <div key={therapyItem.title} className="overflow-hidden rounded-[22px] bg-[#fffdfa] shadow-sm ring-1 ring-[#e7ddd1] transition hover:-translate-y-1 hover:shadow-md">
              <div className="h-32 w-full overflow-hidden bg-[#f2ece4]"><img src={therapyItem.image} alt={therapyItem.title} className="h-full w-full object-cover" style={{ objectPosition: therapyItem.objectPosition }} /></div>
              <div className="p-6">
                <h3 className="text-[18px] font-semibold leading-tight">{therapyItem.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-[#6b7280]">{therapyItem.description}</p>
                <div className="mt-5 flex justify-end">
                  <button onClick={() => openResultsForTherapy(therapyItem.title)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF4E8] text-[#FB7710]">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-[28px] font-semibold md:text-[34px]">Vind een praktijk in jouw stad</h2>
          <div className="flex flex-wrap items-center gap-3">
            {cities.map((city) => (
              <button key={city} onClick={() => openResultsForCity(city)} className="rounded-full bg-[#fffdfa] px-6 py-3 text-[16px] font-medium text-[#4b5563] shadow-sm ring-1 ring-[#e7ddd1] transition hover:text-[#1B4292]">{city}</button>
            ))}
            <button onClick={() => setRoute("cities")} className="rounded-full bg-[#1B4292] px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-[#14336F]">Bekijk alle steden <ArrowRight className="ml-1 inline h-5 w-5" /></button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[26px] bg-[#fffdfa] shadow-sm ring-1 ring-[#e7ddd1] lg:grid lg:grid-cols-[1fr_0.9fr]">
            <div className="p-8 md:p-10">
              <h2 className="max-w-md text-[34px] font-semibold leading-tight">Een passende therapie vinden hoeft niet moeilijk te zijn</h2>
              <p className="mt-5 max-w-lg text-[19px] leading-8 text-[#6b7280]">Vergelijk praktijken en boek direct online een afspraak op een moment dat jou uitkomt.</p>
              <div className="mt-8 flex items-center gap-3 text-[18px] font-medium text-[#1f2937]"><span className="text-[#1f2937]">●</span>Door heel Nederland</div>
              <div className="mt-3 flex items-center gap-3 text-[18px] font-medium text-[#1f2937]"><span className="text-[#FB7710]">●</span>Snel en overzichtelijk</div>
            </div>
            <div className="relative min-h-[280px] bg-[#f2ece4]"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80" alt="Therapeut aan het werk" className="h-full w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-2xl bg-[#fffdfa] px-5 py-4 shadow-lg"><div className="text-[18px] font-semibold text-[#1f2937]">86% van de bezoekers</div><div className="mt-1 text-[15px] text-[#4b5563]">boekt binnen 1 week</div><div className="mt-3 h-2 w-40 rounded-full bg-[#eadfce]"><div className="h-2 w-[86%] rounded-full bg-[#1B4292]" /></div></div></div>
          </div>
          <div className="rounded-[26px] bg-[#f6f1ea] p-8 shadow-sm ring-1 ring-[#e7ddd1] md:p-9">
            <h3 className="text-[34px] font-semibold leading-tight">Ben jij een praktijk?</h3>
            <ul className="mt-6 space-y-4 text-[19px] text-[#4b5563]"><li>✓ Meer cliënten bereiken</li><li>✓ Online afspraken ontvangen</li><li>✓ Professioneel zichtbaar</li></ul>
            <button onClick={() => setRoute("for-practices")} className="mt-8 rounded-full bg-[#1B4292] px-7 py-4 text-[18px] font-semibold text-white transition hover:bg-[#14336F]">Meld je praktijk aan <ArrowRight className="ml-1 inline h-5 w-5" /></button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.slice(0, 2).map((item) => (
            <div key={item.q} className="rounded-[24px] bg-[#fffdfa] p-6 shadow-sm ring-1 ring-[#e7ddd1]"><h3 className="text-[20px] font-semibold leading-tight">{item.q}</h3><p className="mt-3 text-[16px] leading-7 text-[#6b7280]">{item.a}</p></div>
          ))}
        </div>
      </section>
    </>
  );

  const TherapiesPage = () => (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-semibold md:text-5xl">Therapieën</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#6b7280]">Ontdek de verschillende therapieën, lees kort waar ze voor bedoeld zijn en bekijk direct welke praktijken beschikbaar zijn.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {therapies.map((therapyItem) => (
          <div key={therapyItem.title} className="overflow-hidden rounded-[24px] bg-[#fffdfa] shadow-sm ring-1 ring-[#e7ddd1]">
            <div className="h-48 bg-[#f2ece4]"><img src={therapyItem.image} alt={therapyItem.title} className="h-full w-full object-cover" /></div>
            <div className="p-6"><h3 className="text-2xl font-semibold">{therapyItem.title}</h3><p className="mt-3 text-[16px] leading-7 text-[#6b7280]">{therapyItem.longDescription}</p><button onClick={() => openResultsForTherapy(therapyItem.title)} className="mt-6 rounded-full bg-[#FB7710] px-6 py-3 text-sm font-semibold text-white">Bekijk praktijken</button></div>
          </div>
        ))}
      </div>
    </section>
  );

  const CitiesPage = () => (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-semibold md:text-5xl">Steden</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#6b7280]">Kies een stad en ontdek welke therapieën en praktijken daar zichtbaar zijn op Time4Therapy.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <button key={city} onClick={() => openResultsForCity(city)} className="rounded-[24px] bg-[#fffdfa] p-6 text-left shadow-sm ring-1 ring-[#e7ddd1] transition hover:-translate-y-1 hover:shadow-md">
            <div className="text-2xl font-semibold">{city}</div>
            <p className="mt-2 text-[#6b7280]">Bekijk praktijken en boek online.</p>
          </button>
        ))}
      </div>
    </section>
  );

  const ResultsPage = () => (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-semibold md:text-5xl">Zoekresultaten</h1>
        <p className="mt-3 text-lg text-[#6b7280]">{searchResults.length} praktijk(en) gevonden{therapy ? ` voor ${therapy}` : ""}{location && location !== "Huidige locatie" ? ` in ${location}` : ""}</p>
      </div>
      <div className="mt-8 max-w-5xl"><SearchBar /></div>
      <div className="mt-8"><ResultsList /></div>
    </section>
  );

  const PracticePage = () => {
    if (!selectedPractice) return null;
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <button onClick={() => setRoute("results")} className="mb-6 text-sm font-medium text-[#1B4292]">← Terug naar resultaten</button>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="overflow-hidden rounded-[30px] bg-[#fffdfa] shadow-sm ring-1 ring-[#e7ddd1]"><img src={selectedPractice.image} alt={selectedPractice.name} className="h-[380px] w-full object-cover" /></div>
            <div className="mt-8 rounded-[28px] bg-[#fffdfa] p-8 ring-1 ring-[#e7ddd1]">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#6b7280]"><span className="rounded-full bg-[#FFF4E8] px-3 py-1 font-medium text-[#FB7710]">Vanaf €{selectedPractice.priceFrom}</span><span>{selectedPractice.therapy}</span></div>
              <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{selectedPractice.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#6b7280]"><div className="flex items-center gap-1"><Star className="h-4 w-4 fill-[#FB7710] text-[#FB7710]" /><span className="font-medium text-[#1f2937]">{selectedPractice.rating}</span><span>({selectedPractice.reviews} reviews)</span></div><div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{selectedPractice.address}</span></div></div>
              <p className="mt-5 text-[17px] leading-8 text-[#6b7280]">{selectedPractice.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">{selectedPractice.specialties.map((item) => <span key={item} className="rounded-full bg-[#f6f1ea] px-3 py-2 text-sm text-[#4b5563]">{item}</span>)}</div>
            </div>
            <div className="mt-8 rounded-[28px] bg-[#fffdfa] p-8 ring-1 ring-[#e7ddd1]"><h2 className="text-3xl font-semibold">Behandelingen</h2><div className="mt-6 space-y-4">{selectedPractice.treatments.map((item) => <div key={item} className="flex items-center justify-between rounded-[18px] bg-[#fbf7f2] px-5 py-4"><div className="font-medium">{item}</div><button onClick={() => handleOpenBooking(selectedPractice)} className="rounded-full bg-[#FB7710] px-5 py-3 text-sm font-semibold text-white">Boek nu</button></div>)}</div></div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[28px] bg-[#fffdfa] p-7 ring-1 ring-[#e7ddd1]"><h3 className="text-2xl font-semibold">Boek direct</h3><p className="mt-3 text-[#6b7280]">Selecteer een behandeling en plan direct een afspraak.</p><button onClick={() => handleOpenBooking(selectedPractice)} className="mt-6 w-full rounded-full bg-[#FB7710] px-6 py-4 text-base font-semibold text-white">Boek afspraak</button></div>
            <div className="rounded-[28px] bg-[#fffdfa] p-7 ring-1 ring-[#e7ddd1]"><h3 className="text-2xl font-semibold">Openingstijden</h3><div className="mt-4 space-y-3 text-[#6b7280]">{selectedPractice.openingHours.map((item) => <div key={item} className="flex items-start gap-2"><Clock3 className="mt-1 h-4 w-4 shrink-0" /><span>{item}</span></div>)}</div></div>
            <div className="rounded-[28px] bg-[#EEF3FF] p-7 text-[#1B4292]"><h3 className="text-2xl font-semibold">Praktijkinformatie</h3><div className="mt-4 space-y-3 text-sm leading-6 text-[#32559b]"><div className="flex items-center gap-2"><Phone className="h-4 w-4" /> 070 - 123 45 67</div><div className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@time4therapy.nl</div><div className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Online boeken beschikbaar</div></div></div>
          </div>
        </div>
      </section>
    );
  };

const renderForPracticesPage = () => (
  <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
      <div>
        <span className="rounded-full bg-[#EEF3FF] px-4 py-2 text-sm font-medium text-[#1B4292]">
          Voor praktijken
        </span>
        <h1 className="mt-5 text-4xl font-semibold md:text-5xl">
          Groei mee met Time4Therapy
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6b7280]">
          Maak jouw praktijk zichtbaar, ontvang online aanvragen en geef cliënten
          een duidelijke plek om behandelingen te vinden en te boeken.
        </p>
        <div className="mt-8 space-y-4 text-[17px] text-[#4b5563]">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-[#FB7710]" />
            <span>Professioneel praktijkprofiel met behandelingen en informatie</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-[#FB7710]" />
            <span>Online boekingen en aanvragen op één plek</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-[#FB7710]" />
            <span>Zichtbaarheid in populaire steden en therapiecategorieën</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-[#FB7710]" />
            <span>Een rustige, duidelijke presentatie richting nieuwe cliënten</span>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] bg-[#fffdfa] p-8 ring-1 ring-[#e7ddd1]">
        {!leadSubmitted ? (
          <>
            <h2 className="text-2xl font-semibold">Meld je praktijk aan</h2>
            <div className="mt-6 space-y-4">
              <input
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                className="w-full rounded-2xl border border-[#e7ddd1] bg-white px-4 py-4 outline-none"
                placeholder="Naam praktijk"
              />
              <input
                value={practiceContactName}
                onChange={(e) => setPracticeContactName(e.target.value)}
                className="w-full rounded-2xl border border-[#e7ddd1] bg-white px-4 py-4 outline-none"
                placeholder="Naam contactpersoon"
              />
              <input
                value={practiceEmail}
                onChange={(e) => setPracticeEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#e7ddd1] bg-white px-4 py-4 outline-none"
                placeholder="E-mailadres"
              />
              <input
                value={practiceCity}
                onChange={(e) => setPracticeCity(e.target.value)}
                className="w-full rounded-2xl border border-[#e7ddd1] bg-white px-4 py-4 outline-none"
                placeholder="Stad"
              />
              <textarea
                value={practiceMessage}
                onChange={(e) => setPracticeMessage(e.target.value)}
                className="min-h-[120px] w-full rounded-2xl border border-[#e7ddd1] bg-white px-4 py-4 outline-none"
                placeholder="Vertel kort iets over jullie praktijk"
              />
            </div>
            <button
              onClick={handlePracticeSignup}
              disabled={practiceLoading}
              className="mt-6 w-full rounded-full bg-[#FB7710] px-6 py-4 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {practiceLoading ? "Bezig met opslaan..." : "Aanmelden"}
            </button>
          </>
        ) : (
          <div className="rounded-[22px] bg-[#EEF8F1] p-6">
            <h3 className="text-2xl font-semibold">Aanmelding verzonden</h3>
            <p className="mt-3 text-[#4b5563]">
              Je aanmelding is verstuurd. We nemen contact op zodra we jullie
              praktijk hebben ontvangen.
            </p>
            <button
              onClick={() => setLeadSubmitted(false)}
              className="mt-5 rounded-full bg-[#1B4292] px-6 py-3 text-sm font-semibold text-white"
            >
              Nieuwe aanmelding
            </button>
          </div>
        )}
      </div>
    </div>
  </section>
);

  const AboutPage = () => (
    <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-semibold md:text-5xl">Over Time4Therapy</h1>
      <div className="mt-6 space-y-6 text-lg leading-8 text-[#6b7280]">
        <p>Time4Therapy maakt het makkelijker om een passende therapiepraktijk te vinden, te vergelijken en direct online te boeken.</p>
        <p>We willen één overzichtelijk platform bieden waar cliënten snel kunnen zoeken op therapie en locatie, zonder losse websites af te gaan.</p>
        <p>Voor praktijken biedt het platform een professionele online presentatie en een duidelijke route naar nieuwe cliënten.</p>
      </div>
    </section>
  );

  const FaqPage = () => (
    <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-semibold md:text-5xl">Veelgestelde vragen</h1>
      <div className="mt-8 grid gap-4">
        {faqs.map((item) => (
          <div key={item.q} className="rounded-[24px] bg-[#fffdfa] p-6 shadow-sm ring-1 ring-[#e7ddd1]">
            <h3 className="text-xl font-semibold">{item.q}</h3>
            <p className="mt-3 text-[16px] leading-7 text-[#6b7280]">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const ContactPage = () => (
    <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h1 className="text-4xl font-semibold md:text-5xl">Contact</h1>
          <p className="mt-4 text-lg leading-8 text-[#6b7280]">Heb je een vraag of wil je jouw praktijk aanmelden? Neem gerust contact op.</p>
          <div className="mt-8 space-y-4 text-[#4b5563]"><div className="flex items-center gap-3"><Mail className="h-5 w-5 text-[#1B4292]" /> info@time4therapy.nl</div><div className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#1B4292]" /> 070 - 123 45 67</div><div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#1B4292]" /> Nederland</div></div>
        </div>
        <div className="rounded-[28px] bg-[#fffdfa] p-8 ring-1 ring-[#e7ddd1]">
          {!contactSubmitted ? (
            <>
              <div className="space-y-4"><input className="w-full rounded-2xl border border-[#e7ddd1] bg-white px-4 py-4 outline-none" placeholder="Naam" /><input className="w-full rounded-2xl border border-[#e7ddd1] bg-white px-4 py-4 outline-none" placeholder="E-mailadres" /><textarea className="min-h-[150px] w-full rounded-2xl border border-[#e7ddd1] bg-white px-4 py-4 outline-none" placeholder="Bericht" /></div>
              <button onClick={() => setContactSubmitted(true)} className="mt-6 rounded-full bg-[#FB7710] px-7 py-4 text-base font-semibold text-white">Versturen</button>
            </>
          ) : (
            <div className="rounded-[22px] bg-[#EEF8F1] p-6"><h3 className="text-2xl font-semibold">Bericht verzonden</h3><p className="mt-3 text-[#4b5563]">Je demo-bericht is verstuurd. In een echte versie ontvang je hierna een bevestiging per e-mail.</p><button onClick={() => setContactSubmitted(false)} className="mt-5 rounded-full bg-[#1B4292] px-6 py-3 text-sm font-semibold text-white">Nieuw bericht</button></div>
          )}
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="border-t border-[#e7ddd1] bg-[#f7f1e8]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-[15px] text-[#6b7280] md:flex-row md:items-center md:justify-between md:px-6">
        <div>© 2025 Time4Therapy</div>
        <div className="flex flex-wrap gap-5 text-[#1B4292]">
          <button onClick={() => setRoute("contact")}>Privacy</button>
          <button onClick={() => setRoute("contact")}>Voorwaarden</button>
          <button onClick={() => setRoute("contact")}>Contact</button>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbf7f2] text-[#1f2937]">
      <Header />

      {route === "home" && <HomePage />}
      {route === "therapies" && <TherapiesPage />}
      {route === "cities" && <CitiesPage />}
      {route === "results" && <ResultsPage />}
      {route === "practice" && <PracticePage />}
{route === "for-practices" && renderForPracticesPage()}     
      {route === "about" && <AboutPage />}
      {route === "faq" && <FaqPage />}
      {route === "contact" && <ContactPage />}

      <Footer />

      {bookingPractice && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 md:items-center md:p-4">
          <div className="w-full max-w-2xl rounded-t-[28px] bg-[#fffdfa] p-5 shadow-2xl md:rounded-[28px] md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-[#FB7710]">Afspraak boeken</div>
                <h3 className="mt-2 text-[28px] font-semibold">{bookingPractice.name}</h3>
                <p className="mt-2 text-[#6b7280]">{bookingPractice.city} • {bookingPractice.therapy}</p>
              </div>
              <button onClick={() => setBookingPractice(null)} className="rounded-full border border-[#e7ddd1] p-2 text-[#6b7280]">
                <X className="h-4 w-4" />
              </button>
            </div>

            {!bookingConfirmed ? (
              <>
                <div className="mt-6">
                  <div className="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">1. Behandeling</div>
                  <div className="mt-3 grid gap-3">
                    {bookingPractice.treatments.map((item) => (
                      <button key={item} onClick={() => setBookingTreatment(item)} className={`rounded-[18px] border px-4 py-4 text-left text-[15px] font-medium ${bookingTreatment === item ? "bg-[#FFF4E8] text-[#1f2937]" : "text-[#4b5563]"}`} style={{ borderColor: bookingTreatment === item ? "#FB7710" : "#e7ddd1" }}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">2. Dag</div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {["Vandaag", "Morgen", "Vrijdag", "Zaterdag"].map((item) => (
                        <button key={item} onClick={() => setBookingDay(item)} className={`rounded-[16px] border px-4 py-3 text-[15px] font-medium ${bookingDay === item ? "bg-[#EEF3FF] text-[#1B4292]" : "text-[#4b5563]"}`} style={{ borderColor: bookingDay === item ? "#1B4292" : "#e7ddd1" }}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">3. Tijd</div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {["09:00", "10:30", "14:00", "16:30"].map((item) => (
                        <button key={item} onClick={() => setBookingTime(item)} className={`rounded-[16px] border px-4 py-3 text-[15px] font-medium ${bookingTime === item ? "bg-[#EEF3FF] text-[#1B4292]" : "text-[#4b5563]"}`} style={{ borderColor: bookingTime === item ? "#1B4292" : "#e7ddd1" }}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  <input
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full rounded-[16px] border border-[#e7ddd1] bg-white px-4 py-4 text-[15px] outline-none"
                    placeholder="Jouw naam"
                  />
                  <input
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    className="w-full rounded-[16px] border border-[#e7ddd1] bg-white px-4 py-4 text-[15px] outline-none"
                    placeholder="Jouw e-mailadres"
                  />
                  <input
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="w-full rounded-[16px] border border-[#e7ddd1] bg-white px-4 py-4 text-[15px] outline-none"
                    placeholder="Jouw telefoonnummer"
                  />
                </div>
                <div className="mt-6 rounded-[18px] bg-[#f8f4ee] p-4 text-[15px] text-[#4b5563]">
                  <div className="font-semibold text-[#1f2937]">Samenvatting</div>
                  <div className="mt-2">{bookingTreatment}</div>
                  <div>{bookingDay} • {bookingTime}</div>
                </div>

<button
  onClick={handleConfirmBooking}
  disabled={bookingLoading}
  className="mt-6 w-full rounded-full bg-[#FB7710] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#E96A0A] disabled:cursor-not-allowed disabled:opacity-70"
>
  {bookingLoading ? "Bezig met opslaan..." : "Bevestig afspraak"}
</button>                 
             
              </>
            ) : (
              <div className="mt-6 rounded-[22px] bg-[#EEF8F1] p-6 text-[#1f2937]">
                <h4 className="text-[22px] font-semibold">Afspraak ingepland</h4>
                <p className="mt-3 text-[#4b5563]">Je demo-afspraak staat klaar bij <strong>{bookingPractice.name}</strong> voor <strong>{bookingTreatment}</strong> op <strong>{bookingDay}</strong> om <strong>{bookingTime}</strong>.</p>
                <button onClick={() => setBookingPractice(null)} className="mt-5 rounded-full bg-[#1B4292] px-6 py-3 text-sm font-semibold text-white">Sluiten</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
