

## Profizmus-növelő ötletek — Kivitelezési terv

Az oldal jelenlegi állapota tiszta és funkcionális. Az alábbi finomítások emelnék a prémium érzetet, anélkül hogy túldíszítenék:

---

### 1. Szekció-elválasztók (Section dividers)
Finom SVG hullám vagy ferde vonal a szekciók között a `bg-muted/30` és fehér háttér közötti átmenethez. Jelenleg az átmenetek „laposak" — egy subtle divider vizuális ritmust ad.

**Hol:** Új `SectionDivider.tsx` komponens, beszúrva a szekciók közé az `Index.tsx`-ben.

---

### 2. Számok animálása a Hero-ban (Animated counters)
A Hero statisztikák (pl. „109 release / 1 rollback") jelenleg statikus szöveg. Egy count-up animáció (Framer Motion + `useInView`) azonnal „data-driven" érzetet kelt.

**Hol:** `HeroSection.tsx` — a `hero.stats` szöveget szétbontani számokra és animálni.

---

### 3. Hover micro-interakciók a kártyákon
A kártyák (`PainPointsSection`, `AudienceSection`, `PackagesSection`) jelenleg csak `hover:shadow-lg`-t kapnak. Subtle `scale(1.01)` + border-szín váltás (`border-accent/40`) professzionálisabb érzetet ad.

**Hol:** Framer Motion `whileHover` prop hozzáadása a meglévő `motion.div` elemekhez.

---

### 4. „How It Works" lépések közötti összekötő vonal
A 3 lépés között jelenleg nincs vizuális kapcsolat. Egy vízszintes vonallal vagy pontozott összekötővel (desktop-on) egyértelmű folyamatábrázolás lesz.

**Hol:** `HowItWorksSection.tsx` — CSS/SVG vonal a lépések között, `hidden md:block`.

---

### 5. Logo kliensek / „Trusted by" szekcióba trust badge-ek
Compliance badge-ek (SOC2, ISO27001, SOX logók) a Credibility vagy CTA szekció közelében. Ezek szürke/muted ikonok, nem kell tényleges tanúsítvány — elég a „helping teams prepare for" kontextus.

**Hol:** Új sor a `CredibilitySection.tsx`-ben vagy a `CTASection.tsx` fölött.

---

### 6. Footer finomítás
A jelenlegi footer minimális. Hozzáadni: szekció-linkek (Pain Points, Packages stb.), LinkedIn ikon, és „Made with precision" típusú tagline.

**Hol:** `Footer.tsx` — oszlopos layout navigációs linkekkel.

---

### 7. Smooth scroll progress bar
Egy vékony zöld csík a header alatt, ami mutatja, hol tartasz az oldalon. Mérnöki precizitás érzetét kelti.

**Hol:** Új `ScrollProgress.tsx` komponens a `Header.tsx`-be integrálva.

---

### Implementációs sorrend (ajánlott)

1. Hover micro-interakciók (kártyák) — gyors, nagy vizuális hatás
2. Scroll progress bar — azonnal „polished" érzet
3. How It Works összekötő vonal — folyamat-vizualizáció
4. Szekció-elválasztók — vizuális ritmus
5. Compliance trust badge-ek — bizalomépítés
6. Footer finomítás — professzionális lezárás
7. Hero counter animáció — data-driven hatás

### Érintett fájlok
- `src/components/ScrollProgress.tsx` (új)
- `src/components/SectionDivider.tsx` (új)
- `src/components/Header.tsx`
- `src/components/HeroSection.tsx`
- `src/components/PainPointsSection.tsx`
- `src/components/AudienceSection.tsx`
- `src/components/PackagesSection.tsx`
- `src/components/HowItWorksSection.tsx`
- `src/components/CredibilitySection.tsx`
- `src/components/Footer.tsx`
- `src/pages/Index.tsx`
- `src/lib/i18n.tsx` (új kulcsok)

